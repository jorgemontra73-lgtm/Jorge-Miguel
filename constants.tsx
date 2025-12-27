
import React from 'react';
import { ServiceType, Provider, UserRole } from './types';

export const SERVICES_CONFIG = [
  { type: ServiceType.CANALIZACAO, icon: '🚰', color: 'bg-blue-100 text-blue-600' },
  { type: ServiceType.ELETRICIDADE, icon: '⚡', color: 'bg-yellow-100 text-yellow-600' },
  { type: ServiceType.LIMPEZA, icon: '🧹', color: 'bg-green-100 text-green-600' },
  { type: ServiceType.PEDREIRO, icon: '🧱', color: 'bg-orange-100 text-orange-600' },
  { type: ServiceType.AC, icon: '❄️', color: 'bg-cyan-100 text-cyan-600' },
  { type: ServiceType.LAVAGEM, icon: '🚿', color: 'bg-indigo-100 text-indigo-600' },
  { type: ServiceType.DESIGN, icon: '🎨', color: 'bg-purple-100 text-purple-600' },
  { type: ServiceType.ENTREGAS, icon: '📦', color: 'bg-red-100 text-red-600' },
];

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'José Kiluanje',
    email: 'jose@exemplo.ao',
    phone: '923000111',
    role: UserRole.PRESTADOR,
    rating: 4.8,
    reviewCount: 42,
    serviceTypes: [ServiceType.CANALIZACAO, ServiceType.ELETRICIDADE],
    bio: 'Especialista em reparos residenciais urgentes em Luanda.',
    verified: true,
    avatar: 'https://picsum.photos/seed/jose/200',
    location: { lat: -8.8390, lng: 13.2894, address: 'Maianga, Luanda' },
    portfolio: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2'],
    pricePerHour: 5000
  },
  {
    id: 'p2',
    name: 'Maria Esperança',
    email: 'maria@exemplo.ao',
    phone: '934111222',
    role: UserRole.PRESTADOR,
    rating: 4.9,
    reviewCount: 156,
    serviceTypes: [ServiceType.LIMPEZA],
    bio: 'Limpeza profunda e organização de escritórios.',
    verified: true,
    avatar: 'https://picsum.photos/seed/maria/200',
    location: { lat: -8.8200, lng: 13.2300, address: 'Talatona, Luanda' },
    portfolio: ['https://picsum.photos/400/300?random=3'],
    pricePerHour: 3500
  }
];

export const APP_PALETTE = {
  primary: '#0D9488', // Teal 600
  secondary: '#F59E0B', // Amber 500
  accent: '#EF4444', // Red 500
};
