import { styled } from "styled-components";
import EstilosGlobais from "../componentes/GlobaStyle";
import Cabecalho from "../componentes/Header";
import BarSide from "../componentes/BarSide";
import Banner from "../componentes/Banner";
import bannerBackground from '../assets/banner.png';
import GaleriaPlayers from "../componentes/GaleryPlayers";
import fotos from '../fotos.json';
import { useState } from "react";
import ModalZoom from "../componentes/ModalZoom";
import { Navigate } from "react-router-dom";

const Backgroundgradient = styled.div`
  background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
  width: 100%;
  min-height: 100vh;
`;

const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  max-width: 100%;
`;

const MainContainer = styled.main`
  display: flex;
  gap: 24px;
`;

const ConteudoGaleria = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const App = () => {
  const [fotosDaGaleria, setFotosDaGaleria] = useState(fotos);
  const [fotosSelecionada, setFotosSelecionadas] = useState(null);

  const token = sessionStorage.getItem('token');

 // if (!token) {
 //   return <Navigate to="/login" />;
 // }

  return (
    <Backgroundgradient>
      <EstilosGlobais />
      <AppContainer>
        <Cabecalho />
        <MainContainer>
          <BarSide />
          <ConteudoGaleria>
            <Banner
              texto="Bem Vindo ao Common League!"
              backgroundImage={bannerBackground}
            />
            <GaleriaPlayers
              aoFotoSelecionada={foto => setFotosSelecionadas(foto)}
              fotos={fotosDaGaleria}
            />
          </ConteudoGaleria>
        </MainContainer>
      </AppContainer>
      <ModalZoom foto={fotosSelecionada}
        aoFechar={() => setFotosSelecionadas(null)}
      />
    </Backgroundgradient>
  );
};

export default App;
