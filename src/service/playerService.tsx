import ApiService from "../apiService";

interface AccountRiot {
  id: string;
  [key: string]: any;
}

class AccountRiotService extends ApiService {
  constructor() {
    super('api/v1/accountsRiot');
  }

  getAccounts(): Promise<any> {
    return this.get('/list');
  }

  getAccountMatches(): Promise<any> {
    return this.get('/matches');
  }

  findById(id: string): Promise<any> {
    return this.get(`/${id}`);
  }

  postByAPI(AccountRiot: AccountRiot): Promise<any> {
    return this.post(`/`, AccountRiot);
  }

  remove(id: number): Promise<any> { 
    return this.delete(`/${id}`);
  }


  update(AccountRiot: AccountRiot): Promise<any> {
    return this.put(`/${AccountRiot.id}`, AccountRiot);
  }

  addAccountRiot(AccountRiot: AccountRiot): Promise<any> {
    return this.post(`/addAccountRiot`, AccountRiot);
  }

}

export default AccountRiotService;
