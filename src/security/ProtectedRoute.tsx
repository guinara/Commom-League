import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ajuste o caminho conforme necessário
import AuthService from '../service/authService'; // Importe seu serviço que faz a requisição ao backend
import styled, { keyframes } from 'styled-components'; // Importa styled-components

interface ProtectedRouteProps {
  element: JSX.Element;
}

// Animação de carregamento (spinner)
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
   background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
  z-index: 9999; /* Garantir que o loading fique por cima do conteúdo */
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* Cor do fundo */
  border-top: 4px solid #3498db; /* Cor da borda que gira */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite; /* Animação de rotação */
`;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const authService = new AuthService();

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        
        // Verifique se o status é 200 e se há dados no response.data
        if (response.status === 200 && response.data) {
          console.log(response.data);  // Log para debug
          setIsAuthenticated(true);  // Autenticação bem-sucedida
        } else {
          setIsAuthenticated(false);  // Sem dados no response.data, logout
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        setIsAuthenticated(false);  // Se erro, desautenticar
      } finally {
        setLoading(false);  // Finaliza carregamento
      }
    };

    checkCurrentUser();
  }, [setIsAuthenticated]);

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
