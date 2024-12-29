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

import React from 'react';
import Card from '../../components/Card';

type ExtendedComponents = Components & {
    flashcard: React.ComponentType<any>;
};

const EssayPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [essay, setEssay] = useState<EssayData | null>(null)
    const [content, setContent] = useState(<></>);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    // converts markdown to a markdown abstract syntax tree, to quickly insert flashcards into the content
    // abstract syntax tree is traversed to find point of insertion, then insert card data, then we convert
    // the abstract syntax tree into react components. 
    const processMarkdown = async (markdownContent: string, cards: CardData[]) => {
        const flashcardsPlugin = (cards: any) => {
            return (tree: any) => {
                var totalTextLength = 0
                var currentTextLength = 0

                // calculates the total length of the content
                visit(tree, 'text', (node, index, parent) => {
                    totalTextLength += node.value.length
                })
                
                // sorts the cards by percent_through
                const sortedCards = cards.sort((a: CardData, b: CardData) => a.percent_through - b.percent_through);

                // inserts cards after paragraph x percent of the way through
                // may need to slightly change this as sometimes openai api says card should appear closer than it should. 
                visit(tree, 'paragraph', (node, index, parent) => {
                    currentTextLength += node.children.reduce((acc: number, child: any) => acc + (child.value ? child.value.length : 0), 0)
                    while (sortedCards.length > 0) {
                        const card = sortedCards[0]
                        const targetPosition = (card.percent_through / 100) * totalTextLength;
                        if (currentTextLength >= targetPosition) {
                            //@ts-ignore
                            parent.children.splice(index + 1, 0, {
                                type: 'element',
                                data: {
                                    hName: 'Flashcard',
                                    hProperties: {
                                        cardData: card
                                    }
                                },
                                children: []
                            });
                            sortedCards.shift();
                        } else {
                            break;
                        }

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
                    return  <Card cardData={cardData} mode='inline' />;
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