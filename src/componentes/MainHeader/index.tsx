import React, { useState, useEffect } from 'react';
import './header.css';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MenuIcon from '@mui/icons-material/Menu';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { Modal, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import AuthService, { User } from "../../service/authService";
import http from '../../http';
import { useNavigate } from "react-router-dom";
import styled2 from "@emotion/styled";
import NotificationService from '../../service/notificationService';

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

interface Notification {
  relaredId: string;
  relatedName: string;
  type: string;
  [key: string]: any; // Outros campos da notificação
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






interface HeaderProps {
  toggleActive: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleActive }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('');
  const [userName, setUserName] = useState<string | null>(null);
  const [saldo, setSaldo] = useState<number | null>(null);
  const [userImage, setUserImage] = useState<string>(); 
  const authService = new AuthService();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<string[]>([]); // Estado para as notificações
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false); // Controle do modal de notificações

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
  
    // Funções para abrir e fechar o modal de notificações
    const openNotificationsModal = () => setIsNotificationsOpen(true);
    const closeNotificationsModal = () => setIsNotificationsOpen(false);

    const handleAccept = async (index: number) => {
      console.log(`Notificação ${index} aceita`);
    
      // Exemplo: Remove a notificação da lista (pode ser ajustado conforme o caso real)
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
        const notification = notifications[index]; // Pegando a notificação a partir do índice
    
        // Criação da notificação completa
        const notificationObj = {
          id: notification.id, 
          userId: userId, 
        };
    
        // Envia a solicitação para o back-end para aceitar a notificação
        await noticiationService.accept(notificationObj);
        console.log("Notificação aceita com sucesso!");
        
      } catch (error) {
        console.error("Erro ao aceitar a notificação:", error);
      }
    };
    

   // Função para tratar o rejeite de uma solicitação
   const handleReject = async(index: number) => {
    console.log(`Notificação ${index} Recusada`);
    
    // Exemplo: Remove a notificação da lista (pode ser ajustado conforme o caso real)
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
      const notification = notifications[index]; // Pegando a notificação a partir do índice
  
      // Criação da notificação completa
      const notificationObj = {
        id: notification.id, 
        userId: userId, 
      };
  
      // Envia a solicitação para o back-end para aceitar a notificação
      await noticiationService.reject(notificationObj);
      console.log("Notificação aceita com sucesso!");
      
    } catch (error) {
      console.error("Erro ao aceitar a notificação:", error);
    }
  };

 

  const openModal = () => 
    setIsOpen(true)
  
  
  
  ;
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
        <a href="#" className="icon">
          <Brightness6Icon />
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
                src={getLanguageFlag()} 
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

      <Modal 
  open={isNotificationsOpen}
  onClose={closeNotificationsModal}
  aria-labelledby="notifications-modal-title"
  aria-describedby="notifications-modal-description"
>
  <StyledBox style={{ width: '300px' }}>
    <Typography id="notifications-modal-title" variant="h6" component="h2">
      {t('Notifications')}
    </Typography>
    <div id="notifications-modal-description" style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '10px' }}>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <Typography variant="body2">{notification.type}</Typography>
            {notification.type === 'TEAM_INVITE' && (
              <div style={{ marginTop: '10px' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleAccept(index)}
                  style={{ marginRight: '10px' }}
                >
                  Aceitar
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={() => handleReject(index)}
                >
                  Recusar
                </Button>
              </div>
            )}
          </div>
        ))
      ) : (
        <Typography variant="body2">{t('No notifications...')}</Typography>
      )}
    </div>
  </StyledBox>
</Modal>
    </header>
  );
};

export default Header;
