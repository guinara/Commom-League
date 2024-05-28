import { UserData } from "./userData";

export interface TeamData {
  id: string;
  name: string | null;
  logo: string | null;
  game: string | null;
  saldo: number | null;
  wins: number | null;
  loses: number | null;
  inGame: boolean | null;
  players: UserData[] | null;
  leader: {
      id: string | null;
      login: string | null;
      fullName: string | null;
  } | null;
}
