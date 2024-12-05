import http from './http';

class ApiService {
  private httpurl: string;

  constructor(httpurl: string) {
    this.httpurl = httpurl;
  }

  post<T>(url: string, objeto: T) {
    const requestUrl = `${this.httpurl}${url}`;
    return http.post(requestUrl, objeto);
  }

  put<T>(url: string, objeto: T) {
    const requestUrl = `${this.httpurl}${url}`;
    return http.put(requestUrl, objeto);
  }

  delete(url: string) {
    const requestUrl = `${this.httpurl}${url}`;
    return http.delete(requestUrl);
  }

  get(url: string) {
    const requestUrl = `${this.httpurl}${url}`;
    return http.get(requestUrl);
  }


}



export default ApiService;
