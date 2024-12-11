import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    position: relative;
  background-color: #f8f8f8;
  padding: 20px;
  text-align: center;
  font-size: 1rem;
  
  left: 0;
  bottom: -10%;  
  width: 100%;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

interface FooterProps {
  openPrivacyPolicyModal: () => void;
  openTermsModal: () => void;
}

const Footer: React.FC<FooterProps> = ({ openPrivacyPolicyModal, openTermsModal }) => {
  return (
    <FooterContainer>
      <p>
      &copy; {new Date().getFullYear()} Common League. Todos os direitos reservados. {' '}
        <span
          onClick={openTermsModal}
          style={{ cursor: 'pointer', color: '#096474' }}
        >
          Leia os Termos de Uso
        </span>{' '}
        e{' '}
        <span
          onClick={openPrivacyPolicyModal}
          style={{ cursor: 'pointer', color: '#096474' }}
        >
          a Política de Privacidade
        </span>
      </p>
    </FooterContainer>
  );
};

export default Footer;
