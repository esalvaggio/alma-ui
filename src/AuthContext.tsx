import { createContext, useState, useEffect, useContext } from 'react';

export interface AuthContext {
  isAuthenticated: boolean,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
  loading: boolean,
}

export const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  loading: true
});

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
    setLoading(false);
  }, []);

  return { isAuthenticated, setIsAuthenticated, loading }
}

export const AuthProvider = ({ children }: any) => {
  const { isAuthenticated, setIsAuthenticated, loading } = useAuth();

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
