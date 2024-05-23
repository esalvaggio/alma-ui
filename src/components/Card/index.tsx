import { CardData } from '../../interfaces'
import style from './index.module.scss'

interface CardComponent {
    onAnswer: (index: any, answer: any) => void
    data: CardData
}
const Card = ({ onAnswer, data }: CardComponent) => {
    return (
        <div className={style.card}>
            <div className={style.cardContent}>
                <h1 className={style.questionText}>{data.question}</h1>
                <div className={style.continueText}>click anywhere to continue</div>
            </div>
        </div>
    )
}

export default Card;
