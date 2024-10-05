import { useEffect, useState } from 'react';
import style from './index.module.scss'
import { fetchData } from '../../utils/apiUtils';
import { API_URLS } from '../../utils/apiRoutes';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import PageLayout from '../../components/PageLayout';
import { CardData, EssayData } from '../../interfaces';
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import type { Options, Components } from 'rehype-react';
import * as ReactJSXRuntime from 'react/jsx-runtime';
import { Root as MdastRoot } from 'mdast';
import { Root as HastRoot } from 'hast';

import React from 'react';
import Card from '../../components/Card';

type ExtendedComponents = Components & {
    flashcard: React.ComponentType<any>;
};

const EssayPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [essay, setEssay] = useState<EssayData | null>(null)
    const [essayCardsData, setEssayCardsData] = useState<CardData[]>([])
    const [content, setContent] = useState(<></>);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    const processMarkdown = async (markdownContent: string, cards: CardData[]) => {
        const flashcardsPlugin = (cards: any) => {
            return (tree: any) => {
                let paragraphCount = 0
                visit(tree, 'paragraph', (node, index, parent) => {
                    paragraphCount += 1
                    if (paragraphCount % 3 == 0 && index && cards.length > 0) {
                        const card = cards.shift();
                        parent.children.splice(index + 1, 0, {
                            type: 'element',
                            data: {
                                hName: "Flashcard", 
                                hProperties: {
                                    cardData: card
                                }
                            },
                            children: []
                        });
                    }
                })
            }
        }
        const options: Options & { components: Partial<ExtendedComponents> } = {
            Fragment: React.Fragment,
            jsx: (ReactJSXRuntime as any).jsx,
            jsxs: (ReactJSXRuntime as any).jsxs,
            components: {
                //@ts-ignore
                Flashcard: (props: any) => {
                    const { cardData } = props;
                    return  <Card cardData={cardData} />;
                },
            }
        }
        const process = await unified()
            .use(remarkParse) // Parse markdown to markdown ast (mast)
            .use(flashcardsPlugin, [...cards]) // Custom plugin to inject flashcards into ast
            .use(remarkRehype, { allowDangerousHtml: true }) // Convert mast to html ast (hast)
            .use(rehypeReact, options) //Convert hast to react
            .process(markdownContent)
        return process.result;
    }

    useEffect(() => {
        const fetchEssayAndCards = async () => {
            try {
                setLoading(true)
                if (!id || isNaN(parseInt(id, 10))) {
                    navigate('/error');
                    return;
                }
                const numericId = parseInt(id, 10);
                const [essayData, cardData] = await Promise.all([
                    fetchData(`${API_URLS.ESSAY}${numericId}/`),
                    fetchData(`${API_URLS.CARDS}?essay_id=${numericId}`)
                ]);

                const cards: CardData[] = cardData.map((card: CardData) => ({
                    ...card,
                    next_review_date: new Date(card.next_review_date),
                    id: Number(card.id),
                    essay: Number(card.essay),
                    review_interval: Number(card.review_interval),
                    review_count: Number(card.review_count)
                }))

                processMarkdown(essayData.content, cards)
                    .then((reactElement) => {
                        setContent(reactElement)
                    })
                    .catch(error => {
                        console.error("Error in processMarkdown:", error);
                    });

                setEssay({
                    id: numericId,
                    user: essayData.user,
                    title: essayData.title,
                    content: essayData.content,
                    author: essayData.author
                });
                setEssayCardsData(cards);
            } catch (error) {
                console.error("Fetching card and essay data failed:", error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchEssayAndCards();
    }, [id, navigate])

    return (
        <PageLayout>
            <div className={style.essayPageContainer}>
                <Header>
                    <div className={style.headerContainer}>
                        <button onClick={() => navigate('/')} className={style.closeIcon}>X</button>
                    </div>
                </Header>
                <div className={style.essayContainer}>
                    <div className={style.essayContainerContent}>
                        {essay ? (
                            <>
                                <h1 className={style.essayTitle}>{essay.title}</h1>
                                <div className={style.essayAuthor}>{essay.author}</div>
                                <div className={style.essayContent}>
                                    {content}
                                </div>
                            </>) :
                            // Handle error state
                            <div></div>}
                    </div>
                </div>
                {/* <div className={style.footer}></div> */}
            </div>
        </PageLayout>
    )
};

export default EssayPage;