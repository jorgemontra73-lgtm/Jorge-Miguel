
export enum UserRole {
  CLIENTE = 'CLIENTE',
  PRESTADOR = 'PRESTADOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  location?: { lat: number; lng: number; address: string };
}

export interface Provider extends User {
  serviceTypes: ServiceType[];
  rating: number;
  reviewCount: number;
  bio: string;
  verified: boolean;
  pricePerHour?: number;
  portfolio: string[]; // URLs
}

export enum ServiceType {
  CANALIZACAO = 'Canalização',
  ELETRICIDADE = 'Eletricidade',
  LIMPEZA = 'Limpeza Doméstica',
  PEDREIRO = 'Pedreiro e Pintura',
  AC = 'Ar Condicionado',
  LAVAGEM = 'Lavagem de Carros',
  DESIGN = 'Design Gráfico e Impressão',
  ENTREGAS = 'Entregas Locais'
}

export interface BudgetRequest {
  id: string;
  clientId: string;
  providerId: string;
  serviceType: ServiceType;
  description: string;
  photos: string[];
  status: 'pendente' | 'aceito' | 'recusado' | 'pago';
  estimatedPrice?: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}

export interface AIRecommendation {
  providerId: string;
  reason: string;
}

export interface MarketAnalysis {
  avgPrice: number;
  demandLevel: 'Baixa' | 'Média' | 'Alta';
  topAreas: string[];
}
