import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

const MainLayout = () => {
    return (
        <div className="mainLayout">
          <Sidebar />
          <div className="contentArea">
            <Outlet />
          </div>
        </div>
      );
};

export default MainLayout;