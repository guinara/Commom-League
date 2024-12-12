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

interface FooterProps {
  openPrivacyPolicyModal: () => void;
  openTermsModal: () => void;
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



const ErrorMessageStyled = styled.div`
  color: red;
  font-size: 12px;

  @media (max-width: 720px) {
    font-size: 0px;
}
`;



const App: React.FC<FooterProps> = ({ openPrivacyPolicyModal, openTermsModal }) => {
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


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      openPrivacyPolicyModal();  
    }
  };

  const validationSchemaRegister = Yup.object().shape({
    nickname: Yup.string()
      .required(t('The "Username" field is required.'))
      .min(3, t('The "Username" must be at least 3 characters long.')),
    fullName: Yup.string()
      .required(t('The "Full Name" field is required.'))
      .min(5, t('The "Full Name" must be at least 5 characters long.')),
    cpf: Yup.string()
      .required(t('The "CPF" field is required.'))
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, t('The "CPF" must be in the format 000.000.000-00.')),
    birthday: Yup.date()
      .required(t('The "Birthday" field is required.')),
    email: Yup.string()
      .required(t('The "Email" field is required.'))
      .email(t('Please enter a valid email address.')),
    password: Yup.string()
      .required(t('The "Password" field is required.'))
      .min(6, t('The password must be at least 6 characters long.')),
    confirmPassword: Yup.string()
      .required(t('The "Confirm Password" field is required.'))
      .oneOf([Yup.ref('password')], t('Passwords do not match.')),
    profile: Yup.string()
      .required(t('The "Profile" field is required.'))
      .oneOf(['RED', 'BLUE', 'YELLOW'], t('Please select a valid option')),
  });

  useEffect(() => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
  }, [navigate]);



const formatCPF = (cpf: string) => {
  return CPF.format(cpf); 
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
    const convertImageToFile = async (imageUrl: string, fileName: string): Promise<File> => {
      const response = await fetch(imageUrl); 
      const blob = await response.blob(); 
      const file = new File([blob], fileName, { type: blob.type });
      globalFile = file; 
      return file;
    };
    
    const imageUser = '../../../../public/imagens/default.jpg';  
    convertImageToFile(imageUser , 'default.jpg')
      .then(file => {
        console.log(file); 
      })
      .catch(err => {
        console.error('Erro ao converter a imagem em File:', err);
      });
  }, []);
  

const handleFormSubmitRegister = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
  try {
    await userService.registrar(values, actions);
    toast.success(t('Registration successful!'));
    navigate('/'); // Redireciona para a página inicial
    window.location.reload(); // Recarrega a página
  } catch (error) {
    console.error(values);
    toast.error(t('Registration failed. Please try again.'));
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
        validationSchema={validationSchemaRegister}
        onSubmit={handleFormSubmitRegister}
      >
        {({ setFieldValue, errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
          <Components.SignUpContainer $signinIn={signIn}>
            <Components.Form onSubmit={handleSubmit}>
              <Components.Title>{t('Create Account')}</Components.Title>

              {errors.nickname && touched.nickname && (
  <ErrorMessageStyled>{t(errors.nickname)}</ErrorMessageStyled>
)}
              <Components.Input
                type="text"
                placeholder={t("Username")}
                name="nickname"
                value={values.nickname}
                onChange={handleChange}
                onBlur={handleBlur}
              />

{errors.fullName && touched.fullName && (
  <ErrorMessageStyled>{t(errors.fullName)}</ErrorMessageStyled>
)}
              <Components.Input
                type="text"
                name="fullName"
                placeholder={t("Full Name")}
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
              />

{errors.cpf && touched.cpf && (
  <ErrorMessageStyled>{t(errors.cpf)}</ErrorMessageStyled>
)}
      
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
{errors.birthday && touched.birthday && (
  <ErrorMessageStyled>{t(errors.birthday)}</ErrorMessageStyled>
)}
<Components.Input
  type="date"
  name="birthday"
  value={values.birthday}
  onChange={handleChange}
  onBlur={handleBlur}
/>

{errors.email && touched.email && (
  <ErrorMessageStyled>{t(errors.email)}</ErrorMessageStyled>
)}

                            <Components.Input
                type="text"
                name="email"
                placeholder={t("Email")}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

{errors.password && touched.password && (
  <ErrorMessageStyled>{t(errors.password)}</ErrorMessageStyled>
)}
             
              <Components.Input
                type="password"
                name="password"
                placeholder={t("Password")}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />

{errors.confirmPassword && touched.confirmPassword && (
  <ErrorMessageStyled>{t(errors.confirmPassword)}</ErrorMessageStyled>
)}
    
              <Components.Input
                type="password"
                name="confirmPassword"
                placeholder={t("Retry Password")}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />

{errors.profile && touched.profile && (
  <ErrorMessageStyled>{t(errors.profile)}</ErrorMessageStyled>
)}

<Components.Select
  name="profile"
  value={values.profile}
  onChange={(e) => {
    setFieldValue('profile', e.target.value); // Corrigido: chamando a função toUpperCase()
  }}
  onBlur={handleBlur}
>
  <option value="RED">{t("Red")}</option>
  <option value="BLUE">{t("Blue")}</option>
  <option value="YELLOW">{t("Yellow")}</option>
</Components.Select>

             
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
