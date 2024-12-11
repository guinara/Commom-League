import ApiService from "../apiService";

interface Team {
  id: string;
  [key: string]: any; // Caso a equipe tenha outros campos
}

class TeamService extends ApiService {
  constructor() {
    super('team');
  }

  findById(id: number) {
    return this.get(`/${id}`);
  }

  consult() {
    return this.get('');
  }

  getProfiles() {
    return this.get('/profile');
  }

  currentTeam() {
    return this.get('/current');
  }


  register(team: Team) {
    return this.post(``, team);
  }

  join(team: Team) {
    return this.post(`/join`, team);
  }

  invite(teamId: string) {
    return this.post(`/invite?user=${teamId}`, teamId);
  }

  ban(userId: String) {
    return this.delete(`/user/${userId}`);
  }

  selectCaptain(team: Team) {
    return this.put(`/user/${team.id}/to-captain`, team);
  }


  leave(teamId: string) {
    return this.delete(`/left`);
  }

  update(team: Team) {
    return this.put(`/${team.id}`, team);
  }


  remove(id: number) {
    return this.delete(`/${id}`);
  }

  players(team: string) {
    return this.get(`/${team}/members`);
  }

  addPlayer(team: Team) {
    return this.post(`/addPlayer`, team);
  }
}

export default TeamService;
