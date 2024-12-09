import ApiService from "../apiService";

interface Notification {
  id: string;
  userId: string;
  [key: string]: any; // Caso a equipe tenha outros campos
}

interface User {
    userId: string;
    [key: string]: any; // Caso a equipe tenha outros campos
  }

class NotificationService extends ApiService {
  constructor() {
    super('');
  }

  getInventory() {
  }

  findById(id: number) {
    return this.get(`/${id}`);
  }

  consult(userId: String) {
    return this.get(`notification`);
  }

 
  accept(notificaton: Notification) {  
    return this.put(`team/invite/${notificaton.userId}/accept`, notificaton);
  }

   
 reject(notificaton: Notification) {  
      return this.put(`team/invite/${notificaton.userId}/refuse`, notificaton);
    }


  leave(teamId: string) {
    return this.delete(`/leave-team/${teamId}`);
  }

  


  remove(id: number) {
    return this.delete(`/${id}`);
  }


}

export default NotificationService;
