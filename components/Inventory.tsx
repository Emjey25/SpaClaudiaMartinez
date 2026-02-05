import React, { useState } from 'react';
import { Product } from '../types';
import { Package, Plus, Minus, AlertCircle, X } from 'lucide-react';

interface InventoryProps {
  products: Product[];
  updateStock: (id: string, delta: number) => void;
  addProduct: (product: Product) => void;
}

export const Inventory: React.FC<InventoryProps> = ({ products, updateStock, addProduct }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    quantity: 0,
    minStock: 5,
    price: 0,
    unit: 'unidad'
  });

  const handleSave = () => {
    if (formData.name && formData.price !== undefined && formData.quantity !== undefined) {
      addProduct({
        id: Date.now().toString(),
        name: formData.name,
        quantity: formData.quantity,
        minStock: formData.minStock || 5,
        price: formData.price,
        unit: formData.unit || 'unidad'
      });
      setShowModal(false);
      setFormData({ quantity: 0, minStock: 5, price: 0, unit: 'unidad' });
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-serif font-bold text-gray-800">Inventario</h2>
            <p className="text-gray-500 text-sm">Control de productos y cabina.</p>
        </div>
        <div className="flex gap-3 items-center">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
                Total Productos: <span className="text-spa-500 font-bold">{products.length}</span>
            </div>
            <button 
                onClick={() => setShowModal(true)}
                className="bg-spa-500 hover:bg-spa-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
                <Plus size={16} /> Agregar Producto
            </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-spa-50 overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Producto</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Stock</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Unidad</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Estado</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Ajuste</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {products.map(product => {
                    const isLow = product.quantity <= product.minStock;
                    return (
                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-spa-50 rounded-lg text-spa-400">
                                        <Package size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">{product.name}</p>
                                        <p className="text-xs text-gray-400">${product.price.toFixed(2)} / unidad</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-center">
                                <span className={`text-lg font-bold ${isLow ? 'text-red-500' : 'text-gray-700'}`}>
                                    {product.quantity}
                                </span>
                            </td>
                            <td className="p-4 text-sm text-gray-600">{product.unit}</td>
                            <td className="p-4">
                                {isLow ? (
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                                        <AlertCircle size={12} /> Reabastecer
                                    </span>
                                ) : (
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                        En Orden
                                    </span>
                                )}
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button 
                                        onClick={() => updateStock(product.id, -1)}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <button 
                                        onClick={() => updateStock(product.id, 1)}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-500 hover:border-green-200 transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
      </div>

      {/* Modal Agregar Producto */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-serif font-bold text-gray-800">Agregar Producto</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Nombre del Producto</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-spa-200 focus:border-spa-500 outline-none" 
                  value={formData.name || ''}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Ej. Crema Hidratante"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Cantidad Inicial</label>
                  <input 
                    type="number"
                    min="0"
                    className="w-full p-2 border rounded-lg focus:ring-spa-200 focus:border-spa-500 outline-none" 
                    value={formData.quantity || 0}
                    onChange={e => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Stock Mínimo</label>
                  <input 
                    type="number"
                    min="0"
                    className="w-full p-2 border rounded-lg focus:ring-spa-200 focus:border-spa-500 outline-none" 
                    value={formData.minStock || 5}
                    onChange={e => setFormData({...formData, minStock: parseInt(e.target.value) || 5})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Precio Unitario ($)</label>
                  <input 
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full p-2 border rounded-lg focus:ring-spa-200 focus:border-spa-500 outline-none" 
                    value={formData.price || 0}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Unidad</label>
                  <select
                    className="w-full p-2 border rounded-lg focus:ring-spa-200 focus:border-spa-500 outline-none bg-white" 
                    value={formData.unit || 'unidad'}
                    onChange={e => setFormData({...formData, unit: e.target.value})}
                  >
                    <option value="unidad">Unidad</option>
                    <option value="ml">ml</option>
                    <option value="gr">gr</option>
                    <option value="kg">kg</option>
                    <option value="litro">Litro</option>
                    <option value="caja">Caja</option>
                    <option value="paquete">Paquete</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button 
                onClick={() => setShowModal(false)} 
                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave} 
                className="px-4 py-2 bg-spa-500 text-white rounded-lg hover:bg-spa-600 shadow-md transition-colors"
              >
                Guardar Producto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
