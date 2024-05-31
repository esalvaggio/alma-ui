import { useState } from 'react'
import { CardData } from '../../interfaces'
import style from './index.module.scss'

interface CardComponent {
    onAnswer: (index: any, answer: any) => void
    data: CardData
}
const Card = ({ onAnswer, data }: CardComponent) => {
    const [answered, setAnswered] = useState(false)
    return (
        <div className={style.cardGroup}>
            <div className={`${style.card} ${style.mainCard} ${!answered && style.cardUnanswered}`} onClick={() => setAnswered(true)}>
                <div className={style.cardContent}>
                    <h1 className={style.questionText}>{data.question}</h1>
                    <div className={style.contentWrapper}>
                        {!answered ? (
                            <div className={style.continueText}>click anywhere to continue</div>
                        ) : (
                            <div className={style.answerContainer}>
                                <div className={style.answer}>{data.answer}</div>
                                <div className={style.buttonContent}>
                                    <button className={style.answerButton} onClick={() => console.log("remembered")}>Remembered</button>
                                    <button className={style.answerButton} onClick={() => console.log("didnt remembered")}>Didn't Remember</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={`${style.card} ${style.cardFooter}`}>
                <div className={style.footerContent}>
                    <div className={style.footerInfo}>
                        <div className={style.footerTitle}>It's fair to describe Schitzofrenia as probably mostly genetic</div>
                        <div className={style.footerDate}>Reading Today, May 24, 2024</div>
                    </div>
                    <div className={style.footerTimeline}>In-Text – 5 Days - 2 Weeks – 1 Month – 2 Months – *</div>
                </div>
            </div>
        </div>
    )
}

export default Card;
