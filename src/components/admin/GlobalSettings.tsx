import React, { useState } from 'react';
import { Save, Settings } from 'lucide-react';

interface SiteSettings {
  shippingPolicy: string;
  refundPolicy: string;
  storeHours: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
}

const INITIAL_SETTINGS: SiteSettings = {
  shippingPolicy: 'Standard shipping: 5-7 business days. Express shipping: 2-3 business days. International shipping available.',
  refundPolicy: 'Full refund within 30 days of purchase. Items must be unworn and in original packaging. Refund processed within 7-10 business days.',
  storeHours: 'Monday-Friday: 9:00 AM - 6:00 PM EST\nSaturday: 10:00 AM - 4:00 PM EST\nSunday: Closed',
  freeShippingThreshold: 150,
  standardShippingFee: 10,
  expressShippingFee: 25,
};

export function GlobalSettings() {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    // Mock save
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm" style={{ borderRadius: '8px' }}>
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
          <h3 className="text-xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
            Site-Wide Settings
          </h3>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2 text-white transition-all duration-200 hover:shadow-md"
          style={{ backgroundColor: 'var(--makeda-gold)', borderRadius: '8px' }}
        >
          <Save className="w-4 h-4" />
          <span>{isSaved ? 'Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Shipping Settings */}
        <div>
          <h4 className="mb-4" style={{ color: 'var(--makeda-green)' }}>Shipping Configuration</h4>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Free Shipping Threshold ($)</label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Standard Shipping Fee ($)</label>
              <input
                type="number"
                value={settings.standardShippingFee}
                onChange={(e) => setSettings({ ...settings, standardShippingFee: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Express Shipping Fee ($)</label>
              <input
                type="number"
                value={settings.expressShippingFee}
                onChange={(e) => setSettings({ ...settings, expressShippingFee: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-700">Shipping Policy</label>
            <textarea
              value={settings.shippingPolicy}
              onChange={(e) => setSettings({ ...settings, shippingPolicy: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Refund Policy */}
        <div>
          <h4 className="mb-4" style={{ color: 'var(--makeda-green)' }}>Refund Policy</h4>
          <textarea
            value={settings.refundPolicy}
            onChange={(e) => setSettings({ ...settings, refundPolicy: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Store Hours */}
        <div>
          <h4 className="mb-4" style={{ color: 'var(--makeda-green)' }}>Store Hours</h4>
          <textarea
            value={settings.storeHours}
            onChange={(e) => setSettings({ ...settings, storeHours: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Preview */}
        <div className="border-2 p-4 bg-gray-50" style={{ borderRadius: '8px', borderColor: 'var(--makeda-gold)' }}>
          <h4 className="mb-3" style={{ color: 'var(--makeda-green)' }}>Customer View Preview</h4>
          <div className="space-y-3 text-sm">
            <div>
              <strong className="block mb-1">Free Shipping:</strong>
              <span className="text-gray-600">Orders over ${settings.freeShippingThreshold} ship free</span>
            </div>
            <div>
              <strong className="block mb-1">Standard Shipping:</strong>
              <span className="text-gray-600">${settings.standardShippingFee}</span>
            </div>
            <div>
              <strong className="block mb-1">Express Shipping:</strong>
              <span className="text-gray-600">${settings.expressShippingFee}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
