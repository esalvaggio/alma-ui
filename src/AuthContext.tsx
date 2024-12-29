import { createContext, useState, useEffect, useContext } from 'react';

export interface AuthContext {
  isAuthenticated: boolean,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
  isLoading: boolean,
}

export const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  isLoading: true
});

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
    setIsLoading(false);
  }, []);

  return { isAuthenticated, setIsAuthenticated, isLoading }
}

export const AuthProvider = ({ children }: any) => {
  const { isAuthenticated, setIsAuthenticated, isLoading } = useAuth();

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    isLoading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
