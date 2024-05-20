import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserData } from "../interface/accountRiot";
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
    http.get('api/v1/accountsRiot/list')
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
          <p><strong>PUUID:</strong> {userData.puuid}</p>
          <p><strong>Tag Line:</strong> {userData.tagLine}</p>
          <p><strong>GameName:</strong> {userData.gameName}</p>

          {/* Add other user data fields as needed */}
        </UserItem>
      ))}
    </UserListContainer>
  );
}

export default UserList;
