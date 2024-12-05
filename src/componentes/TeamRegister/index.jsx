import React, { useEffect, useState } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
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
    name: Yup.string().required('Nome do time é obrigatório'),
    game: Yup.string().oneOf(['League of Legends', 'Overwatch', 'Paladins'], 'Jogo inválido').test({
        name: 'is-lol',
        message: 'O jogo deve ser League of Legends',
        test: (value) => value === 'League of Legends',
    }).required('Jogo é obrigatório'),
});

const ErrorMessageStyled = styled.div`
    color: red;
    font-size: 12px;
`;

const Form = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        http.get('auth/' + localStorage.getItem('email'))
            .then(response => {
                setUserData(response.data);
                localStorage.setItem('userId', response.data.id);
            })
            .catch(error => {
                console.log(error);
            });
    }, []); // Adiciona uma dependência vazia para garantir que o efeito só seja executado uma vez

    const handleIdUserChange = (e) => {
        // Lógica para manipular a mudança de valor do campo idUser, se necessário
    };

    return (
        <Formik
            initialValues={{
                name: '',
                game: '',
                idUser: localStorage.getItem('userId'), // Preenche com o id do usuário se userData estiver definido
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                console.log(values);
                http.post('api/v1/teams/register', values, {})
                    .then(response => {
                        console.log(response.data);
                        actions.resetForm();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        console.log(values)
                    });
            }}
        >
            {({ errors, touched }) => (
                <StyledForm>
                    <img className="logo" src="/imagens/Logo.png" alt="Logo do seu site" />

                    <label htmlFor="name">Nome do Time:</label>
                    <Field type="text" id="name" name="name" />
                    <ErrorMessageStyled>{errors.name && touched.name && errors.name}</ErrorMessageStyled>

                    <label htmlFor="game">Game:</label>
                    <Field as="select" id="game" name="game">
                        <option value="" disabled defaultValue>Selecione o jogo</option>
                        <option value="League of Legends">League of Legends</option>
                        <option value="Overwatch">Overwatch</option>
                        <option value="Paladins">Paladins</option>
                    </Field>
                    <ErrorMessageStyled>{errors.game && touched.game && errors.game}</ErrorMessageStyled>

                    <label htmlFor="idUser"></label>
                    <Field type="hidden" id="idUser" name="idUser" value={localStorage.getItem('userId')} />
                    <ErrorMessageStyled>{errors.idUser && touched.idUser && errors.idUser}</ErrorMessageStyled>

                    <button type="submit" className="button-cadastro">Cadastre-se</button>
                </StyledForm>
            )}
        </Formik>
    );
};

export default Form;
