export interface UserData {
  id: string;
  login: string;
  password: string;
  fullName: string;
  cpf: string;
  telefone: string;
  role: string;
  saldo: string;
  team: string;
  birthDate: string;
  AccountRiot: {
      id: string | null;
      puuid: string | null;
      gameName: string | null;
      tagLine: string | null;
      accountID: string;
      profileIconId: String;
      summonerLevel: String;
  };
}
