import ApiService from "../apiService"; // Certifique-se de que o caminho está correto
import axios from "axios";

interface User {
  id: number;
  [key: string]: any; 
}

class UserService extends ApiService {
  constructor() {
    super('api/user.json');
  }

  findById(id: number): Promise<any> {
    return this.get(`/${id}`);
  }

  save(user: User): Promise<any> {
    return this.post(`/`, user);
  }

  update(user: User): Promise<any> {
    return this.put(`/${user.id}`, user);
  }

  consult(): Promise<any> {
    return this.get('');
  }

  remove(id: number): Promise<any> { 
    return this.delete(`/${id}`);
  }

  

}

export default UserService;
