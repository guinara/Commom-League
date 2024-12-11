import React, { useState, useEffect } from 'react';
import './header.css';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MenuIcon from '@mui/icons-material/Menu';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import {Dialog, DialogActions, DialogContent, DialogTitle, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow , Modal, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import AuthService, { User } from "../../service/AuthService";
import http from '../../http';
import { FaCoins } from 'react-icons/fa'; // Ícone de ficha
import { useNavigate } from "react-router-dom";
import styled2 from "@emotion/styled";
import NotificationService from '../../service/notificationService';
import { Formik, Form as FormikForm, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChipsService from '../../service/ChipsService';
import  InventoryService  from '../../service/inventoryService';
import TransacitonService from '../../service/TransactionService';
import InventoryIcon from '@mui/icons-material/Inventory';
import { NotificationImportant, GroupAdd } from '@mui/icons-material'; // Importação correta dos ícones

// Modal customizado
const StyledModalCustom = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const StyledBoxCustom = styled(Box)`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  overflow: hidden;
`;

// Título das notificações
const ModalTitleCustom = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

// Caixa de notificação
const NotificationWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
`;

// Ícone da notificação
const NotificationIconWrapper = styled.div`
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #eee;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Texto da notificação
const NotificationTextCustom = styled(Typography)`
  font-size: 0.875rem;
  color: #666;
  margin-top: 5px;
  flex-grow: 1;
`;

// Caixa de botões de ação
const ButtonWrapperCustom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
`;

// Botões estilizados
const StyledButtonCustom = styled(Button)`
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: bold;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
`;




const StyledBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 24;
  padding: 20px;
  border-color: white;
  border-radius: 8px;
  width: 300px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 8px auto;
  background-color: #00c050;
  transition: background-color 0.3s;

  &:hover {
    background-color: #009f40;
  }

  &:disabled {
    background-color: #bfbfbf;
    cursor: not-allowed;
  }
`;

const PackageButton = styled.button`
  padding: 10px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #00000089;
  text-align: left;
  width: 100%;
`;

const StyledToggleButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;







interface Notification {
  relaredId: string;
  relatedName: string;
  type: string;
  [key: string]: any; // Outros campos da notificação
}

interface FormValues {
  qnt: number;
}

const ButtonLogin = styled2.button`
  align-items: center;
  appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
    rgba(58, 65, 111, 0.5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  left: 15%;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  overflow: hidden;
  padding: 0 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;

  &:focus {
    box-shadow: #3c4fe0 0 0 0 1.5px inset,
      rgba(45, 35, 66, 0.4) 0 2px 4px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
      #3c4fe0 0 -3px 0 inset;
  }

  &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
      #3c4fe0 0 -3px 0 inset;
    transform: translateY(-1px);
  }

  &:active {
    box-shadow: #3c4fe0 0 3px 7px inset;
    transform: translateY(2px);
  }
`;

interface Transaction {
  id: string;
  type: string;
  status: string;
  chipId: string;
  chipsQty: number;
}

const StyledInput = styled(Field)`
  width: 95%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

interface HeaderProps {
  toggleActive: () => void;
  reloadBalance: () => void;
}

// Tipagem para os valores do Formulário
interface SaleClientRequestDTO {
  qnt: number;
  password: string;
  chipId: string; // chipId de onde for necessário pegar
}

interface SaleClientModalProps {
  isMPOpen: boolean;
  closeMPModal: () => void;
  saldo: number | null;
  modalStep: 'addFunds' | 'withdraw' | 'success';
  setModalStep: React.Dispatch<React.SetStateAction<'addFunds' | 'withdraw' | 'success'>>;
  isLoading: boolean;
  reloadBalance: () => void;
}

interface Data {
  relatedId: string;
  name: string;
}

const Header: React.FC<HeaderProps> = ({ toggleActive, reloadBalance  }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('');
  const [userName, setUserName] = useState<string | null>(null);
  const [saldo, setSaldo] = useState<number | null>(null);
  const [saldoFicha, setSaldoFicha] = useState<number | null>(null);
  const [userImage, setUserImage] = useState<string>(); 
  const authService = new AuthService();
  const chipsService = new ChipsService();
  const inventoryService = new InventoryService();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<string[]>([]); // Estado para as notificações
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false); // Controle do modal de notificações
  const [modalStep, setModalStep] = useState<'addFunds' | 'withdraw' | 'completed'>('addFunds');
  const [userBalance, setUserBalance] = useState(200); // Exemplo de saldo do usuário
  const [isMPOpen, setIsMPOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWithdrawLoading, setWithdrawLoading] = useState(false); // Estado de carregamento para saque
   const [transactions, setTransactions] = useState<Transaction[]>([]);
   const [transacoes, setTransacoes] = useState<any[]>([]); // Estado para armazenar as transações
  // Estado e funções para o modal de inventário
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false); // Estado para controlar a abertura/fechamento do modal
  const [selectedTab, setSelectedTab] = useState(0); // Inicializa com a primeira aba
  // Função para abrir o modal
  const openInventoryModal = () => {
    setInventoryModalOpen(true); // Define como true para abrir o modal
  };

  // Função para fechar o modal
  const closeInventoryModal = () => {
    setInventoryModalOpen(false); // Define como false para fechar o modal
  };
 
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);  // Atualiza o estado selecionado
  };
  
  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');
    if (storedLanguage) {
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
    loadUser();
    loadNotifications(); // Carregar notificações quando o componente for montado

    const handleStorageChange = () => {
      loadUser();
    };

    window.addEventListener('storage', handleStorageChange);
 
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [i18n]);



  const handleLoginRedirect = () => {
    navigate('/login');
  };

  

   // Função para carregar notificações (aqui com dados estáticos como exemplo)
  // const loadNotifications = () => {
   // setNotifications([
    //  'Convite para o Time Hades. Deseja aceitar ou recusar?',
   // ]);
  //};
  const noticiationService = new NotificationService;

  const trasactionService = new TransacitonService;
   // Função para carregar notificações
   const loadNotifications = async () => {
    const currentUserData = sessionStorage.getItem("currentUser"); // Recupera o ID do usuário do localStorage
     // Verifica se o dado existe e não é null
  if (!currentUserData) {
    console.log("null" + currentUserData)
    return;
  }

    try {
      const userData = JSON.parse(currentUserData);
      const userId = userData.id;
      console.log(userId);
      
      const notificationsData = await noticiationService.consult(userId); 

      console.log(notificationsData.data);
      
 if (Array.isArray(notificationsData.data)) {
  setNotifications(notificationsData.data);
   console.log("teste"+notificationsData)
} else {
 
}
} catch (error) {

console.error("Erro ao carregar notificações:", error);
}
};

  useEffect(() => {
    loadNotifications();
  }, []);  // Carregar notificações quando o componente for montado

  const loadUser = async () => {
    try {
      const user: User = await authService.getCacheUser();
      setUserName(user.nickname);
      //setSaldo(user.saldo);
      
      // Se a imagem for "user_default", use a URL da imagem padrão
      const imagePath = user.imagePath === 'user_default' 
        ? 'https://i.pinimg.com/originals/da/79/b2/da79b28dcd9942328cf71217a8bf9185.jpg' // URL da imagem padrão
        : `${user.image}`; // Caso contrário, use a URL do servidor
  console.log(imagePath);
  
      setUserImage(user.imagePath); // Atualiza o estado com a URL correta
  
      console.error(userImage);
    } catch (error) {
      console.error('Erro ao carregar o usuário:', error);
    }
  };

 // Função para lidar com o saque
// Função de saque (ajustada)
const handleWithdraw = async (values: SaleClientRequestDTO) => {
  const { qnt, password, chipId } = values; // Usa chipId do objeto values

  setWithdrawLoading(true);

  // Verificando se a quantidade de fichas solicitada é maior que o saldo
  if (qnt > saldo!) {
    alert('Você não tem fichas suficientes para esse saque.');
    setWithdrawLoading(false);
    return;
  }

  try {
    // Usa chipId do usuário ou um valor padrão (caso necessário)
    const finalChipId = chipId || "67b84e5a-3d6a-4e69-9647-30ec76ae8143";

    // Chama o serviço de venda de fichas
    const response = await chipsService.sellChip({
      qnt,        // Quantidade de fichas
      password,   // Senha do usuário
      chipId: finalChipId, // ChipId dinâmico ou fixo
    });

    alert('Saque realizado com sucesso!');
    reloadBalance(); // Atualiza o saldo após o saque

  } catch (error) {
    console.error('Erro ao fazer o saque:', error);
    console.log('Dados enviados:', { qnt, password, chipId });
    alert('Erro ao realizar saque. Tente novamente.');
  } finally {
    setWithdrawLoading(false);
  }
};

  useEffect(() => {
    // Criando uma função assíncrona dentro do useEffect
    const fetchData = async () => {
      try {
        const response = await chipsService.consult(); // Chama a função consult() e aguarda a resposta
        console.log('Dados dos chips:', response.data); // Exibe os dados no console
      } catch (error) {
        console.error('Erro ao consultar chips:', error); // Exibe erro, se ocorrer
      }
    };

    fetchData(); // Chama a função assíncrona para executar a consulta

    // Aqui, não é necessário retornar nada, então retornamos 'undefined' ou nada mesmo
    return () => {}; // Função de cleanup (não faz nada neste caso)
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await trasactionService.consult(); // Chama o serviço de transações
        console.log('Dados do transaction:', response.data.content);

        if (response.data && response.data.content.length > 0) {
          setTransacoes(response.data.content); // Atualiza as transações
          setSaldo(response.data.content[0]?.qnt || 0); // Atualiza o saldo com a quantidade do primeiro item (ajustado conforme necessário)
        } else {
          console.error('Nenhum item encontrado no inventário.');
        }
      } catch (error) {
        console.error('Erro ao consultar chips:', error);
      }
    };

    fetchData(); // Chama a função de fetch
  }, []);
  useEffect(() => {
    console.log(saldo); 
  }, [saldo]); 
  
  
  useEffect(() => {
    // Criando uma função assíncrona dentro do useEffect
    const fetchData = async () => {
      try {
        const response = await inventoryService.getInventory(); // Chama a função consult() e aguarda a resposta
        console.log('Dados do Inventory:', response.data); // Exibe os dados no console
      
        // Verifica se o array de dados não está vazio e pega o valor de qnt do primeiro item
        if (response.data && response.data.length > 0) {
          console.log(`saldo ${response.data[0].qnt}`);
          setSaldoFicha(response.data[0].qnt); // Atualiza o saldo com o valor de qnt do primeiro item
        } else {
          console.error('Nenhum item encontrado no inventário.');
        }
      } catch (error) {
        console.error('Erro ao consultar chips:', error); // Exibe erro, se ocorrer
      }
    };

    fetchData(); // Chama a função assíncrona
  }, []); 

    const openNotificationsModal = () => setIsNotificationsOpen(true);
    const closeNotificationsModal = () => setIsNotificationsOpen(false);

    const handleAccept = async (index: number) => {
      console.log("Notificação Aceita:", notifications[index]);  // Verifique o conteúdo aqui
    
      const updatedNotifications = notifications.filter((_, i) => i !== index);
      setNotifications(updatedNotifications);
    
      const currentUserData = sessionStorage.getItem("currentUser");
      if (!currentUserData) {
        console.log("User data is null");
        return;
      }
    
      try {
        const userData = JSON.parse(currentUserData);
        const userId = userData.id;
        const notification = notifications[index];
    
        const notificationObj = {
          id: notification.relatedId,  
          userId: notification.relatedId,
        };
    
        console.log("Enviando notificação:", notificationObj);
        await noticiationService.accept(notificationObj);
        console.log("Notificação aceita com sucesso!");
      } catch (error) {
        console.error("Erro ao aceitar a notificação:", error);
      }
    };
    

    const openMPModal = () => setIsMPOpen(true);
    const closeMPModal = () => setIsMPOpen(false);

    const handleReject = async (index: number) => {

      console.log("Notificação Recusada", notifications[index]);  // Verifique o conteúdo aqui
    
      const updatedNotifications = notifications.filter((_, i) => i !== index);
      setNotifications(updatedNotifications);
    
      const currentUserData = sessionStorage.getItem("currentUser");
      if (!currentUserData) {
        console.log("User data is null");
        return;
      }
    
      try {
        const userData = JSON.parse(currentUserData);
        const userId = userData.id;
        const notification = notifications[index];
    
        const notificationObj = {
          id: notification.relatedId,  // Verifique aqui se o ID está vindo corretamente
          userId: notification.relatedId,
        };
    
        console.log("Enviando notificação:", notificationObj);
        await noticiationService.reject(notificationObj);
        console.log("Notificação recusada com sucesso!");
      } catch (error) {
        console.error("Erro ao aceitar a notificação:", error);
      }
    };
    
    const validationSchema = Yup.object().shape({
      unit_price: Yup.number()
        .typeError('Insira um valor válido')
        .min(1, 'O valor deve ser maior que zero')
        .required('Este campo é obrigatório'),
    });

  const openModal = () => 
    setIsOpen(true)
  ;

     // Redirecionamento
     if (redirectUrl) {
      window.location.href = redirectUrl;
      return null;
    }

  const closeModal = () => setIsOpen(false);
  
  const handleTranslate = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    closeModal();
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'pt':
        return 'Portuguese-BR';
      case 'eng':
        return 'English';
      case 'jpn':
        return '日本語';
      case 'fr':
        return 'Français';
      case 'ko':
        return '한국어'; 
      case 'ru':
        return 'Русский'; 
      case 'de':
        return 'Deutsch'; 
      case 'zh':
        return '中文'; 
      default:
        return t('Select a language');
    }
  };
  const handleSearch = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
   console.log("ola")
    setIsLoading(true);
  
    try {
      const response = await chipsService.buyChip(values.qnt); // Usando await corretamente
      setRedirectUrl(response.data.init_point); 
      console.log(response.data.init_point)
      closeModal();
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Ocorreu um erro ao processar seu pagamento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const getLanguageFlag = () => {
    switch (language) {
      case 'pt':
        return '/imagens/bandeiras/ptbr.webp';
      case 'eng':
        return '/imagens/bandeiras/en.webp';
      case 'jpn':
        return '/imagens/bandeiras/jpn.webp';
      case 'fr':
        return '/imagens/bandeiras/fran.svg'; 
      case 'ko':
        return '/imagens/bandeiras/Flag_of_South_Korea.svg.png'; 
      case 'ru':
        return '/imagens/bandeiras/ru.png'; 
      case 'de':
        return '/imagens/bandeiras/ger.svg'; 
      case 'zh':
        return '/imagens/bandeiras/china.png'; 
      default:
        return ''; 
    }
  };

  

  return (
    <header>
      <a href="#" className="menu" onClick={toggleActive}>
        <MenuIcon />
      </a>
      <div className="userItems">
      <a href="#" className="icon" onClick={openNotificationsModal}>
          <CircleNotificationsIcon />
          <span className="like">{notifications.length}</span> {/* Exibe o número de notificações */}
        </a>
        <a href="#" className="icon" onClick={openMPModal}>
          <MonetizationOnIcon />
        </a>
        <a href="#" className="icon" onClick={openInventoryModal}>
      <InventoryIcon /> {/* Use o ícone desejado para o Inventário */}
    </a>

        <Modal 
          open={isOpen}
          onClose={closeModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <StyledBox>
            {language && (
              <img 
                src={getLanguageFlag() || '/imagens/bandeiras/ptbr.webp'} 
                alt="Flag" 
                style={{ width: 50, height: 30, display: 'block', margin: '0 auto' }} 
              />
            )}
            <Typography id="modal-title" variant="h6" component="h2">
              {t('Choose Language')}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              {t('Select a language for translation:')}
            </Typography>
            <FormControl fullWidth>
              {language === '' && <InputLabel id="language-select-label">{t('Select Language')}</InputLabel>}
              <Select
                labelId="language-select-label"
                value={language}
                onChange={(e) => handleTranslate(e.target.value)}
                displayEmpty
                renderValue={(selected) => selected !== '' ? getLanguageLabel() : t('Select a language')}
              >
                <MenuItem value="">
                  <em>{t('Select a language')}</em>
                </MenuItem>
                <MenuItem value="pt">
                  <img src="/imagens/bandeiras/ptbr.webp" alt="Portuguese" style={{ width: 25, height: 20, marginRight: 8 }} />
                  Portuguese-BR
                </MenuItem>
                <MenuItem value="eng">
                  <img src="/imagens/bandeiras/en.webp" alt="English" style={{ width: 25, height: 20, marginRight: 8 }} />
                  English
                </MenuItem>
                <MenuItem value="jpn">
                  <img src="/imagens/bandeiras/jpn.webp" alt="日本語" style={{ width: 25, height: 20, marginRight: 8 }} />
                  日本語
                </MenuItem>
                <MenuItem value="fr">
                  <img src="/imagens/bandeiras/fran.svg" alt="Français" style={{ width: 25, height: 20, marginRight: 8 }} />
                  Français
                </MenuItem>
                <MenuItem value="ko">
                  <img src="/imagens/bandeiras/Flag_of_South_Korea.svg.png" alt="한국어" style={{ width: 25, height: 20, marginRight: 8 }} />
                  한국어
                </MenuItem>
                <MenuItem value="ru">
                  <img src="/imagens/bandeiras/ru.png" alt="Русский" style={{ width: 25, height: 20, marginRight: 8 }} />
                  Русский
                </MenuItem>
                <MenuItem value="de">
                  <img src="/imagens/bandeiras/ger.svg" alt="Deutsch" style={{ width: 25, height: 20, marginRight: 8 }} />
                  Deutsch
                </MenuItem>
                <MenuItem value="zh">
                  <img src="/imagens/bandeiras/china.png" alt="中文" style={{ width: 25, height: 20, marginRight: 8 }} />
                  中文
                </MenuItem>
              </Select>
            </FormControl>
            <Button onClick={closeModal} style={{ marginTop: '10px' }}>{t('Close')}</Button>
          </StyledBox>
        </Modal>

        <a href="#" className="icon">
          <GTranslateIcon onClick={openModal} />
        </a>

        <div className="avatar">
          {userName ? (
            <>
              <a href="#" className="icon">
                <img 
                  src={userImage} 
                  alt="User Image" 
                  onError={(e) => { e.currentTarget.src = 'default-image-url.jpg'; }} 
                />
              </a>
              <div className="user">
                <span>{userName}</span>
              
              </div>
            </>
          ) : (
            <ButtonLogin onClick={handleLoginRedirect}>
            {t('LOGIN')}
          </ButtonLogin>
          )}
        </div>
      </div>

      <StyledModalCustom
      open={isNotificationsOpen}
      onClose={closeNotificationsModal}
      aria-labelledby="notifications-modal-title"
      aria-describedby="notifications-modal-description"
    >
      <StyledBoxCustom>
        <ModalTitleCustom id="notifications-modal-title" variant="h6" component="h2">
          {t('Notifications')}
        </ModalTitleCustom>
        <div id="notifications-modal-description" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {notifications.length > 0 ? (
            notifications.slice(0, 5).map((notification, index) => (
              <NotificationWrapper key={index}>
                <NotificationIconWrapper>
                  {notification.type === 'TEAM_INVITE' ? (
                    <GroupAdd color="primary" />
                  ) : (
                    <NotificationImportant color="error" />
                  )}
                </NotificationIconWrapper>
                <div style={{ flexGrow: 1 }}>
                  <NotificationTextCustom variant="body2">{notification.type}</NotificationTextCustom>
                  {notification.type === 'TEAM_INVITE' && (
                    <ButtonWrapperCustom>
                      <StyledButtonCustom
                        variant="contained"
                        color="primary"
                        onClick={() => handleAccept(index)}
                      >
                        Aceitar
                      </StyledButtonCustom>
                      <StyledButtonCustom
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleReject(index)}
                      >
                        Recusar
                      </StyledButtonCustom>
                    </ButtonWrapperCustom>
                  )}
                </div>
              </NotificationWrapper>
            ))
          ) : (
            <NotificationTextCustom variant="body2">{t('No notifications...')}</NotificationTextCustom>
          )}
        </div>
      </StyledBoxCustom>
    </StyledModalCustom>

    <Modal
      open={isMPOpen}
      onClose={closeMPModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          padding: 2,
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
        }}
      >
        <Typography variant="h6">
          {modalStep === 'addFunds' ? 'Adicionar Fichas' : 'Saque de Fichas'}
        </Typography>

        <Button
          variant="outlined"
          sx={{ marginTop: 2 }}
          onClick={() => setModalStep(prev => (prev === 'addFunds' ? 'withdraw' : 'addFunds'))}
        >
          {modalStep === 'addFunds' ? 'Ir para Sacar' : 'Ir para Adicionar Fichas'}
        </Button>

        {modalStep === 'addFunds' ? (
          <Formik
            initialValues={{ qnt: 0 }}
            onSubmit={handleSearch}
          >
            {({ setFieldValue, values }) => (
              <FormikForm>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1">
                    {saldo != null ? `Fichas disponíveis: ${saldo} Fichas` : 'Fichas não disponíveis'}
                  </Typography>

                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    {values.qnt != null ? `Fichas a adicionar: ${values.qnt} Fichas` : ''}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                    <Button type="button" onClick={() => setFieldValue('qnt', 1)}>
                      <FaCoins /> 1 Ficha
                    </Button>
                    <Button type="button" onClick={() => setFieldValue('qnt', 2)}>
                      <FaCoins /> 2 Fichas
                    </Button>
                    <Button type="button" onClick={() => setFieldValue('qnt', 5)}>
                      <FaCoins /> 5 Fichas
                    </Button>
                    <Button type="button" onClick={() => setFieldValue('qnt', 10)}>
                      <FaCoins /> 10 Fichas
                    </Button>
                  </Box>
                </Box>

                <TextField
                  type="number"
                  id="qnt"
                  name="qnt"
                  placeholder="Digite a quantidade de fichas"
                  fullWidth
                  sx={{ marginTop: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{ marginTop: 2 }}
                >
                  {isLoading ? 'Carregando...' : 'Comprar'}
                </Button>
              </FormikForm>
            )}
          </Formik>
        ) : modalStep === 'withdraw' ? (
          <Formik
            initialValues={{ qnt: 0, password: '', chipId: '67b84e5a-3d6a-4e69-9647-30ec76ae8143' }}
            onSubmit={handleWithdraw}
          >
            {({ setFieldValue, values }) => (
              <FormikForm>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1">
                    Fichas atuais: {saldoFicha !== null ? `${saldoFicha} Fichas` : 'Carregando...'}
                  </Typography>

                  {saldoFicha ? (
                    <>
                      {/* Insígnias Estilo Pokémon */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FaCoins size={24} color="gold" />
                          <Typography variant="body2">{saldoFicha} Fichas</Typography>
                        </Box>
                      </Box>

                      {/* Campo de quantidade para saque */}
                      <TextField
                        type="number"
                        id="qnt"
                        name="qnt"
                        placeholder="Quantidade a sacar"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onChange={e => setFieldValue('qnt', e.target.value)}
                        value={values.qnt}
                      />
                      <TextField
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Digite sua senha"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onChange={e => setFieldValue('password', e.target.value)}
                        value={values.password}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{ marginTop: 2 }}
                      >
                        {isLoading ? 'Carregando...' : 'Sacar'}
                      </Button>
                    </>
                  ) : (
                    <Typography variant="body2">
                      Saldo insuficiente para saque (mínimo de 50 fichas).
                    </Typography>
                  )}
                </Box>
              </FormikForm>
            )}
          </Formik>
        ) : (
          <Box>
            <Typography variant="body1">Saque realizado com sucesso!</Typography>
            <Button
              variant="contained"
              onClick={() => handleWithdraw}
              sx={{ marginTop: 2 }}
            >
              Fechar
            </Button>
          </Box>
        )}

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2">1 ficha = 5 reais</Typography>
        </Box>
      </Box>
    </Modal>

  


<Dialog open={inventoryModalOpen} onClose={closeInventoryModal} fullWidth>
        <DialogTitle>
          <InventoryIcon /> Inventário
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%' }}>
            <Tabs value={selectedTab} onChange={handleTabChange} aria-label="inventory tabs">
              <Tab label="Carteira de Fichas" />
              <Tab label="Histórico de Transações" />
            </Tabs>
            {selectedTab === 0 && (
              <Box sx={{ padding: 2 }}>
                {/* Seção da Carteira de Fichas */}
                <h3>Quantidade de Fichas</h3>
                <p>Você tem {saldoFicha} fichas em sua carteira.</p>
              </Box>
            )}
            {selectedTab === 1 && (
              <Box sx={{ padding: 2 }}>
                {/* Seção do Histórico de Transações */}
                <h3>Histórico de Transações</h3>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Quantidade de Fichas</TableCell>
                      
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transacoes.map((transacao) => (
                        <TableRow key={transacao.id}>
                          <TableCell>{transacao.type}</TableCell>
                          <TableCell>{transacao.status}</TableCell>
                          <TableCell>{transacao.chipsQty}</TableCell>
                       
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeInventoryModal} color="primary">Fechar</Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;
