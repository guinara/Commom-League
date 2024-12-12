import React, { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

interface TeamFormValues {
  id: string;
  name: string;
  logo: string | null; // Alterado para armazenar URL da imagem
  game: string;
  players: string[];
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
  const [players, setPlayers] = useState<string[]>(['', '', '', '']); // Placeholder para 4 jogadores
  const [logoPreview, setLogoPreview] = useState<string | null>(null); // Estado para armazenar a pré-visualização da logo

  const initialValues: TeamFormValues = {
    id: '',
    name: '',
    logo: null,
    game: '',
    players: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome do time é obrigatório'),
    logo: Yup.mixed().required('Logo do time é obrigatório'),
    game: Yup.string().required('Jogo é obrigatório'),
    players: Yup.array().of(Yup.string().required('Jogador é obrigatório')).min(1, 'Selecione pelo menos 1 jogador'),
  });

  const handleSubmit = async (values: TeamFormValues) => {
    try {
      // Lógica para enviar os dados do time
      toast.success('Time registrado com sucesso');
      console.log(values); // Dados do time registrados
    } catch (error) {
      toast.error('Ocorreu um erro ao registrar o time');
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFieldValue('logo', file.name);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file); // Lê o arquivo como URL de dados
    }
  };

  return (
    <Formik
      initialValues={initialValues}
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
              <input
                type="file"
                name="logo"
                onChange={(e) => handleLogoChange(e)} // Alterado para lidar com a pré-visualização
                accept="image/*"
                style={{ marginBottom: '10px' }}
              />
              {touched.logo && errors.logo && <div style={{ color: 'red' }}>{errors.logo}</div>}
              
              {/* Exibe a pré-visualização da logo, se houver */}
              {logoPreview && (
                <div style={{ marginTop: '10px' }}>
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Jogo"
                name="game"
                value={values.game}
                onChange={(e) => setFieldValue('game', e.target.value)}
                error={touched.game && !!errors.game}
                helperText={touched.game && errors.game}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Selecione Jogadores</InputLabel>
                <Select
                  multiple
                  value={values.players}
                  onChange={(e) => setFieldValue('players', e.target.value)}
                  error={touched.players && !!errors.players}
                >
                  {players.map((_, index) => (
                    <MenuItem key={index} value={`Jogador ${index + 1}`}>
                      Jogador {index + 1}
                    </MenuItem>
                  ))}
                </Select>
                {touched.players && errors.players && <div style={{ color: 'red' }}>{errors.players}</div>}
              </FormControl>
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
