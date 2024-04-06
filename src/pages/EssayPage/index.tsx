import { useEffect, useState } from 'react';
import style from './index.module.scss'
import { fetchData } from '../../utils/apiUtils';
import { API_URLS } from '../../utils/apiRoutes';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import PageLayout from '../../components/PageLayout';
import CardStack from '../../components/CardStack';
import { CardData, EssayData } from '../../interfaces';
import showdown from 'showdown';

const EssayPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [essay, setEssay] = useState<EssayData | null>(null)
    const [essayCardsData, setEssayCardsData] = useState<CardData[]>([])
    //@todo add loading/error state 
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

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
                const converter = new showdown.Converter();
                const htmlOutput = converter.makeHtml(essayData.content);
                setEssay({
                    id: numericId,
                    user: essayData.user,
                    title: essayData.title,
                    content: htmlOutput,
                    author: essayData.author
                });
                setEssayCardsData(cardData.map((card: CardData) => ({
                    ...card,
                    next_review_date: new Date(card.next_review_date),
                    id: Number(card.id),
                    essay: Number(card.essay),
                    review_interval: Number(card.review_interval),
                    review_count: Number(card.review_count)
                })));
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
                                    <div dangerouslySetInnerHTML={{ __html: essay.content }}></div>
                                </div>
                                <div>
                                    <CardStack initialCardsData={essayCardsData}></CardStack>
                                </div>
                            </>) :
                            // Handle error state
                            <div></div>}
                    </div>
                </div>
                <div className={style.footer}></div>
            </div>
        </PageLayout>
    )
};

export default EssayPage;