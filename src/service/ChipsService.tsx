import ApiService from "../apiService";

interface Team {
  id: string;
  [key: string]: any; // Caso a equipe tenha outros campos
}

class ChipsService extends ApiService {
  constructor() {
    super('/chip');
  }


  consult() {
    return this.get('');
  }


  buyChip( qnt: number) {
    return this.post(`/67b84e5a-3d6a-4e69-9647-30ec76ae8143/buy/${qnt}`, qnt);
  }

  sellChip(coin: String) {
    return this.post('/sell', coin);
  }


}

export default ChipsService;
