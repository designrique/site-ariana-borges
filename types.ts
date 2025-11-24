export interface Cycle {
  name: string;
  duration: string;
  startDate: string;
  objective: string;
  icon: 'shield' | 'sun';
}

export interface PricingOption {
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}