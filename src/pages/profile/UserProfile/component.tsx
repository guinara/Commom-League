import styled from 'styled-components';

//UserBannerLeague
export const avatar = styled.div`

    width: 150px;
    height: 50px;
    padding: 20px 0px;
    display: flex;
    align-items: center;
    gap: 1px;
    border-radius: 10px;

    @media (max-width: 914px) {  /* Tablets e telas grandes */
    width: 100px;
    height: 100px;
    padding: 15px 48px;
  }

`;

export const avatarImg = styled.img`
  position: relative;
  top: 20px;
  width: 150px; 
  height: 150px; 
  border-radius: 10%; 

  @media (max-width: 914px) {  
    height: 100px; 
    top: 0px;
    right: 60px;
  }

`;


export const spanUserName = styled.span`
    position: absolute;
    color: #a5a5a5;
    font-size: 1rem;
    left: 180px;
    bottom: 50%;


`;

export const optionDiv = styled.div`
    color: white;
    gap: 15px;
`;

export const optionLi = styled.li`
    padding: 20px;
    list-style-type: none;
    cursor: pointer; 

   
    background-color: transparent;
    color: #a09f9f;

    /* Estilo de hover */
    &:hover {
        background-color: rgba(255, 255, 255, 0.2); /* Cor de fundo ao passar o mouse */
        color: #fafafa; /* Cor do texto ao passar o mouse */
        transition: background-color 0.3s ease; /* Transição suave */
    }
`;


export const avatarA = styled.a`
    position: absolute;
    color: #ffffff;
    font-size: 1.8rem; 
`;


export const userName = styled.span`
    position: absolute;
    color: #ffffff;
    font-size: 3rem;
    left: 270px; 
    bottom: 65%;
    transform: translateX(-50%); 
    
    @media (max-width: 914px) {  /* Tablets e telas grandes */
      font-size: 1rem;
      left: 145px; 
      bottom: 70%;
  }
   
`;
export const spanlevelProfile = styled.a`
    position: absolute ;
    bottom: 0;
    right: 1%;
    color: #ffffff;
    font-size: 2rem;

`;

export const LevelUserBanner = styled.span`
    position: relative;
    bottom: 0%;
    left: 0px;
    color: #ffffff;
    font-size: 1rem;

`;
export const span2 = styled.span`
    top: 10%;
    position: absolute;
    padding-left: 34%; 
    color: #ffffff;
    font-size: 1rem;

`;

export const avatarSpan = styled.span`
    top: 10%;
    position: absolute;
    padding-left: 33%; 
    color: black;
    font-size: 4rem;

`;

export const avatarEditProfileSpan = styled.span`
    top: 20%;
    position: relative;
    padding-left: 12.2%; 
    color: white;
    font-size: 1rem;
`;

export const avatarUser = styled.section`
    position: absolute;
    display: flex;
    bottom: 500px;
    flex-direction: column;
`;

export const user = styled.section`
     display: flex;
     flex-direction: column;
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


export const Banner = styled.section`
  position: relative;
  width: 100%;
  right: 10px;
  top: 15px;
  height: 100%;
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


`;

export const UserBanner = styled.section`
  position: relative;
  width: 50%; 
  max-width: 100%; 
  left: 40px;
  background-color: transparent; 
  padding: 20px;
  height: 200px; 
  display: flex;
  border: 1px solid white;
  transition: 1s;
  flex: 1;
  overflow: hidden;
  box-sizing: border-box; 
  scrollbar-width: none; 
  -ms-overflow-style: none; 

  @media (max-width: 914px) {  /* Tablets e telas grandes */
    width: 320px; 
    left: 0px;
  }
`;

export const SideBanner = styled.section`
  position: absolute;
  width: 20%;
  right: 0;
  margin-top: 5%;
  height: auto;
 
  background-color: white;
  border: 1px solid white;
  background: none;
  color: white;

  transition: 1s;
  flex: 1;
  max-height: 400vh; 
  scrollbar-width: none; 
  -ms-overflow-style: none; 

  .active {
    position: relative;
    width: 93%;
    transition: 1s;
  }
`;

export const activeTeamBanner = styled.section`
  position: relative;
  width: 20.6%;
  right: 0;
  margin-right: 1%;
  margin-top: 12%;
  height: auto;
 
  background-color: #ff0303;
  border: 1px solid white;

  color: white;

  transition: 1s;
  flex: 1;
  max-height: 400vh; 
  scrollbar-width: none; 
  -ms-overflow-style: none; 

  .active {
    position: relative;
    width: 93%;
    transition: 1s;
  }
