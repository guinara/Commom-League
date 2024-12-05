import React, { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import TeamService from '../../service/teamService';

interface TeamFormValues {
  name: string;
}

const StyledForm = styled(FormikForm)`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const TeamRegistrationForm: React.FC = () => {
  const teamService = new TeamService();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome do time é obrigatório'),
  });

  const handleSubmit = async (values: TeamFormValues) => {
    const requestBody = {
      name: values.name,  // Apenas o nome
    };

    console.log('Valores enviados:', requestBody);  // Mostrar no console para verificar

    const token = sessionStorage.getItem("authToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      await teamService.register(requestBody);  // Enviar para a API
      toast.success("Time registrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao registrar time.");
      console.error("Erro ao registrar time:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',  // Nome do time
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched, handleSubmit, setFieldValue, values }) => (
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome do Time"
                name="name"
                value={values.name}
                onChange={(e) => setFieldValue('name', e.target.value)}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Registrar Time
              </Button>
            </Grid>
          </Grid>
        </StyledForm>
      )}
    </Formik>
  );
};

export default TeamRegistrationForm;
