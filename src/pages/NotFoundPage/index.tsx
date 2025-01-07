import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../AuthContext';
import { useEffect } from 'react';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return <>Not Found</>;
};

export default NotFoundPage;
