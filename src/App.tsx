import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReadPage from './pages/ReadPage'
import EssayPage from './pages/EssayPage'
import WritePage from './pages/WritePage'
import RememberPage from './pages/RememberPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import MainLayout from './components/MainLayout'
import styles from './App.module.scss';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <div className={styles.appContainer}>
        <Router>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              {/* Default route to ReadPage, which includes the EssayListComponent */}
              <Route path="read" element={
                <ProtectedRoute>
                  <ReadPage />
                </ProtectedRoute>
              } />
              {/* Dynamic route for individual essays */}
              <Route path="read/essay/:id" element={
                <ProtectedRoute>
                  <EssayPage />
                </ProtectedRoute>
              } />
              {/* Additional routes for other sections of the app */}
              <Route path="write" element={
                <ProtectedRoute>
                  <WritePage />
                </ProtectedRoute>
              } />
              <Route path="remember" element={
                <ProtectedRoute>
                  <RememberPage />
                </ProtectedRoute>
              } />
              <Route path="settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              {/* You can add more routes as needed */}
            </Route>
            <Route path="login" element={<LoginPage />} />
            {/* Handle 404 Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
