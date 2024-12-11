import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { styled } from 'styled-components';
import http from '../../http';
import { useNavigate } from 'react-router-dom';

const StyledForm = styled(FormikForm)`
    max-width: 400px;
    margin: auto;
    padding: 0px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    label {
        display: block;
        margin-bottom: 10px;
        color: white;
        text-align: left;
        width: 100%;
    }

    input {
        width: 95%;
        padding: 8px;
        margin-bottom: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        width: 100%;
        padding: 10px;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin: 8px auto;
    }

    .button-entrar {
        background-color: #007bff;
    }

    .button-cadastro {
        background-color: #28a745;
    }

    .error-message {
        color: red;
        margin-bottom: 10px;
    }

    .logo {
        width: 250px;
        margin-bottom: 20px;
        margin-right: 2%;
    }
`;

interface FormValues {
    login: string;
    password: string;
}

const Form: React.FC = () => {
    const navigate = useNavigate();

    const handleCadastroClick = () => {
        navigate('/cadastro');
    };

    return (
        <Formik<FormValues>
            initialValues={{
                login: '',
                password: '',
            }}
            onSubmit={(values, actions) => {
                console.log(values);
                http.post('auth/login', values, {})
                    .then(response => {
                        sessionStorage.removeItem('token');
                        sessionStorage.setItem('token', response.data.token);
                        localStorage.setItem('login', values.login);
                        console.log(response.data);
                        actions.resetForm();
                        navigate('/');
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }}
        >
            <StyledForm>
                <img className="logo" src="/imagens/Logo.png" alt="Logo do site" />

                <label htmlFor="login">LOGIN</label>
                <Field type="text" id="login" name="login" placeholder="Digite seu login" />

                <label htmlFor="password">SENHA</label>
                <Field type="password" id="password" name="password" placeholder="Digite sua senha" />

                <button className="button-entrar" type="submit">Entrar</button>

                <button className="button-cadastro" type="button" onClick={handleCadastroClick}>Cadastre-se</button>
            </StyledForm>
        </Formik>
    );
};

export default Form;
