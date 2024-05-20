import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserData } from "../interface/userData";
import http from "../../http";

const UserListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const UserItem = styled.div`
  width: 500px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black; /* Define a cor do texto como preto */
  background-color: white; /* Define a cor de fundo como branca */
`;

const UserList: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);

  useEffect(() => {
    http.get('auth/list')
      .then(response => {
        setData(response.data); // Assuming the response data is an array of UserData
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <UserListContainer>
      {data.map((userData, index) => (
        <UserItem key={index}>
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Login:</strong> {userData.Login}</p>
          <p><strong>Senha:</strong> {userData.password}</p>
          <p><strong>Nome:</strong> {userData.fullName}</p>
          <p><strong>cpf:</strong> {userData.cpf}</p>
          <p><strong>Telefone:</strong> {userData.telefone}</p>
          <p><strong>Tipo de Conta:</strong> {userData.role}</p>
          <p><strong>Saldo:</strong> {userData.saldo}</p>
          <p><strong>Data de Nascimento:</strong> {userData.birthDate}</p>
          <p><strong>Time:</strong> {userData.team}</p>
          <p><strong>Conta Riot:</strong> {userData.accountRiot}</p>

          {/* Add other user data fields as needed */}
        </UserItem>
      ))}
    </UserListContainer>
  );
}

export default UserList;
