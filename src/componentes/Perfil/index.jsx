import React, { useState } from 'react';
import http from '../../http';
import { useNavigate } from 'react-router-dom';
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
  }
};

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  margin: 8px auto;
  background-color: ${props => props.disabled ? 'gray' : 'red'};
`;



const StyledInput = styled.input`
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
  const [userData, setUserData] = useState({});
  const [tagLine, setTagLine] = useState('');
  const [gameName, setGameName] = useState('');
  const [idPlayer, setIdPlayer] = useState('');
  const [idTime, setIdTime] = useState('');
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSearch = () => {
    const values = { tagLine, gameName };
    http.post('api/v1/accountsRiot/post', values, {})
      .then(response => {
        setUserData(response.data);
        console.log('Dados da requisição:', values);
        console.log(response.data.id);
      //  localStorage.setItem('accountRiot', response.data.id);
        setIdTime(response.data.id); // Preenche o campo de ID
        setIdPlayer(localStorage.getItem('userId'));
       
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = () => {
    const values = { idPlayer, idTime };
    http.post('/api/v1/accountsRiot/addAccountRiot', values, {})
      .then(response => {
        setUserData(response.data);
        console.log('Dados da requisição:', values);
        setIdTime(response.data);
        setTagLine(''); // Limpa o campo Tag Line
        setGameName(''); // Limpa o campo Game Name
        setIdPlayer(''); // Limpa o campo ID Player
        setIdTime(''); // Limpa o campo ID Time
        closeModal();
      })
      .catch(error => {
        setIdTime('');
        console.log("userdata", userData.id);
        console.log('soregeDta:', localStorage.getItem('accountRiot'));
        console.log('Dados da requisição:', values);
        console.error('Conta ja vinculada', error);
      });
  };

  return (
    <>
      <StyledButton onClick={openModal}>Associar conta Riot</StyledButton>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div>
          <StyledLabel htmlFor="tagLine">Tag Line:</StyledLabel>
          <StyledInput 
          type="text" 
          id="tagLine" 
          value={tagLine} onChange={(e) => setTagLine(e.target.value)} />
          
          <StyledLabel htmlFor="gameName">Game Name:</StyledLabel>
          <StyledInput type="text" id="gameName" value={gameName} onChange={(e) => setGameName(e.target.value)} />
          
          <StyledButton onClick={handleSearch}>Buscar</StyledButton>

          <StyledLabel htmlFor="idTime"></StyledLabel>
          <StyledInput type="hidden" id="idTime" value={idTime} onChange={(e) => setIdTime(e.target.value)} />
          
          <StyledLabel htmlFor="idPlayer"></StyledLabel>
          <StyledInput type="hidden" id="idPlayer" value={idPlayer} onChange={(e) => setIdPlayer(e.target.value)} />
          

        <StyledButton 
          onClick={handleSubmit}
          disabled={!idTime || !idPlayer}>Associar</StyledButton>
        </div>
      </Modal>
    </>
  );
};

export default FormModal;
