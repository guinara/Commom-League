import ApiService from "../apiService";

interface Team {
  id: string;
  [key: string]: any; // Caso a equipe tenha outros campos
}

class ChampionshipService extends ApiService {
  constructor() {
    super('/tournament');
  }

  findById(id: number) {
    return this.get(`/${id}`);
  }

  consult() {
    return this.get('');
  }


  register(team: Team) {
    return this.post(`/register`, team);
  }

  join(team: Team) {
    return this.post(`/join`, team);
  }

  update(team: Team) {
    return this.put(`/${team.id}`, team);
  }


  remove(id: number) {
    return this.delete(`/${id}`);
  }

  addPlayer(team: Team) {
    return this.post(`/addPlayer`, team);
  }
}

export default ChampionshipService;
