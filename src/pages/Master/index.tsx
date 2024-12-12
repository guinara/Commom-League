import React from 'react';
import { styled } from 'styled-components';
import SideBar from '../../componentes/NavBarNew';
import NavBar from '../../componentes/navBarSuperior';
import * as Components from './component';
import Widget from '../../componentes/Widget';

const Backgroundgradient = styled.div`
  /* Add styles here if needed */
`;

const App: React.FC = () => {
  return (
    <Backgroundgradient>
      <Components.home>
        <SideBar />
        <Components.homeContainer>
          <NavBar />
          <Components.widgets>
            <Widget type="user" />
            <Widget type="team" />
            <Widget type="torneios" />
          </Components.widgets>
          <div>
            {/* You can add content here if needed */}
          </div>
        </Components.homeContainer>
      </Components.home>
    </Backgroundgradient>
  );
};

export default App;
