import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './components/MainLayout';
import styles from './App.module.scss';
import { AuthProvider, useAuthContext } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Lazy loaded components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const EssayPage = lazy(() => import('./pages/EssayPage'));
const WritePage = lazy(() => import('./pages/WritePage'));
const ReviewPage = lazy(() => import('./pages/ReviewPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const InboxPage = lazy(() => import('./pages/InboxPage'));
const SubmitEssayPage = lazy(() => import('./pages/SubmitEssayPage'));

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

function App() {
  const { isLoading } = useAuthContext();

  // Loading component for suspense fallback
  const Loading = () => <div className={styles.loading}>Loading...</div>;

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <div className={styles.appContainer}>
      <Router>
        <Suspense fallback={<Loading />}>
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
              <Route index element={
                <Suspense fallback={<Loading />}>
                  <InboxPage />
                </Suspense>
              } />
              <Route path="essay/:id" element={
                <Suspense fallback={<Loading />}>
                  <EssayPage />
                </Suspense>
              } />
              <Route path="write" element={
                <Suspense fallback={<Loading />}>
                  <WritePage />
                </Suspense>
              } />
              <Route path="review" element={
                <Suspense fallback={<Loading />}>
                  <ReviewPage />
                </Suspense>
              } />
              <Route path="settings" element={
                <Suspense fallback={<Loading />}>
                  <SettingsPage />
                </Suspense>
              } />
              <Route path="submitessay" element={
                <Suspense fallback={<Loading />}>
                  <SubmitEssayPage />
                </Suspense>
              } />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default AppWrapper;
