import { styled } from 'styled-components';

interface BotaoIconeProps {
  // Adicione props adicionais se necessário
}

const BotaoIcone = styled.button<BotaoIconeProps>`
  margin-left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default BotaoIcone;
