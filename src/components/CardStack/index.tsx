// import { useState } from 'react';
import Card from '../Card';
import style from './index.module.scss'
import { CardData } from '../../interfaces';

// Can probably remove this component
const CardStack = ({ initialCardsData }: { initialCardsData: CardData[] }) => {

    return (
        <div className={style.cardStack}>
            {initialCardsData.map((data: CardData) => (
                <Card key={data.id} cardData={data} mode='review'></Card>
            ))}
        </div>
    )
}

export default CardStack;