import React from 'react'; // Adicione esta linha para resolver o erro
import { styled } from "styled-components";

interface BannerProps {
  texto: string;
  backgroundImage: string;
}

const FigureEstilizada = styled.figure<{ $backgroundImage: string }>`
  background-image: ${props => `url(${props.$backgroundImage})`};
  flex-grow: 1;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  min-height: 328px;
  margin: 0;
  border-radius: 20px;
  max-width: 100%;
  background-size: cover;
`;

const TituloEstilizado = styled.h1`
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
  color: #FFFFFF;
  max-width: 300px;
  padding: 0 64px;
`;

const Banner: React.FC<BannerProps> = ({ texto, backgroundImage }) => {
  return (
    <FigureEstilizada $backgroundImage={backgroundImage}>
      <TituloEstilizado>{texto}</TituloEstilizado>
    </FigureEstilizada>
  );
};

export default Banner;
