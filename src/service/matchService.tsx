import ApiService from "../apiService";

interface Match {
  id: string;
  [key: string]: any;
}

class MatchService extends ApiService {
  constructor() {
    super('match');
  }

  getAccounts(): Promise<any> {
    return this.get('/by-puuid/xCDM4GuO0T9UhKZhE8ENTqyQD5iBAn9QU5Tzcvo4LoQ-KKZCkcTd_9bUcFdUXaCwKzsvvljZXQQpdA?page=0&size=10');
  }


  consult() {
    return this.get('');
  }

  findAll() {
    return this.get('');
  }

  findById(id: string) {
    return this.get(`${id}`);
  }

  findByTournament(id: string) {
    return this.get(`${id}`);
  }

  findTeamsByTournament(id: string) {
    return this.get(`${id}`);
  }


  getCurrentTournamentJoin() {
    return this.get('/join');
  }


  RegisterForTournament(id: string) {
    return this.post('', id);
  }

  cancelTournamentJoin() {
    return this.delete(``);
  }

  //admin
  startTournament(TornamentId: string) {
    return this.post(`/${TornamentId}/start`, TornamentId);
  }


}

export default MatchService;
