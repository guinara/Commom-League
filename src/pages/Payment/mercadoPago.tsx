import React from 'react'; // Add this import to fix the 'React' refers to a UMD global issue
import { styled } from "styled-components";
import EstilosGlobais from "../../componentes/GlobaStyle";
import Register from "../../componentes/mercadoPago";

const Backgroundgradient = styled.div`
  background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
  width: 100%;
  min-height: 100vh;
`;

const App: React.FC = () => {
  return (
    <Backgroundgradient>
      <EstilosGlobais />
      <Register />
    </Backgroundgradient>
  );
};

export default App;
