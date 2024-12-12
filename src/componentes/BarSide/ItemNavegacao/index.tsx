import React from 'react';
import { styled } from 'styled-components';

interface ItemNavegacaoProps {
    children: React.ReactNode;
    iconeAtivo: string;
    iconeInativo: string;
    ativo?: boolean;
    onClick?: () => void;
}

const ItemListaEstilizada = styled.li<{ $ativo: boolean }>`
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 30px;
    cursor: pointer;
    color: ${props => props.$ativo ? '#88e2f8' : '#D9D9D9'};
    font-family: ${props => props.$ativo ? 'GandhiSansBold' : 'GandhiSansRegular'};
    display: flex;
    align-items: center;
    gap: 22px;
`;

const ItemNavegacao: React.FC<ItemNavegacaoProps> = ({ children, iconeAtivo, iconeInativo, ativo = false, onClick }) => {
    return (
        <ItemListaEstilizada $ativo={ativo} onClick={onClick}>
            <img src={ativo ? iconeAtivo : iconeInativo} alt="" />
            {children}
        </ItemListaEstilizada>
    );
};

export default ItemNavegacao;
