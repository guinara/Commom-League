import React, { useState } from 'react';
import { useFormik } from 'formik';
import http from '../../http';
import Modal from 'react-modal';
import styled from 'styled-components';
import CreateRegionSelect from '../CreateRegionSelect';
import { ToastContainer, toast } from 'react-toastify';
import UserSearchSelect from '../UserSearchSelect';

const customStyles = {
  content: {
    position: 'fixed',  // Usando fixed para manter o modal fixo na tela
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '10px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f7f7f7',
    border: 'none',
    borderRadius: '10px',
    padding: '30px',
    width: '450px',
    minHeight: '500px',
    textAlign: 'center',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
  },
};

const StyledButton = styled.button<{ disabled?: boolean }>`
  background-color: ${props => (props.disabled ? '#ccc' : '#e63946')};
  color: white;
  border: none;
  position: relative;
  border-radius: 5px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px 20px;
  font-size: 14px;
  margin: 10px 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#d62839')};
  }
`;

const StyledButtonAccount = styled.button<{ disabled?: boolean }>`
  background-color: ${props => (props.disabled ? '#ccc' : '#e63946')};
  color: white;
  border: none;
  position: absolute;
  border-radius: 5px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px 20px;
  font-size: 14px;
  right: 10px;
  bottom: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#d62839')};
  }

  @media (max-width: 914px) {  
    left: 140px;
    bottom: 1px;
  }
`;

const StyledInput = styled.input`
  position: relative;
  width: 100%;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #e63946;
    outline: none;
    box-shadow: 0 0 5px rgba(230, 57, 70, 0.5);
  }
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #333;
  font-size: 14px;
  text-align: left;
`;

const UserImageWrapper = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid #e63946;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const EloText = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const StatText = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #666;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #e63946;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`;

