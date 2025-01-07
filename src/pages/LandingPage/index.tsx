import style from './index.module.scss';
import LogoUrl from '../../assets/logoBlack.svg';
import demoImage from '../../assets/demo.png';

const LandingPage = () => {
  return (
    <div className={style.landingContainer}>
      <div className={style.contentWrapper}>
        <header className={style.header}>
          <div className={style.logo}>
            <img src={LogoUrl} width="27" height="27" alt="Alma Logo" />
            <span>Alma</span>
          </div>
          <nav>
            <a
              href="/login"
              className={style.loginText}
              aria-label="Log in to Alma"
            >
              Login
            </a>
          </nav>
        </header>

        <section className={style.mainContent} aria-labelledby="main-title">
          <h1 id="main-title" className={style.title}>
            Alma is a tool for improving retention
          </h1>
          <p className={style.title}>
            Inspired by research in reading and learning, it integrates AI
            assisted flashcards into the content you read to reinforce
            understanding
          </p>
          <img
            src={demoImage}
            alt="Screenshot showing Alma's flashcard interface with a sample question and answer buttons"
            className={style.demoImage}
            loading="lazy"
          />
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
