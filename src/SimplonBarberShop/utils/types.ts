export interface Barber {
  uid: string;
  nome: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  image?: string;
}
export interface Service {
  id: Number;
  serviceName: string;
  price: Number;
  timeSpent: Number;
}
export interface Time {
  date: string;
  time: string[];
}

export interface Customer {
  uid: string;
  nome: string;
  telefone: string;
  email: string;
  dataNascimento: string;
}
