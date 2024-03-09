// import { useState } from 'react';
import Card from '../Card';
import style from './index.module.scss'
import { CardData } from '../../interfaces';

const CardStack = ({ initialCardsData }: { initialCardsData: CardData[] }) => {
    // const [cards, setCards] = useState(initialCardsData)
    // const [hideIndex, setHideIndex] = useState(null)

    const handleAnswer = (index: any, answer: string) => {
        // setHideIndex(index)
        // setTimeout(() => {
        //     setCards((currentCards: any) => currentCards.filter((_: any, i: any) => i !== index))
        //     setHideIndex(null)
        // }, 300)
    }

    return (
        <div className={style.cardStack}>
            {initialCardsData.map((data: CardData) => (
                <Card key={data.id} data={data} onAnswer={handleAnswer}></Card>
            ))}
        </div>
    )
}

export default CardStack;