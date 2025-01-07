import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EssayPage from './pages/EssayPage';
import WritePage from './pages/WritePage';
import ReviewPage from './pages/ReviewPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './components/MainLayout';
import styles from './App.module.scss';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider, useAuthContext } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import InboxPage from './pages/InboxPage';
import SubmitEssayPage from './pages/SubmitEssayPage';
import LandingPage from './pages/LandingPage';

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

function App() {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className={styles.appContainer}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<InboxPage />} />
            <Route path="essay/:id" element={<EssayPage />} />
            <Route path="write" element={<WritePage />} />
            <Route path="review" element={<ReviewPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="submitessay" element={<SubmitEssayPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppWrapper;
