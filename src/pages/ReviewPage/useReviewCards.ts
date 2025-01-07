import { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import { CardData } from '../../interfaces';
import { fetchData, postData } from '../../utils/apiUtils';
import { API_URLS } from '../../utils/apiRoutes';

const BATCH_SIZE = 10;
const PREFETCH_THRESHOLD = 7; // Start loading next batch when 3 cards remain

export function useReviewCards() {
  const [cards, setCards] = useState<CardData[]>([]); // array of all loaded cards
  const [currentIndex, setCurrentIndex] = useState(0); //current index of card being shown
  const [isLoading, setIsLoading] = useState(false); //whether we're currently fetching cards
  const [hasMore, setHasMore] = useState(true); //whether there are more cards to fetch
  const cardsRef = useRef<CardData[]>([]);
  const currentIndexRef = useRef(0);

  const loadMoreCards = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const lastCardId = cards[cards.length - 1]?.id;
      const newCards = await fetchData(
        `${API_URLS.CARDS_REVIEW}?batch_size=${BATCH_SIZE}&after_id=${lastCardId || ''}`
      );

      if (newCards.length != BATCH_SIZE) {
        setHasMore(false);
      }

      setCards((prev) => [...prev, ...newCards]);
    } catch (error) {
      console.error('Failed to load cards:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cards, isLoading, hasMore]);

  //update refs when state changes
  useEffect(() => {
    cardsRef.current = cards;
    currentIndexRef.current = currentIndex;
  }, [cards, currentIndex]);

  //Load initial batch
  useEffect(() => {
    loadMoreCards();
  }, []);

  // Prefetch next batch when approaching end
  // useEffect(() => {
  //     if (cards.length - currentIndex <= PREFETCH_THRESHOLD && hasMore) {
  //         loadMoreCards();
  //     }
  // }, [currentIndex, cards.length, hasMore, loadMoreCards]);

  const handleAnswer = useCallback(
    async (result: 'correct' | 'incorrect' | 'skipped') => {
      const currentCard = cardsRef.current[currentIndexRef.current];
      console.log(currentCard);
      if (!currentCard) return;

      try {
        await postData(`${API_URLS.CARDS_ANSWER}${currentCard.id}/`, {
          correct: result === 'correct',
        });

        setCurrentIndex((prev) => prev + 1);
      } catch (error) {
        console.error('Failed to update card:', error);
      }
    },
    []
  );
  return {
    currentCard: cards[currentIndex],
    isLoading: isLoading && cards.length === 0,
    handleAnswer,
    hasMore,
    progress: {
      current: currentIndex + 1, //human readable current card number
      total: cards.length,
    },
  };
}
