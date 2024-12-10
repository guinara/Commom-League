import React from 'react';
import { styled } from 'styled-components';

const Backgroundgradient = styled.div`
  background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
  width: 100%;
  min-height: 100vh;
  color: white;
`;

const Header = styled.header`
  margin: 20px 0;
  text-align: center;
`;

const Bracket = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 20px;
`;

const Region = styled.div`
  width: 24%;
  margin-right: 2%;
  margin-bottom: 30px;
  background-color: #222;
  padding: 10px;
  border-radius: 8px;
`;

const Matchup = styled.ul`
  list-style: none;
  padding: 10px 0;
  margin: 0;
`;

const RoundTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Team = styled.li<{ isWinner?: boolean; isCurrent?: boolean }>`
  font-size: 16px;
  padding: 5px 10px;
  font-weight: ${(props) => (props.isWinner ? 'bold' : 'normal')};
  color: ${(props) => {
    if (props.isWinner) return 'green';
    if (props.isCurrent) return 'yellow';
    return 'white';
  }};
  background-color: ${(props) => (props.isCurrent ? '#444' : 'transparent')};
  border-radius: 5px;
  margin-bottom: 5px;
`;

const VS = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin: 0 10px;
  color: #fff;
`;

const FinalFour = styled.div`
  width: 50%;
  margin: 20px auto;
  background-color: #222;
  padding: 20px;
  border-radius: 8px;
`;

const Logo = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 20px auto;
  text-align: center;
  img {
    width: 100%;
    border-radius: 8px;
  }
`;

const Torneio: React.FC = () => {
  return (
    <Backgroundgradient>
      <Header>
        <h1>Torneio de Futebol</h1>
        <ol>
          <li>Primeira Fase</li>
          <li>Quartas de Final</li>
          <li>Semifinais</li>
          <li>Final</li>
        </ol>
      </Header>

      <Bracket>
        <Region>
          <RoundTitle>Primeira Fase</RoundTitle>
          <Matchup>
            <Team isWinner={true}>Time A</Team>
            <VS>VS</VS>
            <Team>Time B</Team>
          </Matchup>
          <Matchup>
            <Team>Time C</Team>
            <VS>VS</VS>
            <Team isWinner={true}>Time D</Team>
          </Matchup>
        </Region>

        <Region>
          <RoundTitle>Primeira Fase</RoundTitle>
          <Matchup>
            <Team isWinner={true}>Time E</Team>
            <VS>VS</VS>
            <Team>Time F</Team>
          </Matchup>
          <Matchup>
            <Team>Time G</Team>
            <VS>VS</VS>
            <Team isWinner={true}>Time H</Team>
          </Matchup>
        </Region>

        <Region>
          <RoundTitle>Primeira Fase</RoundTitle>
          <Matchup>
            <Team>Time I</Team>
            <VS>VS</VS>
            <Team isWinner={true}>Time J</Team>
          </Matchup>
          <Matchup>
            <Team isWinner={true}>Time K</Team>
            <VS>VS</VS>
            <Team>Time L</Team>
          </Matchup>
        </Region>

        <Region>
          <RoundTitle>Primeira Fase</RoundTitle>
          <Matchup>
            <Team isWinner={true}>Time M</Team>
            <VS>VS</VS>
            <Team>Time N</Team>
          </Matchup>
          <Matchup>
            <Team>Time O</Team>
            <VS>VS</VS>
            <Team isWinner={true}>Time P</Team>
          </Matchup>
        </Region>
      </Bracket>

      <FinalFour>
        <h2>Final Four</h2>
        <Matchup>
          <Team isWinner={true}>Vencedor Região 1</Team>
          <VS>VS</VS>
          <Team>Vencedor Região 2</Team>
        </Matchup>
        <Matchup>
          <Team>Vencedor Região 3</Team>
          <VS>VS</VS>
          <Team isWinner={true}>Vencedor Região 4</Team>
        </Matchup>
      </FinalFour>

      <Logo>
        <img src="https://via.placeholder.com/300" alt="Logo do Torneio" />
      </Logo>
    </Backgroundgradient>
  );
};

export default Torneio;
