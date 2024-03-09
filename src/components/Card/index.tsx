import { CardData } from '../../interfaces'
import style from './index.module.scss'

interface CardComponent {
    onAnswer: (index: any, answer: any) => void
    data: CardData
}
const Card = ({ onAnswer, data }: CardComponent) => {
    return (
        <div className={style.card}>
            <h1>{data.question}</h1>
            {/* <button onClick={() => onAnswer(index, 'remembered')}>Remembered</button>
            <button onClick={() => onAnswer(index, 'didntRemember')}>Didn't Remember</button> */}
        </div>
    )
}

export default Card;
