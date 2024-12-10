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



const PurchaseStatusToast: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status'); 

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
  }, [location.search]); 

  return null; 
};

const App: React.FC = () => {
  const [tournamentData, setTournamentData] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const championshipService = new ChampionshipService();


   // Funções para abrir os modais
   const openPrivacyPolicyModal = () => {
    console.log('Abrindo modal de Política de Privacidade');
  };

  const openTermsModal = () => {
    console.log('Abrindo modal de Termos de Uso');
  };
  
  useEffect(() => {
    const fetchTournamentResults = async () => {
      try {
        setLoading(true);
        const response = await championshipService.getCurrentTournamentJoin();
        const data = response.data;
        setTournamentData(data); 
      } catch (error) {
        console.error('Erro ao carregar os resultados do torneio', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentResults(); 
  }, []); 


  const renderTournamentRoute = () => {
    if (loading) {
      return <div>Carregando...</div>; 
    }

    if (tournamentData) {
      switch (tournamentData.status) {
        case "PLAYING":
          return <Navigate to="/championship/playing" />;
        case "WAITING":
          return <Navigate to="/championship/waiting" />; 
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
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />

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
