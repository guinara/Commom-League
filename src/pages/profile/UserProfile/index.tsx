import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import EstilosGlobais from '../../../componentes/GlobaStyle';
import Perfil from '../../../componentes/Perfil';
import UserList from '../../../componentes/userList';
import SideMenu from '../../../componentes/mainSideBar/SideMenu';
import Header from '../../../componentes/MainHeader';
import * as Components from '../../profile/UserProfile/component';
import DamageBar from './DamageBar';
import TankBar from './tankBar';
import { useNavigate } from 'react-router-dom';
import Historic from '../../../componentes/Historic';
import AuthService, { User } from "../../../service/authService";
import http from '../../../http';

const Backgroundgradient = styled.main`
  background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
  width: 100%;
  min-height: 100vh;
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
`;

const FlipContainer = styled.div`
  perspective: 1000px;
  width: 100%;
  height: 25%;
 
`;

const FlipCard = styled.div<{ flipped: boolean }>`
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
  transform: ${(props) => (props.flipped ? 'rotateX(180deg) translateY(-0%)' : 'rotateX(0) translateY(0)')};
  position: relative;
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateX(180deg);
  backface-visibility: hidden;
 
`;

const App: React.FC = () => {
  const [active, setActive] = useState(false);
  const [flipped, setFlipped] = useState(false); // Controla o flip
  const navigate = useNavigate();
  const handleTogleActive = () => { setActive(!active); };
  const handleEditProfileClick = () => { navigate('/profiles/edit'); };
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const loadUser = async () => {
    const authService = new AuthService();
    try {
      const user: User = await authService.getCacheUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Erro ao carregar o usuário:', error);
    }
  };

  useEffect(() => {
    loadUser();

    const handleStorageChange = () => {
      loadUser();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      const imagePath = currentUser.image || 'abd4092f-461b-4073-a432-9a7ca00f7cce';
      const url = `${http.defaults.baseURL}api/files/${imagePath}`;
      setImageUrl(url);
      console.log(url); // 
    }
  }, [currentUser]);


  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <Components.Main>
      <Backgroundgradient>
        <SideMenu active={active} />
        <Components.Banner className={`banner ${active ? 'active' : ''}`}>
          <Header toggleActive={handleTogleActive} />

          <FlipContainer>
            <FlipCard flipped={flipped}>
              {/* Card Frente - User Banner */}
              <CardFront>
                <Components.UserBanner>
                  <Components.avatar>
                    <Components.avatarA href="#"> </Components.avatarA>
                    <a href="#" className="icon">
                      <Components.avatarImg
                        src={imageUrl || 'default-image-url.jpg'}
                        alt="User Image"
                      />
                    </a>
                  </Components.avatar>  

                  <Components.userName>{currentUser ? currentUser.userName : 'Usuário não encontrado'} </Components.userName>
                  <Components.spanUserName>
                    {currentUser ? currentUser.fullName : '404-User'} - {currentUser ? currentUser.city : '404-City'}, {currentUser ? currentUser.state : '404-State'}, {currentUser ? currentUser.country : '404-Country'}
                  </Components.spanUserName>


                  <Components.editProfile onClick={handleEditProfileClick}>
              Edit Profile
            </Components.editProfile>

                  <Components.flipProfile onClick={handleFlip}>
                    {flipped ? 'FRONT' : 'BACK'}
                  </Components.flipProfile>

                  {!currentUser?.AccountRiot && <Perfil />}
                  <Components.verificado>Verificado</Components.verificado>
                </Components.UserBanner>
              </CardFront>

              {/* Card Verso - Riot Banner */}
              <CardBack>
                <Components.UserBanner>
                  <Components.avatar>
                    <Components.avatarA href="#"> </Components.avatarA>
                    <a href="#" className="icon">
                      <Components.avatarImg
                        src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${currentUser?.AccountRiot?.profileIconId || '0'}.png`}
                        alt="Riot Profile"
                      />
                    </a>
                  </Components.avatar>

                 <Components.userName>
                    {currentUser?.AccountRiot?.gameName || '404-User'}
                  </Components.userName>

                  <Components.spanUserName>
                    {currentUser?.AccountRiot?.tagLine || '404-User'}
                  </Components.spanUserName>

                  <Components.flipProfile onClick={handleFlip}>
                    {flipped ? 'FRONT' : 'BACK'}
                  </Components.flipProfile>

                  
              
                </Components.UserBanner>
              </CardBack>
            </FlipCard>
          </FlipContainer>

       
        </Components.Banner>

        <EstilosGlobais />
      </Backgroundgradient>
    </Components.Main>
  );
};

export default App;
