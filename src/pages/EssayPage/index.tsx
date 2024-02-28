import { useEffect, useState } from 'react';
import style from './index.module.scss'
import { fetchData } from '../../utils/apiUtils';
import { API_URLS } from '../../utils/apiRoutes';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import PageLayout from '../../components/PageLayout';

const EssayPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [essay, setEssay] = useState({ id: id, user: "", title: "", content: "" })
    const [essayCards, setEssayCards] = useState(
        [{
            id: "",
            essay: "",
            question: "",
            answer: "",
            next_review_date: "",
            review_interval: "",
            review_count: "",
        }])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchEssayAndCards = async () => {
            try {
                setLoading(true)
                const [essayData, cardData] = await Promise.all([
                    fetchData(`${API_URLS.ESSAY}${id}/`),
                    fetchData(`${API_URLS.CARDS}?essay_id=${id}`)
                ]);
                setEssay(essayData);
                setEssayCards(cardData);
            } catch (error) {
                console.error("Fetching card and essay data failed:", error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchEssayAndCards();
    }, [id])

    return (
        <PageLayout>
            <div className={style.essayPageContainer}>
                <Header>
                    <div className={style.headerContainer}>
                        <button onClick={() => navigate('/')} className={style.closeIcon}>X</button>
                    </div>
                </Header>
                <div className={style.essayContainer}>
                    <div className={style.essayContent}>
                        {essay.content}
                        <p />
                        {essayCards.map((card) => {
                            return <div key={card.id}>{card.question}</div>
                        })}
                    </div>
                </div>
                <div className={style.footer}></div>
            </div>
        </PageLayout>
    )
};

export default EssayPage;