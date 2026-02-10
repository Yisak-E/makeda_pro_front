import React, { useState } from 'react';
import { InventoryManager } from './InventoryManager';
import { CouponEngine } from './CouponEngine';
import { OrderQueue } from './OrderQueue';
import { GlobalSettings } from './GlobalSettings';
import { LayoutDashboard, Package, Tag, ShoppingCart, Settings, LogOut } from 'lucide-react';
import { User } from '../AuthModal';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type AdminView = 'inventory' | 'coupons' | 'orders' | 'settings';

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState<AdminView>('inventory');

  const menuItems = [
    { id: 'inventory' as AdminView, icon: Package, label: 'Inventory Manager' },
    { id: 'coupons' as AdminView, icon: Tag, label: 'Coupon Engine' },
    { id: 'orders' as AdminView, icon: ShoppingCart, label: 'Order & Refund Queue' },
    { id: 'settings' as AdminView, icon: Settings, label: 'Global Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col" style={{ backgroundColor: 'var(--makeda-green)' }}>
        <div className="p-6 border-b" style={{ borderColor: 'var(--makeda-gold)' }}>
          <h1 className="text-xl font-serif text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            MAKEDA THREADS
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--makeda-gold)' }}>
            Admin Dashboard
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
            <p className="text-sm opacity-75">Logged in as</p>
            <p className="text-sm truncate" style={{ color: 'var(--makeda-gold)' }}>{user.email}</p>
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
            <LayoutDashboard className="w-8 h-8" style={{ color: 'var(--makeda-green)' }} />
            <h2 className="text-3xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
              {menuItems.find(item => item.id === activeView)?.label}
            </h2>
          </div>

          {activeView === 'inventory' && <InventoryManager />}
          {activeView === 'coupons' && <CouponEngine />}
          {activeView === 'orders' && <OrderQueue />}
          {activeView === 'settings' && <GlobalSettings />}
        </div>
      </div>
    </div>
  );
}