`;



export const StaticLeagueBanner = styled.section`
  right: 1%;
  height: 100px;
  width: 300px;
  color: black;
  background-color: blue;
`;

export const LeagueBanner = styled.section`
  background-color: none;
  position: relative;
  margin-top: 1%;
  width: 92.5%;
  height: auto;
  display: flex; 
  gap: 10px; 
  
`;

export const historicBanner = styled.section`
  position: relative; 
  width: 100%;
  margin-top: 3%;
  left: 3%;
  display: flex;
  align-items: center;
  height: 100%;
  border-radius: 10px;
 
  background-color: rgba(51, 51, 51, 0.842);
  color: black; 
  text-align: center;
  transition: 1s;
  flex-direction: column; 
  max-height: 100vh; 
  overflow: auto;      
  z-index: 2000; 
  scrollbar-width: none;
  -ms-overflow-style: none; 

  &.active {
    width: 93%;
    transition: 1s;
  }

  &::-webkit-scrollbar {
    display: none; 
  }
`;




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

export const verificado = styled.button`
   position: absolute;
   bottom: 5%;
   left: 5%;
   background-color: #00a2ff;
   color: #ffffff;
   border-radius: 5px;
   font-size: 1rem;
   border: none;

   @media (max-width: 914px) {  /* Tablets e telas grandes */
    bottom: 15%;
    left: 5%;
  }
`;

export const editProfile = styled.button`
  position: absolute;
  top: 80%;
  right: 1%;
  background-color: rgba(137, 137, 138, 0.2);
  color: white;
  font-size: 1.5rem;
  border: none;
  cursor: pointer; 

  
  &:hover {
    background-color: rgba(137, 137, 138, 0.5); 
  }
`;

export const flipProfile = styled.button`
  position: absolute;
  top: 10px;
  right: 1%;
  background-color: rgba(220, 6, 228, 0.2);
  color: white;
  font-size: 1.5rem;
  border: none;
  cursor: pointer; 

  
  &:hover {
    background-color: rgba(247, 1, 255, 0.712); 
  }
`;

export const teamOne = styled.div`
  position: relative;
  display: flex;
  margin-top: 1%;
  
  background-color: white;
  flex-direction: column; 
  width: 100%;
  gap: 10px;

  align-items: center;
  border-radius: 8px;
`;

export const player = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  background-color: rgba(39, 41, 165, 0.2); 
  color: #cccccc;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);  // Adiciona sombra
`;
export const player2 = styled.div`
  position: relative;
  background-color: rgba(148, 34, 34, 0.2); /* Cor de fundo do input */
  color: #dfdfdf;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  width: 500px;
  align-items: center;
`;


export const imgplayer = styled.img`
 position: relative;
 height: 35px;
 width: 35px;
 left: 6px;
 border-radius: 100%;
`;
export const imgSpellOneTeamOne = styled.img`
 height: 20px;
 width: 20px;
 right: 1px;
`;
export const spellsDiv = styled.div`
  top: 50px;
  display: flex;
  flex-direction: column; 
`;

export const spellsDivTwo = styled.div`
position: relative;
  display: flex;
  flex-direction: column; 
  left: 425px;
`;

export const imgSpellTwoTeamTwo = styled.img`
position: relative;
 height: 20px;
 width: 20px;
`;


export const imgText = styled.a`
    font-size: 20px;
`;

export const kdaText1 = styled.a`
    position: absolute;
    font-size: 14px;
    left: 130px;
    color: black;
`;
export const kdaText2 = styled.a`
    position: absolute;
    font-size: 20px;
    left: 65%;
`;

export const imgTextOne = styled.a`
    position: relative;
    font-size: 16px;
    color: black;
    left: 10px;
    bottom: 8px;
    
`;

export const imgEloOne = styled.a`
   position: absolute;
    font-size: 14px;
    color: gray;
    left: 65px;
    bottom: 5px;
    
`;

export const cardName = styled.div`
  
`;

export const danoText = styled.a`
    position: relative;
    font-size: 20px;
    left: 35%;
    
`;

export const csText = styled.a`
    position: relative;
    font-size: 20px;
    left: 40%;
    
`;
export const teamTwo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column; 
  gap: 10px;
  left: 250px;
  align-items: center;

