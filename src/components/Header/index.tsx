import style from './index.module.scss'

interface HeaderProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
}

const Header = ({ children, className, title }: HeaderProps) => {
    return (
        <header className={`${style.header} ${className}`}>
            {title && <h1 className={style.headerText}>{title}</h1>}
            {children}
        </header>
    )
}

export default Header;