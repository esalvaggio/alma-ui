import { postData } from '../../utils/apiUtils';
import { useCallback, useState } from 'react';
import { CardData } from '../../interfaces';
import { API_URLS } from '../../utils/apiRoutes';

export function useCard(
  cardData: CardData,
  onAnswer?: (result: 'correct' | 'incorrect') => void
) {
  const [answered, setAnswered] = useState(false);

  // issue could be here. If this is being recreated even when currentIndex and cards haven't actually changed, then card could be rerendered unnecessarily

  const answerCard = useCallback(
    async (answer: boolean) => {
      try {
        const numericId = cardData.id;
        await postData(
          `${API_URLS.CARDS_ANSWER}${numericId}/`,
          { correct: answer },
          {}
        );
      } catch (error) {
        console.log(error);
      }
    },
    [cardData.id]
  );

  const handleCardAnswer = useCallback(
    (correct: boolean) => {
      answerCard(correct);
      onAnswer?.(correct ? 'correct' : 'incorrect');
    },
    [onAnswer, answerCard]
  );

  return {
    answered,
    setAnswered,
    handleCardAnswer,
  };
}
