import ApiService from "../apiService";

interface Match {
  id: string;
  [key: string]: any;
}

class MatchService extends ApiService {
  constructor() {
    super('/inventory');
  }

  getInventory(): Promise<any> {
    return this.get('');
  }

}

export default MatchService;
