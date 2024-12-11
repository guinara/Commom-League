import ApiService from "../apiService";

interface Tornament {
  id: string;
  [key: string]: any; 
}

interface Chips {
  id: string;
  qntChips: number;
  [key: string]: any; 
}

class TornamentService extends ApiService {
  constructor() {
    super('/tournament');
  }

  consult() {
    return this.get('');
  }

  findAll() {
    return this.get('');
  }

  findById(id: string) {
    return this.get(`/${id}`);
  }

  findTeamsByTournament(id: string) {
    return this.get(`/${id}/teams`);
  }


  getCurrentTournamentJoin() {
    return this.get('/join');
  }


  joinTournament(qntChips: number) {
    return this.post(`/join?qntChips=${qntChips}`, qntChips);
  }

  cancelTournamentJoin() {
    return this.delete(``);
  }

  //admin
  startTournament(TornamentId: string) {
    return this.post(`/${TornamentId}/start`, TornamentId);
  }


}

export default TornamentService;
