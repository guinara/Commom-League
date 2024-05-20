import React, { useState } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import http from '../../http';
import Modal from 'react-modal';
import styled from 'styled-components';

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
  },
};

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 8px auto;
  background-color: #ff2600;
`;

const StyledInput = styled(Field)`
  width: 95%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #00000089;
  text-align: left;
  width: 100%;
`;

const FormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSearch = (values, actions) => {
    http.post('api/v1/payment/post', values, {})
      .then(response => {
        setRedirectUrl(response.data); // Assume que a resposta é o link direto de redirecionamento
        closeModal(); // Fecha o modal após a submissão
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  if (redirectUrl) {
    window.location.href = redirectUrl; // Redireciona para o link recebido na resposta
    return null; // Evita a renderização do restante do componente
  }

  return (
    <>
      <StyledButton onClick={openModal}>Buscar Contas ApiRiot</StyledButton>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div>
          <Formik
            initialValues={{
              unit_price: '',
            }}
            onSubmit={handleSearch}
          >
            {({ errors, touched }) => (
              <FormikForm>
                <StyledLabel htmlFor="unit_price">Tag Line:</StyledLabel>
                <StyledInput type="number" id="tagLine" name="unit_price" />
                <ErrorMessage name="unit_price" component="div" className="error-message" />
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
