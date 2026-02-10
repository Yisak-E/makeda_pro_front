import React, { useState } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  discount: number;
  expiryDate: string;
  isActive: boolean;
  minPurchase: number;
}

const INITIAL_COUPONS: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME15',
    discount: 15,
    expiryDate: '2026-12-31',
    isActive: true,
    minPurchase: 100,
  },
  {
    id: '2',
    code: 'LUXURY20',
    discount: 20,
    expiryDate: '2026-06-30',
    isActive: true,
    minPurchase: 300,
  },
];

export function CouponEngine() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Coupon>>({});

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      code: '',
      discount: 0,
      expiryDate: '',
      isActive: true,
      minPurchase: 0,
    });
  };

  const handleSave = () => {
    const newCoupon: Coupon = {
      id: Date.now().toString(),
      code: formData.code || '',
      discount: formData.discount || 0,
      expiryDate: formData.expiryDate || '',
      isActive: formData.isActive ?? true,
      minPurchase: formData.minPurchase || 0,
    };
    setCoupons([...coupons, newCoupon]);
    setIsAdding(false);
    setFormData({});
  };

  const handleToggleActive = (id: string) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const handleDelete = (id: string) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm" style={{ borderRadius: '8px' }}>
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
          Discount Coupons
        </h3>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 text-white transition-all duration-200 hover:shadow-md"
          style={{ backgroundColor: 'var(--makeda-gold)', borderRadius: '8px' }}
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      {isAdding && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h4 className="mb-4" style={{ color: 'var(--makeda-green)' }}>New Coupon</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Coupon Code</label>
              <input
                type="text"
                placeholder="SUMMER2026"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Discount (%)</label>
              <input
                type="number"
                placeholder="10"
                value={formData.discount || ''}
                onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Expiry Date</label>
              <input
                type="date"
                value={formData.expiryDate || ''}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Minimum Purchase ($)</label>
              <input
                type="number"
                placeholder="50"
                value={formData.minPurchase || ''}
                onChange={(e) => setFormData({ ...formData, minPurchase: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white rounded"
              style={{ backgroundColor: 'var(--makeda-green)' }}
            >
              Create Coupon
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="border-2 p-4 relative"
              style={{
                borderRadius: '8px',
                borderColor: coupon.isActive ? 'var(--makeda-gold)' : '#ddd',
                backgroundColor: coupon.isActive ? 'rgba(212, 175, 55, 0.05)' : '#f9f9f9',
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-2xl font-mono tracking-wider" style={{ color: 'var(--makeda-gold)' }}>
                    {coupon.code}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {coupon.discount}% OFF • Min. ${coupon.minPurchase}
                  </p>
                </div>
                <button
                  onClick={() => handleToggleActive(coupon.id)}
                  className="p-1"
                  style={{ color: coupon.isActive ? 'var(--makeda-green)' : '#999' }}
                >
                  {coupon.isActive ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Expires: {coupon.expiryDate}</span>
                <button
                  onClick={() => handleDelete(coupon.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {coupon.isActive && (
                <div className="absolute top-2 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: 'var(--makeda-green)' }}>
                  ACTIVE
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
