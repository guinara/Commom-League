import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';


interface TermModalProps {
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
  border-bottom: 1px solid #ddd;
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

const TermsModal: React.FC<TermModalProps> = ({ isOpen, onClose}) => {
  const [canAccept, setCanAccept] = useState(false); // Controla se o botão de aceitar será liberado
  const contentRef = useRef<HTMLDivElement | null>(null); // Referência para o conteúdo dos termos


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
            <ModalTitle>Termos e Condições</ModalTitle>
            <CloseButton onClick={onClose}>X</CloseButton>
              <span>X</span>
          </ModalHeader>
          <ModalBody ref={contentRef} onScroll={handleScroll}>
            <h2>TERMOS E CONDIÇÕES GERAIS DE USO DA PLATAFORMA COMMONLEAGUE</h2>
            <p><strong>Última atualização: 15 de Outubro de 2024</strong></p>
            <p>
              Bem-vindo(a) à plataforma CommonLeague. Ao acessar e utilizar este site, você
              concorda em estar vinculado a estes Termos e Condições Gerais de Uso, que regulam
              o uso da plataforma de torneios de jogos online. Leia atentamente as disposições
              abaixo, uma vez que seu uso implica aceitação integral dos termos aqui descritos.
            </p>

            <h3>1. Definições</h3>
            <p>1.1. Plataforma: Refere-se ao site CommonLeague, que organiza torneios de jogos online para seus usuários.</p>
            <p>1.2. Usuário: Pessoa física que acessa ou utiliza a plataforma, seja para competir em torneios ou interagir com outros recursos disponibilizados.</p>
            <p>1.3. Torneios: Competições organizadas através da plataforma envolvendo jogos eletrônicos, nos quais os usuários participam de acordo com regras específicas de cada competição.</p>

            <h3>2. Aceitação dos Termos</h3>
            <p>2.1. O uso da CommonLeague implica a aceitação destes Termos e Condições Gerais de Uso, sendo responsável pelo cumprimento de todas as leis e regulamentos locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</p>

            <h3>3. Condições de Uso</h3>
            <p>3.1. O uso da CommonLeague é restrito a maiores de 18 anos.</p>
            <p>3.2. A CommonLeague concede uma licença, não exclusiva e intransferível para o uso da plataforma, exclusivamente para fins de entretenimento, sujeita às condições estabelecidas nestes Termos.</p>

            <h3>4. Uso de Licença</h3>
            <p>4.1. É concedida permissão temporária para baixar materiais (Informações ou Software) da plataforma CommonLeague, exclusivamente para visualização pessoal e não comercial. Essa licença não confere ao usuário quaisquer direitos sobre o conteúdo além do uso permitido.</p>
            <p>4.2. Sob esta licença, você não poderá:</p>
            <ul>
              <li>Modificar ou copiar os materiais;</li>
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
            <Button isPrimary={false} onClick={onClose} disabled={false}>
              Decline
            </Button>
            <Button isPrimary={true} onClick={onClose} disabled={!canAccept}>
              Accept
            </Button>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </div>
  );
};

export default TermsModal;
