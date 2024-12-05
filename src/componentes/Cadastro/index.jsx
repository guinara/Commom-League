import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { styled } from 'styled-components';
import * as Yup from 'yup';
import http from '../../http';
import { useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';

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
    login: Yup.string().email('Email inválido').required('Email é obrigatório'),
    fullName: Yup.string().required('Nome completo é obrigatório'),
    cpf: Yup.string()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
        .required('CPF é obrigatório'),
    telefone: Yup.string()
        .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido')
        .required('Telefone é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem coincidir'),
    birthDate: Yup.date()
        .max(new Date(), 'Data de nascimento não pode ser maior que a data atual')
        .test('is-adult', 'Você deve ter mais de 16 anos', function (value) {
            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                return age - 1 >= 16;
            }
            return age >= 16;
        })
        .required('Data de nascimento é obrigatória'),
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
                email: '',
                fullName: '',
                cpf: '',
                telefone: '',
                confirmPassword: "",
                password: '',
                birthDate: '',
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

                    <label htmlFor="email">Email:</label>
                    <Field type="text" id="email" name="login" />
                    <ErrorMessageStyled>{errors.email && touched.email && errors.email}</ErrorMessageStyled>

                    <label htmlFor="fullName">Nome Completo:</label>
                    <Field type="text" id="fullName" name="fullName" />
                    <ErrorMessageStyled>{errors.fullName && touched.fullName && errors.fullName}</ErrorMessageStyled>

                    <label htmlFor="cpf">CPF:</label>
                    <Field
                        as={MaskedInput}
                        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                        type="text"
                        id="cpf"
                        name="cpf"
                    />
                    <ErrorMessageStyled>{errors.cpf && touched.cpf && errors.cpf}</ErrorMessageStyled>

                    <label htmlFor="telefone">Telefone:</label>
                    <Field
                        as={MaskedInput}
                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        type="text"
                        id="telefone"
                        name="telefone"
                    />
                    <ErrorMessageStyled>{errors.telefone && touched.telefone && errors.telefone}</ErrorMessageStyled>

                    <label htmlFor="password">Senha:</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessageStyled>{errors.password && touched.password && errors.password}</ErrorMessageStyled>

                    <label htmlFor="confirmPassword">Confirme a Senha:</label>
                    <Field type="password" id="confirmPassword" name="confirmPassword" />
                    <ErrorMessageStyled>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</ErrorMessageStyled>

                    <label htmlFor="birthDate">Data de Nascimento:</label>
                    <Field type="date" id="birthDate" name="birthDate" />
                    <ErrorMessageStyled>{errors.birthDate && touched.birthDate && errors.birthDate}</ErrorMessageStyled>

                    <button type="submit" className="button-cadastro">Cadastre-se</button>
                </StyledForm>
            )}
        </Formik>
    );
};

export default Form;
