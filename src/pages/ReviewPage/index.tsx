import { useEffect, useState } from 'react';
import Header from "../../components/Header";
import PageLayout from "../../components/PageLayout";
import { CardData } from '../../interfaces';
import { fetchData } from '../../utils/apiUtils';
import { API_URLS } from '../../utils/apiRoutes';
import CardStack from '../../components/CardStack';
import style from './index.module.scss'

const ReviewPage = () => {
    const [essayCardsData, setEssayCardsData] = useState<CardData[]>([])

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const cardData = await fetchData(`${API_URLS.CARDS_REVIEW}`)
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
            }
        }
        fetchCards();
    },[])

    return (
        <PageLayout>
            <div className={style.reviewPageContainer}>
                <Header title="Review" />
                <div className={style.reviewContainer}>
                    <CardStack initialCardsData={essayCardsData} />
                </div>
            </div>
        </PageLayout>
    )
};

export default ReviewPage;