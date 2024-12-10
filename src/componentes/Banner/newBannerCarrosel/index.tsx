import React from 'react';
import styled from "styled-components";
import 'swiper/css'; // Importando os estilos básicos do Swiper
import 'swiper/css/navigation'; // Estilo de navegação
import { Swiper, SwiperSlide } from 'swiper/react'; // Importando componentes do Swiper
import { Navigation, Autoplay } from 'swiper'; // Módulos do Swiper

// Importando o arquivo de CSS para o carrossel
import './gameSwiper.css'; 


// Estilos personalizados para o carrossel
const BannerSwiper = styled.div`

 
  



`;

const Imagen = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajusta a imagem para cobrir o espaço */
  border-radius: 0; /* Remover bordas arredondadas nas imagens */
  transition: transform 0.5s ease, filter 0.5s ease; /* Transição suave */
  
  &:hover {
    transform: scale(1.1); /* Aumenta a imagem ao passar o mouse */
    filter: brightness(80%); /* Diminui o brilho */
  }
`;

// Estilos para personalizar as setas de navegação
const SwiperNavigationButton = styled.div`
 
 
  transform: translateY(-50%);
  z-index: 10;
  color: #fff;
 
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;

  &.swiper-button-next {
    right: 10px; /* Seta direita */
  }

  &.swiper-button-prev {
    left: 10px; /* Seta esquerda */
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

function GameSwiper() {
  return (
    <BannerSwiper>
      <Swiper
        spaceBetween={20} /* Espaçamento entre os slides */
        slidesPerView={1} /* Exibe apenas 1 slide de cada vez */
        navigation={{
          nextEl: '.swiper-button-next', /* Botão de navegação direita */
          prevEl: '.swiper-button-prev'  /* Botão de navegação esquerda */
        }} 
        loop={true} /* Loop infinito */
        autoplay={{
          delay: 3000, /* Troca a cada 3 segundos */
          disableOnInteraction: false, /* Não desativa o autoplay ao interagir */
        }}
        modules={[Navigation, Autoplay]} /* Módulos usados */
        className="gameSwiper"
      >
        {/* Adicionando as imagens manualmente */}

        <SwiperSlide key={2}>
          <div className="gameSlider">
            <Imagen src="../../../../public/imagens/populares/compras.png" alt="Imagem Carrossel 2" />
          </div>
        </SwiperSlide>
        <SwiperSlide key={3}>
          <div className="gameSlider">
            <Imagen src="../../../../public/imagens/populares/commo.png" alt="Imagem Carrossel 3" />
          </div>
        </SwiperSlide>
        {/* Adicione mais slides conforme necessário */}
      </Swiper>

      {/* Adicionando as setas de navegação personalizadas */}
      <SwiperNavigationButton className="swiper-button-next">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </SwiperNavigationButton>
      <SwiperNavigationButton className="swiper-button-prev">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </SwiperNavigationButton>
    </BannerSwiper>
  );
}

export default GameSwiper;
