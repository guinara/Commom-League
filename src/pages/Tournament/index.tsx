import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Box, Button, Modal, Grid, Typography } from '@mui/material';
import ChampionshipService from '../../service/TornamentService';
import TeamService from '../../service/teamService';
import SideMenu from '../../componentes/mainSideBar/SideMenu';
import Header from '../../componentes/MainHeader';
import * as Components from './component';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { toast } from 'react-toastify'; // Importe o toast
import { ToastContainer } from 'react-toastify';
import EstilosGlobais from '../../componentes/GlobaStyle';
// Estilos
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
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.2); /* Sombra mais forte */
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #ecf0f1;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

interface WinnerType {
  id: string;
  name: string;
  imagePath: string;
}

interface ChampionshipItem {
  id: string;
  qntChipsPerPlayer: string;
  status: string;
  winner: WinnerType | WinnerType[];  // winner pode ser um objeto ou um array
  date: string;
  type: string;
  imagePath: string; // Imagem do torneio
}

const TournamentInfo: React.FC = () => {
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInTournament, setIsInTournament] = useState(false);
  const [chips, setChips] = useState<number>(100);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);  // Modal para exibir os detalhes
  const [selectedTournament, setSelectedTournament] = useState<ChampionshipItem | null>(null);  // Torneio selecionado
  const championshipService = new ChampionshipService();
  const teamService = new TeamService();
  const [data, setData] = useState<ChampionshipItem[]>([]);
  const [players, setPlayers] = useState<any[]>([]); // ou useState<Jogador[]>([]) se você tiver uma interface para o jogador

 
  useEffect(() => {
    const fetchMatchData = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        console.log('Iniciando requisição para buscar dados do campeonato...');
        const response = await championshipService.consult();
        console.log('Dados do Torneio:', response.data); // Log dos dados do campeonato
        setData(response.data); // Atualiza o estado com os dados dos campeonatos
  
        // Verifica se existe um "winner" na resposta e faz a requisição dos jogadores
        if (response.data && response.data.length > 0) {
          const winner = response.data[0]?.winner;  // Pega o winner do primeiro torneio (índice 0)
  
          // Verifica se winner é um array ou um objeto
          if (Array.isArray(winner) && winner.length > 0) {
            console.log('Vencedores encontrados:', winner[0]); // Log do primeiro vencedor, se for um array
            await fetchPlayers(winner[0].id);  // Buscar jogadores do time vencedor
          } else if (winner && typeof winner === 'object') {
            console.log('Vencedor encontrado:', winner); // Log do vencedor, se for um objeto
            await fetchPlayers(winner.id);  // Buscar jogadores do time vencedor
          } else {
            console.log('Não há vencedor(s) definido(s) para este torneio.');
          }
        }
      } catch (err) {
        setError('Erro ao buscar os dados do campeonato');
        console.error('Erro ao buscar dados do campeonato:', err); // Log do erro
      } finally {
        setIsLoading(false);
        console.log('Requisição finalizada');
      }
    };
  
    // Função para buscar jogadores do time vencedor
    const fetchPlayers = async (teamId: string) => {
      try {
        console.log(`Buscando jogadores para o time com ID: ${teamId}`);
        const playersData = await teamService.players(teamId);
        console.log('Jogadores do time:', playersData.data); // Log dos jogadores
        setPlayers(playersData.data);  // Atualiza o estado com os jogadores
      } catch (err) {
        console.error('Erro ao buscar jogadores do time:', err);
      }
    };
  
    fetchMatchData();  // Chama a função para buscar os dados
  }, []);  // O array vazio garante que a requisição ocorra apenas uma vez
  const handleJoinTournament = () => {
    setIsModalOpen(true); // Abre o modal para selecionar os chips e confirmar a participação
  };

  const handleReady = async () => {
    try {
      console.log('Registrando no torneio com', chips, 'chips');
      await championshipService.joinTournament(chips); // Chama o método para registrar no torneio
      setIsInTournament(true); // Após confirmar, o usuário entra no torneio
      setIsModalOpen(false); // Fecha o modal
      toast.success('Registro realizado com sucesso no torneio!'); // Exibe mensagem de sucesso
    } catch (error) {
      console.error('Erro ao se registrar no torneio', error);
      
      // Verifica se o erro é um 403 e exibe a mensagem apropriada
      if (error.response?.status === 403) {
        toast.error('Você não é o capitão do seu time e não pode se registrar.');
      } else {
        toast.error(`Erro ao se registrar no torneio: ${error.message || 'Desconhecido'}`);
      }
    }
  };

  const handleChipsChange = (value: number) => {
    console.log('Alterando a quantidade de chips para:', value);
    setChips(value); // Atualiza a quantidade de chips
  };

  const handleViewTournamentDetails = (tournament: ChampionshipItem) => {
    setSelectedTournament(tournament);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedTournament(null);  // Limpa o torneio selecionado ao fechar
  };
  

  return (
    <Components.Main>
       <EstilosGlobais />
      <Backgroundgradient>
        <SideMenu active={active} />
        <Components.Banner className={`banner ${active ? 'active' : ''}`}>
          <Header toggleActive={() => setActive(!active)} />
          <ToastContainer />
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
                      <TournamentCard key={tournament.id} bgImage={tournament.imagePath}>
                        <Image src={`../../../../public/imagens/galeria/foto-7.png`} alt="" />
                        <StatusOverlay status={tournament.type === 'FINISHED' ? 'FINISHED' : 'ONGOING'}>
                          {tournament.status === 'FINISHED' ? 'FINALIZADO' : 'EM ANDAMENTO'}
                        </StatusOverlay>
                        <InfoContainer>
                          <InfoColumn>
                            <Info><strong>{tournament.id}</strong></Info>
                            <Value>Chips por Player: {tournament.qntChipsPerPlayer}</Value>
                          </InfoColumn>
                          <BadgeFichaContainer>
                            <ConfirmationNumberIcon />
                            <Counter>{tournament.qntChipsPerPlayer} x</Counter>
                          </BadgeFichaContainer>
                        </InfoContainer>
                        {/* Botão para ver detalhes */}
                        <ButtonStyled onClick={() => handleViewTournamentDetails(tournament)}>
                          Ver Detalhes
                        </ButtonStyled>
                      </TournamentCard>
                    ))}
                  </Container>
                )}
              </>
            )}

        
              <ButtonStyled
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleJoinTournament}
              >
                Buscar um Torneio
              </ButtonStyled>
            
          </DataContainer>
        </Components.Banner>
      </Backgroundgradient>

      {/* Modal para seleção de chips e confirmação de participação */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgb(255, 255, 255)',
            padding: '20px',
            borderRadius: '8px',
            width: '400px',
          
          }}
        >
          <Typography variant="h6" style={{ color: '#000000' }}>
            Escolha a Quantidade de Chips
          </Typography>

          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            {[5, 10, 50, 100].map((value) => (
              <Grid item xs={6} key={value}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => handleChipsChange(value)}
                >
                  {value} Chips
                </Button>
              </Grid>
            ))}
          </Grid>

          <div style={{ marginTop: '10px' }}>
            <Typography variant="body1" style={{ color: '#070707' }}>
              Ou digite sua quantidade de Chips:
            </Typography>
            <input
              type="number"
              value={chips}
              onChange={(e) => setChips(Number(e.target.value))}
              style={{
                width: '93%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #080808',
                marginTop: '10px',
                color: '#333',
              }}
            />
          </div>

          <ButtonStyled
            variant="contained"
            fullWidth
            onClick={handleReady}
            style={{ marginTop: '20px' }}
          >
            Confirmar Participação
          </ButtonStyled>
        </Box>
      </Modal>

      
      <Modal open={isViewModalOpen} onClose={handleCloseViewModal}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '30%',
      height: '65%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '20px',
      borderRadius: '8px',
     
      color: 'black',
     
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    {selectedTournament && (
      <>
        {/* Imagem do Torneio */}
        <Box sx={{ position: 'relative', width: '100%', height: '300px' }}>
          <img
            src={`../../../../public/imagens/galeria/foto-7.png`}
            alt="Torneio"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          {/* Botão de Fechar */}
          <ButtonStyled
      onClick={handleCloseViewModal}
      sx={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '8px',
      
        borderRadius: '50%',
        zIndex: 10,
        '&:hover': {
          backgroundColor: '#ff0000',  // Cor do botão ao passar o mouse
        },
      }}
          >
            X
          </ButtonStyled>

          {/* Retângulo com Opacidade e Nome do Time Vencedor */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '10px',
              left: '0',
              width: '100%',
              
              color: '#fff',
              padding: '10px',
              
              borderRadius: '50px',
            }}
          >
            <Typography variant="h3" style={{ fontWeight: 'bold' }}>
              {`Winner: ${selectedTournament.winner?.name}`}
            </Typography>
          </Box>
        </Box>

        {/* Detalhes do Torneio */}
        <Typography variant="body1" style={{ color: '#000000' }}>
          <strong>Status:</strong> {selectedTournament.status}
        </Typography>
        <Typography variant="body1" style={{ color: '#000000' }}>
          <strong>Chips por jogador:</strong> {selectedTournament.qntChipsPerPlayer}
        </Typography>


        {/* Exibindo os jogadores vencedores */}
        <div style={{ marginTop: '15px' }}>
          <strong>Jogadores Vencedores:</strong>
          {Array.isArray(players) && players.length > 0 ? (
            players.map((player) => (
              <Typography
                key={player.user.id}
                variant="body1"
                style={{
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px',
                }}
              >
                <img
                  src={player.user.imagePath}
                  alt={player.user.nickname}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    marginRight: '10px',
                  }}
                />
                {player.user.nickname}
              </Typography>
            ))
          ) : (
            <Typography variant="body1" style={{ color: '#000000' }}>
              Nenhum jogador encontrado para este time.
            </Typography>
          )}
        </div>

        <ButtonStyled
          onClick={handleCloseViewModal}
          style={{ marginTop: '20px' }}
        >
          Fechar
        </ButtonStyled>
      </>
    )}
  </Box>
</Modal>
    </Components.Main>
  );
};

// Styled components

const Container = styled.div`
  display: flex;
  justify-content: initial;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 100%;
`;

const TournamentCard = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  width: 300px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
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





const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
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

export default TournamentInfo;
