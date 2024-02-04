import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
// Import any other layout-specific styles if needed
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