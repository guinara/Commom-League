import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Components from '../../pages/profile/UserProfile/component';
import DamageBar from '../../pages/profile/UserProfile/DamageBar';
import TankBar from '../../pages/profile/UserProfile/tankBar';
import MatchService from '../../../src/service/matchService';
import SoloHistoric from '../../componentes/Soloq'

interface Player {
  name: string;
  img: string;
  kda: string;
}

interface Team {
  name: string;
  players: Player[];
}

interface Match {
  id: number;
  round: string; 
  championship: string;
  winner: string;
  teamOne: Team;
  teamTwo: Team;
}

interface Soloq{
  id: string;
  round: string; 
  winner: string;
  teamOne: Team;
  teamTwo: Team;
}

const Nav = styled.nav`
  display: flex;
  justify-content: initial; // Alinha o conteúdo no centro
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
    color: rgba(39, 41, 165, 1); // Altera a cor ao passar o mouse
    text-decoration: underline; // Adiciona um sublinhado
  }
  
`;



const MatchCard = styled.div`
  top:20px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 80px;
  left: 10px;
  width: 100%;
  color: white;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  background-color: rgba(17, 138, 23, 0.2);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  position: relative;

  &:hover {
    transform: scale(1.02);
  }

  .team-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);

    .team-name-left,
    .team-name-right {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: white;
      font-size: 16px;
      z-index: 1;
    }

    .team-name-left {
      left: 70px; 
    }

    .team-name-right {
      right: 70px; 
    }

    .team-logo-left,
    .team-logo-right {
      width: 60px; 
      height: 100%; 
      border-radius: 100%; 
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
      z-index: 0; 
    }
  }
`;


const ChampionshipCard = styled.div`
  position: relative;
  margin: 10px;
  cursor: pointer;
  top: 20px;
  left: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 100px;
  width: 100%;
  color: white;
  text-align: center;
  justify-content: center;
  background-color: rgba(17, 138, 23, 0.2);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  h3 {
    font-size: 18px;
    color: #ffffff;
  }

  p {
    color: #ffffff;
  }
`;

