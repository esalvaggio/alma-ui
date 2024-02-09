import style from './index.module.scss'
const EssayPage = () => {
    return (
        <div className={style.essayPage}>
            <div className={style.pageContainer}>
                <div className={style.essayPageContainer}>
                    <div className={style.header}>
                        <button className={style.closeIcon}>X</button>
                    </div>
                    <div className={style.essayContainer}>
                        <div className={style.essayContent}>

                        </div>
                    </div>
                    <div className={style.footer}></div>
                </div>
            </div>
        </div>
    )
};

export default EssayPage;