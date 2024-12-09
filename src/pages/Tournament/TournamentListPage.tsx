import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Box, Button, Modal, Grid, Typography, CircularProgress } from '@mui/material';
import ChampionshipService from '../../service/TornamentService';
import SideMenu from '../../componentes/mainSideBar/SideMenu';
import Header from '../../componentes/MainHeader';
import * as Components from './component';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

// Estilos
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
  border: 2px solid #00b894;
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.2);
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #ecf0f1;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const TournamentCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(0, 255, 255, 0.4);
  position: relative;
  background-image: url(${(props: { bgImage: string }) => props.bgImage});
  background-size: cover;
  background-position: center;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60%;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 10px 10px 0 0;
  }

  .card-content {
    position: relative;
    z-index: 1;
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 0 0 10px 10px;
  }
`;

const ButtonStyled = styled(Button)`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: initial;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 100%;
`;

const InfoContainer = styled.div`
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Info = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #555;
`;

const Value = styled.p`
  display: flex;
  margin: 6px 0;
  font-size: 14px;
  color: #ffffff;
`;

const BadgeFichaContainer = styled.div`
  position: absolute;
  top: 65%;
  right: 10%;
  display: flex;
  color: white;
  align-items: center;
`;

const Counter = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #55baf5;
  margin-left: 5px;
`;

const StatusOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: opacity 0.3s;
  z-index: 1;
`;

// Interfaces
interface WinnerType {
  id: string;
  name: string;
  imagePath: string;
}

interface ChampionshipItem {
  id: string;
  qntChipsPerPlayer: string;
  status: string;
  winner: WinnerType[];
  date: string;
  type: string;
  imagePath: string;
}

const TournamentInfo: React.FC = () => {
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInTournament, setIsInTournament] = useState(false);
  const [isWaitingForMatch, setIsWaitingForMatch] = useState(false); // Estado para aguardando matchmaking
  const [chips, setChips] = useState<number>(100);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const championshipService = new ChampionshipService();
  const [data, setData] = useState<ChampionshipItem[]>([]);

  useEffect(() => {
    const fetchMatchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await championshipService.consult();
        setData(response.data); // Atualiza o estado com os dados dos campeonatos
        console.log(response.data);
      } catch (err) {
        setError('Erro ao buscar os dados do campeonato');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchData();
  }, []);

  const handleJoinTournament = () => {
    setIsModalOpen(true); // Abre o modal para selecionar os chips e confirmar a participação
  };

  const handleReady = async () => {
    try {
      await championshipService.joinTournament(chips); // Registra o usuário no torneio
      setIsInTournament(true); // Usuário entrou no torneio
      setIsModalOpen(false); // Fecha o modal
      setIsWaitingForMatch(true); // Marca como aguardando matchmaking
    } catch (error) {
      console.error('Erro ao se registrar no torneio', error);
    }
  };

  const handleChipsChange = (value: number) => {
    setChips(value); // Atualiza a quantidade de chips
  };

  return (
    <Components.Main>
      <Backgroundgradient>
        <SideMenu active={active} />
        <Components.Banner className={`banner ${active ? 'active' : ''}`}>
          <Header toggleActive={() => setActive(!active)} />
          <DataContainer>
            <Title>Histórico de Torneios</Title>

            {isLoading ? (
              <Typography variant="h6" style={{ color: '#fff' }}>
                Carregando torneios...
              </Typography>
            ) : error ? (
              <Typography variant="h6" style={{ color: '#fff' }}>
                {error}
              </Typography>
            ) : (
              <>
                {data.length === 0 ? (
                  <Typography variant="h6" style={{ color: '#fff' }}>
                    Você não participou de nenhum torneio ainda.
                  </Typography>
                ) : (
                  <Container>
                    {data.map((tournament) => (
                      <TournamentCard key={tournament.id} bgImage={`../../../../public/imagens/galeria/foto-5.png`}>
                        <StatusOverlay>
                          {tournament.status === 'TOURNAMENT_LOSE'
                            ? 'Participou do Torneio'
                            : 'Perdeu o Torneio'}
                        </StatusOverlay>
                        <InfoContainer>
                          <InfoColumn>
                            <Info>
                              <strong>{tournament.id}</strong>
                            </Info>
                            <Value>Chips por Player: {tournament.qntChipsPerPlayer}</Value>
                          </InfoColumn>
                          <BadgeFichaContainer>
                            <ConfirmationNumberIcon />
                            <Counter>{chips}</Counter>
                          </BadgeFichaContainer>
                        </InfoContainer>
                      </TournamentCard>
                    ))}
                  </Container>
                )}
              </>
            )}
          </DataContainer>
        </Components.Banner>
      </Backgroundgradient>
    </Components.Main>
  );
};

export default TournamentInfo;
