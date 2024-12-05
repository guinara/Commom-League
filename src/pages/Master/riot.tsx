import React from 'react';
import { styled } from 'styled-components';
import EstilosGlobais from '../../componentes/GlobaStyle';
import Register from '../../componentes/RegisterRiotAccount'; // Consider renaming this import if it has an unusual name
import AccountList from '../../componentes/accountRiotList';

const BackgroundGradient = styled.div`
  background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
  width: 100%;
  min-height: 100vh;
`;

const App: React.FC = () => {
  return (
    <BackgroundGradient>

    </BackgroundGradient>
  );
};

export default App;
