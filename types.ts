
export interface EventData {
  id: string;
  title: string;
  description: string;
  category: 'TECH' | 'NON-TECH';
  type: 'SOLO' | 'INDIVIDUAL_OR_DUO' | 'TEAM' | 'TEAM_MAX_2' | 'TEAM_MAX_4';
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
