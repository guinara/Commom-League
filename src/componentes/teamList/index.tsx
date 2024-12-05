import React, { useEffect, useState } from "react";
import styled from "styled-components";
import http from "../../http";
import { TeamData } from "../interface/teamData";
import { Link } from 'react-router-dom'; 

const UserListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const UserItem = styled.div`
  width: 500px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black;
  flex-direction: column;
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
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const RiotInfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const RiotInfoItem = styled.p`
  margin-bottom: 5px;
`;

const JoinButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const CreateTeamButton = styled(Link)`
  display: block;
  text-align: center;
  padding: 10px 20px;
  background-color: #a80101;
  color: white;
  text-decoration: none;
  border-radius: 5px;
`;

const UserList: React.FC = () => {
  const [teamData, setTeamData] = useState<TeamData[] | null>(null);

  useEffect(() => {
    http.get('api/v1/teams/list')
      .then(response => {
        setTeamData(response.data); 
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleJoinTeam = (teamId: string) => {
    const userId = localStorage.getItem('userId') || ''; 
    const values = { 
      idUser: userId,
      idTeam: teamId,
    };
    
    http.post('api/v1/teams/join', values, {})
    .then(response => {
        window.location.reload(); // Recarrega a página após a operação de joinTeam
    })
    .catch(error => {
        console.error('Error:', error);
    });

    console.log(`Entrando no time ${teamId} com o usuário ${userId}`);
  };

  return (
    <>
      <CreateTeamButton to="/teams">Criar Time</CreateTeamButton>
      <UserListContainer>
        {teamData && teamData.map(team => (
          <UserItem key={team.id}>
            <UserProfile>
              <UserProfilePicture src="https://img.elo7.com.br/product/zoom/3E80D3B/escudo-da-fe-adesivo-p-carro-e-moto-7x9cm-laranja-adesivo-para-carro.jpg" alt="Profile" />
              <UserInfo>
                <strong>{team.leader?.fullName || 'Nome não disponível'}</strong>
                <p><strong>Leader: </strong>{team.leader?.login || 'Email não disponível'}</p>
              </UserInfo>
            </UserProfile>
            <p><strong>ID:</strong> {team.id || 'ID não disponível'}</p>
            <p><strong>Nome:</strong> {team.name || 'Nome não disponível'}</p>
            <p><strong>Saldo:</strong> {team.saldo || '00.00'}</p>
            <p><strong>Jogo:</strong> {team.game || ''}</p>
            <p><strong>Vitórias:</strong> {team.wins || '0'}</p>
            <p><strong>Derrotas:</strong> {team.loses || '0'}</p>
            <p><strong>Em jogo:</strong> {team.inGame ? 'Sim' : 'Não'}</p>
            <p><strong>Jogadores:</strong></p>
            <ul>
              {team.players?.map(player => (
                <li key={player.id}>
                  <strong>{player.AccountRiot.gameName || 'Conta não Associada'}</strong>
                  <p><strong>Nome:</strong> {player.fullName || 'Email não disponível'}</p>
                  <p><strong>Level:</strong> {player.AccountRiot.summonerLevel || 'Conta não Associada'}</p>
                </li>
              ))}
            </ul>
            <JoinButton onClick={() => handleJoinTeam(team.id)}>Entrar no Time</JoinButton>
          </UserItem>
        ))}
      </UserListContainer>
    </>
  );
}

export default UserList;
