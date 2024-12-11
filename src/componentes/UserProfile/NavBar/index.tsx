import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: initial;
  background-color: rgba(39, 41, 165, 0.2);
  padding: 10px;
  width: 100%;
  border-radius: 8px;
`;

const NavItem = styled.span`
  color: #000000;
  margin: 5px 14px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: rgba(39, 41, 165, 1);
    text-decoration: underline;
  }
`;

const NavBar: React.FC<{ setSelectedOption: (option: string) => void }> = ({ setSelectedOption }) => {
  return (
    <NavContainer>
      <NavItem onClick={() => setSelectedOption('championship')}>Campeonatos</NavItem>
      <NavItem onClick={() => setSelectedOption('soloDuo')}>Solo/Duo</NavItem>
      <NavItem onClick={() => setSelectedOption('titles')}>Títulos</NavItem>
      <NavItem onClick={() => setSelectedOption('estatisticas')}>Estatísticas</NavItem>
      <NavItem onClick={() => setSelectedOption('posts')}>Posts</NavItem>
    </NavContainer>
  );
};

export default NavBar;
