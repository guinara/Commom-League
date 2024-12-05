import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #none;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #eaeaea;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>
        &copy; {new Date().getFullYear()} Common. Todos os direitos reservados.
      </p>
      <p>
        <Link href="../../../public/docs/Termos_e_condições.pdf" target="_blank">Termos de Serviço</Link> | 
        <Link href="../../../public/docs/Politica_de_privacidade.pdf" target="_blank">Políticas de Privacidade</Link>
      </p>
    </FooterContainer>
  );
};

export default Footer;
