
export interface EventData {
  id: string;
  title: string;
  description: string;
  category: 'TECH' | 'NON-TECH';
}

export interface WorkshopData {
  id: string;
  title: string;
  points: string[];
  coordinator: string;
  phone: string;
}

export interface PricePlan {
  title: string;
  price: number;
  features: string;
  link: string;
}
