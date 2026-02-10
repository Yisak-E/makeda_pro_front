import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, AlertCircle } from 'lucide-react';

interface BrandProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  warehouse: string;
  minOrder: number;
  discount: number;
  sustainability: boolean;
}

const INITIAL_PRODUCTS: BrandProduct[] = [
  {
    id: '1',
    name: 'Royal Elegance Dress',
    price: 249.99,
    stock: 15,
    warehouse: 'Lagos Warehouse',
    minOrder: 1,
    discount: 0,
    sustainability: true,
  },
  {
    id: '2',
    name: 'Heritage Print Collection',
    price: 189.99,
    stock: 8,
    warehouse: 'Accra Warehouse',
    minOrder: 2,
    discount: 15,
    sustainability: true,
  },
];

export function BrandInventory() {
  const [products, setProducts] = useState<BrandProduct[]>(INITIAL_PRODUCTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<BrandProduct>>({});

  const handleEdit = (product: BrandProduct) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleSave = () => {
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...p, ...formData } as BrandProduct : p));
      setEditingId(null);
      setFormData({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Stock Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderRadius: '8px' }}>
          <h4 className="text-sm text-gray-600 mb-2">Total Products</h4>
          <p className="text-3xl" style={{ color: 'var(--makeda-green)' }}>{products.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderRadius: '8px' }}>
          <h4 className="text-sm text-gray-600 mb-2">Total Stock Value</h4>
          <p className="text-3xl" style={{ color: 'var(--makeda-gold)' }}>
            ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderRadius: '8px' }}>
          <h4 className="text-sm text-gray-600 mb-2">Low Stock Items</h4>
          <p className="text-3xl text-red-600">
            {products.filter(p => p.stock < 10).length}
          </p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm" style={{ borderRadius: '8px' }}>
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
            Product Inventory
          </h3>
          <button
            className="flex items-center space-x-2 px-4 py-2 text-white transition-all duration-200 hover:shadow-md"
            style={{ backgroundColor: 'var(--makeda-gold)', borderRadius: '8px' }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Product</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Price</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Stock</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Warehouse</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Min Order</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Discount</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Tags</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  {editingId === product.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={formData.name || product.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="px-2 py-1 border border-gray-300 rounded w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={formData.price ?? product.price}
                          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                          className="px-2 py-1 border border-gray-300 rounded w-24"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={formData.stock ?? product.stock}
                          onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                          className="px-2 py-1 border border-gray-300 rounded w-20"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={formData.warehouse || product.warehouse}
                          onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                          className="px-2 py-1 border border-gray-300 rounded"
                        >
                          <option>Lagos Warehouse</option>
                          <option>Accra Warehouse</option>
                          <option>Nairobi Warehouse</option>
                          <option>Johannesburg Warehouse</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={formData.minOrder ?? product.minOrder}
                          onChange={(e) => setFormData({ ...formData, minOrder: parseInt(e.target.value) })}
                          className="px-2 py-1 border border-gray-300 rounded w-16"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={formData.discount ?? product.discount}
                          onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) })}
                          className="px-2 py-1 border border-gray-300 rounded w-16"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            checked={formData.sustainability ?? product.sustainability}
                            onChange={(e) => setFormData({ ...formData, sustainability: e.target.checked })}
                          />
                          <span className="text-xs">Eco</span>
                        </label>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button onClick={handleSave} className="p-1 text-green-600 hover:text-green-800">
                            <Save className="w-4 h-4" />
                          </button>
                          <button onClick={handleCancel} className="p-1 text-gray-600 hover:text-gray-800">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="text-sm" style={{ color: 'var(--makeda-green)' }}>{product.name}</div>
                          {product.stock < 10 && (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span style={{ color: 'var(--makeda-gold)' }}>${product.price.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={product.stock < 10 ? 'text-red-600' : 'text-gray-700'}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded">{product.warehouse}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{product.minOrder}</td>
                      <td className="px-6 py-4">
                        {product.discount > 0 ? (
                          <span className="text-green-600">{product.discount}%</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {product.sustainability && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">ECO</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-1 hover:text-blue-600"
                            style={{ color: 'var(--makeda-green)' }}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
