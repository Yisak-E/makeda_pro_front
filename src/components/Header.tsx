import React from 'react';
import { Heart, ShoppingBag, User, LogOut, Package, Info } from 'lucide-react';
import { User as UserType } from './EnhancedAuthModal';

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onCartOpen: () => void;
  onWishlistOpen: () => void;
  cartItemCount: number;
  wishlistItemCount: number;
  user: UserType | null;
  onLoginOpen: () => void;
  onProfileOpen: () => void;
  onOrdersOpen: () => void;
  onLogout: () => void;
  onDemoGuideOpen?: () => void;
}

export function Header({
  activeCategory,
  onCategoryChange,
  onCartOpen,
  onWishlistOpen,
  cartItemCount,
  wishlistItemCount,
  user,
  onLoginOpen,
  onProfileOpen,
  onOrdersOpen,
  onLogout,
  onDemoGuideOpen,
}: HeaderProps) {
  const categories = ['All', 'Male', 'Female', 'Kids', 'General'];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl tracking-wide font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
              MAKEDA <span style={{ color: 'var(--makeda-gold)' }}>THREADS</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 transition-colors duration-200 ${
                  activeCategory === category
                    ? 'border-b-2'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{
                  borderColor: activeCategory === category ? 'var(--makeda-gold)' : 'transparent',
                  color: activeCategory === category ? 'var(--makeda-green)' : undefined,
                }}
              >
                {category}
              </button>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="relative group">
                <button
                  className="flex items-center space-x-2 p-2 hover:opacity-70 transition-opacity"
                  aria-label="User menu"
                >
                  <User className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
                  <span className="text-sm hidden lg:block" style={{ color: 'var(--makeda-green)' }}>
                    {user.name}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border" style={{ borderColor: 'var(--makeda-gold)' }}>
                  <button
                    onClick={onProfileOpen}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-2"
                    style={{ color: 'var(--makeda-green)' }}
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={onOrdersOpen}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-2"
                    style={{ color: 'var(--makeda-green)' }}
                  >
                    <Package className="w-4 h-4" />
                    <span>My Orders</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-2 border-t"
                    style={{ color: '#dc2626' }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onLoginOpen}
                className="px-4 py-2 text-white transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: 'var(--makeda-gold)', borderRadius: '8px' }}
              >
                Sign In
              </button>
            )}
            <button
              onClick={onWishlistOpen}
              className="relative p-2 hover:opacity-70 transition-opacity"
              aria-label="Wishlist"
            >
              <Heart
                className="w-6 h-6"
                style={{ color: 'var(--makeda-green)' }}
                fill={wishlistItemCount > 0 ? 'var(--makeda-gold)' : 'none'}
              />
              {wishlistItemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white"
                  style={{ backgroundColor: 'var(--makeda-gold)' }}
                >
                  {wishlistItemCount}
                </span>
              )}
            </button>
            <button
              onClick={onCartOpen}
              className="relative p-2 hover:opacity-70 transition-opacity"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white"
                  style={{ backgroundColor: 'var(--makeda-gold)' }}
                >
                  {cartItemCount}
                </span>
              )}
            </button>
            {onDemoGuideOpen && (
              <button
                onClick={onDemoGuideOpen}
                className="p-2 hover:opacity-70 transition-opacity"
                aria-label="Demo Guide"
              >
                <Info className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex overflow-x-auto px-4 py-3 space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 whitespace-nowrap rounded-lg transition-colors duration-200 ${
                activeCategory === category ? 'text-white' : 'text-gray-600 bg-gray-100'
              }`}
              style={{
                backgroundColor: activeCategory === category ? 'var(--makeda-green)' : undefined,
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}