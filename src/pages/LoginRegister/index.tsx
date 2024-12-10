import React, { useEffect } from 'react';
import { styled } from "styled-components";
import EstilosGlobais from "../../componentes/GlobaStyle";
import * as Components from '../../componentes/Login/Components';
import http from "../../http";
import { useNavigate } from "react-router-dom";
import { Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../security/AuthContext'; 
import { changeLanguage } from 'i18next';
import UserService from "../../service/AuthService";
import { Logout } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import MaskedInput from 'react-text-mask';
import Termos from "../../componentes/Footer/TermModal";


const userService = new UserService();


interface FormValues {
  nickname: string;
  email: string;
  fullName: string;
  cpf: string;
  birthday: string;
  password: string; 
  profile: string;
  confirmPassword: string;
}


interface FormValuesLogin {
  email: string;
  password: string;

}

const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: flex-start;
    margin-bottom: 16px; 

    @media (max-width: 720px) {
      margin-bottom: 8px; 
      
}
`;

const Checkbox = styled.input`
    margin-top: 8px; 

    @media (max-width: 720px) {
      margin-top: 0px; 
      
}
`;

const Label = styled.label`
    color: white;
    
`;

const Link = styled.a`
    color: #00eeff; 
    text-decoration: none; 

    @media (max-width: 720px) {
      
  
  }
    
   
`;

const Backgroundgradient = styled.div`
  background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
  width: 100%;
  min-height: 100vh;
`;

const validationSchemaRegister = Yup.object().shape({
  login: Yup.string().email('Email inválido').required('Email é obrigatório'),
  nickname: Yup.string().required('Nome completo é obrigatório'),
  userName: Yup.string().required('Username é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([Yup.ref('password')], 'As senhas devem coincidir'),

    cpf: Yup.string()
    .required('CPF é obrigatório')
    .test('isValidCPF', 'CPF inválido', (value) => CPF.isValid(value || ''))
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
});

const ErrorMessageStyled = styled.div`
  color: red;
  font-size: 12px;

  @media (max-width: 720px) {
    font-size: 0px;
}
`;



const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  let globalFile: File | null = null;
  const navigate = useNavigate();
  const [signIn, toggle] = React.useState(true);
  const [imageUrl, setImageUrl] = React.useState('');
  const { login } = useAuth();
  const imageUrls = [
    '/imagens/galeria/6.mp4'
  ];



  useEffect(() => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
  }, [navigate]);


  // Função para formatar o CPF
const formatCPF = (cpf: string) => {
  return CPF.format(cpf); // Formata o CPF para o formato xxx.xxx.xxx-xx
};
  useEffect(() => {
    const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    setImageUrl(randomImage);
  }, []);

  useEffect(() => {
    const video = document.querySelector('video');

    const handleVisibilityChange = () => {
      if (video) {
        if (document.hidden) {
          video.pause();
        } else {
          video.play();
        }
      }
    };

    const handleVideoEnd = () => {
      if (video) {
        video.play();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    if (video) {
      video.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (video) {
        video.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []);

  const handleLogin = async (values: FormValuesLogin, actions: FormikHelpers<FormValuesLogin>) => {
    try {
      const response = await userService.logar(values, actions);
      login(response.token);
      navigate('/');
    } catch (error) {
      toast.error(t('Login failed. Please check your credentials and try again.'));
    }
  };

  useEffect(() => {
    // Conversão da imagem para o formato File
    const convertImageToFile = async (imageUrl: string, fileName: string): Promise<File> => {
      const response = await fetch(imageUrl);  // Carrega a imagem
      const blob = await response.blob();  // Converte para Blob
  
      // Cria o objeto File a partir do Blob
      const file = new File([blob], fileName, { type: blob.type });
      globalFile = file; // Atribuindo o file à constante global
      return file;
    };
    
    const imageUser = '../../../../public/imagens/default.jpg';  // Caminho da imagem na pasta public
    convertImageToFile(imageUser , 'default.jpg')
      .then(file => {
        console.log(file);  // Agora você tem um objeto File
      })
      .catch(err => {
        console.error('Erro ao converter a imagem em File:', err);
      });
  }, []);
  

  const handleFormSubmitRegister = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    try {
      await userService.registrar(values, actions);
      toast.success('Registro realizado com sucesso!');
    } catch (error) {
      console.error(values);
      toast.error('Erro ao registrar. Tente novamente.');
    }
  };

  const showValidationErrors = (errors: Record<string, string>) => {
    const keys = Object.keys(errors);
    if (keys.length === 1) {
      toast.error(errors[keys[0]]);
    } else {
      toast.error('Preencha os campos obrigatórios corretamente.');
    }
  };
  return (
    
    <Backgroundgradient>
      
      <EstilosGlobais />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Formik 
        initialValues={{
          nickname: '',
          email: '',
          fullName: '',
          cpf: '',
          birthday: '',
          password: '',
          profile: '',
          confirmPassword: '',
        } as FormValues}
      //  validationSchema={validationSchemaRegister}
        onSubmit={handleFormSubmitRegister}
      >
        {({ setFieldValue, errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
          <Components.SignUpContainer $signinIn={signIn}>
            <Components.Form onSubmit={handleSubmit}>
              <Components.Title>{t('Create Account')}</Components.Title>
              <Components.Input
                type="text"
                placeholder={t("Username")}
                name="nickname"
                value={values.nickname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessageStyled>{errors.nickname && touched.nickname && errors.nickname}</ErrorMessageStyled>
              <Components.Input
                type="text"
                name="fullName"
                placeholder={t("Full Name")}
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessageStyled>{errors.fullName && touched.fullName && errors.fullName}</ErrorMessageStyled>
              <Components.Input
                type="text"
                name="cpf"
                as={MaskedInput}
                mask={[/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/]}
                placeholder={t("CPF")}
                value={values.cpf}
                onChange={handleChange}
                onBlur={handleBlur}
              />
<Components.Input
  type="date"
  name="birthday"
  value={values.birthday}
  onChange={handleChange}
  onBlur={handleBlur}
/>

                            <Components.Input
                type="text"
                name="email"
                placeholder={t("Email")}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessageStyled>{errors.email && touched.email && errors.email}</ErrorMessageStyled>
              <Components.Input
                type="password"
                name="password"
                placeholder={t("Password")}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <ErrorMessageStyled>{errors.password && touched.password && errors.password}</ErrorMessageStyled>
              <Components.Input
                type="password"
                name="confirmPassword"
                placeholder={t("Retry Password")}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
<Components.Select
  name="profile"
  value={values.profile}
  onChange={(e) => {
    setFieldValue('profile', e.target.value); // Corrigido: chamando a função toUpperCase()
  }}
  onBlur={handleBlur}
>
  <option value="RED">{t("RED")}</option>
  <option value="BLUE">{t("Blue")}</option>
  <option value="yellow">{t("Yellow")}</option>
</Components.Select>


               <ErrorMessageStyled>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</ErrorMessageStyled>

             
              <Components.Button type="submit">{t("Sign Up")}</Components.Button>
            </Components.Form>
          </Components.SignUpContainer>
        )}
      </Formik>

      <Formik
        initialValues={{
          email: '',
          password: ''
         
        } as FormValuesLogin}
        onSubmit={handleLogin}
      >
        {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
          <Components.SignInContainer $signinIn={signIn}>
            <Components.Form onSubmit={handleSubmit} autoComplete="off">
              <Components.Title>{t("Sign In")}</Components.Title>
              
              <Components.Input
                type="text"
                name="email"
                placeholder={t("Username")}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              <ErrorMessageStyled>{errors.login && touched.login && errors.login}</ErrorMessageStyled>
              <Components.Input
                type="password"
                name="password"
                placeholder={t("Password")}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="nope"
              />
              <ErrorMessageStyled>{errors.password && touched.password && errors.password}</ErrorMessageStyled>
              <Components.Button type="submit">{t('Sign In')}</Components.Button>
            </Components.Form>
          </Components.SignInContainer>
        )}
      </Formik>

      <Components.OverlayContainer $signinIn={signIn}>
        <Components.Overlay $signinIn={signIn} imageUrl={imageUrl}>
          {imageUrl.endsWith('.mp4') ? (
            <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src={imageUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={imageUrl} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
          <Components.LeftOverlayPanel $signinIn={signIn}>
            <Components.Title>{t("Welcome Back!")}</Components.Title>
            <Components.Paragraph>{t('To keep connected with us please login with your personal info')}</Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>{t('Sign In')}</Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel $signinIn={signIn}>
            <Components.Title>{t("Welcome, Friend!")}</Components.Title>
            <div>
                <button onClick={() => changeLanguage('pt')}>PT-BR</button>
                <button onClick={() => changeLanguage('en')}>ENG</button>
                <button onClick={() => changeLanguage('jpn')}>JPN</button>
                <button onClick={() => changeLanguage('zh')}>ZH</button>
                <button onClick={() => changeLanguage('ko')}>KO</button>
                <button onClick={() => changeLanguage('ru')}>RU</button>
                <button onClick={() => changeLanguage('de')}>DE</button>
                <button onClick={() => changeLanguage('fr')}>FR</button>
        </div>
            <Components.Paragraph>{t('Enter your personal details and start your journey with us')}</Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>{t('Sign Up')}</Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
     
    </Backgroundgradient>
  );
};

export default App;
