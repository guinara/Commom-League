import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserData } from "../interface/accountRiot";
import http from "../../http";

const UserContainer = styled.div`
  width: 500px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black; /* Define a cor do texto como preto */
  background-color: white; /* Define a cor de fundo como branca */
`;

const UserDetail: React.FC<{ id: string }> = ({ id }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    http.get(`api/v1/accountsRiot/${id}`)
      .then(response => {
        setUser(response.data); // Assuming the response data is a single UserData object
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <UserContainer>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>PUUID:</strong> {user.puuid}</p>
      <p><strong>Tag Line:</strong> {user.tagLine}</p>
      <p><strong>GameName:</strong> {user.gameName}</p>

      {/* Add other user data fields as needed */}
    </UserContainer>
  );
}

export default UserDetail;
