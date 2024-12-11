import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginRegister';
import Riot from './pages/Master/riot';
import Perfil from './pages/profile/UserProfile';
import Team from './pages/team/TeamProfile';
import PerfilEdit from './pages/profile/EditProfile';
import Adm from './pages/Master/adm';
import Mp from './pages/Payment/mercadoPago';
import { AuthProvider } from './security/AuthContext';
import ProtectedRoute from './security/ProtectedRoute';
import TeamRegister from './pages/team/TeamsRegister';
import Torneio from './pages/Tournament/index';
import TorneioAguardando from './pages/Tournament/TournamentWaitingPage';
import TorneioPlaying from './pages/Tournament/TournamentPlayingPage';
import ChampionshipService from './service/TornamentService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componente para capturar e exibir os toasts baseados no status da URL
const PurchaseStatusToast: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status'); // Captura o status da URL

    if (status) {
      switch (status) {
        case 'accepted':
          toast.success('Purchase successful!');
          break;
        case 'pending':
          toast.info('Your purchase is pending...');
          break;
        case 'denied':
          toast.error('Your purchase was denied.');
          break;
        default:
          break;
      }
    }
  }, [location.search]); // Re-exibe o toast sempre que a URL mudar

  return null; // Este componente não precisa renderizar nada
};

const App: React.FC = () => {
  const [tournamentData, setTournamentData] = useState<any>(null); // Estado para armazenar os dados do torneio
  const [loading, setLoading] = useState<boolean>(true); // Estado para controle de carregamento
  const championshipService = new ChampionshipService();

  useEffect(() => {
    // Função para buscar os dados do torneio
    const fetchTournamentResults = async () => {
      try {
        setLoading(true);
        const response = await championshipService.getCurrentTournamentJoin();
        const data = response.data;
        setTournamentData(data); // Armazena os dados no estado
      } catch (error) {
        console.error('Erro ao carregar os resultados do torneio', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentResults(); // Chama a função para carregar os dados
  }, []); // Recarregar apenas uma vez quando o componente for montado

  // Função para renderizar a rota do torneio com base no estado
  const renderTournamentRoute = () => {
    if (loading) {
      return <div>Carregando...</div>; // Exibe carregamento enquanto busca os dados
    }

    if (tournamentData) {
      switch (tournamentData.status) {
        case "PLAYING":
          return <Navigate to="/championship/playing" />; // Redireciona para a rota de "jogando"
        case "WAITING":
          return <Navigate to="/championship/waiting" />; // Redireciona para a rota de "aguardando"
        default:
          return <Navigate to="/championship" />; // Caso o status não seja reconhecido, vai para a página padrão
      }
    }

    return <Torneio />; // Caso não tenha dados, redireciona para a página de torneio padrão
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer /> {/* Adicionando o container do Toast */}
        <PurchaseStatusToast /> {/* Componente para exibir o toast baseado na URL */}
        <Routes>
          {/* Rotas principais */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />

          {/* Rotas protegidas */}
          <Route path="/adm" element={<ProtectedRoute element={<Adm />} />} />
          <Route path="/mp" element={<ProtectedRoute element={<Mp />} />} />

          {/* Rotas de perfil */}
          <Route path="profiles">
            <Route index element={<ProtectedRoute element={<Perfil />} />} />
            <Route path="edit" element={<ProtectedRoute element={<PerfilEdit />} />} />
          </Route>

          {/* Rotas de equipe */}
          <Route path="team">
            <Route index element={<ProtectedRoute element={<Team />} />} />
            <Route path="edit" element={<ProtectedRoute element={<PerfilEdit />} />} />
            <Route path="register" element={<ProtectedRoute element={<TeamRegister />} />} />
          </Route>

          {/* Rota para Riot */}
          <Route path="/riot" element={<ProtectedRoute element={<Riot />} />} />

          {/* Rotas de Torneio - redirecionamento baseado no estado do torneio */}
          <Route path="championship" element={renderTournamentRoute()} />
          <Route path="championship/playing" element={<ProtectedRoute element={<TorneioPlaying />} />} />
          <Route path="championship/waiting" element={<ProtectedRoute element={<TorneioAguardando />} />} />

          {/* Página de erro (caso não encontre a rota) */}
          <Route path='*' element={<div><img src="/icones/molho.png" alt="Imagem não encontrada" /></div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
