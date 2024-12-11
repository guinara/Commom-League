import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import EstilosGlobais from '../../../componentes/GlobaStyle';
import Perfil from '../../../componentes/Perfil';
import UserList from '../../../componentes/userList';
import SideMenu from '../../../componentes/mainSideBar/SideMenu';
import Header from '../../../componentes/MainHeader';
import * as Components from '../component';

import TeamRegistrationForm from '../../../componentes/TeamRegister/'; // Componente do formulário de registro
import { useTranslation } from 'react-i18next';
import TeamService from '../../../service/teamService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, Select, MenuItem, Modal, Box, } from '@mui/material';
import { Formik, Form as FormikForm } from 'formik';
import UserSearchSelect from '../../../componentes/UserMainSearchSelect';
import * as Yup from 'yup';


const Backgroundgradient = styled.main`
  background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
  width: 100%;
  min-height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 8px solid var(--bgColor);
  display: flex;
  justify-content: space-between;
  gap: 30px;
  overflow: hidden;
  transition: 0.5s;
`;

const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  width: 500px;
`;

const ButtonLeave = styled.button`
  position: relative;
  
  right: 130%;
 
  align-items: center;
  appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, #ff5a5a 0, #ff5454 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s, transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;

  &:focus {
    box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
  }

  &:hover {
    box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #e03c3c 0 -3px 0 inset;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: #3c4fe0 0 3px 7px inset;
    transform: translateY(2px);
  }
`;

const PlayerListContainer = styled.div`
  position: relative;
  margin-top: 20px;
  padding: 1rem;
  background-color: #2c3e50;
  border-radius: 8px;
  color: #ecf0f1;
  width: 90%;
  margin-left: 1%;

  .player-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #34495e;

    &:last-child {
      border-bottom: none;
    }

    .player-info {
      display: flex; /* Ajuste para alinhar imagem e texto em linha */
      align-items: center; /* Centraliza verticalmente */
      gap: 12px; /* Espaçamento entre a imagem e o texto */

      span {
        font-size: 16px;
        text-align: center;
      }

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%; /* Garante que a imagem seja redonda */
        object-fit: cover; /* Mantém o aspecto correto da imagem */
      }
    }

    .actions {
      display: flex;
      gap: 10px;

      button {
        background-color: #e74c3c;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: #c0392b;
        }
      }

      .invite {
        background-color: #0da82f;

        &:hover {
          background-color: #2ecc71;
        }
      }
    }
  }
`;


const NavBar = styled.nav`

  top: 0;
  left: 0;
  width: 100%;
  background-color: #34495e;
  color: white;
  padding: 10px 20px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nav-links {
    display: flex;
    gap: 20px;
    
  }

  

  .nav-link {
    color: white;
    text-decoration: none;
    font-size: 16px;
    padding: 8px 12px;
    width: 150px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #2c3e50;
    }
  }

  .nav-link.active {
    background-color: #1abc9c;
    color: white;
  }
`;

const HistoryCard = styled.div`
  background-color: #2c3e50;
  color: white;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .team-names {
    font-size: 16px;
    font-weight: bold;
  }

  .match-id {
    font-size: 14px;
    color: #bdc3c7;
  }
`;

const ImgLeader = styled.img`
  width: 80px;
  height: 80px;
  top: 110px;
  right: 200px;
  position: absolute;
  border-radius: 80%;
 
