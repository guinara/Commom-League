import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { styled } from 'styled-components';
import * as Yup from 'yup';
import http from '../../http';
import { useNavigate } from 'react-router-dom';

const StyledForm = styled(FormikForm)`
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
        width: 150px; /* Tamanho da logo */
        margin-bottom: 20px; /* Espaço entre a logo e o formulário */
        margin-right: 2%;
    }
`;

const validationSchema = Yup.object().shape({
    teamName: Yup.string().required('Nome do time é obrigatório'),
    game: Yup.string().oneOf(['League of Legends', 'Overwatch', 'Paladins'], 'Jogo inválido').required('Jogo é obrigatório'),
});

const ErrorMessageStyled = styled.div`
    color: red;
    font-size: 12px;
`;

const Form = () => {
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                teamName: '',
                game: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                console.log(values);
           
                http.post('auth/register', values, {})
                    .then(response => {
                        console.log(response.data);
                        actions.resetForm();
                        navigate('/login');
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }}
        >
            {({ errors, touched }) => (
                <StyledForm>
                    <img className="logo" src="/imagens/Logo.png" alt="Logo do seu site" />

                    <label htmlFor="teamName">Nome do Time:</label>
                    <Field type="text" id="teamName" name="teamName" />
                    <ErrorMessageStyled>{errors.teamName && touched.teamName && errors.teamName}</ErrorMessageStyled>

                    <label htmlFor="game">Game:</label>
                    <Field as="select" id="game" name="game">
                        <option value="" disabled defaultValue>Selecione o jogo</option>
                        <option value="League of Legends">League of Legends</option>
                        <option value="Overwatch">Overwatch</option>
                        <option value="Paladins">Paladins</option>
                    </Field>
                    <ErrorMessageStyled>{errors.game && touched.game && errors.game}</ErrorMessageStyled>

                    <button type="submit" className="button-cadastro">Cadastre-se</button>
                </StyledForm>
            )}
        </Formik>
    );
};

export default Form;
