import React from 'react';
import styled from 'styled-components';

interface ChampionshipCardProps {
  championship: string;
  matchesCount: number;
  toggleChampionshipDetails: (championship: string) => void;
  expandedChampionships: { [key: string]: boolean };
}

const ChampionshipCardContainer = styled.div`
  margin: 10px;
  cursor: pointer;
  height: 100px;
  width: 100%;
  text-align: center;
  background-color: rgba(17, 138, 23, 0.2);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
`;

const ChampionshipCard: React.FC<ChampionshipCardProps> = ({ championship, matchesCount, toggleChampionshipDetails, expandedChampionships }) => {
  return (
    <ChampionshipCardContainer onClick={() => toggleChampionshipDetails(championship)}>
      <h3>{championship}</h3>
      <p>{matchesCount} Partidas</p>
      {/* Aqui podem ser renderizados detalhes do campeonato quando expandido */}
      {expandedChampionships[championship] && <div>Detalhes do Campeonato...</div>}
    </ChampionshipCardContainer>
  );
};

export default ChampionshipCard;
