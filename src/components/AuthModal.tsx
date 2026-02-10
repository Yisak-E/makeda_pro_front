import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, MapPin } from 'lucide-react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - check for admin credentials
    const isAdmin = formData.email === 'admin@makedathreads.com';
    
    const user: User = {
      id: Math.random().toString(36).substring(7),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      role: isAdmin ? 'admin' : 'customer',
      phone: formData.phone || '+1 (555) 123-4567',
      address: formData.address || '123 Fashion Avenue',
      city: formData.city || 'New York',
      postalCode: formData.postalCode || '10001',
      country: formData.country || 'United States',
    };
    
    onLogin(user);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl" style={{ borderRadius: '8px' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--makeda-gold)' }}>
          <h2 className="text-2xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                style={{ borderRadius: '8px', focusRingColor: 'var(--makeda-gold)' }}
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="customer@example.com or admin@makedathreads.com"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
              style={{ borderRadius: '8px' }}
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              <Lock className="w-4 h-4 inline mr-2" />
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
              style={{ borderRadius: '8px' }}
            />
          </div>

          {isSignup && (
            <>
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                  style={{ borderRadius: '8px' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                  style={{ borderRadius: '8px' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                  style={{ borderRadius: '8px' }}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-4 text-white transition-all duration-300 hover:shadow-lg mt-6"
            style={{
              backgroundColor: 'var(--makeda-gold)',
              borderRadius: '8px',
            }}
          >
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-gray-600">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="transition-colors"
              style={{ color: 'var(--makeda-green)' }}
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>

          <p className="text-xs text-center text-gray-500 mt-4">
            Demo: Use <span style={{ color: 'var(--makeda-gold)' }}>admin@makedathreads.com</span> for admin access
          </p>
        </form>
      </div>
    </div>
  );
}
