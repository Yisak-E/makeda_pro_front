import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, MapPin, Store, Instagram } from 'lucide-react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin' | 'brand-partner';
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  brandName?: string;
}

interface EnhancedAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export function EnhancedAuthModal({ isOpen, onClose, onLogin }: EnhancedAuthModalProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'customer' | 'admin' | 'brand-partner'>('customer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    brandName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - check for specific credentials
    let role: 'customer' | 'admin' | 'brand-partner' = selectedRole;
    if (formData.email === 'admin@stylesphere.com') {
      role = 'admin';
    } else if (formData.email === 'brand@stylesphere.com') {
      role = 'brand-partner';
    }
    
    const user: User = {
      id: Math.random().toString(36).substring(7),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      role,
      phone: formData.phone || '+1 (555) 123-4567',
      address: formData.address || '123 Fashion Avenue',
      city: formData.city || 'New York',
      postalCode: formData.postalCode || '10001',
      country: formData.country || 'United States',
      brandName: role === 'brand-partner' ? formData.brandName || 'My Brand' : undefined,
    };
    
    onLogin(user);
    onClose();
  };

  const handleSocialLogin = (provider: 'google' | 'instagram') => {
    // Simulate social login
    const user: User = {
      id: Math.random().toString(36).substring(7),
      email: `user@${provider}.com`,
      name: `${provider} User`,
      role: selectedRole,
      phone: '+1 (555) 123-4567',
      address: '123 Fashion Avenue',
      city: 'New York',
      postalCode: '10001',
      country: 'United States',
    };
    onLogin(user);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl" style={{ borderRadius: '8px' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--makeda-gold)' }}>
          <div>
            <h2 className="text-2xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
              {isSignup ? 'Join StyleSphere' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">Luxury Afro-Minimalist Fashion</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selection */}
        {isSignup && (
          <div className="px-6 pt-6">
            <label className="block text-sm mb-3 text-gray-700">I am a:</label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`py-3 px-2 border-2 rounded transition-all text-xs ${
                  selectedRole === 'customer' ? 'border-opacity-100' : 'border-gray-300'
                }`}
                style={{
                  borderColor: selectedRole === 'customer' ? 'var(--makeda-gold)' : undefined,
                  backgroundColor: selectedRole === 'customer' ? 'rgba(212, 175, 55, 0.1)' : undefined,
                }}
              >
                <User className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--makeda-green)' }} />
                Customer
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('brand-partner')}
                className={`py-3 px-2 border-2 rounded transition-all text-xs ${
                  selectedRole === 'brand-partner' ? 'border-opacity-100' : 'border-gray-300'
                }`}
                style={{
                  borderColor: selectedRole === 'brand-partner' ? 'var(--makeda-gold)' : undefined,
                  backgroundColor: selectedRole === 'brand-partner' ? 'rgba(212, 175, 55, 0.1)' : undefined,
                }}
              >
                <Store className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--makeda-green)' }} />
                Seller
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`py-3 px-2 border-2 rounded transition-all text-xs ${
                  selectedRole === 'admin' ? 'border-opacity-100' : 'border-gray-300'
                }`}
                style={{
                  borderColor: selectedRole === 'admin' ? 'var(--makeda-gold)' : undefined,
                  backgroundColor: selectedRole === 'admin' ? 'rgba(212, 175, 55, 0.1)' : undefined,
                }}
              >
                <Lock className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--makeda-green)' }} />
                Admin
              </button>
            </div>
          </div>
        )}

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
                style={{ borderRadius: '8px' }}
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
              placeholder="customer@example.com"
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

          {isSignup && selectedRole === 'brand-partner' && (
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                <Store className="w-4 h-4 inline mr-2" />
                Brand Name
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                placeholder="Your Brand Name"
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                style={{ borderRadius: '8px' }}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 text-white transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: 'var(--makeda-gold)',
              borderRadius: '8px',
            }}
          >
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>

          {/* Social Login */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              style={{ borderRadius: '8px' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm">Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('instagram')}
              className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              style={{ borderRadius: '8px' }}
            >
              <Instagram className="w-5 h-5" style={{ color: '#E1306C' }} />
              <span className="text-sm">Instagram</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="transition-colors font-medium"
              style={{ color: 'var(--makeda-green)' }}
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>

          <p className="text-xs text-center text-gray-500 mt-4">
            Demo Accounts:<br />
            <span style={{ color: 'var(--makeda-gold)' }}>admin@stylesphere.com</span> (Admin) •{' '}
            <span style={{ color: 'var(--makeda-gold)' }}>brand@stylesphere.com</span> (Seller)
          </p>
        </form>
      </div>
    </div>
  );
}
