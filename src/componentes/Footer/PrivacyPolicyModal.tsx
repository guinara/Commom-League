import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
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
const PrivacyPolicyLink = styled.a`
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
  background-color: #fff;
  justify-content: space-between;
 
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

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <div>
      {/* Modal */}
      <Modal isOpen={isOpen}>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>{t("Privacy Policy")}</ModalTitle>
            <CloseButton onClick={onClose}>X</CloseButton>
          </ModalHeader>
          <ModalBody ref={contentRef} onScroll={handleScroll}>
            <h2>{t("COMMONLEAGUE PRIVACY POLICY")}</h2>
            <p><strong>{t("Last updated: 15th October 2024")}</strong></p>
            <p>
              {t("The CommonLeague is committed to protecting the privacy and personal data of its users. This Privacy Policy describes how we collect, use, and protect your personal data in accordance with applicable data protection laws, including the General Data Protection Law (LGPD) in Brazil and the General Data Protection Regulation (GDPR) in the European Union.")}
            </p>

            <h3>{t("1. Data Collection")}</h3>
            <p>{t("We collect personal information when you register on our platform, participate in tournaments, or interact with our services. This may include your name, email address, payment data, and platform usage information.")}</p>

            <h3>{t("2. Use of Data")}</h3>
            <p>{t("We use your data to improve your experience on our platform, send updates about tournaments and relevant offers, and provide customer support. We may also use your data for analytical and marketing purposes.")}</p>

            <h3>{t("3. Data Sharing")}</h3>
            <p>{t("We do not share your personal data with third parties, except when necessary to comply with the law or with service providers who help us operate our platform.")}</p>

            <h3>{t("4. Security")}</h3>
            <p>{t("We take security measures to protect your personal data from unauthorized access, alteration, or destruction. However, we cannot guarantee absolute security in the transmission of data over the internet.")}</p>

            <h3>{t("5. Your Rights")}</h3>
            <p>{t("You have the right to access, correct, or delete your personal data, as well as request restrictions on the processing of your data. To exercise your rights, contact us through our support.")}</p>

            <h3>{t("6. Changes to the Privacy Policy")}</h3>
            <p>{t("CommonLeague reserves the right to modify this Privacy Policy at any time. Changes will be posted on this page with the updated review date.")}</p>

            <h3>{t("7. Contact")}</h3>
            <p>{t("If you have any questions about our Privacy Policy, please contact us at the email: integradoifspprojeto@gmail.com")}</p>
          </ModalBody>
          <ModalFooter>
            <Button isPrimary={false} onClick={onClose} disabled={false}>
              {t("Decline")}
            </Button>
            <Button isPrimary={true} onClick={onClose} disabled={!canAccept}>
              {t("Accept")}
            </Button>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </div>
  );
};

export default PrivacyPolicyModal;
