import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import EstilosGlobais from '../../../componentes/GlobaStyle';
import SideMenu from '../../../componentes/mainSideBar/SideMenu';
import Header from '../../../componentes/MainHeader';
import * as Components from './component';
import { Formik, FormikHelpers, useFormik } from "formik";
import AuthService, { User } from "../../../service/AuthService";
import http from '../../../http';
import axios from 'axios';
import lolAccountService from "../../../service/lolAccountService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'react-hook-form';
import UserService from '../../../service/userService';

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
  const [active, setActive] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedOption, setSelectedOption] = useState('General');
  const [userImage, setUserImage] = useState<string>('../../../public/imagens/userIcons/0.jpg');
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Estado para a pré-visualização da imagem
  const [accountDetails, setAccountDetails] = useState<{ gameName: string, tagLine: string }>({
    gameName: '',
    tagLine: ''
  });
  const currentUserString = sessionStorage.getItem('currentUser');
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  const authService = new AuthService();
  const LolAccountService = new lolAccountService;
  const userService = new UserService;
  const [ativo, setAtivo] = useState(true); // Definindo o valor inicial como 'true'

  

  const formik = useFormik({
    initialValues: {
      gameName: '',
      tagLine: ''
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

  useEffect(() => {
    const fetchRiotAccountDetails = async () => {
      try {
        const response = await LolAccountService.findCurrentAccount();
        const { gameName, tagLine } = response.data;
        
        setAccountDetails({ gameName, tagLine });

        // Atualiza os valores no Formik usando setValues
        formik.setValues({
          gameName,
          tagLine
        });

        setActive(true)
      } catch (error) {
        setActive(false)
        console.error("Erro ao buscar os dados da conta Riot:", error);
      }
    };

    fetchRiotAccountDetails();
  }, []); // Executa o efeito uma vez ao montar o componente
  useEffect(() => {
    if (currentUser && !isUserFetched) {
      authService.findById(currentUser.id)
        .then(fetchedUser => {
          setUser(fetchedUser);
          setIsUserFetched(true);
          console.log(currentUser.image);
          const imagePath = currentUser.image;
          const url = `${http.defaults.baseURL}api/files/${imagePath}`;
          setUserImage(url);
        })
        .catch(error => {
          console.error("Erro ao buscar usuário:", error);
        });
    }
  }, [currentUser, isUserFetched]);


 const updateUserInCache = (updatedUser: User) => {
  console.log(updatedUser.image);
  sessionStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Atualiza o cache
  console.log(updatedUser.image);
  setUser(updatedUser); 
  console.log(updatedUser.country);
  const imagePath = updatedUser.image || sessionStorage.getItem(currentUser.image); 
  const url = `${http.defaults.baseURL}api/files/${imagePath}`;
  setUserImage(url); 
};

  const handleFormSubmitGeneral = async (
    values: any,
    actions: FormikHelpers<any>
  ) => {
    actions.setSubmitting(true);
    try {
      const response = await userService.update(values);
      toast.success(response.data);

      console.log(values)
      // Atualizando os dados do usuário no cache
      const updatedUser = { ...user, ...values };
      updateUserInCache(updatedUser); // Atualiza o cache com os novos dados
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar informações gerais:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };



  const handleRiotDetailsSubmit = async (values: any) => {
    try {
      const response = await http.post('/lol/account', {
        gameName: values.gameName,
        tagLine: values.tagLine,
      });
  
      console.log("Riot Details Saved:", response.data);
      toast.success("Riot Details updated successfully!");
      window.location.reload();
    } catch (error) {
      // Verificando se o erro é um erro do Axios
      if (axios.isAxiosError(error)) {
        console.error("Error saving Riot Details:", error);
        console.error("Error response:", error.response);  // Verifique toda a resposta aqui
  
        // Tente acessar diretamente o erro completo para ver o status e a mensagem
        toast.error(`Error: ${error.response?.data?.message || error.response?.statusText || 'Unknown error'}`);
      } else {
        console.error("Unknown error:", error);
        toast.error("Unknown error occurred.");
      }
    }
  };

  return (
    <Components.Main>
      <Backgroundgradient>
        <SideMenu active={active} />
        <Components.Banner className={`banner ${active ? 'active' : ''}`}>
          <Header toggleActive={() => setActive(!active)} />
          <Components.UserBanner>
            <Components.avatarSpan>{currentUser ? currentUser.nickname : 'Error'}</Components.avatarSpan>
            <Components.avatarEditProfileSpan>EditProfile</Components.avatarEditProfileSpan>
            <Components.avatar>
              <Components.avatarA href="#"> </Components.avatarA>
              <a href="#" className="icon">
                <Components.avatarImg src={currentUser.imagePath} alt="User Image" />
              </a>
            </Components.avatar>

            <Components.UserOptionsEditBanner>
              <Components.optionDiv>
                <Components.optionLi onClick={() => setSelectedOption('General')}>General</Components.optionLi>
                <Components.optionLi onClick={() => setSelectedOption('Riot Detail')}>Riot Detail</Components.optionLi>
              </Components.optionDiv>
            </Components.UserOptionsEditBanner>
          </Components.UserBanner>

          <Components.UserFormEditBanner>
            {/* General Form */}
            {selectedOption === 'General' && (
  <Formik
    initialValues={{
      nickname: currentUser?.nickname || '',
      fullName: currentUser?.fullName || '',
      pixKey: currentUser?.pixKey || '', // Adicionado o campo para 'pixKey'
      password: '', // Iniciando o campo de senha como vazio
      confirmNewPassword: '', // Iniciando o campo de confirmação de senha como vazio
    }}
    enableReinitialize={true}
    onSubmit={handleFormSubmitGeneral}
  >
    {({ handleChange, values, handleSubmit, isSubmitting, setFieldValue }) => (
      <Components.formEditProfile autoComplete="off" onSubmit={handleSubmit}>
        <Components.formEditLabel htmlFor="nickname">Profile Name</Components.formEditLabel>
        <Components.formEditInput
          type="text"
          id="nickname"
          name="nickname"
          onChange={(e) => {
            handleChange(e);
            setFieldValue('nickname', e.target.value); // Atualiza o campo em tempo real
          }}
          value={values.nickname}
        />

        <Components.formEditLabel htmlFor="pixKey">Pix Key</Components.formEditLabel>
        <Components.formEditInput
          type="text"
          id="pixKey"
          name="pixKey"
          onChange={(e) => {
            handleChange(e);
            setFieldValue('pixKey', e.target.value); // Atualiza o campo em tempo real
          }}
          value={values.pixKey} // Corrigido para 'pixKey' no valor
        />

        <Components.formEditLabel htmlFor="password">Password</Components.formEditLabel>
        <Components.formEditInput
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={values.password}
        />

        <Components.formEditLabel htmlFor="confirmNewPassword">Confirm New Password</Components.formEditLabel>
        <Components.formEditInput
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          onChange={handleChange}
          value={values.confirmNewPassword}
        />

        <Components.buttonSave type="submit" disabled={isSubmitting}>Save</Components.buttonSave>
      </Components.formEditProfile>
    )}
  </Formik>
)}




{selectedOption === 'Riot Detail' && (
  <Formik
    initialValues={{
      gameName: accountDetails.gameName,
      tagLine: accountDetails.tagLine
    }}
    onSubmit={handleRiotDetailsSubmit}
  >
    {({ handleChange, values, handleSubmit, isSubmitting }) => (
      <Components.formEditProfile autoComplete="off" onSubmit={handleSubmit}>
        <Components.formEditLabel htmlFor="gameName">Game Name</Components.formEditLabel>
        <Components.formEditInput
          type="text"
          id="gameName"
          name="gameName"
          onChange={handleChange}
          value={values.gameName}
        />

        <Components.formEditLabel htmlFor="tagLine">Tag</Components.formEditLabel>
        <Components.formEditInput
          type="text"
          id="tagLine"
          name="tagLine"
          onChange={handleChange}
          value={values.tagLine}
        />

        <Components.buttonSave 
        type="submit" hidden={active}>Save Riot Details</Components.buttonSave>
        
        {/* Botão de Desconectar */}
        <Components.buttonSave
          type="button"  // Tipo 'button' para não enviar o formulário
          hidden={!active}
          onClick={async () => {
            try {
              const response = await LolAccountService.disconnect(); // Chama a função de desconectar
              console.log("Desconectado com sucesso:", response);
              toast.success("Riot account disconnected successfully!");
              setAccountDetails({ gameName: '', tagLine: '' });  // Limpa os dados da conta
            } catch (error) {
              console.error("Erro ao desconectar:", error);
              toast.error("Error disconnecting from Riot account.");
            }
          }}
        >
          Disconnect Riot Account
        </Components.buttonSave>
      </Components.formEditProfile>
    )}
  </Formik>
            )}
          </Components.UserFormEditBanner>
        </Components.Banner>

        <EstilosGlobais />
      </Backgroundgradient>
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={true} 
        closeOnClick={true} 
        draggable={false} 
        pauseOnHover={true} 
      />
    </Components.Main>
    
    
    
  );
};

export default App;
