import ApiService from "../apiService";

interface Match {
  id: string;
  [key: string]: any;
}

class MatchService extends ApiService {
  constructor() {
    super('api/info');
  }

  getAccounts(): Promise<any> {
    return this.get('/by-puuid/xCDM4GuO0T9UhKZhE8ENTqyQD5iBAn9QU5Tzcvo4LoQ-KKZCkcTd_9bUcFdUXaCwKzsvvljZXQQpdA?page=0&size=10');
  }


  

}

export default MatchService;
