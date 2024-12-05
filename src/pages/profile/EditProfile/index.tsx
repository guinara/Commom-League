import React, { useEffect, useState } from 'react';

import { styled } from 'styled-components';
import EstilosGlobais from '../../../componentes/GlobaStyle';
import Perfil from '../../../componentes/Perfil';
import UserList from '../../../componentes/userList';
import SideMenu from '../../../componentes/mainSideBar/SideMenu';
import Header from '../../../componentes/MainHeader';
import * as Components from './component';
import { Formik, FormikHelpers } from "formik";
import AuthService, { User } from "../../../service/authService";
import http from '../../../http';
import axios from 'axios';
import FileService from "../../../service/fileService";
import CreateAutoComplete from '../../../componentes/optionTest';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const currentUserString = sessionStorage.getItem('currentUser');
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  const authService = new AuthService();
  const fileService = new FileService();



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
      const response = await authService.general(values, actions);
      toast.success(response);

      console.log(values)
      // Atualizando os dados do usuário no cache
      const updatedUser = { ...user, ...values };
      updateUserInCache(updatedUser); // Atualiza o cache com os novos dados
    } catch (error) {
      console.error("Erro ao salvar informações gerais:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleAvatarSubmit = async (values: any) => {
    const formData = new FormData();
    
    formData.append("file", values.image); 
    formData.append("userId", values.userId); 
  
    const token = sessionStorage.getItem("authToken"); 
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/files/${currentUser ? currentUser.image : 'Error'}`, 
        formData, 
        { headers }
      );
      toast.success("Avatar Salvo:");
    } catch (error) {
      toast.error("ERRO - Avatar");
      console.error("Erro ao salvar Avatar:", error);
    }
  };

  const handleLanguagePreferencesSubmit = async (values: any) => {
    try {
      const response = await axios.put(`${http.defaults.baseURL}/api/user/updateLanguagePreferences`, values);
      console.log("Language Preferences Saved:", response.data);

      // Atualizando os dados de preferências de linguagem no sessionStorage
      const updatedUser = { ...user, language: values.language, leagueRegion: values.leagueRegion };
      updateUserInCache(updatedUser);
    } catch (error) {
      console.error("Error saving Language Preferences:", error);
    }
  };

  const handleAccountDetailsSubmit = async (values: any) => {
    try {
      const response = await axios.put(`${http.defaults.baseURL}/api/user/updateAccountDetails`, values);
      console.log("Account Details Saved:", response.data);

      // Atualizando os detalhes da conta no sessionStorage
      const updatedUser = { ...user, ...values };
      updateUserInCache(updatedUser);
    } catch (error) {
      console.error("Error saving Account Details:", error);
    }
  };

  const handleRiotDetailsSubmit = async (values: any) => {
    try {
      const response = await axios.put(`${http.defaults.baseURL}/api/user/updateRiotDetails`, values);
      console.log("Riot Details Saved:", response.data);

      // Atualizando os detalhes da conta Riot no sessionStorage
      const updatedUser = { ...user, AccountRiot: { ...user?.AccountRiot, ...values } };
      updateUserInCache(updatedUser);
    } catch (error) {
      console.error("Error saving Riot Details:", error);
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

        <Components.formEditLabel htmlFor="fullName">Real Name</Components.formEditLabel>
        <Components.formEditInput
          type="text"
          id="fullName"
          name="fullName"
          onChange={(e) => {
            handleChange(e);
            setFieldValue('fullName', e.target.value); // Atualiza o campo em tempo real
          }}
          value={values.fullName}
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


            {/* Avatar Form */}
            {selectedOption === 'Avatar' && (
     <Formik
     initialValues={{ image: null }}
     onSubmit={handleAvatarSubmit}
   >
     {({ setFieldValue, handleSubmit, isSubmitting, values }) => (
       <Components.formEditProfile autoComplete="off" onSubmit={handleSubmit}>
         <input
           type="file"
           accept="image/*"
           onChange={(e) => {
             const file = e.target.files ? e.target.files[0] : null;
             if (file) {
               setFieldValue('image', file);
               setPreviewImage(URL.createObjectURL(file)); // Atualiza a pré-visualização
             }
           }}
         />
         
         {/* Mostrar a pré-visualização da imagem, se houver */}
         {previewImage && (
           <div>
             <img 
               src={previewImage} 
               alt="Preview" 
               style={{ width: '150px', height: '150px', objectFit: 'cover', marginTop: '10px' }} 
             />
           </div>
         )}
         
         <Components.buttonSave type="submit" disabled={isSubmitting}>
           Save Avatar
         </Components.buttonSave>
       </Components.formEditProfile>
     )}
   </Formik>
            )}

            {/* Language Preferences Form */}
            {selectedOption === 'Language Preferences' && (
              <Formik
                initialValues={{
                  language: currentUser?.language || '',
                  leagueRegion: currentUser?.leagueRegion || '',
                }}
                onSubmit={handleLanguagePreferencesSubmit}
              >
                {({ handleChange, values, handleSubmit, isSubmitting }) => (
                  <Components.formEditProfile autoComplete="off" onSubmit={handleSubmit}>
                    <Components.formEditLabel htmlFor="language">Language</Components.formEditLabel>
                    <Components.formEditInput
                      type="text"
                      id="language"
                      name="language"
                      onChange={handleChange}
                      value={values.language}
                    />

                    <Components.formEditLabel htmlFor="leagueRegion">League Region</Components.formEditLabel>
                    <Components.formEditInput
                      type="text"
                      id="leagueRegion"
                      name="leagueRegion"
                      onChange={handleChange}
                      value={values.leagueRegion}
                    />

                    <Components.buttonSave type="submit" disabled={isSubmitting}>Save Language Preferences</Components.buttonSave>
                  </Components.formEditProfile>
                )}
              </Formik>
            )}

            {/* Account Details Form */}
            {selectedOption === 'Account Detail' && (
              <Formik
                initialValues={{
                  email: currentUser?.email || '',
                  userName: currentUser?.userName || '',
                  password: '',
                  newPassword: '',
                  confirmNewPassword: '',
                  cpf: currentUser?.cpf || '',
                  telefone: currentUser?.telefone || '',
                }}
                onSubmit={handleAccountDetailsSubmit}
              >
                {({ handleChange, values, handleSubmit, isSubmitting }) => (
                  <Components.formEditProfile autoComplete="off" onSubmit={handleSubmit}>
                    <Components.formEditLabel htmlFor="email">Email</Components.formEditLabel>
                    <Components.formEditInput
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                    />

                    <Components.formEditLabel htmlFor="userName">Username</Components.formEditLabel>
                    <Components.formEditInput
                      type="text"
                      id="userName"
                      name="userName"
                      onChange={handleChange}
                      value={values.userName}
                    />

                    <Components.formEditLabel htmlFor="password">Password</Components.formEditLabel>
                    <Components.formEditInput
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                    />

                    <Components.formEditLabel htmlFor="newPassword">New Password</Components.formEditLabel>
                    <Components.formEditInput
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      onChange={handleChange}
                      value={values.newPassword}
                    />

                    <Components.formEditLabel htmlFor="confirmNewPassword">Confirm New Password</Components.formEditLabel>
                    <Components.formEditInput
                      type="password"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      onChange={handleChange}
                      value={values.confirmNewPassword}
                    />

                    <Components.formEditLabel htmlFor="cpf">CPF</Components.formEditLabel>
                    <Components.formEditInput
                      type="text"
                      id="cpf"
                      name="cpf"
                      onChange={handleChange}
                      value={values.cpf}
                    />

                    <Components.formEditLabel htmlFor="telefone">Phone</Components.formEditLabel>
                    <Components.formEditInput
                      type="text"
                      id="telefone"
                      name="telefone"
                      onChange={handleChange}
                      value={values.telefone}
                    />

                    <Components.buttonSave type="submit" disabled={isSubmitting}>Save Account Details</Components.buttonSave>
                  </Components.formEditProfile>
                )}
              </Formik>
            )}

            {/* Riot Details Form */}
            {selectedOption === 'Riot Detail' && (
              <Formik
                initialValues={{
                  gameName: currentUser?.AccountRiot?.gameName || '',
                  tagLine: currentUser?.AccountRiot?.tagLine || '',
                  leagueRegion: currentUser?.AccountRiot?.leagueRegion || '',
                }}
                onSubmit={handleRiotDetailsSubmit}
              >
                {({ handleChange, values, handleSubmit, isSubmitting }) => (
                  <Components.formEditProfile autoComplete="off" onSubmit={handleSubmit}>
                    <Components.formEditLabel htmlFor="gameName">Riot Username</Components.formEditLabel>
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

                    <Components.buttonSave type="submit" disabled={isSubmitting}>Save Riot Details</Components.buttonSave>
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
