
import { styled } from "styled-components"
import EstilosGlobais from "../../componentes/GlobaStyle";
import Cadastro from "../componentes/Cadastro";

const Backgroundgradient = styled.div`
background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
width: 100%;
min-height: 100vh;
`

const App = () => {
  return (
    <Backgroundgradient>
      <EstilosGlobais />
      <Cadastro />
    </Backgroundgradient>
  )
}

export default App
