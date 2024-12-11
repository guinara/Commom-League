import React, { useState } from 'react';
import { styled } from 'styled-components';
import EstilosGlobais from '../../../componentes/GlobaStyle';
import Perfil from '../../../componentes/Perfil';
import UserList from '../../../componentes/userList';
import SideMenu from '../../../componentes/mainSideBar/SideMenu';
import Header from '../../../componentes/MainHeader';
import * as Components from '../component';
import { Modal, Box, Button } from '@mui/material';
import TeamRegistrationForm from '../../../componentes/TeamRegister/'; // Componente do formulário de registro

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

const TeamListContainer = styled.div`
  position: relative;
  margin-top: 20px;
  padding: 1rem;
  background-color: #2c3e50;
  border-radius: 8px;
  color: #ecf0f1;
  width: 90%;
  margin-left: 1%;

  .team-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #34495e;

    &:last-child {
      border-bottom: none;
    }

    .team-info {
      display: flex;
      flex-direction: column;

      span {
        font-size: 14px;
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

      .join {
        background-color: #0da82f;

        &:hover {
          background-color: #2ecc71;
        }
      }
    }
  }
`;



const RegisterButton = styled.div`
 position: relative;
right: 50%;
  
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

const App: React.FC = () => {
  const [active, setActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'teams'>('teams');
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [playerTeam, setPlayerTeam] = useState<string | null>(null); // Estado que guarda o time do jogador

  const handleTogleActive = () => {
    setActive(!active);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSelectTeam = (team: any) => {
    setSelectedTeam(team);
  };

  const handleJoinTeamRequest = (teamName: string) => {
    // Enviar o pedido para entrar no time (pode ser uma API ou outra lógica)
    console.log(`Pedido enviado para entrar no time: ${teamName}`);
  };

  const teams = [
    { name: 'Team Solid', leader: 'Fulano' },
    { name: 'Team Alpha', leader: 'Baki' },
    { name: 'Team Beta', leader: 'Ciclano' },
  ];

  const loggedPlayer = {
    name: 'Jogador Atual',
    team: playerTeam, // Agora o time do jogador é controlado pelo estado `playerTeam`
  };

  return (
    <Components.Main>
      <Backgroundgradient>
        <SideMenu active={active} />
        <Components.Banner className={`banner ${active ? 'active' : ''}`}>
          <Header toggleActive={handleTogleActive} />
         
        
          <Components.UserBanner>
            {selectedTeam && (
              <>
                <Components.avatarTeamDiv>
                  <a href="#" className="icon">
                    <Components.avatarTeamImg
                      src="https://nexus.leagueoflegends.com/wp-content/uploads/2019/10/G2_Icon_iqex9cgmveqc73m46pbm.png"
                      alt="Team Image"
                    />
                  </a>
                </Components.avatarTeamDiv>
                <Components.avatarTeamDivText>
                  <Components.h1>{selectedTeam.name}</Components.h1>
                  <Components.h2>Leader: {selectedTeam.leader}</Components.h2>
                </Components.avatarTeamDivText>
                
              </>
            )}
          </Components.UserBanner>


          <NavBar>
            <div className="nav-links">
              <div
                className={`nav-link ${activeTab === 'teams' ? 'active' : ''}`}
                onClick={() => setActiveTab('teams')}
              >
                Times Disponíveis
              </div>
            </div>
            <RegisterButton>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
              Registrar Time
            </Button>
            </RegisterButton>
            
          </NavBar>

          {/* Conteúdo da aba de times */}
          {activeTab === 'teams' && (
            <TeamListContainer>
              {teams.map((team, index) => (
                <div className="team-item" key={index}>
                  <div className="team-info">
                    <span>{team.name}</span>
                    <span>Líder: {team.leader}</span>
                  </div>
                  <div className="actions">
                    {loggedPlayer.team === team.name ? (
                      <button disabled className="entered">
                        Já está no time
                      </button>
                    ) : (
                      <>
                        <button
                          className="join"
                          onClick={() => handleSelectTeam(team)}
                        >
                          Selecionar Time
                        </button>
                        {selectedTeam?.name === team.name && (
                          <button
                            className="join"
                            onClick={() => handleJoinTeamRequest(team.name)}
                          >
                            Pedir para Entrar no Time
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </TeamListContainer>
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
