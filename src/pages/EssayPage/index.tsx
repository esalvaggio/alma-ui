import style from './index.module.scss'
const EssayPage = () => {
    return (
        <div className={style.essayPage}>
            <div className={style.pageContainer}>
                <div className={style.header}>
                    <div className={style.closeIcon}>X</div>
                </div>
                <div className={style.essayContainer}>
                    essay
                </div>
            </div>
        </div>
    )
};

export default EssayPage;