export interface ClinicalData {
  skinType: 'Seca' | 'Mixta' | 'Grasa' | 'Normal' | 'Sensible';
  hydrationLevel: number; // 1-100
  oilLevel: number; // 1-100
  sensitivityLevel: number; // 1-100
  treatedAreas: string[]; // ids of areas like 'forehead', 'cheeks', etc.
  allergies: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  birthDate: string; // YYYY-MM-DD
  isVip: boolean;
  history: string; // Notas de evolución (texto libre)
  clinicalData: ClinicalData; // Datos estructurados visuales
  lastVisit: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  time: string;
  service: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
  minStock: number;
  price: number;
  unit: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

export type ViewState = 'dashboard' | 'agenda' | 'clients' | 'inventory' | 'accounting';
