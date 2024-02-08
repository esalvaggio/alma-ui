import { NavLink } from 'react-router-dom';
import styles from './index.module.scss'

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.navBarLogo}>
                <div className={styles.logo}>Alma</div>
                <ul className={styles.navLinks}>
                    <li>
                        <NavLink to='/read' className={({ isActive }) => (isActive ? styles.active : '')}>Read</NavLink>
                    </li>
                    <li>
                        <NavLink to='/write' className={({ isActive }) => (isActive ? styles.active : '')}>Write</NavLink>
                    </li>
                    <li>
                        <NavLink to='/remember' className={({ isActive }) => (isActive ? styles.active : '')}>Remember</NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;