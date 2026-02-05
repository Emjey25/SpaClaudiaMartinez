import React from 'react';
import { LayoutDashboard, Calendar, Users, Package, DollarSign, Menu, X } from 'lucide-react';
import { ViewState } from '../types';
import { Logo } from './Logo';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Consola', icon: LayoutDashboard },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'clients', label: 'Pacientes', icon: Users },
    { id: 'inventory', label: 'Inventario', icon: Package },
    { id: 'accounting', label: 'Contabilidad', icon: DollarSign },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white rounded-full shadow-lg text-spa-800"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen transition-transform bg-white border-r border-spa-100 w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-white flex flex-col">
          <div className="mb-10 pl-2 mt-4">
            <Logo />
          </div>
          
          <ul className="space-y-2 font-medium flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setView(item.id as ViewState);
                      if (window.innerWidth < 768) setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center p-3 rounded-lg transition-colors group
                      ${isActive 
                        ? 'bg-spa-50 text-spa-900 shadow-sm border-l-4 border-spa-500' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-spa-800'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 transition duration-75 ${isActive ? 'text-spa-500' : 'text-gray-400 group-hover:text-spa-500'}`} />
                    <span className="ml-3 font-sans tracking-wide">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto p-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
               <img src="https://picsum.photos/id/64/100/100" alt="Admin" className="w-10 h-10 rounded-full object-cover border-2 border-spa-200" />
               <div>
                  <p className="text-sm font-semibold text-gray-700">Claudia M.</p>
                  <p className="text-xs text-spa-400">Master Admin</p>
               </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
