import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import EstilosGlobais from "../../componentes/GlobaStyle";
import SideMenu from "../../componentes/mainSideBar/SideMenu";
import GaleriaPlayers from "../../componentes/GaleryPlayers";
import fotos from '../../fotos.json';
import { Navigate } from "react-router-dom";
import * as Components from './component';
import GameSwiper from '../../componentes/Banner/newBannerCarrosel';
import Header from "../../componentes/MainHeader";
import Home from "../chapinhips/home";
import Footer from "../../componentes/Footer/Footer";
import { Game, Foto } from '../../data/types';
import Card from "../../componentes/GaleryPlayers/Imagens"
import TermsModal from '../../componentes/Footer/TermModal';
import PrivacyPolicyModal from '../../componentes/Footer/PrivacyPolicyModal';

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

const App: React.FC = () => {
  const [fotosDaGaleria, setFotosDaGaleria] = useState<Foto[]>(fotos);
  const [fotosSelecionada, setFotosSelecionadas] = useState<Foto | null>(null);
  const token = sessionStorage.getItem('token');
  const [active, setActive] = useState(false);
  const [games, setGames] = useState<Game[]>([]);

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false);

  const handleTogleActive = () => {
    setActive(!active);
  };

  const openTermsModal = () => setIsTermsModalOpen(true);
  const closeTermsModal = () => setIsTermsModalOpen(false);

  const openPrivacyPolicyModal = () => setIsPrivacyPolicyModalOpen(true);
  const closePrivacyPolicyModal = () => setIsPrivacyPolicyModalOpen(false);

  useEffect(() => {
    const termsAccepted = localStorage.getItem('termsAccepted');
    const privacyPolicyAccepted = localStorage.getItem('privacyPolicyAccepted');

 
    if (!termsAccepted || !privacyPolicyAccepted) {
      openTermsModal();  
      openPrivacyPolicyModal(); 
    }
  }, []);

  // Função para aceitar os termos e política de privacidade
  const handleAcceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true');
    closeTermsModal();
  };

  const handleAcceptPrivacyPolicy = () => {
    localStorage.setItem('privacyPolicyAccepted', 'true');
    closePrivacyPolicyModal();
  };

  return (
    <Components.Main>
      <Backgroundgradient>
        <EstilosGlobais />
        <SideMenu active={active} />
        <Components.Banner className={`banner ${active ? 'active' : ''}`}>
          <Header toggleActive={handleTogleActive} />
          <Home games={games} />
          <Card />
          <Footer 
            openTermsModal={openTermsModal} 
            openPrivacyPolicyModal={openPrivacyPolicyModal} 
          />
          
          <TermsModal 
            isOpen={isTermsModalOpen} 
            onClose={closeTermsModal} 
            onAccept={handleAcceptTerms}  
          />
          <PrivacyPolicyModal 
            isOpen={isPrivacyPolicyModalOpen} 
            onClose={closePrivacyPolicyModal} 
            onAccept={handleAcceptPrivacyPolicy} 
          />
        </Components.Banner>
      </Backgroundgradient>
    </Components.Main>
  );
};

export default App;
