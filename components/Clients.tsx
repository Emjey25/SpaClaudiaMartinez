import React, { useState } from 'react';
import { Client, ClinicalData } from '../types';
import { Search, Crown, FileText, Plus, X, Gift, Droplets, Sun, Activity, Save } from 'lucide-react';

interface ClientsProps {
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (client: Client) => void;
}

// Visual Gauge Component
const Gauge: React.FC<{ label: string; value: number; onChange: (val: number) => void; colorClass: string }> = ({ label, value, onChange, colorClass }) => (
    <div className="mb-4">
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <input 
            type="range" 
            min="0" 
            max="100" 
            value={value} 
            onChange={(e) => onChange(parseInt(e.target.value))}
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-${colorClass}`}
        />
    </div>
);

// Face Map Component
const FaceMap: React.FC<{ selected: string[]; onToggle: (area: string) => void }> = ({ selected, onToggle }) => {
    const areas = [
        { id: 'forehead', d: "M30,30 Q50,10 70,30 Q50,40 30,30", name: "Frente" },
        { id: 'eyes', d: "M20,45 Q30,40 40,45 M60,45 Q70,40 80,45", name: "Contorno Ojos" },
        { id: 'nose', d: "M45,45 L55,45 L50,65 Z", name: "Nariz / Zona T" },
        { id: 'cheeks', d: "M20,55 Q10,70 30,80 Q40,70 45,60 M80,55 Q90,70 70,80 Q60,70 55,60", name: "Mejillas" },
        { id: 'chin', d: "M35,85 Q50,95 65,85 Q50,80 35,85", name: "Mentón" },
        { id: 'neck', d: "M30,90 Q50,110 70,90 L70,100 Q50,120 30,100 Z", name: "Cuello" }
    ];

    return (
        <div className="relative w-48 h-56 mx-auto my-4">
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>
                {/* Base Face Shape */}
                <path d="M15,40 Q15,10 50,10 Q85,10 85,40 Q85,80 50,95 Q15,80 15,40" fill="#fdf8f6" stroke="#e5e7eb" strokeWidth="1" />
                
                {areas.map(area => (
                    <path 
                        key={area.id}
                        d={area.d}
                        onClick={() => onToggle(area.id)}
                        className={`
                            cursor-pointer transition-all duration-300 stroke-1 hover:opacity-80
                            ${selected.includes(area.id) ? 'fill-spa-300 stroke-spa-500' : 'fill-white stroke-gray-300 hover:fill-spa-50'}
                        `}
                    >
                        <title>{area.name}</title>
                    </path>
                ))}
            </svg>
            <p className="text-center text-xs text-gray-400 mt-2">Haz clic en las zonas a tratar</p>
        </div>
    );
};

export const Clients: React.FC<ClientsProps> = ({ clients, addClient, updateClient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Client>>({});
  
  // Helper to check for birthday
  const checkBirthday = (dateString?: string) => {
    if (!dateString) return false;
    const today = new Date();
    const birth = new Date(dateString);
    // Be careful with timezone issues, simplistic check for demo:
    return today.getDate() + 1 === birth.getDate() + 1 && today.getMonth() === birth.getMonth();
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveClient = () => {
    if (formData.name && formData.phone) {
      if (formData.id) {
        updateClient(formData as Client);
      } else {
        const defaultClinical: ClinicalData = {
             skinType: 'Normal',
             hydrationLevel: 50,
             oilLevel: 50,
             sensitivityLevel: 20,
             treatedAreas: [],
             allergies: ''
        };
        addClient({
          id: Date.now().toString(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email || '',
          birthDate: formData.birthDate || '',
          isVip: formData.isVip || false,
          history: formData.history || '',
          clinicalData: defaultClinical,
          lastVisit: new Date().toISOString().split('T')[0]
        });
      }
      setIsFormOpen(false);
      setFormData({});
    }
  };

  const openHistory = (client: Client) => {
    // Ensure clinical data structure exists
    if(!client.clinicalData) {
        const enhancedClient = {
            ...client,
            clinicalData: {
                skinType: 'Normal',
                hydrationLevel: 50,
                oilLevel: 50,
                sensitivityLevel: 20,
                treatedAreas: [],
                allergies: ''
            } as ClinicalData
        };
        setSelectedClient(enhancedClient);
    } else {
        setSelectedClient(client);
    }
  };

  const saveHistoryChange = (updates: Partial<ClinicalData> | { history: string }) => {
    if (selectedClient) {
      const updatedClient = {
        ...selectedClient,
        ...updates,
        clinicalData: {
             ...selectedClient.clinicalData,
             ...(updates as any) // Simplified merging for demo
        }
      };
      
      // If it's the root history string
      if('history' in updates) {
          updatedClient.history = updates.history as string;
      }

      setSelectedClient(updatedClient);
      updateClient(updatedClient);
    }
  };

  const toggleArea = (areaId: string) => {
      if(!selectedClient) return;
      const currentAreas = selectedClient.clinicalData.treatedAreas;
      const newAreas = currentAreas.includes(areaId) 
         ? currentAreas.filter(a => a !== areaId)
         : [...currentAreas, areaId];
      
      saveHistoryChange({ treatedAreas: newAreas });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-serif font-bold text-gray-800">Base de Pacientes</h2>
           <p className="text-gray-500 text-sm">Gestiona usuarios frecuentes e historias clínicas.</p>
        </div>
        <div className="flex gap-2">
            <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Buscar paciente..." 
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-spa-200 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button 
                onClick={() => { setFormData({}); setIsFormOpen(true); }}
                className="bg-spa-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-spa-800 transition-colors shadow-sm"
            >
                <Plus size={16} /> Agregar
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map(client => {
            const isBirthday = checkBirthday(client.birthDate);
            return (
              <div key={client.id} className={`bg-white rounded-2xl p-6 shadow-sm border ${isBirthday ? 'border-gold-400 ring-1 ring-gold-200' : 'border-spa-50'} relative group hover:shadow-md transition-all`}>
                {client.isVip && (
                    <div className="absolute top-4 right-4 text-amber-500 bg-amber-50 p-1 rounded-full" title="Usuario Frecuente">
                        <Crown size={16} fill="currentColor" />
                    </div>
                )}
                {isBirthday && (
                    <div className="absolute -top-3 -right-3 animate-bounce">
                        <div className="bg-gold-500 text-white p-2 rounded-full shadow-lg" title="¡Cumpleaños!">
                            <Gift size={20} fill="currentColor" />
                        </div>
                    </div>
                )}
                
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-spa-100 text-spa-600 flex items-center justify-center font-serif text-xl border-2 border-white shadow-sm">
                        {client.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 leading-tight">{client.name}</h3>
                        <p className="text-xs text-gray-500">{client.email}</p>
                        {isBirthday && <span className="text-xs font-bold text-gold-600">¡Cita de Cumpleaños Gratis!</span>}
                    </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>📞 {client.phone}</p>
                    <p className="text-xs text-gray-400">🎂 {client.birthDate || 'Sin fecha'}</p>
                </div>
                <button 
                    onClick={() => openHistory(client)}
                    className="w-full py-2 border border-spa-200 rounded-lg text-spa-600 hover:bg-spa-50 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <FileText size={14} /> Ver Historia Clínica
                </button>
              </div>
            );
        })}
      </div>

      {/* Enhanced History Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col overflow-hidden max-h-[90vh]">
                
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-spa-50/30">
                    <div className="flex items-center gap-4">
                         <div className="w-16 h-16 rounded-full bg-spa-200 text-spa-800 flex items-center justify-center font-serif text-3xl">
                             {selectedClient.name.charAt(0)}
                         </div>
                         <div>
                            <h3 className="text-2xl font-serif font-bold text-gray-800">{selectedClient.name}</h3>
                            <div className="flex gap-2 items-center">
                                <span className="text-sm text-gray-500">Edad: {selectedClient.birthDate ? new Date().getFullYear() - new Date(selectedClient.birthDate).getFullYear() : 'N/A'} años</span>
                                {selectedClient.isVip && <span className="text-xs bg-gold-400 text-gold-900 px-2 rounded-full font-bold">VIP</span>}
                            </div>
                         </div>
                    </div>
                    <button onClick={() => setSelectedClient(null)} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                {/* Birthday Banner Inside Modal */}
                {checkBirthday(selectedClient.birthDate) && (
                    <div className="bg-gradient-to-r from-gold-400 to-amber-300 p-3 text-center shadow-inner">
                        <p className="text-amber-900 font-bold flex items-center justify-center gap-2">
                            <Gift className="animate-pulse" />
                            ¡Feliz Cumpleaños! Este cliente tiene disponible una cita de regalo hoy.
                        </p>
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        
                        {/* Left Column: Stats & Skin Type */}
                        <div className="md:col-span-4 space-y-6">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                    <Activity size={18} className="text-spa-500" /> Diagnóstico
                                </h4>
                                
                                <div className="mb-4">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Tipo de Piel</label>
                                    <select 
                                        className="w-full mt-1 p-2 border rounded-lg bg-gray-50 text-gray-700 outline-none focus:ring-1 focus:ring-spa-300"
                                        value={selectedClient.clinicalData?.skinType}
                                        onChange={(e) => saveHistoryChange({ skinType: e.target.value as any })}
                                    >
                                        <option value="Normal">Normal</option>
                                        <option value="Seca">Seca</option>
                                        <option value="Grasa">Grasa</option>
                                        <option value="Mixta">Mixta</option>
                                        <option value="Sensible">Sensible</option>
                                    </select>
                                </div>

                                <Gauge 
                                    label="Hidratación" 
                                    value={selectedClient.clinicalData?.hydrationLevel || 0} 
                                    onChange={(val) => saveHistoryChange({ hydrationLevel: val })}
                                    colorClass="spa-500"
                                />
                                <Gauge 
                                    label="Grasa / Sebo" 
                                    value={selectedClient.clinicalData?.oilLevel || 0} 
                                    onChange={(val) => saveHistoryChange({ oilLevel: val })}
                                    colorClass="amber-500"
                                />
                                <Gauge 
                                    label="Sensibilidad" 
                                    value={selectedClient.clinicalData?.sensitivityLevel || 0} 
                                    onChange={(val) => saveHistoryChange({ sensitivityLevel: val })}
                                    colorClass="red-400"
                                />
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <h4 className="font-bold text-gray-700 mb-2">Alergias / Contraindicaciones</h4>
                                <textarea 
                                    className="w-full p-2 text-sm border rounded-lg bg-red-50 text-red-800 border-red-100 focus:ring-red-200 focus:outline-none resize-none"
                                    rows={3}
                                    placeholder="Ej. Nueces, Aspirina, Látex..."
                                    value={selectedClient.clinicalData?.allergies}
                                    onChange={(e) => saveHistoryChange({ allergies: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Middle Column: Face Map */}
                        <div className="md:col-span-4 flex flex-col items-center justify-start">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 w-full h-full flex flex-col items-center">
                                <h4 className="font-bold text-gray-700 mb-2 w-full text-left">Mapa de Zonas Tratadas</h4>
                                <FaceMap 
                                    selected={selectedClient.clinicalData?.treatedAreas || []}
                                    onToggle={toggleArea}
                                />
                                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                    {selectedClient.clinicalData?.treatedAreas?.map(area => (
                                        <span key={area} className="px-3 py-1 bg-spa-100 text-spa-800 text-xs rounded-full font-medium capitalize">
                                            {area === 'nose' ? 'Zona T' : area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Notes & History */}
                        <div className="md:col-span-4 flex flex-col h-full">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
                                <div className="flex justify-between items-center mb-4">
                                     <h4 className="font-bold text-gray-700">Notas de Evolución</h4>
                                     <Save size={16} className="text-gray-400" />
                                </div>
                                <textarea 
                                    className="flex-1 w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-spa-200 outline-none text-gray-700 leading-relaxed resize-none bg-gray-50 text-sm font-sans"
                                    defaultValue={selectedClient.history}
                                    onBlur={(e) => saveHistoryChange({ history: e.target.value })}
                                    placeholder="Escribe aquí los detalles de la sesión, reacciones del paciente y recomendaciones para el hogar..."
                                ></textarea>
                                <p className="text-xs text-gray-400 mt-2 text-right">Los cambios se guardan automáticamente.</p>
                            </div>
                        </div>

                    </div>
                </div>
                
                <div className="p-4 border-t border-gray-100 bg-white flex justify-end">
                    <button onClick={() => setSelectedClient(null)} className="px-6 py-2 bg-spa-500 text-white rounded-lg hover:bg-spa-600 transition-colors font-medium shadow-md">
                        Cerrar Ficha
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Add/Edit Client Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
             <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">Datos del Paciente</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500">Nombre Completo</label>
                        <input 
                            className="w-full p-2 border rounded-lg focus:ring-spa-200 focus:border-spa-500 outline-none" 
                            value={formData.name || ''}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="text-xs font-bold text-gray-500">Teléfono</label>
                             <input 
                                className="w-full p-2 border rounded-lg focus:ring-spa-200 focus:border-spa-500 outline-none" 
                                value={formData.phone || ''}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                         <div>
                             <label className="text-xs font-bold text-gray-500">Cumpleaños</label>
                             <input 
                                type="date"
                                className="w-full p-2 border rounded-lg focus:ring-spa-200 focus:border-spa-500 outline-none" 
                                value={formData.birthDate || ''}
                                onChange={e => setFormData({...formData, birthDate: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Email</label>
                        <input 
                            className="w-full p-2 border rounded-lg focus:ring-spa-200 focus:border-spa-500 outline-none" 
                            value={formData.email || ''}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                        <input 
                            type="checkbox" 
                            id="isVip"
                            checked={formData.isVip || false}
                            onChange={e => setFormData({...formData, isVip: e.target.checked})}
                            className="w-4 h-4 rounded text-spa-500 focus:ring-spa-500"
                        />
                        <label htmlFor="isVip" className="text-sm text-gray-700">Usuario Frecuente (VIP)</label>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <button onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancelar</button>
                    <button onClick={handleSaveClient} className="px-4 py-2 bg-spa-500 text-white rounded-lg hover:bg-spa-600 shadow-md">Guardar</button>
                </div>
             </div>
        </div>
      )}
    </div>
  );
};
