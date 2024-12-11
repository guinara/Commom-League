import React from 'react';
import styled from 'styled-components';

const MatchCard = styled.div`
  /* Estilo do seu MatchCard */
`;

const MatchCardComponent = ({ match, onClick }) => {
  return (
    <MatchCard onClick={onClick}>
      <div className="team-icons">
        <div className="team-name-left">{match.teamOne.name}</div>
        <img className="team-logo-left" src="../../../../public/icones/makima.png" alt={match.teamOne.name} />
        <h3>{match.round} - Vencedor: {match.winner}</h3>
        <img className="team-logo-right" src="../../../../public/icones/paiN2.png" alt={match.teamTwo.name} />
        <div className="team-name-right">{match.teamTwo.name}</div>
      </div>
    </MatchCard>
  );
};

export default MatchCard;
