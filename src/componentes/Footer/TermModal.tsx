import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface TermModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

// Estilos do Footer (Rodapé)
const Footer = styled.footer`
  background-color: #f8f8f8;
  padding: 20px;
  text-align: center;
  font-size: 1rem;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

// Link que abre o modal
const TermsLink = styled.a`
  color: #750550;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// Modal e container do modal
const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 9999;
`;

// Container do Modal
const ModalContainer = styled.article`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  overflow-y: auto;
`;

// Cabeçalho do Modal
const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #fff;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

// Título do Modal
const ModalTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
 
`;

// Botão de fechar
const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

// Corpo do Modal
const ModalBody = styled.section`
  font-family: "Outfit", sans-serif;
  line-height: 1.6;
  font-size: 1rem;
  max-height: 400px;
  overflow-y: auto;
`;

// Rodapé do Modal
const ModalFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ddd;
`;

// Botões do Modal
const Button = styled.button<{ isPrimary: boolean; disabled: boolean }>`
  padding: 12px 20px;
  border-radius: 8px;
  background-color: ${({ isPrimary, disabled }) =>
    disabled ? "#e0e0e0" : isPrimary ? "#750550" : "transparent"};
  color: ${({ isPrimary, disabled }) =>
    disabled ? "#bdbdbd" : isPrimary ? "#fff" : "#000"};
  border: ${({ isPrimary, disabled }) => (disabled ? "1px solid #e0e0e0" : isPrimary ? "none" : "1px solid #ddd")};
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: 0.15s ease;

  &:hover {
    background-color: ${({ isPrimary, disabled }) =>
      disabled ? "#e0e0e0" : isPrimary ? "#4a0433" : "#dfdad7"};
  }
