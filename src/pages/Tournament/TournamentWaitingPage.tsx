import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import EstilosGlobais from '../../componentes/GlobaStyle';
import Perfil from '../../componentes/Perfil';
import UserList from '../../componentes/userList';
import SideMenu from '../../componentes/mainSideBar/SideMenu';
import Header from '../../componentes/MainHeader';
import * as Components from './component';
import { Box, Button, Modal, Typography, Grid, Checkbox, FormControlLabel } from '@mui/material';
import ChampionshipService from '../../service/TornamentService';

// Fundo em estilo "HUD"
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

const DataContainer = styled.div`
  position: relative;
  margin-top: 20px;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 16px;
  color: #ecf0f1;
  width: 90%;
  margin-left: 1%;
  background: url('/assets/images/hud-background.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DataCard = styled.div`
  background-color: rgba(0, 11, 24, 0.6);
  color: white;
  border-radius: 12px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: rgba(26, 91, 188, 0.7);
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(26, 91, 188, 0.8);
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #ecf0f1;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Icon = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 10px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const TournamentInfo: React.FC = () => {
  const [active, setActive] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Aguardando jogadores');
  const [progress, setProgress] = useState(0);
  const [isInTournament, setIsInTournament] = useState(true);
  const [chips, setChips] = useState(100);  // Chips com valor inicial
  const [teams, setTeams] = useState<any[]>([]); // Times que participam do campeonato
  const [round, setRound] = useState<number | null>(null); // Round do torneio

  const championshipService = new ChampionshipService();

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        setIsLoading(true);
        const response = await championshipService.getCurrentTournamentJoin(); // Usando o método correto
        const updatedData = response.data;

        console.log('Dados do torneio atual recebidos:', updatedData);

        if (updatedData && updatedData.tournamentId) {
          console.log('ID do torneio encontrado:', updatedData.tournamentId);

          if (updatedData.type === "TOURNAMENT_LOSE") {
            setStatusMessage('Você foi eliminado do torneio.');
            setData(updatedData);
            setIsLoading(false);
            setTeams([]); // No caso de derrota, os times podem não ser relevantes
            return;
          }

          const teamsResponse = await championshipService.findTeamsByTournament(updatedData.tournamentId);
          const teamsData = teamsResponse.data;
          if (Array.isArray(teamsData) && teamsData.length > 0) {
            const extractedTeams = teamsData.map((team: any) => ({
              id: team.team.id,
              name: team.team.name,
              imagePath: team.team.imagePath,
              status: team.status,
            }));

            setTeams(extractedTeams); 
            setStatusMessage(updatedData.status ? 'Torneio em andamento...' : 'Aguardando adversário...');
            setData(updatedData);
            setProgress(50); // Exemplo de progresso
            setRound(updatedData.round || null);
          } else {
            setStatusMessage('Erro: Nenhum time encontrado para o torneio');
          }
        } else {
          setStatusMessage('Erro: Torneio não encontrado');
        }
      } catch (err) {
        console.error('Erro ao atualizar dados', err);
        setStatusMessage('Erro ao atualizar status');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournamentData();
  }, []);

  const handleExitTournament = () => {
    setIsInTournament(false);
  };

  const handleUpdateStatus = async () => {
    try {
      setIsLoading(true);
      const response = await championshipService.getCurrentTournamentJoin();
      const updatedData = response.data;

      if (updatedData && updatedData.tournamentId) {
        const teamsResponse = await championshipService.findTeamsByTournament(updatedData.tournamentId);
        const teamsData = teamsResponse.data;
        if (Array.isArray(teamsData) && teamsData.length > 0) {
          const extractedTeams = teamsData.map((team: any) => ({
            id: team.team.id,
            name: team.team.name,
            imagePath: team.team.imagePath,
            status: team.status,
          }));

          setTeams(extractedTeams);
          setStatusMessage(updatedData.status ? 'Torneio em andamento...' : 'Aguardando adversário...');
          setData(updatedData);
          setProgress(50);
          setRound(updatedData.round || null);
        } else {
          setStatusMessage('Erro: Nenhum time encontrado para o torneio');
        }
      } else {
        setStatusMessage('Erro: Torneio não encontrado');
      }
    } catch (err) {
      console.error('Erro ao atualizar status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Components.Main>
      <Backgroundgradient>
        <SideMenu active={active} />
        <Components.Banner className={`banner ${active ? 'active' : ''}`}>
          <Header toggleActive={() => setActive(!active)} />
  
          {isInTournament ? (
            <DataContainer>
              {isLoading ? (
                <div>Carregando dados...</div>
              ) : data ? (
                <>
                  <Title>Campeonato em Andamento</Title>

                  {data.type === 'TOURNAMENT_LOSE' && (
                    <div>
                      <Typography variant="h5" style={{ color: '#ff0000' }}>
                        Você foi eliminado do Torneio!
                      </Typography>
                      <Typography variant="body1" style={{ color: '#fff' }}>
                        Melhor sorte na próxima vez! Você pode ver os detalhes ou tentar novamente.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsInTournament(true)}
                        style={{ marginTop: '20px' }}
                      >
                        Tentar Novamente
                      </Button>
                    </div>
                  )}

                  <DataCard>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Icon src="/assets/icons/chips-icon.png" alt="Ícone de Chips" />
                      <span><strong>Quantidade de Chips:</strong> {data.qntChipsPerPlayer || 'Não disponível'}</span>
                    </div>
                  </DataCard>

                  <DataCard>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Icon src="/assets/icons/status-icon.png" alt="Ícone de Status" />
                      <span><strong>Status:</strong> {statusMessage}</span>
                    </div>
                  </DataCard>

                  {statusMessage === 'Aguardando adversário...' && (
                    <DataCard>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon src="/assets/icons/queue-icon.png" alt="Fila" />
                        <Typography variant="body1" style={{ color: '#fff' }}>
                          Aguarde enquanto procuramos um adversário...
                        </Typography>
                      </div>
                    </DataCard>
                  )}

                  <DataCard>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Icon src="/assets/icons/trophy-icon.png" alt="Ícone de Vencedor" />
                      <span><strong>Vencedor:</strong> {data.winner || 'Não disponível'}</span>
                    </div>
                  </DataCard>

                  <DataCard>
                    <div>
                      <strong>Progresso do Torneio:</strong>
                      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '10px' }}>
                        <div
                          style={{
                            height: '10px',
                            width: `${progress}%`,
                            backgroundColor: '#1abc9c',
                            borderRadius: '10px',
                          }}
                        />
                      </div>
                    </div>
                  </DataCard>

                  <DataCard>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Icon src="/assets/icons/round-icon.png" alt="Ícone de Round" />
                      <span><strong>Round:</strong> {round !== null ? `Rodada ${round}` : 'Não disponível'}</span>
                    </div>
                  </DataCard>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleUpdateStatus}
                    disabled={isLoading}
                    style={{ marginTop: '15px' }}
                  >
                    {isLoading ? 'Carregando...' : 'Carregar Times'}
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleExitTournament}
                    style={{ marginTop: '10px' }}
                  >
                    Sair do Torneio
                  </Button>
                </>
              ) : (
                <div>Sem dados disponíveis</div>
              )}
            </DataContainer>
          ) : (
            <div>
              <Typography variant="h6" color="error">
                Você saiu do torneio.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsInTournament(true)}
                style={{ marginTop: '20px' }}
              >
                Voltar para o Torneio
              </Button>
            </div>
          )}
        </Components.Banner>
      </Backgroundgradient>
    </Components.Main>
  );
};

export default TournamentInfo;
