import styled from 'styled-components';

export const SideBarContainer = styled.div`
    flex: 1;
    border: 0.5px solid rgba(230, 227, 227, 1); /* Corrigido: 'solid' e 'border' não devem ser usados juntos */
    min-height: 100vh;
    background-color: white;
`;

export const Top = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Hr = styled.hr`
    height: 0;
    border: 0.5px solid rgba(230, 227, 227, 1); /* Corrigido: 'solid' e 'border' não devem ser usados juntos */
`;

export const Center = styled.div`
    padding: 10px;
`;

export const Ul = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
`;

export const Title = styled.p`
    font-size: 10px;
    font-weight: bold;
    color: #999;
    margin-top: 15px;
    margin-bottom: 5px;
`;

export const Span = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: #888;
    margin-left: 10px;
`;

export const ColorOption = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid;
    cursor: pointer;
`;
