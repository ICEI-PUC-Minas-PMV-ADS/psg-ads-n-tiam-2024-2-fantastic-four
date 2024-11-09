interface Barber {
    name: string;
    image: string;
  }

  interface Service {
    id: Number;
    serviceName: string;
    price: Number;
    timeSpent: Number;
  }

  interface Time {
    id: Number;
    day: string;
    time: string;
    status: boolean;
  }