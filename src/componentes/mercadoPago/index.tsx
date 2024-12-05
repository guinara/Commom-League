import React, { useState } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage, FormikHelpers } from 'formik';
import http from '../../http';
import Modal from 'react-modal';
import styled from 'styled-components';

// Define custom styles for the modal
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

// Define styled components
const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 8px auto;
  background-color: #00c050;
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

// Define the types for Formik values and submission helpers
interface FormValues {
  unit_price: string;
}

const FormModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string>('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSearch = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    http.post('api/v1/payment/post', values)
      .then(response => {
        setRedirectUrl(response.data); // Assume response.data is the redirect URL
        closeModal();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Redirect if redirectUrl is set
  if (redirectUrl) {
    window.location.href = redirectUrl;
    return null; // Prevent rendering the rest of the component
  }

  return (
    <>
      <StyledButton onClick={openModal}>Colocar Saldo</StyledButton>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div>
          <Formik
            initialValues={{ unit_price: '' }}
            onSubmit={handleSearch}
          >
            {({ errors, touched }) => (
              <FormikForm>
                <StyledLabel htmlFor="unit_price">Insira o Valor :</StyledLabel>
                <StyledInput type="number" id="unit_price" name="unit_price" />
                <ErrorMessage name="unit_price" component="div" className="error-message" />
                <StyledButton type="submit">Comprar</StyledButton>
              </FormikForm>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default FormModal;
