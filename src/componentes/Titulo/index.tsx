import styled from "styled-components";

interface TituloProps {
    $alinhamento?: 'left' | 'center' | 'right'; // Especifique os valores possíveis para alinhamento
}

const Titulo = styled.h2<TituloProps>`
    color: #00fde8;
    font-size: 32px;
    text-align: ${props => props.$alinhamento || 'left'};
`;

export default Titulo;
