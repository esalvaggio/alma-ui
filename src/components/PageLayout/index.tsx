import style from './index.module.scss'
const PageLayout = ({ children }: any) => {
    return (<div className={style.essayPage}>
        <div className={style.pageContainer}>
            {children}
        </div>
    </div>)
}

export default PageLayout