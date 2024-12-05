import ApiService from "../apiService";
import { FormikHelpers } from "formik";
import {AxiosResponse}  from 'axios'; 

export interface File {
  name: string;
  file: File;
};



class EnumService extends ApiService {
  constructor() {
    super('api');
  }

  city(): Promise<any> {
    return this.get('/cities/SAO_PAULO');
  }

  country(): Promise<any> {
    return this.get('/countries');
  }

  state(): Promise<any> {
    return this.get('/states/BRAZIL');
  }

  gameRegion(): Promise<any> {
    return this.get('/league-regions');
  }




  

}

export default EnumService;
