import React, { useState, useEffect } from 'react';
import MatchService from '../../../src/service/matchService'; // Ajuste o caminho do import
import * as Components from '../Soloq/Components';
import ParticipantService from '../../service/participantService';
import * as ComponentsHistoric from '../../pages/profile/UserProfile/component';
import DamageBar from '../../pages/profile/UserProfile/DamageBar';
import TankBar from '../../pages/profile/UserProfile/tankBar';
import styled from 'styled-components';

interface Participant {
  championName: string;
  riotIdGameName: string;
  riotIdTagline: string;
  individualPosition: string;
  doubleKills: number;
  tripleKills: number;
  quadraKills: number;
  deaths: number;
  gameEndedInSurrender: boolean;
  win: boolean;
  spellOne: string;
  spellTwo: string;
}

interface MatchInfo {
  gameId: string;
  gameDuration: number;
  endOfGameResult?: string;
}

interface MatchMetadata {
  id: string;
  gameId: string;  // Alterado para gameId
  dataVersion: string;
}

interface MatchItem {
  gameId: string;  // Alterado para gameId
  gameMode: string;
  info: MatchInfo;
  metadado: MatchMetadata;
  participants: Participant[];
}

const Nav = styled.nav`
  display: flex;
  justify-content: initial; 
  background-color: rgba(39, 41, 165, 0.2);
  padding: 10px;
  width: 100%;
  border-radius: 8px;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start; 
`;

const InfoSpan = styled.span`
  color: #000000;
  margin: 5px 14px; 
  font-weight: 500; 
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: rgba(39, 41, 165, 1); 
    text-decoration: underline;
  }
`;

const MatchCard = styled.div`
  margin: 15px;
  border: 2px solid rgba(39, 41, 165, 0.4);  
  border-radius: 12px;  
  background-color: rgba(0, 0, 0, 0.2); 
  color: white;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  max-height: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? '600px' : '100px')};
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);  

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3); 
  }
`;

const ToggleButton = styled.button`
  background-color: rgba(39, 41, 165, 0.8);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  transition: background-color 0.3s;
  font-weight: bold;
  
  &:hover {
    background-color: rgba(39, 41, 165, 1);
  }
`;

const MatchList: React.FC = () => {
  const [data, setData] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openCard, setOpenCard] = useState<string | null>(null); 
  const matchService = new MatchService();

  // Carregar dados das partidas
  useEffect(() => {
    const fetchMatchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await matchService.getAccounts(); 
        setData(response.data.content); 
        console.log('Dados de partidas recebidos:', response.data.content);
      } catch (err) {
        setError('Erro ao buscar as partidas');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, []); 

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (data.length === 0) return <div>Nenhum dado disponível</div>;


  const getTeams = (participants: Participant[]) => {
    const winners = participants.filter(p => p.win);
    const losers = participants.filter(p => !p.win);
   return { winners, losers };
  };

  // Função para alternar visibilidade do card
  const toggleCardVisibility = (gameId: string) => {
    setOpenCard(openCard === gameId ? null : gameId);
  };

  return (
    <div>
      <h1>RANQUEADA SOLO/DUO</h1>
      {data.map((item, index) => {
        const { gameId, gameMode, info, participants } = item;
        const { gameDuration, endOfGameResult } = info ?? {};

        const { winners, losers } = getTeams(participants);

        return (
          <div key={index}>
            <MatchCard isOpen={openCard === gameId} onClick={() => toggleCardVisibility(gameId)}>
              <p><strong>Match ID:</strong> {gameId}</p>
              <p><strong>Game Mode:</strong> {gameMode}</p>
              <p><strong>Game ID:</strong> {gameId ?? 'Não disponível'}</p>
              <p><strong>Duração do Jogo (segundos):</strong> {gameDuration ?? 'Não disponível'}</p>
              <p><strong>Resultado do Jogo:</strong> {endOfGameResult ?? 'Não disponível'}</p>
            </MatchCard>

            {openCard === gameId && (
              <>
                <Nav>
                  <InfoContainer>
                    <InfoSpan>Vitória</InfoSpan>
                    <InfoSpan>KDA</InfoSpan>
                    <InfoSpan>Dano Sofrido</InfoSpan>
                    <InfoSpan>Dano Causado</InfoSpan>
                  </InfoContainer>
                </Nav>

                <div>
                  <h2 style={{ color: 'green' }}>Time Vencedor</h2>
                  {winners.length > 0 ? (
                    winners.map((participant, index) => (
                      <ComponentsHistoric.player key={index}>
                        <ComponentsHistoric.spellsDiv>
                          <ComponentsHistoric.imgSpellOneTeamOne src={`https://ddragon.leagueoflegends.com/cdn/12.20.1/img/spell/${participant.spellOne}.png`} alt="Spell 1" />
                          <ComponentsHistoric.imgSpellTwoTeamTwo src={`https://ddragon.leagueoflegends.com/cdn/12.20.1/img/spell/${participant.spellTwo}.png`} alt="Spell 2" />
                        </ComponentsHistoric.spellsDiv>
                        <ComponentsHistoric.imgplayer src={`https://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participant.championName}.png`} alt={participant.riotIdGameName} />
                        <ComponentsHistoric.imgTextOne>{participant.riotIdGameName}</ComponentsHistoric.imgTextOne>
                        <ComponentsHistoric.kdaText1>{participant.doubleKills}/{participant.deaths} /{participant.deaths}</ComponentsHistoric.kdaText1>
                        <DamageBar value={20000} maxValue={53000} />
                        <TankBar value={40000} maxValue={53000} />
                      </ComponentsHistoric.player>
                    ))
                  ) : (
                    <p>Não há participantes vencedores.</p>
                  )}
                </div>

                <div>
                  <h2 style={{ color: 'red' }}>Time Perdedor</h2>
                  {losers.length > 0 ? (
                    losers.map((participant, index) => (
                      <ComponentsHistoric.player key={index}>
                        <ComponentsHistoric.spellsDiv>
                          <ComponentsHistoric.imgSpellOneTeamOne src={`https://ddragon.leagueoflegends.com/cdn/12.20.1/img/spell/${participant.spellOne}.png`} alt="Spell 1" />
                          <ComponentsHistoric.imgSpellTwoTeamTwo src={`https://ddragon.leagueoflegends.com/cdn/12.20.1/img/spell/${participant.spellTwo}.png`} alt="Spell 2" />
                        </ComponentsHistoric.spellsDiv>
                        <ComponentsHistoric.imgplayer src={`https://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participant.championName}.png`} alt={participant.riotIdGameName} />
                        <ComponentsHistoric.imgTextOne>{participant.riotIdGameName}</ComponentsHistoric.imgTextOne>
                        <ComponentsHistoric.kdaText1>{participant.doubleKills}/{participant.deaths} /{participant.deaths}</ComponentsHistoric.kdaText1>
                        <DamageBar value={20000} maxValue={53000} />
                        <TankBar value={40000} maxValue={53000} />
                      </ComponentsHistoric.player>
                    ))
                  ) : (
                    <p>Não há participantes perdedores.</p>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MatchList;