`;

interface Team {
  id: string;
  name: string;
  imagePath: string;
  wins: boolean;

  user: string;
  loses: number;
  inGame: string;
  round: string;
  championship: string;
  winner: string;
  leader: player;
  players: player[];
}

interface player {
  id: string;
  nickName: string;
  imagePath: String;
}

interface leader {
  id: string;
  userName: string;
  fullName: string;
  image: boolean;
}

interface Member {
  role: string;
  status: string;
  openToPLay: string;
  user: player;
}

interface TeamFormValues {
  user: string;  // Agora apenas um jogador
}

const StyledForm = styled(FormikForm)`
  max-width: 600px;
  margin: 0px;
  padding: 30px;
  border-radius: 8px;
  color: black;
  background-color: NONE;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  const [active, setActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [players, setPlayers] = useState<string[]>(['', '', '', '']); // Placeholder para 4 jogadores
  const [activeTab, setActiveTab] = useState<'members' | 'history' | 'invite'>('members'); // Controla a aba ativa
  const [data, setData] = useState<Team | null | undefined>(null);
  const [members, setMembers] = useState<Member[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const teamService = new TeamService();
  const MAX_PLAYERS = 5;
  const [captainId, setCaptainId] = useState<string | null>(null);

  // Recuperando o usuário logado diretamente do cache (supondo que esteja no localStorage)
  const loggedUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}'); // Pegando os dados do usuário logado

  useEffect(() => {
    const captain = players.find(player => player.role === "ROLE_TEAM_CAPTAIN");
  
    if (captain) {
      console.log(captain.user.name);
      setCaptainId(captain.user.id); // Atualiza o ID do capitão
    }
    
  }, [players]); // O efeito será executado toda vez que a lista de players mudar
  useEffect(() => {
    const fetchMatchData = async () => {
      setLoading(true);
      setError(null);
      console.log(1);
      try {
        const response = await teamService.currentTeam();
        setData(response.data); // Armazena os dados do campeonato
        console.log(response.data);
        var id = response.data.id;
        console.log("kkk" + id);
        const response2 = await teamService.players(id);
        
console.log(response2.data)
setPlayers(response2.data);
const captain = players.find(player => player.role === "ROLE_TEAM_CAPTAIN");

if (captain) {
  console.log(captain.user.name);
  setCaptainId(captain.user.id); // Atualiza o ID do capitão
}

      } catch (err) {
        // Caso ocorra erro, mostra o toast
        setData(null)
        toast.error('Você não está participando de nenhum time.', {
          //onClose: () => navigate('register') // Ajuste a rota conforme sua necessidade
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, []);

  const handleSubmit = async (values: TeamFormValues) => {
    // Criação de um objeto `Team` com o `id` e outros dados necessários
   
     

    const token = sessionStorage.getItem("authToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      // Enviar o objeto `teamData` corretamente para o `invite`
      console.log(values.user)
      const response = await teamService.invite(values.user);  // Enviar sem FormData, apenas o objeto `Team`
      toast.success("Convite enviado com sucesso!");  // Mensagem do toast
    } catch (error) {
      console.log(values);  // Exibindo os valores no console caso haja erro
      toast.error("Erro ao enviar o convite.");
      console.error("Erro ao enviar convite:", error);
    }
  };


  const handleSelectCaptain = async (leaderId: string) => {
    setLoading(true);
    setError(null);
  
    try {
      if (!data?.id) {
        toast.error('Time não encontrado!');
        return;
      }
  
     // Prepare a estrutura com o ID do capitão
     const teamData = {
 
      leaderId: leaderId,  // ID do novo capitão
      id: leaderId,  // ID do time
    };
  
      await teamService.selectCaptain(teamData);
      toast.success('Capitão alterado com sucesso!');
  
      setCaptainId(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error('Erro ao trocar capitão!');
      setError('Erro ao tentar alterar o capitão.');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveTeam = async () => {
    setLoading(true);  // Ativa o estado de carregamento
    setError(null);    // Limpa qualquer erro anterior

    try {
      if (!data?.id) {
        toast.error('Time não encontrado!');
        return;
      }

      await teamService.leave(data.id);  // Faz a chamada ao serviço para sair do time
      toast.success('Você saiu do time com sucesso!'); // Sucesso

      setData(null); // Limpa os dados do time após a ação
    } catch (err) {
      console.error(err); // Log do erro para depuração
      toast.error('Erro ao sair do time!'); // Mensagem de erro
      setError('Erro ao tentar sair do time'); // Armazena o erro no estado
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  const handleBan = async (userId: String) => {
    setLoading(true);  // Ativa o estado de carregamento
    setError(null);    // Limpa qualquer erro anterior

    try {
      if (!data?.id) {
        toast.error('Time não encontrado!');
        return;
      }

      await teamService.ban(userId);  // Faz a chamada ao serviço para sair do time
      toast.success('Você baniu o jogador com sucesso!'); // Sucesso
      window.location.reload();
    } catch (err) {
      console.error(err); // Log do erro para depuração
      toast.error('Erro ao banir o jogador!'); // Mensagem de erro
      setError('Erro ao banir o jogador!'); // Armazena o erro no estado
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  const handleTogleActive = () => {
    setActive(!active);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    players: Yup.array()
      .of(Yup.string().required('O nome do jogador é obrigatório.'))
      .test(
        'max-players',
        `O time pode ter no máximo ${MAX_PLAYERS} jogadores.`,
        function (newPlayers) {
          const existingPlayersCount = data?.players?.length || 0; // Número de jogadores existentes
          const newPlayersCount = newPlayers?.filter(Boolean).length || 0; // Filtra jogadores válidos no formulário
          return existingPlayersCount + newPlayersCount <= MAX_PLAYERS; // Soma total válida
        }
      ),
  });


  const handleInvite = (name: string) => {
    console.log(`Convidar jogador: ${name}`);
  };

  const handleExpel = (name: string) => {
    console.log(`Expulsar jogador: ${name}`);
  };

  const loggedPlayer = {
    name: 'Jogador Atual',
    team: null, // Alterar para algum valor, como 'Team Solid', para testar o comportamento
  };

   
  return (
    <Components.Main>
      <Backgroundgradient>
        <SideMenu active={active} />
        <Components.Banner className={`banner ${active ? 'active' : ''}`}>
          <Header toggleActive={handleTogleActive} />
          <ToastContainer />
          {data && data.name ? (
            <Components.UserBanner>
              <Components.avatarTeamDiv>
                <a href="#" className="icon">
                  <Components.avatarTeamImg
                    src={data.imagePath || 'https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small_2x/simple-user-default-icon-free-png.png'} // Imagem padrão se não houver
                    alt="Imagem do time"
                  />
                </a>
              </Components.avatarTeamDiv>
  
              <Components.InfoDiv>
                <Components.h2>{data?.name || 'Não disponível'}</Components.h2>
              </Components.InfoDiv>
  
              <Components.avatarTeamDivText>
                <ButtonLeave
                  className="leave"
                  hidden={loggedUser.id === data?.leader?.id} // O líder não pode sair do time
                  onClick={() => handleLeaveTeam()}
                >
                  {t('Leave Team')}
                </ButtonLeave>
              </Components.avatarTeamDivText>
            </Components.UserBanner>
          ) : null}
  
          <NavBar>
            <div className="nav-links">
              <div
                className={`nav-link ${activeTab === 'members' ? 'active' : ''}`}
                onClick={() => setActiveTab('members')}
              >
                {t('Members')}
              </div>
  
              <div
                className={`nav-link ${activeTab === 'invite' ? 'active' : ''}`}
                onClick={() => setActiveTab('invite')}
              >
                {t('Invite Member')}
              </div>
            </div>
          </NavBar>
  
          {/* Conteúdo das abas */}
          {activeTab === 'members' && (
            <PlayerListContainer>
           {players && players.length > 0 ? (
  players
    .sort((a, b) => (a.role === 'ROLE_TEAM_CAPTAIN' ? -1 : 1)) // Ordena para colocar o líder primeiro
    .map((player) => (
      <div className="player-item" key={player.user?.id}>
        <div className="player-info">
          <span>
            {player.role === 'ROLE_TEAM_CAPTAIN' && (
              <>
                <FontAwesomeIcon icon={faCrown} style={{ color: "#FFD43B" }} />
                {' Líder: '}
              </>
            )}
          </span>
          <img
            src={player.user?.imagePath || 'https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small_2x/simple-user-default-icon-free-png.png'} // Verifica se imagePath está presente
            alt="Imagem do jogador"
          />
          {player.user?.nickname || 'Nickname não disponível'} 
        </div>
        <div className="actions">
          {loggedUser.id === player.user?.id ? (
            <span>You</span> // Exibe "You" para o jogador logado
          ) : (
            <>
              {/* Verifica se o jogador logado é o líder */}
              {loggedUser.id === captainId && player.role !== 'ROLE_TEAM_CAPTAIN' && (
                <button
                  className="invite"
                  onClick={() => handleSelectCaptain(player.user?.id)}
                >
                  {t('Select Captain')}
                </button>
              )}
              {loggedUser.id === captainId && (
                <button
                  onClick={() => handleBan(player.user?.id)}
                >
                  {t('Ban')}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    ))
) : (
  <div>Nenhum jogador encontrado ou dados ainda carregando...</div>
)}
            </PlayerListContainer>
          )}
  
          {activeTab === 'history' && (
            <div>
              {matches && matches.length > 0 ? (
                matches.map((match, index) => (
                  <HistoryCard key={index}>
                    <div className="team-names">
                      {match.teamA} vs {match.teamB}
                    </div>
                    <div className="match-id">
                      {match.matchId}
                    </div>
                  </HistoryCard>
                ))
              ) : (
                <div>Histórico não disponível</div>
              )}
            </div>
          )}
  
          {activeTab === 'invite' && (
            <Formik
  initialValues={{ user: "" }}  // ou o valor inicial adequado
  onSubmit={handleSubmit}
>
  {({ values, setFieldValue }) => (
    <StyledForm>
      <UserSearchSelect
        label=""
        name="user"
        value={values.user}
        setFieldValue={setFieldValue}  // Passando setFieldValue aqui
       
      />
      <Button type="submit">Enviar Convite</Button>
    </StyledForm>
  )}
</Formik>
          )}
        </Components.Banner>
        <EstilosGlobais />
      </Backgroundgradient>
  
      <Modal open={openModal} onClose={handleCloseModal}>
        <ModalContainer>
          <TeamRegistrationForm handleClose={handleCloseModal} />
        </ModalContainer>
      </Modal>
    </Components.Main>
  );
  
  

};

export default App;
