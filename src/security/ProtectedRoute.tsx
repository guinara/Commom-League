import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ajuste o caminho conforme necessário
import AuthService from '../service/authService'; // Importe seu serviço que faz a requisição ao backend

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const authService = new AuthService();

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        if (response.status === 200) {
          console.log(response.data)
          setIsAuthenticated(true); 
        } else {
          setIsAuthenticated(false); 
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkCurrentUser();
  }, [setIsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
