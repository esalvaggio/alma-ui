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
        <div className={`${style.card} ${!answered && style.cardUnanswered}`} onClick={() => setAnswered(true)}>
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
    )
}

export default Card;
