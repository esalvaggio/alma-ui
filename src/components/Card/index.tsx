import { useState } from 'react'
import { CardData } from '../../interfaces'
import style from './index.module.scss'
import { postData } from '../../utils/apiUtils'
import { API_URLS } from '../../utils/apiRoutes'

interface CardComponent {
    cardData: CardData
}
const Card = ({ cardData }: CardComponent) => {
    const [answered, setAnswered] = useState(false)
    const [showCard, setShowCard] = useState(true)

    const handleCardAnswer = (correct: boolean) => {
        setShowCard(false)
        answerCard(correct)
    }
    const answerCard = async (answer: boolean) => {
        try {
            const numericId = cardData.id
            await postData(
                `${API_URLS.CARDS_ANSWER}${numericId}/`,
                {
                    correct: answer
                },
                {}
            );
        } catch (error) {
            // Handle errors, e.g., show an error message
            console.log(error)
        }
    }
    return (
        <div className={style.cardGroup}>
            {showCard ?
                <>
                    <div className={`${style.card} ${style.mainCard} ${!answered && style.cardUnanswered}`} onClick={() => setAnswered(true)}>
                        <div className={style.cardContent}>
                            <h1 className={style.questionText}>{cardData.question}</h1>
                            <div className={style.contentWrapper}>
                                {!answered ? (
                                    <div className={style.continueText}>click anywhere to continue</div>
                                ) : (
                                    <div className={style.answerContainer}>
                                        <div className={style.answer}>{cardData.answer}</div>
                                        <div className={style.buttonContent}>
                                            <button className={style.answerButton} onClick={() => handleCardAnswer(true)}>Remembered</button>
                                            <button className={style.answerButton} onClick={() => handleCardAnswer(false)}>Didn't Remember</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={`${style.card} ${style.cardFooter}`}>
                        <div className={style.footerContent}>
                            <div className={style.footerInfo}>
                                <div className={style.footerTitle}>Essay Title Goes Here</div>
                                <div className={style.footerDate}>Reading Today, May 24, 2024</div>
                            </div>
                            <div className={style.footerTimeline}>In-Text – 5 Days - 2 Weeks – 1 Month – 2 Months – *</div>
                        </div>
                    </div> </> : <></>}
        </div>
    )
}

export default Card;
