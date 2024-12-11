import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { styled } from 'styled-components';
import http from '../../http';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Form = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        teamName: Yup.string().required('Nome do time é obrigatório'),
        game: Yup.string().oneOf(['League of Legends'], 'Jogo inválido').required('Jogo é obrigatório'),
        tipoJogo: Yup.string().when('game', {
            is: 'League of Legends',
            then: Yup.string().required('Tipo de Jogo é obrigatório').oneOf(['5x5 Clássico', '1x1 First Blood', '1x1 Clássico', '5X5 Aram'], 'Modo de jogo inválido')
        })
    });

    return (
        <Formik
            initialValues={{
                teamName: '',
                game: '',
                tipoJogo: '',
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
            {({ values, errors, touched, handleChange, setFieldValue }) => (
                <StyledForm>
                    <img className="logo" src="/imagens/Logo.png" alt="Logo do seu site" />

                    <label htmlFor="teamName">Valor da Taxa de Entrada</label>
                    <Field type="text" id="teamName" name="teamName" onChange={handleChange} />
                    {errors.teamName && touched.teamName && <div className="error-message">{errors.teamName}</div>}

                    <label htmlFor="game">Game:</label>
                    <Field as="select" id="game" name="game" onChange={(e) => {
                        handleChange(e);
                        if (e.target.value === 'League of Legends') {
                            setFieldValue('game', e.target.value);
                            setFieldValue('tipoJogo', '');
                        }
                    }}>
                        <option value="" disabled defaultValue>Selecione o jogo</option>
                        <option value="League of Legends">League of Legends</option>
                        <option value="Overwatch">Overwatch</option>
                        <option value="Paladins">Paladins</option>
                    </Field>
                    {errors.game && touched.game && values.game !== 'League of Legends' && <div className="error-message">{errors.game}</div>}

                    {values.game === 'League of Legends' && (
                        <div>
                            <label htmlFor="tipoJogo">Tipo de Jogo:</label>
                            <Field as="select" id="tipoJogo" name="tipoJogo" onChange={handleChange}>
                                <option value="" disabled defaultValue>Selecione o Modo</option>
                                <option value="5x5 Clássico">5x5 Clássico</option>
                                <option value="1x1 First Blood">1x1 First Blood</option>
                                <option value="1x1 Clássico">1x1 Clássico</option>
                                <option value="5X5 Aram">5X5 Aram</option>
                            </Field>
                            {errors.tipoJogo && touched.tipoJogo && <div className="error-message">{errors.tipoJogo}</div>}
                        </div>
                    )}

                    <button type="submit" className="button-cadastro">Cadastre-se</button>
                </StyledForm>
            )}
        </Formik>
    );
};

export default Form;
