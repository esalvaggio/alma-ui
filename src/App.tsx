import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReadPage from './pages/ReadPage'
import EssayPage from './pages/EssayPage'
import WritePage from './pages/WritePage'
import RememberPage from './pages/RememberPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import MainLayout from './components/MainLayout'
import styles from './App.module.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Default route to ReadPage, which includes the EssayListComponent */}
          <Route index element={<ReadPage />} />
          {/* Dynamic route for individual essays */}
          <Route path="essay/:id" element={<EssayPage />} />
          {/* Additional routes for other sections of the app */}
          <Route path="write" element={<WritePage />} />
          <Route path="remember" element={<RememberPage />} />
          <Route path="settings" element={<SettingsPage />} />
          {/* You can add more routes as needed */}
        </Route>
        {/* Handle 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
