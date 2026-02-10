import React, { useState } from 'react';
import { BrandStorefront } from './BrandStorefront';
import { BrandAnalytics } from './BrandAnalytics';
import { BrandInventory } from './BrandInventory';
import { Store, BarChart3, Package, LogOut, Sparkles } from 'lucide-react';
import { User } from '../EnhancedAuthModal';

interface BrandPartnerPortalProps {
  user: User;
  onLogout: () => void;
}

type BrandView = 'storefront' | 'analytics' | 'inventory';

export function BrandPartnerPortal({ user, onLogout }: BrandPartnerPortalProps) {
  const [activeView, setActiveView] = useState<BrandView>('storefront');

  const menuItems = [
    { id: 'storefront' as BrandView, icon: Store, label: 'Brand Storefront' },
    { id: 'analytics' as BrandView, icon: BarChart3, label: 'Sales & Insights' },
    { id: 'inventory' as BrandView, icon: Package, label: 'Inventory Management' },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--makeda-sand)' }}>
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col" style={{ backgroundColor: 'var(--makeda-green)' }}>
        <div className="p-6 border-b" style={{ borderColor: 'var(--makeda-gold)' }}>
          <div className="flex items-center space-x-2 mb-2">
            <Store className="w-6 h-6" style={{ color: 'var(--makeda-gold)' }} />
            <h1 className="text-xl font-serif text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              STYLESPHERE
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--makeda-gold)' }}>
            Brand Partner Portal
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeView === item.id ? 'text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              style={{
                backgroundColor: activeView === item.id ? 'var(--makeda-gold)' : 'transparent',
              }}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: 'var(--makeda-gold)' }}>
          <div className="text-white mb-4">
            <p className="text-sm opacity-75">Brand Account</p>
            <p className="truncate" style={{ color: 'var(--makeda-gold)' }}>{user.brandName || user.name}</p>
            <p className="text-xs opacity-75 truncate">{user.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-8">
            <Sparkles className="w-8 h-8" style={{ color: 'var(--makeda-gold)' }} />
            <h2 className="text-3xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
              {menuItems.find(item => item.id === activeView)?.label}
            </h2>
          </div>

          {activeView === 'storefront' && <BrandStorefront user={user} />}
          {activeView === 'analytics' && <BrandAnalytics />}
          {activeView === 'inventory' && <BrandInventory />}
        </div>
      </div>
    </div>
  );
}
