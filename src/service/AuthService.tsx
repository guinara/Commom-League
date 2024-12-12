import ApiService from "../apiService";
import { FormikHelpers } from "formik";
import {AxiosResponse}  from 'axios'; 
import axios from "axios";

export interface User {
  login: string;
  id: string;
  image: string;
  accountRiot: {
    tagLine: string;
};
  [key: string]: any; 
}

interface FormValues {
  email: string;
  fullName: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  profile: string;
  birthday: string,
  
}

interface FormValuesLogin {
  email: string;
  password: string;

}

interface General {
  city: string;
}


class AuthService extends ApiService {
  constructor() {
    super('');
  }

  findByLogin(login: string): Promise<any> {
    return this.get(`/${login}`);
  }

  findById(id: string): Promise<any> {
    return this.get(`/${id}`);
  }

  async logar(values: FormValuesLogin, actions: FormikHelpers<FormValuesLogin>): Promise<any> {
    try {
      const response = await this.post(`auth/login`, values);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('currentUser');
      sessionStorage.setItem('token', response.data.token);
      localStorage.setItem('login', values.login);
      console.log(response.data);
      actions.resetForm();
      return response.data;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

  async registrar(values: FormValues, actions: FormikHelpers<FormValues>): Promise<any> {
    try {
      const response = await axios.post(`https://api.commonleague.online/user`, values);
      console.log(response.data);
      actions.resetForm();
      return response.data;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

  update(user: User): Promise<any> {
    return this.put(`/${user.id}`, user);
  }

  async general(values: General, actions: FormikHelpers<General>): Promise<any> {
    try {
      const response = await this.put(`/general`, values);
      console.log(response.data);  // Verifica a resposta da API
      actions.resetForm();
      return response.data;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }
  


  consult(): Promise<any> {
    return this.get('/list');
  }

  remove(id: string): Promise<any> { 
    return this.delete(`/${id}`);
  }

  async getCurrentUser(): Promise<any> { 
    
    return await this.get('/user/current');
  }

  async getCacheUser(): Promise<User> {
    const cachedUser = sessionStorage.getItem('currentUser'); 
  
    let userFromApi: User;
    try {
      const response: AxiosResponse<User> = await this.get('/user/current');
      userFromApi = response.data;
      console.log(response.data);
      
    } catch (error) {
      console.error('Erro ao obter usuário da API:', error);
      throw error; 
    }
  
    if (cachedUser) {
      const parsedCachedUser: User = JSON.parse(cachedUser);
 
      if (JSON.stringify(parsedCachedUser) !== JSON.stringify(userFromApi)) {
        console.log("Usuário no cache diferente da API. Atualizando...");
        console.log(parsedCachedUser.image);
        sessionStorage.setItem('currentUser', JSON.stringify(userFromApi));  
        return userFromApi;  
      }
  
      return parsedCachedUser;
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(userFromApi));
      return userFromApi;
    }
  }
  

}

export default AuthService;
