import styled from 'styled-components';

export const Main = styled.main`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 8px solid var(--bgColor);
  display: flex;
  justify-content: space-between;
  gap: 30px;
  overflow: hidden;
  transition: 0.5s;
  background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
`;

export const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  max-width: 100%;
`;

export const LeagueLogo = styled.img`
  height: 65%;
  padding-top: 7%;
  padding-left: 2%;
`;

export const MainContainer = styled.main`
  display: flex;
  gap: 24px;
`;

export const ConteudoGaleria = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Banner = styled.section`
  position: relative;
  width: 100%;
  right: 10px;
  top: 15px;
  height: 95%;
  border-radius: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
  box-shadow: -5px -5px 15px rgba(143, 2, 2, 0.1), 5px 5px 15px rgba(167, 0, 0, 0.35);
  transition: 1s;
  flex: 1;
  overflow-y: auto; 
  max-height: 100vh; 
  scrollbar-width: none; 
  -ms-overflow-style: none; 

  .active {
    position: relative;
    width: 93%;
    transition: 1s;
  }
`;

const HistoryCard = styled.div`
  background-color: #2c3e50;
  color: white;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .team-names {
    font-size: 16px;
    font-weight: bold;
  }

  .match-id {
    font-size: 14px;
    color: #bdc3c7;
  }
`;



export const UserBanner = styled.section`
  width: 500px;
  left: 1%;
  top: 10%;
  height: 250px;
  color: white;
  background-color: none;
  border-radius: 30px;
  transition: 1s;
  flex: 1;
  max-height: 100vh; 
  scrollbar-width: none; 
  -ms-overflow-style: none;
  
  /* Garantir que o conteúdo não ultrapasse a área */
  overflow: hidden;  /* Evita que o conteúdo saia da área do UserBanner */
  padding: 20px;  /* Adiciona um padding para o conteúdo não ficar colado */
`;

export const Section = styled.section`
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: 100vh;
  padding: 0 30px;
  bottom: 0;
  opacity: 0;
  transition: opacity 1s ease-in-out, top 1s ease-in-out;
  transform-origin: bottom;
  z-index: 1000;

  &::-webkit-scrollbar {
    display: none;
  }

  &.active {
    top: 100px;
    height: auto;
    overflow-y: visible;
    opacity: 1;
  }
`;

export const teamInfoBanner = styled.section`
  position: absolute;
  width: 25%;
  
  right: 10px;
  top: 15%;
  height: 45%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #a30237;
  box-shadow: -5px -5px 15px rgba(0, 0, 0, 0.1), 5px 5px 15px rgba(0, 0, 0, 0.35);
  transition: 1s;
  flex: 1;
  overflow-y: auto; 
  max-height: 100vh; 
  scrollbar-width: none; 
  -ms-overflow-style: none; 
  

  .active {
    position: relative;
    width: 93%;
    transition: 1s;
  }
`;

export const text = styled.div`
   position: absolute;
  padding-left: 50%;
  bottom: 10%;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Ajusta o espaço entre os elementos */
  span {
    color: white;
    line-height: 1.5; /* Controla o espaçamento vertical entre linhas */
  }
`;


export const avatarTeamDiv = styled.div`
 
`;

export const avatarTeamImg = styled.img`
position: relative;
margin-top: 10px;
 height: 150px;
 width: 150px;
 border-radius: 20%;
`;

export const avatarTeamDivText = styled.div`
 position: relative;
 left: 20%;
 bottom: 50%;
 height: 30%;

 width: 15%;

`;
export const h1 = styled.h1`
 position: relative;
 font-size: 50px;
 width: 500px;
 right: 100px;
 bottom: 42px;
 

`;
export const h2 = styled.h2`
  position: relative;  // Usa absolute para posicionar dentro do contêiner de forma fixa
  font-size: 33px;

  right: 10%;  // Ajusta a distância da direita dentro da div pai
  background-color: none;
  width: 100%;  // Faz o h2 ocupar 100% da largura da div
  text-align: center;  // Centraliza o texto


`;





export const InfoDiv = styled.div`
  position: relative;  // Torna a div o contexto de posicionamento para h2
  font-size: 25px;
  height: 50%;  // Ajuste da altura conforme necessário
  left: 10%;
  bottom: 60%;
  width: 500px;
  overflow: hidden;  // Garante que o conteúdo não ultrapasse os limites da div
  padding: 10px;  // Opcional, para adicionar um espaço interno, se necessário
`;

export const TeamInfoSection = styled.section`
  margin-top: 20px;
  padding: 20px;
  background-color: #222;
  border-radius: 8px;
  color: white;

  h2 {
    margin-bottom: 10px;
    font-size: 24px;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      display: flex;
      justify-content: space-between;
      margin: 5px 0;
      font-size: 18px;

      button {
        background-color: red;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: darkred;
        }
      }
    }
  }
`;
