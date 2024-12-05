import ApiService from "../apiService";

interface Match {
  id: string;
  [key: string]: any;
}

class ParticipantService extends ApiService {
  constructor() {
    super('participants/match/');
  }

  getAccounts(): Promise<any> {
    return this.get('f92cf1de-9259-4470-b062-ca4ed1270dc6');
  }


  

}

export default ParticipantService;
