import { NavLink } from 'react-router-dom';
import styles from './index.module.scss'

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.navBarLogo}>
                <div className={styles.logo}>Alma</div>
                <ul className={styles.navLinks}>
                    <li>
                        <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : '')}>Inbox</NavLink>
                    </li>
                    <li>
                        <NavLink to='/write' className={({ isActive }) => (isActive ? styles.active : '')}>Journal</NavLink>
                    </li>
                    <li>
                        <NavLink to='/review' className={({ isActive }) => (isActive ? styles.active : '')}>Review</NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;