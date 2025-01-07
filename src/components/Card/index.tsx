import { memo, useCallback, useState } from 'react';
import { CardData } from '../../interfaces';
import style from './index.module.scss';
import { postData } from '../../utils/apiUtils';
import { API_URLS } from '../../utils/apiRoutes';
import { useCard } from './useCard';

interface CardComponent {
  mode: 'inline' | 'review';
  cardData: CardData;
  onAnswer?: (result: 'correct' | 'incorrect' | 'skipped') => void;
}
const Card = memo(({ cardData, mode, onAnswer }: CardComponent) => {
  const cardProps = useCard(cardData, onAnswer);

  return mode === 'inline' ? (
    <InlineCard cardData={cardData} {...cardProps} />
  ) : (
    <ReviewCard cardData={cardData} {...cardProps} />
  );
});

const InlineCard = memo(
  ({
    answered,
    cardData,
    handleCardAnswer,
    setAnswered,
  }: {
    answered: boolean;
    cardData: CardData;
    handleCardAnswer: (correct: boolean) => void;
    setAnswered: (value: boolean) => void;
  }) => {
    return (
      <div className={style.cardGroup}>
        <>
          <div
            className={`${style.card} ${style.mainCard} ${style.inline} ${!answered && style.cardUnanswered}`}
            onClick={() => setAnswered(true)}
          >
            <div className={style.cardContent}>
              <h1 className={style.questionText}>{cardData.question}</h1>
              <div className={style.contentWrapper}>
                {!answered ? (
                  <div className={style.continueText}>
                    click anywhere to continue
                  </div>
                ) : (
                  <div className={style.answerContainer}>
                    <div className={style.answer}>{cardData.answer}</div>
                    <div className={style.buttonContent}>
                      <button
                        className={style.answerButton}
                        onClick={() => handleCardAnswer(true)}
                      >
                        Remembered
                      </button>
                      <button
                        className={style.answerButton}
                        onClick={() => handleCardAnswer(false)}
                      >
                        Didn't Remember
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`${style.card} ${style.inline} ${style.cardFooter}`}>
            <div className={style.footerContent}>
              <div className={style.footerInfo}>
                <div className={style.footerTitle}>Essay Title Goes Here</div>
                <div className={style.footerDate}>
                  Reading Today, May 24, 2024
                </div>
              </div>
              <div className={style.footerTimeline}>
                In-Text – 5 Days - 2 Weeks – 1 Month – 2 Months – *
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
);

const ReviewCard = memo(
  ({
    answered,
    cardData,
    handleCardAnswer,
    setAnswered,
  }: {
    answered: boolean;
    cardData: CardData;
    handleCardAnswer: (correct: boolean) => void;
    setAnswered: (value: boolean) => void;
  }) => {
    return (
      <div className={style.cardGroup}>
        <>
          <div
            className={`${style.card} ${style.mainCard} ${style.review} ${!answered && style.cardUnanswered}`}
            onClick={() => setAnswered(true)}
          >
            <div className={style.cardContent}>
              <h1 className={style.questionText}>{cardData.question}</h1>
              <div className={style.contentWrapper}>
                {!answered ? (
                  <div className={style.continueText}>
                    click anywhere to continue
                  </div>
                ) : (
                  <div className={style.answerContainer}>
                    <div className={style.answer}>{cardData.answer}</div>
                    <div className={style.buttonContent}>
                      <button
                        className={style.answerButton}
                        onClick={() => handleCardAnswer(true)}
                      >
                        Remembered
                      </button>
                      <button
                        className={style.answerButton}
                        onClick={() => handleCardAnswer(false)}
                      >
                        Didn't Remember
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`${style.card} ${style.review} ${style.cardFooter}`}>
            <div className={style.footerContent}>
              <div className={style.footerInfo}>
                <div className={style.footerTitle}>Essay Title Goes Here</div>
                <div className={style.footerDate}>
                  Reading Today, May 24, 2024
                </div>
              </div>
              <div className={style.footerTimeline}>
                In-Text – 5 Days - 2 Weeks – 1 Month – 2 Months – *
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
);

export default Card;