const RankSection = styled.div`
  flex: 1;
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OtherStatsSection = styled.div`
  flex: 1;
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EloBadge = styled.img`
  margin-top: 5px;
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const FormModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({});
  const [idPlayer, setIdPlayer] = useState<string>(''); // Estado que mantém o idPlayer
  const [idTime, setIdTime] = useState<string>(''); 
  const [iconUser, setIconUser] = useState<string>('');
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carregamento

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    formik.resetForm(); // Limpa os campos do Formik
    setUserData({}); // Limpa os dados do usuário
    setIdPlayer(''); // Limpa o idPlayer
    setIdTime(''); // Limpa o idTime
    setIconUser(''); // Limpa o ícone do usuário
    setIsTermsAccepted(false); // Limpa o estado de aceitação dos termos
  };

  const handleSearch = async (values: any) => {
    setIsLoading(true); // Ativa o loading
    try {
      const response = await http.post('api/v1/accountsRiot/post', {
        tagLine: values.tagLine,
        gameName: values.gameName,
        region: values.region,
      });
      if (response.data) {
        setUserData(response.data);
        setIdTime(response.data.id);
        setIconUser(response.data.profileIconId);
        
        console.log(response.data)
        // Definindo idPlayer diretamente com a resposta da API
        setIdPlayer(response.data.id); // Agora o idPlayer é atribuído diretamente pela API
        toast.success('Usuário encontrado com sucesso!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Usuário não encontrado!');
      console.log(values)
    } finally {
      setIsLoading(false); // Desativa o loading
      console.log(values)
    }
  };

  const handleSubmit = async (values: any) => {
    // Verificar se o termo foi aceito
    if (!isTermsAccepted) {
      alert('Você precisa aceitar os termos!');
      return;
    }
  
    if (!idPlayer) {
      toast.error('ID do jogador não encontrado!');
      return;
    }
  
    try {
      // Logar o corpo da requisição para ver o que está sendo enviado
      const requestData = { id: idPlayer }; // Dados sendo enviados
      console.log("Enviando para o backend:", requestData);
  
      // Enviar o idPlayer como id
      const response = await http.post('/api/v1/accountsRiot/addAccountRiot', requestData);
  
      // Resetar o formulário e fechar o modal após o sucesso
      formik.resetForm();
      closeModal();
      toast.success('Conta associada com sucesso!');
    } catch (error) {
      console.log(idPlayer);
      console.error('Erro ao associar a conta:', error);
      toast.error('Erro ao associar a conta!');
    }
  };

  const formik = useFormik({
    initialValues: {
      tagLine: '',
      gameName: '',
      region: '',
    },
    onSubmit: handleSubmit,
  });

  // Função para retornar a URL do avatar
  const avatarUrl = iconUser
    ? `https://ddragon.leagueoflegends.com/cdn/14.22.1/img/profileicon/${iconUser}.png`
    : 'https://i.pinimg.com/736x/f8/d8/95/f8d895bafcab1599ed89a96676465883.jpg';

  // Função para retornar a imagem do badge com base no elo
  const getEloBadge = (elo: string) => {
    switch (elo) {
      case 'SILVER I':
        return 'https://elojobbrasil.com.br/assets/imagens/badges/prata_IV.webp';
      case 'CHALLENGER I':
        return 'https://i.pinimg.com/474x/90/8f/95/908f95127caf7f739877f9f555807361.jpg';
      case 'GOLD':
        return 'https://upload.wikimedia.org/wikipedia/commons/6/63/Gold_League_of_Legends.png';
      case 'PLATINUM':
        return 'https://upload.wikimedia.org/wikipedia/commons/2/27/Platinum_League_of_Legends.png';
      case 'DIAMOND':
        return 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Diamond_League_of_Legends.png';
      default:
        return 'https://upload.wikimedia.org/wikipedia/commons/0/02/League_of_Legends_Icon.png';
    }
  };

  return (
    <>
      <StyledButtonAccount onClick={openModal}>
        {userData?.gameName ? 'Mostrar conta' : 'Associar conta Riot'}
      </StyledButtonAccount>

      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <StyledLabel>Região:</StyledLabel>
            <CreateRegionSelect
              label="Região"
              name="region"
              value={formik.values.region}
              setFieldValue={formik.setFieldValue}
              onBlur={formik.handleBlur}
              placeholder="Select Region"
            />
          </div>

          <UserImageWrapper>
            <UserImage src={avatarUrl} alt="User Avatar" />
            <UserInfo>
              <EloText><strong>Nome:</strong> {userData?.gameName || 'Nome não encontrado'}</EloText>
              <EloText><strong>Tag:</strong> {userData?.tagLine || 'Tag não encontrada'}</EloText>
              <EloText><strong>Nível:</strong> {userData?.summonerLevel || 'Nível não encontrado'}</EloText>
            </UserInfo>
          </UserImageWrapper>

          <StatsWrapper>
            <RankSection>
              <EloText><strong>Elo:</strong> {userData?.elo || 'Não disponível'}</EloText>
              <EloBadge src={getEloBadge(userData?.elo)} alt="Elo Badge" />
            </RankSection>

            <OtherStatsSection>
              <StatText><strong>Vitórias:</strong> {userData?.wins || 'Vitórias não disponíveis'}</StatText>
              <StatText><strong>Derrotas:</strong> {userData?.loses || 'Derrotas não disponíveis'}</StatText>
              <StatText><strong>Pontos:</strong> {userData?.points || 'Pontos não disponíveis'}</StatText>
            </OtherStatsSection>
          </StatsWrapper>

          <StyledLabel htmlFor="gameName">Game Name:</StyledLabel>
          <UserSearchSelect
    label="gameName"
    name="gameName"
    value={formik.values.gameName}
    setFieldValue={formik.setFieldValue}
    onBlur={formik.handleBlur}
    placeholder="Digite o nome do jogo"
/>

          <div>
            <StyledLabel htmlFor="tagLine">Tag Line:</StyledLabel>
            <StyledInput
              type="text"
              id="tagLine"
              name="tagLine"
              value={formik.values.tagLine}
              onChange={formik.handleChange}
              placeholder="Digite sua tag line"
            />



            

            <StyledButton type="button" onClick={() => handleSearch(formik.values)} disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : 'Buscar'}
            </StyledButton>

            <div>
              <StyledInput
                type="checkbox"
                id="terms"
                checked={isTermsAccepted}
                onChange={() => setIsTermsAccepted(prev => !prev)}
              />
              <label htmlFor="terms">Este é você?</label>
            </div>

            <StyledInput type="hidden" id="idTime" value={idTime} readOnly />
            <StyledInput type="hidden" id="idPlayer" value={idPlayer} readOnly />

            <StyledButton
              type="submit"
              disabled={!idPlayer || !formik.values.region }
            >
              Associar
            </StyledButton>
          </div>
        </form>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default FormModal;
