import Header from '../../components/Header';
import PageLayout from '../../components/PageLayout';
import style from './index.module.scss';
import Card from '../../components/Card';
import { useReviewCards } from './useReviewCards';

const ReviewPage = () => {
  const { currentCard, isLoading, handleAnswer, progress } = useReviewCards();

  return (
    // <PageLayout>
    // <div className={style.reviewPageContainer}>
    // <div className={style.reviewContainer}>
    <>
      {isLoading ? (
        <div>Loading...</div> //probably want to remove this.
      ) : currentCard ? (
        <>
          <Card cardData={currentCard} mode="review" onAnswer={handleAnswer} />
          {/* <div className={style.progress}>
                                Card {progress.current} of {progress.total}
                            </div> */}
        </>
      ) : (
        <div>No more cards to review!</div>
      )}
    </>
    // </div>
    // </div>
    // </PageLayout>
  );
};

export default ReviewPage;