const Historic: React.FC = () => {
  const [expandedChampionships, setExpandedChampionships] = useState<{ [key: string]: boolean }>({});
  const [expandedMatches, setExpandedMatches] = useState<number | null>(null);
  const [showChampionships, setShowChampionships] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState('solo-duo');
  const [soloqMatches, setSoloqMatches] = useState<Soloq[]>([]); // Estado para armazenar os dados
  const [loading, setLoading] = useState<boolean>(false); // Estado de loading
  const [error, setError] = useState<string | null>(null); // Estado de erro
  const matches: Match[] = [
    {
      id: 1,
      round: 'Quartas de Final',
      championship: 'Campeonato A',
      winner: 'Loud',
      teamOne: {
        name: 'Loud',
        players: [
          { name: 'BepoIV', img: 'https://www.listchallenges.com/f/items/1ba9a2d0-44ce-498c-bb0b-8fd4de802485.jpg', kda: '9/2/17' },
          { name: 'Shrimp', img: 'https://www.listchallenges.com/f/items/cefc5df7-9d38-4149-8caa-4af3c1092bf8.jpg', kda: '5/3/10' },
          { name: 'Faker', img: 'https://www.listchallenges.com/f/items/fea7e241-cebe-4451-be0d-7f28a1ac0e38.jpg', kda: '3/4/5' },
          { name: 'BRTT', img: 'https://www.listchallenges.com/f/items/9b760009-f606-4bbd-a62f-f3d76ee9c164.jpg', kda: '4/4/8' },
          { name: 'Luci', img: 'https://www.listchallenges.com/f/items/af96cd29-8be7-42bb-8aa6-6f855e4d1e50.jpg', kda: '1/6/3' },
        ],
      },
      teamTwo: {
        name: 'PaiN Gaming',
        players: [
          { name: 'Uzi', img: 'https://www.listchallenges.com/f/items/5a2f8000-6bc3-4bd9-aeaa-7554dfcf896e.jpg', kda: '2/7/5' },
          { name: 'BRTT', img: 'https://www.listchallenges.com/f/items/9b760009-f606-4bbd-a62f-f3d76ee9c164.jpg', kda: '4/4/8' },
          { name: 'Luci', img: 'https://www.listchallenges.com/f/items/af96cd29-8be7-42bb-8aa6-6f855e4d1e50.jpg', kda: '1/6/3' },
          { name: 'Player X', img: 'https://www.example.com/player-x.jpg', kda: '3/2/10' },
          { name: 'Player Y', img: 'https://www.example.com/player-y.jpg', kda: '2/3/5' },
        ],
      },
    },
    {
      id: 2,
      round: 'Semifinal',
      championship: 'Campeonato A',
      winner: 'Loud',
      teamOne: {
        name: 'Loud',
        players: [
          { name: 'BepoIV', img: 'https://www.listchallenges.com/f/items/1ba9a2d0-44ce-498c-bb0b-8fd4de802485.jpg', kda: '10/1/12' },
          { name: 'Shrimp', img: 'https://www.listchallenges.com/f/items/cefc5df7-9d38-4149-8caa-4af3c1092bf8.jpg', kda: '8/3/9' },
          { name: 'Faker', img: 'https://www.listchallenges.com/f/items/fea7e241-cebe-4451-be0d-7f28a1ac0e38.jpg', kda: '5/4/5' },
          { name: 'BRTT', img: 'https://www.listchallenges.com/f/items/9b760009-f606-4bbd-a62f-f3d76ee9c164.jpg', kda: '4/5/6' },
          { name: 'Luci', img: 'https://www.listchallenges.com/f/items/af96cd29-8be7-42bb-8aa6-6f855e4d1e50.jpg', kda: '2/4/2' },
        ],
      },
      teamTwo: {
        name: 'INTZ',
        players: [
          { name: 'Revolta', img: 'https://www.example.com/revolta.jpg', kda: '3/5/4' },
          { name: 'Mika', img: 'https://www.example.com/mika.jpg', kda: '1/6/3' },
          { name: 'Shini', img: 'https://www.example.com/shini.jpg', kda: '4/4/8' },
          { name: 'Player A', img: 'https://www.example.com/player-a.jpg', kda: '5/3/7' },
          { name: 'Player B', img: 'https://www.example.com/player-b.jpg', kda: '2/4/5' },
        ],
      },
    },
    {
      id: 3,
      round: 'Final',
      championship: 'Campeonato A',
      winner: 'Loud',
      teamOne: {
        name: 'Loud',
        players: [
          { name: 'BepoIV', img: 'https://www.listchallenges.com/f/items/1ba9a2d0-44ce-498c-bb0b-8fd4de802485.jpg', kda: '15/1/20' },
          { name: 'Shrimp', img: 'https://www.listchallenges.com/f/items/cefc5df7-9d38-4149-8caa-4af3c1092bf8.jpg', kda: '7/1/14' },
          { name: 'Faker', img: 'https://www.listchallenges.com/f/items/fea7e241-cebe-4451-be0d-7f28a1ac0e38.jpg', kda: '5/5/7' },
          { name: 'BRTT', img: 'https://www.listchallenges.com/f/items/9b760009-f606-4bbd-a62f-f3d76ee9c164.jpg', kda: '3/4/5' },
          { name: 'Luci', img: 'https://www.listchallenges.com/f/items/af96cd29-8be7-42bb-8aa6-6f855e4d1e50.jpg', kda: '2/2/3' },
        ],
      },
      teamTwo: {
        name: 'paiN Gaming',
        players: [
          { name: 'Uzi', img: 'https://www.listchallenges.com/f/items/5a2f8000-6bc3-4bd9-aeaa-7554dfcf896e.jpg', kda: '5/8/4' },
          { name: 'BRTT', img: 'https://www.listchallenges.com/f/items/9b760009-f606-4bbd-a62f-f3d76ee9c164.jpg', kda: '4/5/5' },
          { name: 'Luci', img: 'https://www.listchallenges.com/f/items/af96cd29-8be7-42bb-8aa6-6f855e4d1e50.jpg', kda: '1/6/3' },
          { name: 'Player X', img: 'https://www.example.com/player-x.jpg', kda: '2/3/5' },
          { name: 'Player Y', img: 'https://www.example.com/player-y.jpg', kda: '3/4/4' },
        ],
      },
    },
  ];
  const soloque: Soloq[] = [
    {
      id: "2333",
      round: '1',
      winner: 'Team A',
      teamOne: {
        name: 'Team A',
        players: [
          { name: 'Jogador 1', img: 'https://link-para-a-imagem-jogador1.com/jogador1.png', kda: '5/2/10' },
          { name: 'Jogador 2', img: 'https://link-para-a-imagem-jogador2.com/jogador2.png', kda: '3/1/8' },
          { name: 'Jogador 3', img: 'https://link-para-a-imagem-jogador3.com/jogador3.png', kda: '4/3/6' },
        ],
      },
      teamTwo: {
        name: 'Team B',
        players: [
          { name: 'Jogador 4', img: 'https://link-para-a-imagem-jogador4.com/jogador4.png', kda: '2/5/4' },
          { name: 'Jogador 5', img: 'https://link-para-a-imagem-jogador5.com/jogador5.png', kda: '1/3/5' },
          { name: 'Jogador 6', img: 'https://link-para-a-imagem-jogador6.com/jogador6.png', kda: '0/4/2' },
        ],
      },
    },
    {
      id: "133333",
      round: '1',
      winner: 'Team B',
      teamOne: {
        name: 'Team C',
        players: [
          { name: 'Jogador 7', img: 'https://link-para-a-imagem-jogador7.com/jogador7.png', kda: '6/1/5' },
          { name: 'Jogador 8', img: 'https://link-para-a-imagem-jogador8.com/jogador8.png', kda: '4/2/7' },
          { name: 'Jogador 9', img: 'https://link-para-a-imagem-jogador9.com/jogador9.png', kda: '2/3/3' },
        ],
      },
      teamTwo: {
        name: 'Team D',

        players: [
          { name: 'Jogador 10', img: 'https://link-para-a-imagem-jogador10.com/jogador10.png', kda: '3/1/6' },
          { name: 'Jogador 11', img: 'https://link-para-a-imagem-jogador11.com/jogador11.png', kda: '1/4/4' },
          { name: 'Jogador 12', img: 'https://link-para-a-imagem-jogador12.com/jogador12.png', kda: '5/2/3' },
        ],
      },
    },
  ];
  const [data, setData] = useState<any>(null); 


  const accountId = 'seu_account_id_aqui'; 
  const matchService = new MatchService();
  
// Função que busca os dados da API
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null); // Reseta o erro

    try {
      // Fazendo a requisição
      const response = await matchService.getAccounts(); // Chama a função para buscar as contas
      setData(response.data); // Armazena a resposta no estado
      console.log('Dados recebidos:', response.data); // Exibe a resposta imediatamente
    } catch (err) {
      setError('Erro ao buscar os dados');
    } finally {
      setLoading(false);
    }
  };

  fetchData(); // Chama a função assim que o componente for montado
}, []); // A requisição será feita uma única vez, quando o componente for carregado

  const toggleChampionshipDetails = (championship: string) => {
    setExpandedChampionships((prev) => ({
      ...prev,
      [championship]: !prev[championship],
    }));
  };

  const toggleMatchDetails = (id: number) => {
    setExpandedMatches(expandedMatches === id ? null : id);
  };

  
  const championships = Array.from(new Set(matches.map((match) => match.championship)));
  const soloq = Array.from(new Set(matches.map((match) => match.championship)));
  return (
    <Components.historic>
      
      <Components.NavContainer>
        <Components.NavItem onClick={() => setSelectedOption('championship')}>Campeonatos</Components.NavItem>
        <Components.NavItem onClick={() => setSelectedOption('soloDuo')}>Solo/Duo</Components.NavItem>
        <Components.NavItem onClick={() => setSelectedOption('titles')}>Títulos</Components.NavItem>
        <Components.NavItem onClick={() => setSelectedOption('estatisticas')}>Estatísticas</Components.NavItem>
        <Components.NavItem onClick={() => setSelectedOption('posts')}>Posts</Components.NavItem>
      </Components.NavContainer>

      {selectedOption === 'championship' && championships.map((championship) => (
        <div key={championship}>
          <ChampionshipCard onClick={() => toggleChampionshipDetails(championship)}>
            <h3>{championship}</h3>
            <p>{matches.filter((match) => match.championship === championship).length} Partidas</p>
          </ChampionshipCard>
          {expandedChampionships[championship] &&
            matches
              .filter((match) => match.championship === championship)
              .map((match) => (
                <div key={match.id}>

                  <MatchCard onClick={() => toggleMatchDetails(match.id)}>
  <div className="team-icons">
    <div className="team-name-left">{match.teamOne.name}</div>
    <img className="team-logo-left" src="../../../../public/icones/makima.png" alt={match.teamOne.name} />
    <h3>{match.round} - Vencedor: {match.winner}</h3>
    <img className="team-logo-right" src="../../../../public/icones/paiN2.png" alt={match.teamTwo.name} />
    <div className="team-name-right">{match.teamTwo.name}</div>
  </div>
</MatchCard>

                  {expandedMatches === match.id && (
                    <Components.historicBanner>
                      <Components.teamOne>
                      <Nav>
                
                      <InfoContainer>
      <InfoSpan>Vitória</InfoSpan>
      <InfoSpan>KDA</InfoSpan>
      <InfoSpan>Dano Sofrido</InfoSpan>

      <InfoSpan>Dano Causado</InfoSpan>
      <InfoSpan>TIER: Veteran</InfoSpan>
      <InfoSpan>PaiN Gamimg</InfoSpan>
    </InfoContainer>
            </Nav>            
                        {match.teamOne.players.map((player, index) => (
                          <Components.player key={index}>
                            <Components.spellsDiv>
                              <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
                              <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
                            </Components.spellsDiv>
                            <Components.imgplayer src={player.img} alt={player.name} />
                            <Components.cardName>
                            <Components.imgTextOne>{player.name}</Components.imgTextOne>
                            <Components.imgEloOne>Silver IV</Components.imgEloOne>
                            </Components.cardName>
                        
                            <Components.kdaText1>{player.kda}</Components.kdaText1>
                            <DamageBar value={20000} maxValue={53000} />
                            <TankBar value={40000} maxValue={53000} />
                            <Components.imgplayerTwo2 src={player.img} alt={player.name} />
                          </Components.player>
                        ))}
                      </Components.teamOne>

                      <Components.teamOne>
                    
                      <Nav>
                
                <InfoContainer>
<InfoSpan>Vitória</InfoSpan>
<InfoSpan>KDA</InfoSpan>
<InfoSpan>Dano Sofrido</InfoSpan>

<InfoSpan>Dano Causado</InfoSpan>
<InfoSpan>TIER: Veteran</InfoSpan>
<InfoSpan>PaiN Gamimg</InfoSpan>
</InfoContainer>
      </Nav>     
                        {match.teamTwo.players.map((player, index) => (
                          <Components.player key={index}>
                            <Components.spellsDiv>
                              <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
                              <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
                            </Components.spellsDiv>
                            <Components.imgplayer src={player.img} alt={player.name} />
                            <Components.imgTextOne>{player.name}</Components.imgTextOne>
                            <Components.imgEloOne>Silver IV</Components.imgEloOne>
                            <Components.kdaText1>{player.kda}</Components.kdaText1>
                            <DamageBar value={20000} maxValue={53000} />
                            <TankBar value={40000} maxValue={53000} />
                            <Components.imgplayerTwo2 src={player.img} alt={player.name} />
                          </Components.player>
                        ))}
                      </Components.teamOne>
                    </Components.historicBanner>
                    
                  )}
                </div>
              ))}
        </div>
      ))}


{selectedOption === 'soloDuo' && soloq.map((match) => (
 <SoloHistoric/>
))}



{selectedOption === 'titles' && soloq.map((sSoloQue) => (
  
  <h1>tile</h1>
))}

{selectedOption === 'estatisticas' && soloq.map((sSoloQue) => (
  
  <h1>estatisticas</h1>
))}

{selectedOption === 'posts' && soloq.map((sSoloQue) => (
  
  <h1>post</h1>
))}

    </Components.historic>
  );
};

export default Historic;
