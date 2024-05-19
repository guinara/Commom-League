import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { styled } from 'styled-components';
import * as Yup from 'yup';
import http from '../../http';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

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
        width: 150px;
        margin-bottom: 20px;
    }
`;

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    fullName: Yup.string().required('Full name is required'),
    cpf: Yup.string()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Invalid CPF')
        .required('CPF is required'),
    telefones: Yup.string()
        .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Invalid phone number')
        .required('Phone number is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    birthDate: Yup.date().required('Birth date is required'),
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
                telefones: '',
                password: '',
                confirmPassword: '',
                birthDate: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                console.log(values);
                // Remove o campo 'confirmPassword' antes de enviar
                const { confirmPassword, ...data } = values;
                http.post('auth/register', data, {})
                    .then(response => {
                        sessionStorage.setItem('token', response.data.token);
                        console.log(response.data);
                        actions.resetForm();
                        navigate('/');
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }}
        >
            {({ errors, touched }) => (
                <StyledForm>
                    <label htmlFor="email">Email:</label>
                    <Field type="text" id="email" name="email" />
                    <ErrorMessageStyled>{errors.email && touched.email && errors.email}</ErrorMessageStyled>

                    <label htmlFor="fullName">Full Name:</label>
                    <Field type="text" id="fullName" name="fullName" />
                    <ErrorMessageStyled>{errors.fullName && touched.fullName && errors.fullName}</ErrorMessageStyled>

                    <label htmlFor="cpf">CPF:</label>
                    <Field
                        as={InputMask}
                        mask="999.999.999-99"
                        type="text"
                        id="cpf"
                        name="cpf"
                    />
                    <ErrorMessageStyled>{errors.cpf && touched.cpf && errors.cpf}</ErrorMessageStyled>

                    <label htmlFor="telefones">Phone Number:</label>
                    <Field
                        as={InputMask}
                        mask="(99) 99999-9999"
                        type="text"
                        id="telefones"
                        name="telefones"
                    />
                    <ErrorMessageStyled>{errors.telefones && touched.telefones && errors.telefones}</ErrorMessageStyled>

                    <label htmlFor="password">Password:</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessageStyled>{errors.password && touched.password && errors.password}</ErrorMessageStyled>

                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <Field type="password" id="confirmPassword" name="confirmPassword" />
                    <ErrorMessageStyled>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</ErrorMessageStyled>

                    <label htmlFor="birthDate">Birth Date:</label>
                    <Field type="date" id="birthDate" name="birthDate" />
                    <ErrorMessageStyled>{errors.birthDate && touched.birthDate && errors.birthDate}</ErrorMessageStyled>

                    <button type="submit" className="button-cadastro">Cadastre-se</button>
                </StyledForm>
            )}
        </Formik>
    );
};

export default Form;
