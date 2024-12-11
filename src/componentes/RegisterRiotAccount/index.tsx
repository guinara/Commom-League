import React, { useState } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage, FormikHelpers } from 'formik';
import http from '../../http';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';

// Define o estilo do modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f7f7f7',
    border: 'none',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '400px',
    textAlign: 'center',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  }
};

// Estilizando o botão
const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 8px auto;
  background-color: #ff2600; /* Cor do botão */
`;

// Estilizando o input
const StyledInput = styled(Field)`
  width: 95%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Estilizando o label
const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #00000089; /* Cor do texto do label */
  text-align: left;
  width: 100%;
`;

interface FormValues {
  tagLine: string;
  gameName: string;
}

const FormModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({});
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSearch = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    http.post('api/v1/accountsRiot/post', values)
      .then(response => {
        console.log(response.data);
        setUserData(response.data);
        console.log('Dados da requisição:', values);
        closeModal();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <StyledButton onClick={openModal}>Buscar Contas ApiRiot</StyledButton>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div>
          <Formik
            initialValues={{
              tagLine: '',
              gameName: '',
            }}
            onSubmit={handleSearch}
          >
            {({ errors, touched }) => (
              <FormikForm>
                <StyledLabel htmlFor="tagLine">Tag Line:</StyledLabel>
                <StyledInput type="text" id="tagLine" name="tagLine" />
                <ErrorMessage name="tagLine" component="div" className="error-message" />

                <StyledLabel htmlFor="gameName">Game Name:</StyledLabel>
                <StyledInput type="text" id="gameName" name="gameName" />
                <ErrorMessage name="gameName" component="div" className="error-message" />

                <StyledButton type="submit">Buscar</StyledButton>
              </FormikForm>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default FormModal;
