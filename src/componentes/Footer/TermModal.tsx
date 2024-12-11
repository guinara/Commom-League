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
            <p><strong>Last updated: October 15, 2024</strong></p>
            <p>
            "Welcome to the CommonLeague platform. By accessing and using this site, you agree to be bound by these Terms and Conditions of Use, which govern the use of the online gaming tournament platform. Please read the provisions below carefully, as your use implies full acceptance of the terms outlined herein."
            </p>

            <h3>1. Definitions</h3>
            <p>1.1. Platform: Refers to the CommonLeague website, which organizes online gaming tournaments for its users.</p>
            <p>1.2. User: An individual who accesses or uses the platform, either to compete in tournaments or interact with other available features.</p>
            <p>1.3. Tournaments: Competitions organized through the platform involving electronic games, in which users participate according to the specific rules of each competition.</p>

            <h3>2. Acceptance of the Terms</h3>
            <p>2.1. Using CommonLeague implies acceptance of these Terms and Conditions of Use, and you are responsible for complying with all applicable local laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained on this site are protected by applicable copyright and trademark laws.</p>

            <h3>3. Terms of Use</h3>
            <p>3.1. The use of CommonLeague is restricted to individuals over the age of 18.</p>
            <p>3.2. CommonLeague grants a non-exclusive, non-transferable license for the use of the platform, solely for entertainment purposes, subject to the conditions set forth in these Terms.</p>

            <h3>4. License Use</h3>
            <p>4.1. A temporary permission is granted to download materials (Information or Software) from the CommonLeague platform, solely for personal and non-commercial viewing. This license does not grant the user any rights over the content beyond the permitted use.</p>
            <p>4.2. Under this license, you may not:</p>
            <ul>
              <li>Modify or copy the materials;</li>
              <li>Usar os materiais para fins comerciais ou exibição pública (comercial ou não comercial);</li>
              <li>Tentar descompilar, reverter ou realizar engenharia reversa de qualquer software da plataforma;</li>
              <li>Remover direitos autorais ou outras notificações de propriedade dos materiais;</li>
              <li>Transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor.</li>
            </ul>
            <p>Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida pela CommonLeague a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.</p>

            <h3>5. Regras de Participação em Torneios</h3>
            <p>5.1. Os usuários devem seguir todas as regras específicas dos torneios organizados pela CommonLeague, sendo responsáveis por cumprir integralmente as diretrizes de cada competição.</p>
            <p>5.2. É vedado o uso de trapaças, hacks, ou qualquer outro meio de manipulação que comprometa a integridade das competições.</p>
            <p>5.3. A CommonLeague se reserva o direito de desqualificar qualquer participante que infrinja as regras dos torneios ou viole os presentes Termos de Uso.</p>

            <h3>6. Propriedade Intelectual</h3>
            <p>6.1. O usuário se compromete a não reproduzir, distribuir, ou usar indevidamente qualquer conteúdo da CommonLeague sem prévia autorização.</p>

            <h3>7. Isenção de Responsabilidade</h3>
            <p>7.1. Os materiais no site da CommonLeague são fornecidos 'como estão'. CommonLeague não oferece garantias, expressas ou implícitas, e nega todas as outras garantias, incluindo, sem limitação, as garantias implícitas de comercialização, adequação a um propósito específico ou não infração de propriedade intelectual.</p>

            <h3>8. Modificação dos Termos</h3>
            <p>8.1. A CommonLeague se reserva o direito de modificar ou atualizar os Termos e Condições a qualquer momento, sem aviso prévio. O uso contínuo da plataforma após tais alterações constituirá aceitação dos novos termos.</p>

            <h3>9. Modificações nos Termos</h3>
            <p>9.1. A CommonLeague se reserva o direito de revisar estes Termos a qualquer momento, sem aviso prévio. Ao continuar a usar a plataforma, você concorda em se submeter à versão atualizada dos Termos de Uso.</p>

            <h3>10. Privacidade e Proteção de Dados</h3>
            <p>10.1. A CommonLeague compromete-se a proteger os dados pessoais dos usuários em conformidade com as leis de proteção de dados aplicáveis, incluindo a Lei Geral de Proteção de Dados (LGPD) no Brasil e o General Data Protection Regulation (GDPR) na União Europeia.</p>
            <p>10.2. Para mais informações sobre como tratamos seus dados pessoais, consulte nossa Política de Privacidade.</p>

            <h3>11. Links externos</h3>
            <p>11.1 A CommonLeague não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado.</p>

            <h3>12. Precisão dos materiais</h3>
            <p>12.1. Os materiais exibidos no site da CommonLeague podem incluir erros técnicos, tipográficos ou fotográficos. CommonLeague não garante que qualquer material em seu site seja preciso, completo ou atual.</p>

            <h3>13. Disposições Gerais</h3>
            <p>13.1. Caso qualquer disposição destes Termos seja considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor.</p>
            <p>13.2. Estes Termos constituem o acordo integral entre a CommonLeague e os usuários, prevalecendo sobre qualquer outro entendimento ou comunicação anterior.</p>
            <p>13.3. Estes termos e condições são regidos e interpretados de acordo com as leis do CommonLeague e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</p>

            <p>Contato: Em caso de dúvidas ou solicitações, entre em contato com nosso suporte pelo e-mail integradoifspprojeto@gmail.com.</p>
          </ModalBody>
          <ModalFooter>
          
          <Button isPrimary={true} onClick={handleAcceptTerms} disabled={!canAccept}>
              Accept
            </Button>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </div>
  );
};

export default TermsModal;
