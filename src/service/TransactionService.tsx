import ApiService from "../apiService";

interface Tornament {
  id: string;
  [key: string]: any; 
}

interface Chips {
  id: string;
  qntChips: number;
  [key: string]: any; 
}

class TransacitonService extends ApiService {
  constructor() {
    super('/transaction');
  }

  consult() {
    return this.get('');
  }

  

}

export default TransacitonService;
