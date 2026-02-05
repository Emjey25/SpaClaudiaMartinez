import React from 'react';
import { Transaction } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface AccountingProps {
  transactions: Transaction[];
}

export const Accounting: React.FC<AccountingProps> = ({ transactions }) => {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  // Prepare chart data (Group by date for simplicity of this demo)
  const chartData = transactions.reduce((acc: any[], curr) => {
    const existing = acc.find(item => item.date === curr.date);
    if (existing) {
        if (curr.type === 'income') existing.income += curr.amount;
        else existing.expense += curr.amount;
    } else {
        acc.push({
            date: curr.date,
            income: curr.type === 'income' ? curr.amount : 0,
            expense: curr.type === 'expense' ? curr.amount : 0
        });
    }
    return acc;
  }, []).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-8">
       <div>
            <h2 className="text-2xl font-serif font-bold text-gray-800">Módulo Contable</h2>
            <p className="text-gray-500 text-sm">Resumen financiero y movimientos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-spa-50 flex items-center gap-4">
                <div className="p-4 bg-green-50 rounded-full text-green-600">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Ingresos Totales</p>
                    <h3 className="text-2xl font-bold text-gray-800">${totalIncome.toLocaleString()}</h3>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-spa-50 flex items-center gap-4">
                <div className="p-4 bg-red-50 rounded-full text-red-600">
                    <TrendingDown size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Gastos Totales</p>
                    <h3 className="text-2xl font-bold text-gray-800">${totalExpense.toLocaleString()}</h3>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-spa-50 flex items-center gap-4">
                <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                    <Wallet size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Balance Neto</p>
                    <h3 className={`text-2xl font-bold ${balance >= 0 ? 'text-gray-800' : 'text-red-500'}`}>${balance.toLocaleString()}</h3>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-spa-50">
                <h3 className="font-bold text-gray-800 mb-6">Flujo de Caja</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}/>
                            <Bar dataKey="income" name="Ingresos" fill="#10b981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="expense" name="Gastos" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-spa-50">
                <h3 className="font-bold text-gray-800 mb-4">Movimientos Recientes</h3>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                    {transactions.slice(0).reverse().map(t => (
                        <div key={t.id} className="flex justify-between items-center text-sm p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div>
                                <p className="font-medium text-gray-700">{t.description}</p>
                                <p className="text-xs text-gray-400">{t.date}</p>
                            </div>
                            <span className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                                {t.type === 'income' ? '+' : '-'}${t.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};