`;

export const imgplayerTwo = styled.img`
position: relative;
 height: 50px;
 width: 50px;
 left: 425px;
 
`;

export const imgplayerTwo2 = styled.img`
 position: absolute;
 height: 35px;
 width: 35px;
 left: 430px;
 border-radius: 100%;
 
`;

export const textElo = styled.div`
    position: relative;
    font-size: 16px;
    color: #bdbdbd;
    
    
    
`;

export const textRank = styled.a`
    position: relative;
    font-size: 16px;
    left: 20px;
    color: #ffbb00;
   
    
`;
export const tagElo = styled.div`
    position: relative;
    font-size: 16px;
 
    color: #ffbb00;
`;
export const textRankA = styled.a`
    position: relative;
    font-size: 16px;
    padding-left: 38px;
    background-color: none;    
`;

export const tagEloinfo = styled.div`
    position: relative;
    font-size: 16px;
    left: 10px;
    list-style-type: none;
    padding: 5px;
    gap: 20px;
    width: 100%;
    color: #aaaaaa;
    display: flex;
`;

export const tagEloinfoGold = styled.li`
    position: relative;
    font-size: 16px;
    list-style-type: none;

    gap: 20px;
    width: 100%;
    color: #ffc400;
    display: flex;
`;

export const tagEloinfoDiamond = styled.li`
    position: relative;
    font-size: 16px;
    list-style-type: none;
    gap: 20px;
    width: 100%;
    color: #2f90df;
    display: flex;
`;

export const tagEloinfoGrandMaster = styled.li`
    position: relative;
    font-size: 16px;
    list-style-type: none;
    gap: 20px;
    width: 100%;
    color: #e7382c;
    display: flex;
`;
export const teams1Img = styled.img`
    position: relative;
    width: 50%;
    height: 50%;
    border-radius: 10%;

`;



export const sideBarImg = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px;
    padding-top: 30px;
    border-radius: 100%;

`;
export const SideBarImgTeam = styled.img`
position: relative;
    width: 100px;
    height: 115px;
    right: 90px;
    bottom: 4px;
    opacity: 80%;

`;

export const sideBarTemaName = styled.h3`
position: relative;
bottom: 45px;
left: 20px;
font-size: 1rem;
`;

export const sideBarTemaName2 = styled.h3`
position: relative;
padding: 10px;
right: 80%;
color: orange;
 font-size: 2rem;
`;

export const sideBarImgRiot = styled.img`
position: relative;
    width: 100px;
    height: 115px;
    left: 100px;
    bottom: 4px;
    opacity: 100%;
    

`;

export const sideBarUserRiot = styled.div`

 
  padding-top: 10px;
  display: flex;
  align-items: center; 
  right: 25px;
  border: 1px solid rgb(255, 255, 255);
  background: linear-gradient(174.61deg, #3f658a 4.16%, #182e46 48%, #292626 96.76%);
 
 

`;

export const sideBarUserRiotText = styled.h3`
  position: relative;
  right: 180px;
  bottom: 45px;
  font-size: 1rem;
  white-space: nowrap;  
  background-color: none ;
  width: 120px;
  
  max-width: 200px;    
`;



export const teams2Img = styled.img`
position: absolute;
  width: 50px; 
  height: 60px;
 bottom: 0;
 left: 10;
 background-color: blue;
  
`;
export const historicMatchLeague = styled.h2`
   bottom: 0;
    position: relative;
    color: white;
    font-size: 1.5rem;
    left: 20px;
`;

export const historic = styled.section`
 width: 100%;


`;
export const NavContainer = styled.div`
  position: relative;
  display: flex;

  justify-content: space-around;
 
  background-color: #333;
  cursor: pointer;

  width: 100%;
`;

export const NavItem = styled.a`
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;

 

  &:hover {
    background-color: #555;
  }
`;

export const RiotIcon = styled.img`
position: absolute;
  width: 100px; 
  height: 100px; 
  right: 10px;
  top: 10px;
`;

export const RiotUserName = styled.h2`
position: relative;
opacity: 80%;
left: 40px;
`;

export const RiotTagLine = styled.h3`
position: relative;
opacity: 80%;
left: 46px;
bottom: 20px;
`;

export const RiotUser = styled.div`
position: relative;
  width: 274px; 
  color: white;
  height: 150px; 
left: 30%;
  background: linear-gradient(174.61deg, #3f658a 4.16%, #182e46 48%, #292626 96.76%);

`;