`;

const TermsModal: React.FC<TermModalProps> = ({ isOpen, onClose, onAccept}) => {
  const [canAccept, setCanAccept] = useState(false); // Controla se o botão de aceitar será liberado
  const contentRef = useRef<HTMLDivElement | null>(null); // Referência para o conteúdo dos termos
  const { t, i18n } = useTranslation();

  // Função para verificar se o usuário chegou ao fim do conteúdo
  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      // Se o usuário chegou ao final do conteúdo, libera o botão de aceitar
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setCanAccept(true);
      } else {
        setCanAccept(false); // Caso o usuário não tenha chegado ao final, desabilita o botão
      }
    }
  };

  // UseEffect para garantir que o scroll inicie no topo quando o modal abrir
  useEffect(() => {
    
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0; // Faz o scroll começar do topo
    }
  }, [isOpen]);


  // Verifica se os termos de uso já foram aceitos
useEffect(() => {
  const termsAccepted = localStorage.getItem('termsAccepted');
  if (termsAccepted === 'true') {
 //   onClose(); // Fecha o modal automaticamente se já foi aceito
  }
}, [onClose]);

// Salva no localStorage quando o usuário aceitar os termos
const handleAcceptTerms = () => {
  localStorage.setItem('termsAccepted', 'true'); // Salva a aceitação dos termos
  onAccept(); // Chama a função onAccept do componente pai para fechar o modal
};

  return (
    <div>
      {/* Modal */}
      <Modal isOpen={isOpen}>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>{t("Terms and Conditions")}</ModalTitle>
          
          </ModalHeader>
          <ModalBody ref={contentRef} onScroll={handleScroll}>
            <h2>{t("GENERAL TERMS AND CONDITIONS OF USE OF THE COMMON LEAGUE PLATFORM")}</h2>
            <p><strong>{t("Last updated: October 15, 2024")}</strong></p>
            <p>
            {t("Welcome to the CommonLeague platform. By accessing and using this site, you agree to be bound by these Terms and Conditions of Use, which govern the use of the online gaming tournament platform. Please read the provisions below carefully, as your use implies full acceptance of the terms outlined herein.")}
            </p>

            <h3>{t("1. Definitions")}</h3>
            <p>{t("1.1. Platform - Refers to the CommonLeague website, which organizes online gaming tournaments for its users.")}</p>
            <p>{t("1.2. User An individual who accesses or uses the platform, either to compete in tournaments or interact with other available features.")}</p>
            <p>{t("1.3. Tournaments Competitions organized through the platform involving electronic games, in which users participate according to the specific rules of each competition.")}</p>

            <h3>{t("2. Acceptance of the Terms")}</h3>
            <p>{t("2.1. Using CommonLeague implies acceptance of these Terms and Conditions of Use, and you are responsible for complying with all applicable local laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained on this site are protected by applicable copyright and trademark laws.")}</p>

            <h3>{t("3. Terms of Use")}</h3>
            <p>{t("3.1. The use of CommonLeague is restricted to individuals over the age of 18.")}</p>
            <p>{t("3.2. CommonLeague grants a non-exclusive, non-transferable license for the use of the platform, solely for entertainment purposes, subject to the conditions set forth in these Terms.")}</p>

            <h3>{t("4. License Use")}</h3>
            <p>{t("4.1. A temporary permission is granted to download materials (Information or Software) from the CommonLeague platform, solely for personal and non-commercial viewing. This license does not grant the user any rights over the content beyond the permitted use.")}</p>
            <p>{t("4.2. Under this license, you may not:")}</p>
            <ul>
              <li>{t("Modify or copy the materials;")}</li>
              <li>{t("Use the materials for commercial purposes or public display (commercial or non-commercial);")}</li>
              <li>{t("Attempt to decompile, reverse engineer, or perform reverse engineering on any software from the platform;")}</li>
              <li>{t("Remove copyright or other proprietary notices from the materials;")}</li>
              <li>{t("Transfer the materials to another person or mirror the materials on any other server.")}</li>
            </ul>
            <p>{t("This license will automatically terminate if you violate any of these restrictions and may be terminated by CommonLeague at any time. Upon ending your viewing of these materials or upon the termination of this license, you must delete all downloaded materials in your possession, whether in electronic or printed format.")}</p>

            <h3>{t("5. Tournament Participation Rules")}</h3>
            <p>{t("5.1. Users must adhere to all specific rules of tournaments organized by CommonLeague and are responsible for fully complying with the guidelines of each competition.")}</p>
            <p>{t("5.2. The use of cheats, hacks, or any other means of manipulation that compromise the integrity of the competitions is prohibited.")}</p>
            <p>{t("5.3. CommonLeague reserves the right to disqualify any participant who violates tournament rules or breaches these Terms of Use.")}</p>

            <h3>{t("6. Intellectual Property")}</h3>
            <p>{t("6.1. The user agrees not to reproduce, distribute, or misuse any content from CommonLeague without prior authorization.")}</p>

            <h3>{t("7. Disclaimer of Liability")}</h3>
            <p>{t("7.1. The materials on the CommonLeague website are provided 'as is'. CommonLeague makes no express or implied warranties and disclaims all other warranties, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.")}</p>

            <h3>{t("8. Modifications to the Terms")}</h3>
            <p>{t("8.1. CommonLeague reserves the right to review these Terms at any time, without prior notice. By continuing to use the platform, you agree to be bound by the updated version of the Terms of Use.")}</p>

            <h3>{t("9. Privacy and Data Protection")}</h3>
            <p>{t("9.1. CommonLeague is committed to protecting users' personal data in accordance with applicable data protection laws, including the General Data Protection Law (LGPD) in Brazil and the General Data Protection Regulation (GDPR) in the European Union.")}</p>
            <p>{t("9.2. For more information on how we handle your personal data, please refer to our Privacy Policy.")}</p>

            <h3>{t("10. External Links")}</h3>
            <p>{t("10.1. CommonLeague has not reviewed all the websites linked to its website and is not responsible for the content of any linked site.")}</p>

            <h3>{t("11. Accuracy of Materials")}</h3>
            <p>{t("11.1. The materials displayed on the CommonLeague website may include technical, typographical, or photographic errors. CommonLeague does not guarantee that any material on its website is accurate, complete, or up to date.")}</p>

            <h3>{t("13. General Provisions")}</h3>
            <p>{t("13.1.  If any provision of these Terms is deemed invalid or unenforceable, the remaining provisions will remain in full force and effect.")}</p>
            <p>{t("13.2. These Terms constitute the entire agreement between CommonLeague and the users, overriding any prior understanding or communication.")}</p>
            <p>{t("These terms and conditions are governed by and construed in accordance with the laws of CommonLeague, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or locality.")}</p>

            <p>{t("Contact: If you have any questions or requests, please contact our support at the email integratedifspprojeto@gmail.com.")}</p>
          </ModalBody>
          <ModalFooter>
          
          <Button isPrimary={true} onClick={handleAcceptTerms} disabled={!canAccept}>
              {t("Accept")}
            </Button>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </div>
  );
};

export default TermsModal;
