import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { styled } from 'styled-components';
import * as Yup from 'yup';
import http from '../../http';

const StyledForm = styled(FormikForm)`
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

    label {
        display: block;
        margin-bottom: 8px;
    }

    input {
        width: 100%;
        padding: 8px;
        margin-bottom: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
`;

const validationSchema = Yup.object().shape({
    login: Yup.string().required('Login is required'),
    password: Yup.string().required('Password is required'),
});

const ErrorMessageStyled = styled.div`
    color: red;
    font-size: 12px;
`;

const Form = () => {
    return (
        <Formik
            initialValues={{
                login: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                console.log(values);
                http.post('api/v1/accountsRiot/post', values, {
                })
                .then(response => {
                    sessionStorage.setItem('token', response.data.token);
                    console.log(response.data);
                    alert("Usuario foi cadastrado com sucesso")
                    actions.setValues({
                        login: '',
                        password: '',
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }}
        >
            {({ errors, touched }) => (
                <StyledForm>
                    <label htmlFor="login">Login:</label>
                    <Field type="text" id="login" name="login" />
                    <ErrorMessageStyled>{errors.login && touched.login && errors.login}</ErrorMessageStyled>

                    <label htmlFor="password">Password:</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessageStyled>{errors.password && touched.password && errors.password}</ErrorMessageStyled>

                    <button type="submit">Submit</button>

                </StyledForm>
            )}
        </Formik>
    );
};

export default Form;
