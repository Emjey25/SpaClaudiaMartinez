import React from 'react';
import { Product } from '../types';
import { Package, Plus, Minus, AlertCircle } from 'lucide-react';

interface InventoryProps {
  products: Product[];
  updateStock: (id: string, delta: number) => void;
}

export const Inventory: React.FC<InventoryProps> = ({ products, updateStock }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-serif font-bold text-gray-800">Inventario</h2>
            <p className="text-gray-500 text-sm">Control de productos y cabina.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
            Total Productos: <span className="text-spa-500 font-bold">{products.length}</span>
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
    </div>
  );
};
