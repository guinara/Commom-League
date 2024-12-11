import ApiService from "../apiService";

interface Team {
  id: string;
  [key: string]: any; // Caso a equipe tenha outros campos
}

class ChampionshipService extends ApiService {
  constructor() {
    super('/lol/account');
  }

  findCurrentAccount() {
    return this.get('/current');
  }

  findByUser(ìd: string) {
    return this.get('');
  }

  connect(id:string) {
    return this.post(``, id);
  }

  disconnect() {
    return this.delete('');
  }


}

export default ChampionshipService;
