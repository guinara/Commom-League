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

export const MainContainer = styled.main`
  display: flex;
  gap: 24px;
`;

export const ConteudoGaleria = styled.section`
  display: flex;
  flex-direction: column;
  left: 100%;
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

export const UserBanner = styled.section`
  position: relative;
  width: 100%;
  right: 10px;
  top: 15%;
  height: 40%;
  
  border-radius: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
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
