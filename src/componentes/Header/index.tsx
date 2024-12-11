import React from 'react';
import { styled } from 'styled-components';
import HeaderSearch from '../HeaderSearch';

const HeaderEstilizado = styled.header`
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    img {
        max-width: 120px;
    }
`;

const Cabecalho: React.FC = () => {
    return (
        <HeaderEstilizado>
            <img src="/imagens/Logo.png" alt="Logo" />
            <HeaderSearch />
        </HeaderEstilizado>
    );
};

export default Cabecalho;
