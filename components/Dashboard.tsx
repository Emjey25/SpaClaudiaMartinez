import React from 'react';
import { DollarSign, Calendar, Star, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Client, Appointment, Product, Transaction } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  clients: Client[];
  appointments: Appointment[];
  products: Product[];
  transactions: Transaction[];
}

export const Dashboard: React.FC<DashboardProps> = ({ clients, appointments, products, transactions }) => {
  
  // Calculate stats
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === today).length;
  const vipClients = clients.filter(c => c.isVip).length;
  const lowStock = products.filter(p => p.quantity <= p.minStock).length;
  
  const currentMonth = new Date().getMonth();
  const monthlyIncome = transactions
    .filter(t => t.type === 'income' && new Date(t.date).getMonth() === currentMonth)
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Dummy data for the chart visualization
  const data = [
    { name: 'Sem 1', uv: 400 },
    { name: 'Sem 2', uv: 300 },
    { name: 'Sem 3', uv: 550 },
    { name: 'Sem 4', uv: 900 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Banner */}
      <div className="relative w-full h-72 md:h-80 rounded-3xl overflow-hidden shadow-xl group">
        <div className="absolute inset-0 bg-gradient-to-r from-spa-900/90 via-spa-800/60 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200" 
          alt="Spa Massage Banner" 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 max-w-2xl">
          <div className="w-12 h-1 bg-spa-300 mb-6"></div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
            Claudia Martínez <br /> <span className="text-spa-300 italic">Estética Spa</span>
          </h1>
          <p className="text-gray-200 text-sm md:text-base italic border-l-2 border-spa-500 pl-4 py-1">
            "Donde cada detalle está diseñado para revelar tu belleza interior y restaurar tu paz absoluta."
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-spa-50 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-50 rounded-xl">
              <DollarSign className="text-amber-600 w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Actual</span>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider">Ingresos Mensuales</p>
            <h3 className="text-2xl font-serif text-gray-800 font-bold mt-1">${monthlyIncome.toLocaleString()}</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-spa-50 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-rose-50 rounded-xl">
              <Calendar className="text-rose-500 w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">Hoy</span>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider">Citas Programadas</p>
            <h3 className="text-2xl font-serif text-gray-800 font-bold mt-1">{todayAppointments}</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-spa-50 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <Star className="text-indigo-500 w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Lealtad</span>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider">Clientes VIP</p>
            <h3 className="text-2xl font-serif text-gray-800 font-bold mt-1">{vipClients}</h3>
          </div>
        </div>

         {/* Card 4 */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-spa-50 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-orange-50 rounded-xl">
              <AlertTriangle className="text-orange-500 w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Atención</span>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider">Stock Alerta</p>
            <h3 className="text-2xl font-serif text-gray-800 font-bold mt-1">{lowStock}</h3>
          </div>
        </div>
      </div>

      {/* Quick Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-spa-50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-xl text-gray-800">Rendimiento</h3>
            <p className="text-sm text-gray-400">Flujo de clientes este mes</p>
          </div>
          <button className="text-sm text-spa-500 hover:text-spa-600 flex items-center gap-1">
             Ver reporte <ArrowUpRight className="w-4 h-4"/>
          </button>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="uv" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};