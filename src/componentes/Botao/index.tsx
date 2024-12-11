import React from 'react';
import styled from '@emotion/styled';

// Define a interface para as props personalizadas
interface BotaoProps {
  background?: string;
  color?: string;
  borderRadius?: string;
  padding?: string;
  hoverBackground?: string;
  focusOutline?: string;
  hoverBorderColor?: string;
  hoverColor?: string;
}

// Define o componente estilizado para o botão primário
const BotaoPrimarioEstilizado = styled.button<BotaoProps>`
  background: ${props => props.background || '#007bff'};
  color: ${props => props.color || '#ffffff'};
  border-radius: ${props => props.borderRadius || '4px'};
  padding: ${props => props.padding || '8px 16px'};
  box-sizing: border-box;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  border: none;
  &:hover {
    background: ${props => props.hoverBackground || '#0056b3'};
  }
  &:focus {
    outline-color: ${props => props.focusOutline || '#0056b3'};
  }
`;

// Define o componente estilizado para o botão secundário
const BotaoSecundarioEstilizado = styled.button<BotaoProps>`
  background: transparent;
  color: ${props => props.color || '#007bff'};
  border: 2px solid ${props => props.color || '#007bff'};
  border-radius: ${props => props.borderRadius || '4px'};
  padding: ${props => props.padding || '8px 16px'};
  box-sizing: border-box;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  &:hover {
    border-color: ${props => props.hoverBorderColor || '#0056b3'};
    color: ${props => props.hoverColor || '#0056b3'};
  }
  &:focus {
    outline-color: ${props => props.focusOutline || '#0056b3'};
  }
`;

// Define a interface para as props do Botão, incluindo children e variante
interface BotaoPropsExtended extends BotaoProps {
  variante?: 'primaria' | 'secundaria';
  children: React.ReactNode; // Adiciona a prop children
}

// Define o componente Botão
export const Botao: React.FC<BotaoPropsExtended> = ({ children, variante = 'primaria', ...props }) => {
  if (variante === 'primaria') {
    return (
      <BotaoPrimarioEstilizado {...props}>
        {children}
      </BotaoPrimarioEstilizado>
    );
  }
  return (
    <BotaoSecundarioEstilizado {...props}>
      {children}
    </BotaoSecundarioEstilizado>
  );
};
