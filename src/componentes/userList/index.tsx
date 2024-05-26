import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserData } from "../interface/userData";
import http from "../../http";

const UserListContainer = styled.div`
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
`;

const UserItem = styled.div`
  width: 500px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black;
  background-color: white;
`;

const UserProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RiotInfoContainer = styled.div`
  display: flex;
 
  margin-top: 10px;
`;

const RiotIcon = styled.img`
  width: 100px; /* Novo tamanho do ícone */
  height: 100px; /* Novo tamanho do ícone */
  margin-right: 10px;
`;

const RiotInfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const RiotInfoItem = styled.p`
  margin-bottom: 5px;
`;

const UserList: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    http.get('auth/' + localStorage.getItem('login'))
      .then(response => {
        setUserData(response.data); 
        localStorage.setItem('userId', response.data.id);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <UserListContainer>
      {userData && (
        <UserItem>
          <UserProfile>
            <UserProfilePicture src="https://i.pinimg.com/564x/b8/32/49/b832496c377777183a58dd9b9e293d24.jpg" alt="Profile" />
            <UserInfo>
              <strong>{userData.fullName}</strong>
              <p><strong>Email:</strong>{userData.login}</p>
            </UserInfo>
          </UserProfile>
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Senha:</strong> {userData.password}</p>
          <p><strong>Nome:</strong> {userData.fullName}</p>
          <p><strong>CPF:</strong> {userData.cpf}</p>
          <p><strong>Telefone:</strong> {userData.telefone}</p>
          <p><strong>Tipo de Conta:</strong> {userData.role}</p>
          <p><strong>Saldo:</strong> {userData.saldo}</p>
          <p><strong>Data de Nascimento:</strong> {userData.birthDate}</p>
          <p><strong>Time:</strong> {userData.team}</p>
          {userData.AccountRiot ? (
            <RiotInfoContainer>
              <RiotIcon src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${userData.AccountRiot.profileIconId}.png`} alt="Riot Profile" />
              <RiotInfoText>
                <RiotInfoItem><strong>Conta Riot ID:</strong> {userData.AccountRiot.id}</RiotInfoItem>
                <RiotInfoItem><strong>Conta Riot Puuid:</strong> {userData.AccountRiot.puuid}</RiotInfoItem>
                <RiotInfoItem><strong>Conta Riot GameName:</strong> {userData.AccountRiot.gameName}</RiotInfoItem>
                <RiotInfoItem><strong>Conta Riot TagLine:</strong> {userData.AccountRiot.tagLine}</RiotInfoItem>
                <RiotInfoItem><strong>Conta Riot Nível:</strong> {userData.AccountRiot.summonerLevel}</RiotInfoItem>
              </RiotInfoText>
            </RiotInfoContainer>
          ) : (
            <p><strong>Conta Riot:</strong> N/A</p>
          )}
        </UserItem>
      )}
    </UserListContainer>
  );
}

export default UserList;
