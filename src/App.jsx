
import { styled } from "styled-components"
import EstilosGlobais from "./componentes/GlobaStyle";
import Cabecalho from "./componentes/Header";
import BarSide from "./componentes/BarSide";

const Backgroundgradient = styled.div`
background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
width: 100%;
min-height: 100vh;
`
function App() {

  return (
    <Backgroundgradient>
      <EstilosGlobais/>
      <Cabecalho/>
      <BarSide/>
    </Backgroundgradient>
  )
}

export default App
