import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EssayPage from './pages/EssayPage'
import WritePage from './pages/WritePage'
import ReviewPage from './pages/ReviewPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import MainLayout from './components/MainLayout'
import styles from './App.module.scss';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider, useAuthContext } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import InboxPage from './pages/InboxPage';
import SubmitEssayPage from './pages/SubmitEssayPage';

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

function App() {
  const { loading } = useAuthContext();

  if (loading) {
    return <>Loading...</>
  }
  return (
      <div className={styles.appContainer}>
        <Router>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              {/* Default route to ReadPage, which includes the EssayListComponent */}
              <Route path="/" element={
                <ProtectedRoute>
                  <InboxPage />
                </ProtectedRoute>
              } />
              {/* Dynamic route for individual essays */}
              <Route path="essay/:id" element={
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
              <Route path="review" element={
                <ProtectedRoute>
                  <ReviewPage />
                </ProtectedRoute>
              } />
              <Route path="settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              <Route path="submitessay" element={
                <ProtectedRoute>
                  <SubmitEssayPage />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            {/* Handle 404 Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
  );
}

export default AppWrapper;
