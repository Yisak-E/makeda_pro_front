import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stockQuantity: number;
  minOrderLimit: number;
  discountPercentage: number;
}

const INITIAL_PRODUCTS: ProductData[] = [
  {
    id: '1',
    name: 'Royal Elegance Dress',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1697924293303-34488b60bf36',
    category: 'Female',
    stockQuantity: 15,
    minOrderLimit: 1,
    discountPercentage: 0,
  },
  {
    id: '2',
    name: 'Heritage Print Collection',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1709809081557-78f803ce93a0',
    category: 'Female',
    stockQuantity: 8,
    minOrderLimit: 1,
    discountPercentage: 15,
  },
];

export function InventoryManager() {
  const [products, setProducts] = useState<ProductData[]>(INITIAL_PRODUCTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<ProductData>>({});

  const handleEdit = (product: ProductData) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleSave = () => {
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...p, ...formData } as ProductData : p));
      setEditingId(null);
    } else if (isAdding) {
      const newProduct: ProductData = {
        id: Date.now().toString(),
        name: formData.name || 'New Product',
        price: formData.price || 0,
        image: formData.image || '',
        category: formData.category || 'General',
        stockQuantity: formData.stockQuantity || 0,
        minOrderLimit: formData.minOrderLimit || 1,
        discountPercentage: formData.discountPercentage || 0,
      };
      setProducts([...products, newProduct]);
      setIsAdding(false);
    }
    setFormData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      name: '',
      price: 0,
      category: 'General',
      stockQuantity: 0,
      minOrderLimit: 1,
      discountPercentage: 0,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm" style={{ borderRadius: '8px' }}>
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
          Products
        </h3>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 text-white transition-all duration-200 hover:shadow-md"
          style={{ backgroundColor: 'var(--makeda-gold)', borderRadius: '8px' }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {isAdding && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h4 className="mb-4" style={{ color: 'var(--makeda-green)' }}>New Product</h4>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="px-3 py-2 border border-gray-300 rounded"
            />
            <select
              value={formData.category || 'General'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Kids</option>
              <option>General</option>
            </select>
            <input
              type="number"
              placeholder="Stock Quantity"
              value={formData.stockQuantity || ''}
              onChange={(e) => setFormData({ ...formData, stockQuantity: parseInt(e.target.value) })}
              className="px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Min Order Limit"
              value={formData.minOrderLimit || ''}
              onChange={(e) => setFormData({ ...formData, minOrderLimit: parseInt(e.target.value) })}
              className="px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Discount %"
              value={formData.discountPercentage || ''}
              onChange={(e) => setFormData({ ...formData, discountPercentage: parseFloat(e.target.value) })}
              className="px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white rounded"
              style={{ backgroundColor: 'var(--makeda-green)' }}
            >
              <Save className="w-4 h-4 inline mr-2" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
            >
              <X className="w-4 h-4 inline mr-2" />
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Product</th>
              <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Category</th>
              <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Price</th>
              <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Stock</th>
              <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Min Order</th>
              <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Discount</th>
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
                      <select
                        value={formData.category || product.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="px-2 py-1 border border-gray-300 rounded w-full"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Kids</option>
                        <option>General</option>
                      </select>
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
                        value={formData.stockQuantity ?? product.stockQuantity}
                        onChange={(e) => setFormData({ ...formData, stockQuantity: parseInt(e.target.value) })}
                        className="px-2 py-1 border border-gray-300 rounded w-20"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={formData.minOrderLimit ?? product.minOrderLimit}
                        onChange={(e) => setFormData({ ...formData, minOrderLimit: parseInt(e.target.value) })}
                        className="px-2 py-1 border border-gray-300 rounded w-20"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={formData.discountPercentage ?? product.discountPercentage}
                        onChange={(e) => setFormData({ ...formData, discountPercentage: parseFloat(e.target.value) })}
                        className="px-2 py-1 border border-gray-300 rounded w-20"
                      />
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
                      <div className="text-sm" style={{ color: 'var(--makeda-green)' }}>{product.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span style={{ color: 'var(--makeda-gold)' }}>${product.price.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={product.stockQuantity < 10 ? 'text-red-600' : 'text-gray-700'}>
                        {product.stockQuantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.minOrderLimit}</td>
                    <td className="px-6 py-4">
                      {product.discountPercentage > 0 ? (
                        <span className="text-green-600">{product.discountPercentage}%</span>
                      ) : (
                        <span className="text-gray-400">-</span>
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
  );
}
