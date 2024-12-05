import ApiService from "../apiService";
import { FormikHelpers } from "formik";
import {AxiosResponse}  from 'axios'; 

export interface File {
  name: string;
  file: File;
};



class AuthService extends ApiService {
  constructor() {
    super('api/files');
  }

  findByLogin(login: string): Promise<any> {
    return this.get(`/${login}`);
  }

  findById(id: string): Promise<any> {
    return this.get(`/${id}`);
  }

  updateAvatar(file: File): Promise<any> {
    return this.put(`/user_default`, file);
  }


  consult(): Promise<any> {
    return this.get('/list');
  }

  remove(id: string): Promise<any> { 
    return this.delete(`/${id}`);
  }

  async getCurrentUser(): Promise<any> { 
    return await this.get('/current-user');
  }


  

}

export default AuthService;
