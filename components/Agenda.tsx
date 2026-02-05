import React, { useState } from 'react';
import { Appointment, Client } from '../types';
import { Plus, Clock, User, CheckCircle, XCircle } from 'lucide-react';

interface AgendaProps {
  appointments: Appointment[];
  clients: Client[];
  addAppointment: (apt: Appointment) => void;
  updateStatus: (id: string, status: Appointment['status']) => void;
}

export const Agenda: React.FC<AgendaProps> = ({ appointments, clients, addAppointment, updateStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [newApt, setNewApt] = useState<Partial<Appointment>>({
    date: new Date().toISOString().split('T')[0],
    status: 'pending'
  });

  const handleSave = () => {
    if (newApt.clientId && newApt.date && newApt.time && newApt.service) {
      const client = clients.find(c => c.id === newApt.clientId);
      addAppointment({
        id: Date.now().toString(),
        clientId: newApt.clientId,
        clientName: client?.name || 'Unknown',
        date: newApt.date,
        time: newApt.time,
        service: newApt.service,
        status: 'pending'
      });
      setShowModal(false);
      setNewApt({ date: new Date().toISOString().split('T')[0], status: 'pending' });
    }
  };

  const statusColors = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
  };

  const statusLabels = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    completed: 'Completada',
    cancelled: 'Cancelada',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-800">Agenda de Citas</h2>
          <p className="text-gray-500 text-sm">Organiza tu día y gestiona tus clientes.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-spa-500 hover:bg-spa-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} /> Nueva Cita
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-spa-50 overflow-hidden">
        {appointments.length === 0 ? (
           <div className="p-10 text-center text-gray-400">
             No hay citas programadas.
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-spa-50/50">
                <tr>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Hora</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Servicio</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.sort((a,b) => a.time.localeCompare(b.time)).map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-700 flex items-center gap-2">
                      <Clock size={14} className="text-spa-400"/> {apt.time}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-spa-100 text-spa-500 flex items-center justify-center text-xs font-bold">
                          {apt.clientName.charAt(0)}
                        </div>
                        <span className="text-gray-800">{apt.clientName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{apt.service}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[apt.status]}`}>
                        {statusLabels[apt.status]}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {apt.status !== 'completed' && (
                          <button onClick={() => updateStatus(apt.id, 'completed')} className="text-green-500 hover:text-green-700" title="Completar">
                            <CheckCircle size={18} />
                          </button>
                        )}
                        {apt.status !== 'cancelled' && (
                          <button onClick={() => updateStatus(apt.id, 'cancelled')} className="text-red-400 hover:text-red-600" title="Cancelar">
                            <XCircle size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">Nueva Cita</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <select 
                  className="w-full rounded-lg border-gray-200 border focus:border-spa-500 focus:ring focus:ring-spa-200 p-2 text-sm"
                  onChange={(e) => setNewApt({...newApt, clientId: e.target.value})}
                >
                  <option value="">Seleccionar cliente...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                   <input 
                      type="date" 
                      className="w-full rounded-lg border-gray-200 border p-2 text-sm"
                      value={newApt.date}
                      onChange={(e) => setNewApt({...newApt, date: e.target.value})}
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                   <input 
                      type="time" 
                      className="w-full rounded-lg border-gray-200 border p-2 text-sm"
                      value={newApt.time}
                      onChange={(e) => setNewApt({...newApt, time: e.target.value})}
                   />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
                <input 
                  type="text" 
                  placeholder="Ej. Limpieza Facial Profunda"
                  className="w-full rounded-lg border-gray-200 border p-2 text-sm"
                  value={newApt.service || ''}
                  onChange={(e) => setNewApt({...newApt, service: e.target.value})}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg text-sm"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-spa-500 text-white rounded-lg hover:bg-spa-800 text-sm shadow-md"
              >
                Agendar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
