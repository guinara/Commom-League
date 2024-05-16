
import { styled } from "styled-components"
import EstilosGlobais from "./componentes/GlobaStyle";
import Cabecalho from "./componentes/Header";
import BarSide from "./componentes/BarSide";
import Banner from "./componentes/Banner";
import bannerBackground from './assets/banner.png'
import GaleriaPlayers from "./componentes/GaleryPlayers";


const Backgroundgradient = styled.div`
background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
width: 100%;
min-height: 100vh;
`

const AppContainer = styled.div`
width: 1440px;
margin: 0 auto;
max-width: 100%;

`

const MainContainer = styled.main`
  display: flex;
  gap: 24px;


`

const ConteudoGaleria = styled.section`
display: flex;
flex-direction: column;
flex-grow: 1;

`
function App() {

  return (
    <Backgroundgradient>
      <EstilosGlobais />
      <AppContainer>
        <Cabecalho />
        <MainContainer>
          <BarSide />
           <ConteudoGaleria>
              <Banner
                texto="Bem vindo ao Commom league, Campeão!"
                backgroundImage={bannerBackground}
              />
              <GaleriaPlayers />
          </ConteudoGaleria>
        </MainContainer>
      </AppContainer>
    </Backgroundgradient>
  )
}

export default App
