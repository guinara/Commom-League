import React, { useState } from 'react';
import { styled } from 'styled-components';
import EstilosGlobais from '../../componentes/GlobaStyle';
import Perfil from '../../componentes/Perfil';
import UserList from '../../componentes/userList';
import SideMenu from '../../componentes/mainSideBar/SideMenu';
import Header from '../../componentes/MainHeader';
import * as Components from './component';
import { Modal, Box, Button } from '@mui/material';
import TeamRegistrationForm from '../../componentes/TeamRegister/'; // Componente do formulário de registro

const Backgroundgradient = styled.main`
  background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  padding: 20px;
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

const App: React.FC = () => {
  const [active, setActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'quartas' | 'semifinals' | 'final' | 'history'>('semifinals');
  const [championshipMode, setChampionshipMode] = useState<'1x1' | '4x4'>('1x1'); // Definir o modelo do campeonato

  const handleToggleActive = () => setActive(!active);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const players = [
    { name: 'Jogador 1', isLeader: false },
    { name: 'Jogador 2', isLeader: false },
    { name: 'Jogador 3', isLeader: false },
    { name: 'Jogador 4', isLeader: false },
  ];

  const matches = [
    { teamA: 'Fury Esports', teamB: 'Red Canids', matchId: 'BR1_2548787' },
    { teamA: 'INTZ', teamB: 'paiN Gaming', matchId: 'BR1_2548788' },
  ];

  const finalists = [
    { teamA: 'Fury Esports', teamB: 'INTZ' },
  ];

  const quarterFinals = [
    { teamA: 'Fury Esports', teamB: 'Red Canids', matchId: 'BR1_2548787' },
    { teamA: 'INTZ', teamB: 'paiN Gaming', matchId: 'BR1_2548788' },
    { teamA: 'KaBuM!', teamB: 'LOUD', matchId: 'BR1_2548789' },
    { teamA: 'R7', teamB: 'Flamengo', matchId: 'BR1_2548790' },
  ];

  const handleInvite = (name: string) => {
    console.log(`Convidar jogador: ${name}`);
  };

  const handleExpel = (name: string) => {
    console.log(`Expulsar jogador: ${name}`);
  };

  const loggedPlayer = {
    name: 'Jogador Atual',
    team: null,
  };

  return (
    <Components.Main>
      <Backgroundgradient>
        <SideMenu active={active} />
        <Components.Banner className={`banner ${active ? 'active' : ''}`}>
          <Header toggleActive={handleToggleActive} />
          
          {/* Exibindo o valor e o ID do campeonato */}
          <div style={{ color: 'white', padding: '10px', fontSize: '18px' }}>
            <strong>Valor do Campeonato: R$ 10.000</strong><br />
            <strong>ID do Campeonato: 2024-01</strong><br />
            <strong>Modelo do Campeonato: {championshipMode === '1x1' ? '1x1' : 'Chave de 4'}</strong>
          </div>

          <NavBar>
            <div className="nav-links">
              {championshipMode === '1x1' ? (
                <>
                  <div
                    className={`nav-link ${activeTab === 'semifinals' ? 'active' : ''}`}
                    onClick={() => setActiveTab('semifinals')}
                  >
                    Semifinais
                  </div>
                  <div
                    className={`nav-link ${activeTab === 'final' ? 'active' : ''}`}
                    onClick={() => setActiveTab('final')}
                  >
                    Final
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`nav-link ${activeTab === 'quartas' ? 'active' : ''}`}
                    onClick={() => setActiveTab('quartas')}
                  >
                    Quartas de Final
                  </div>
                  <div
                    className={`nav-link ${activeTab === 'semifinals' ? 'active' : ''}`}
                    onClick={() => setActiveTab('semifinals')}
                  >
                    Semifinais
                  </div>
                  <div
                    className={`nav-link ${activeTab === 'final' ? 'active' : ''}`}
                    onClick={() => setActiveTab('final')}
                  >
                    Final
                  </div>
                </>
              )}
              <div
                className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                Histórico
              </div>
            </div>
          </NavBar>

          {/* Conteúdo das abas */}
          {activeTab === 'quartas' && championshipMode === '4x4' && (
            <PlayerListContainer>
              {quarterFinals.map((match, index) => (
                <HistoryCard key={index}>
                  <div className="team-names">
                    {match.teamA} vs {match.teamB}
                  </div>
                  <div className="match-id">{match.matchId}</div>
                </HistoryCard>
              ))}
            </PlayerListContainer>
          )}

          {activeTab === 'semifinals' && (
            <PlayerListContainer>
              {championshipMode === '4x4' ? (
                <>
                  {finalists.map((match, index) => (
                    <HistoryCard key={index}>
                      <div className="team-names">
                        {match.teamA} vs {match.teamB}
                      </div>
                    </HistoryCard>
                  ))}
                </>
              ) : (
                matches.map((match, index) => (
                  <HistoryCard key={index}>
                    <div className="team-names">
                      {match.teamA} vs {match.teamB}
                    </div>
                    <div className="match-id">{match.matchId}</div>
                  </HistoryCard>
                ))
              )}
            </PlayerListContainer>
          )}

          {activeTab === 'final' && (
            <PlayerListContainer>
              <HistoryCard>
                <div className="team-names">
                  {championshipMode === '1x1' ? 'Fury Esports vs INTZ' : 'Fury Esports vs INTZ (Final)'}
                </div>
              </HistoryCard>
            </PlayerListContainer>
          )}
        </Components.Banner>
      </Backgroundgradient>
    </Components.Main>
  );
};

export default App;
