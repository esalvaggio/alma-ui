import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import styles from './index.module.scss'

const MainLayout = () => {
    return (
        <div className={styles.mainLayout}>
          <Sidebar />
          {/* <div className={styles.verticalLine} /> */}
          <div className={styles.contentArea}>
            <Outlet />
          </div>
        </div>
      );
};

export default MainLayout;