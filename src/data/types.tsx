// types.ts

export interface Game {
  id: string; 
  name: string;
  img: string;
}

export interface Foto {
  id: string;
  path: string;
  titulo?: string;
  fonte?: string;
  tagId?: number;
  valor: number;      
  bandeira: string;    
  ficha: string;      
  contador: number;   
  emAndamento: boolean; 
}
