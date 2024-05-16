import styled from "styled-components";
import Titulo from "../Titulo";
import Populares from "./Populares";
import Tags from "./Tags";

const GaleryContainer = styled.div`
    display:flex;
`
const SecaoFluida = styled.section`
    flex-grow: 1; 
`

const GaleriaPlayers = () => {
    return (
        <>
            <Tags />
            <GaleryContainer>
                <SecaoFluida>
                    <Titulo>Campeonatos em Andamento</Titulo>
                </SecaoFluida>
                <Populares />

            </GaleryContainer>
        </>
    )
}

export default GaleriaPlayers;