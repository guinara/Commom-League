import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
  return (
    <FooterContainer>
      <p>
      &copy; {new Date().getFullYear()} {t("Common League. All rights reserved.")} {' '}
        <span
          onClick={openTermsModal}
          style={{ cursor: 'pointer', color: '#096474' }}
        >
          {t("Read the Terms of Use")};
        </span>{' '}
        & {' '}
        <span
          onClick={openPrivacyPolicyModal}
          style={{ cursor: 'pointer', color: '#096474' }}
        >
           {t("Privacy Policy")};
        </span>
      </p>
    </FooterContainer>
  );
};

export default Footer;
