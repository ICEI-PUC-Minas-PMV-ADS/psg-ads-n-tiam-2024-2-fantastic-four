export interface Barber {
  uid: string;
  nome: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  image?: any;
}
export interface Service {
  id: Number;
  serviceName: string;
  price: Number;
  timeSpent: Number;
}
export interface Time {
  date: any;
  time: string[];
}

export interface Customer {
  uid: string;
  nome: string;
  telefone: string;
  email: string;
  dataNascimento: string;
}
