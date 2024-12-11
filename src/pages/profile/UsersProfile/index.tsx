import React from 'react';
import { styled } from 'styled-components';
import EstilosGlobais from '../../../componentes/GlobaStyle';
import Perfil from '../../../componentes/Perfil';
import UserList from '../../../componentes/userList';
import SideMenu from '../../../componentes/mainSideBar/SideMenu';
import { useState } from 'react';
import Header from '../../../componentes/MainHeader';
import * as Components from '../../Home/component';
import '../header.css';


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

// Define the App component
const App: React.FC = () => {

  const [active, setActive] = useState(false);

  const handleTogleActive = () => {
    setActive(!active);
  };

  return (
    <Components.Main>
      <Backgroundgradient>


        <SideMenu active={active} />
        <Header toggleActive={handleTogleActive} />

        <Components.Banner className={`banner ${active ? 'active' : ''}`}>
          <Components.UserBanner>
            <Perfil />
            <div className="avatar">
              <a href="#" className="icon">
                <img
                  src="https://i.pinimg.com/736x/58/dd/8c/58dd8c8b12c0755e5b71643eeab3d39f.jpg"
                  alt="User Image"
                />
              </a>

            </div>
            <div className="user">
              <span>Juan</span>

            </div>
            <div className="user2">
              <span>Juan Ribeiro Rodrigues - São Paulo, São paulo, Brazil</span>

            </div>

            <div className="level">
              <span>Level: 30</span>
            </div>

            <div className="edit">
              <button>Edit Profile</button>
            </div>

            <div className="verificado">
              <button>Verificado:</button>
            </div>

          </Components.UserBanner>

        </Components.Banner>

        <EstilosGlobais />

        <Header toggleActive={handleTogleActive} />

      </Backgroundgradient>
    </Components.Main>

  );
};

export default App;
