import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Agenda } from './components/Agenda';
import { Clients } from './components/Clients';
import { Inventory } from './components/Inventory';
import { Accounting } from './components/Accounting';
import { Client, Appointment, Product, Transaction, ViewState } from './types';

// Helper to get today's date formatted
const todayStr = new Date().toISOString().split('T')[0];

// Seed Data
const INITIAL_CLIENTS: Client[] = [
  { 
    id: '1', 
    name: 'Ana Sofía Lopez', 
    phone: '555-0101', 
    email: 'ana@example.com', 
    birthDate: '1990-05-15',
    isVip: true, 
    history: 'Paciente presenta mejora en la zona T. Se recomienda continuar con hidratación profunda.', 
    clinicalData: {
      skinType: 'Mixta',
      hydrationLevel: 60,
      oilLevel: 40,
      sensitivityLevel: 80,
      treatedAreas: ['forehead', 'nose'],
      allergies: 'Nueces, Látex'
    },
    lastVisit: '2023-10-15' 
  },
  { 
    id: '2', 
    name: 'María Gonzalez', 
    phone: '555-0102', 
    email: 'maria@example.com', 
    birthDate: todayStr, // Setting birthday to today for demo purposes
    isVip: false, 
    history: 'Primera visita. Piel joven con leve tendencia acnéica.', 
    clinicalData: {
      skinType: 'Grasa',
      hydrationLevel: 75,
      oilLevel: 90,
      sensitivityLevel: 20,
      treatedAreas: ['cheeks', 'chin'],
      allergies: 'Ninguna conocida'
    },
    lastVisit: '2023-10-20' 
  },
  { 
    id: '3', 
    name: 'Carla Ruiz', 
    phone: '555-0103', 
    email: 'carla@example.com', 
    birthDate: '1985-11-30',
    isVip: true, 
    history: 'Tratamiento anti-edad fase 2 completado. Reacción favorable al retinol.', 
    clinicalData: {
      skinType: 'Seca',
      hydrationLevel: 30,
      oilLevel: 10,
      sensitivityLevel: 50,
      treatedAreas: ['eyes', 'forehead', 'neck'],
      allergies: 'Sulfatos'
    },
    lastVisit: '2023-10-18' 
  },
];

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Aceite de Argán Puro', quantity: 12, minStock: 5, price: 45.00, unit: 'Botella 50ml' },
  { id: '2', name: 'Mascarilla de Arcilla', quantity: 3, minStock: 10, price: 25.00, unit: 'Tarro 200g' },
  { id: '3', name: 'Suero Vitamina C', quantity: 8, minStock: 5, price: 60.00, unit: 'Gotero 30ml' },
  { id: '4', name: 'Toallas Faciales', quantity: 50, minStock: 20, price: 5.00, unit: 'Unidad' },
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: '1', clientId: '1', clientName: 'Ana Sofía Lopez', date: todayStr, time: '10:00', service: 'Hidratación Profunda', status: 'confirmed' },
  { id: '2', clientId: '2', clientName: 'María Gonzalez', date: todayStr, time: '14:30', service: 'Limpieza Facial', status: 'pending' },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2023-10-01', description: 'Venta de productos', amount: 350, type: 'income' },
  { id: '2', date: '2023-10-02', description: 'Reposición de stock', amount: 120, type: 'expense' },
  { id: '3', date: '2023-10-05', description: 'Servicios de Spa', amount: 800, type: 'income' },
  { id: '4', date: '2023-10-10', description: 'Pago de servicios públicos', amount: 200, type: 'expense' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // App State (Simulating Database)
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  // Actions
  const addClient = (client: Client) => setClients([...clients, client]);
  const updateClient = (client: Client) => setClients(clients.map(c => c.id === client.id ? client : c));
  
  const addAppointment = (apt: Appointment) => {
    setAppointments([...appointments, apt]);
    // Auto-generate transaction for income (simplified logic)
    setTransactions([...transactions, {
      id: Date.now().toString(),
      date: apt.date,
      description: `Servicio: ${apt.service} - ${apt.clientName}`,
      amount: 100, // Dummy fixed price for demo
      type: 'income'
    }]);
  };
  
  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
  };

  const updateProductStock = (id: string, delta: number) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const newQty = Math.max(0, p.quantity + delta);
        return { ...p, quantity: newQty };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-[#fdf8f6] text-gray-800 font-sans flex">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 md:ml-64 transition-all duration-300">
        {/* Header Mobile */}
        <div className="md:hidden bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-30">
          <span className="font-serif font-bold text-lg text-spa-900">Claudia Martínez</span>
          <div className="w-8"></div> {/* Spacer for menu button alignment */}
        </div>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {currentView === 'dashboard' && (
            <Dashboard 
              clients={clients} 
              appointments={appointments} 
              products={products}
              transactions={transactions}
            />
          )}
          {currentView === 'agenda' && (
            <Agenda 
              appointments={appointments} 
              clients={clients}
              addAppointment={addAppointment}
              updateStatus={updateAppointmentStatus}
            />
          )}
          {currentView === 'clients' && (
            <Clients 
              clients={clients} 
              addClient={addClient}
              updateClient={updateClient}
            />
          )}
          {currentView === 'inventory' && (
            <Inventory 
              products={products} 
              updateStock={updateProductStock}
            />
          )}
          {currentView === 'accounting' && (
            <Accounting 
              transactions={transactions}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
