import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const ProtectedRoute = ({ children }: any) => {
    const { isAuthenticated }: any = useContext(AuthContext);
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};
export default ProtectedRoute;