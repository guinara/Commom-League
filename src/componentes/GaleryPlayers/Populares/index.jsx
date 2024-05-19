import { styled } from "styled-components"
import Titulo from "../../Titulo"

import fotos from './fotos-populares.json'

const ColunaFotos = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-left: 30px;
`

const Imagem = styled.img`
    max-width: 212px;
    border-radius: 20px;
`

const Botao = styled.button`
    background-color: transparent;
    color: #fff;
    border: 2px solid;
    border-color: #0289b3;
    padding: 12px 20px;
    font-size: 20px;
    border-radius: 10px;
    cursor: pointer;
    width: 90%;
    margin-top: 16px;
    margin-left : 30px;
`;

const Populares = () => {
    return (
        <section>
            <Titulo $alinhamento='center'>Destaques</Titulo>
            <ColunaFotos>
                {fotos.map(foto => <Imagem key={foto.id} src={foto.path} alt={foto.alt}/>)}
            </ColunaFotos>
            <Botao>Ver mais</Botao>
        </section>
    )
}

export default Populares