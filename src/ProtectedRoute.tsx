import { Navigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

export const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};
export default ProtectedRoute;
