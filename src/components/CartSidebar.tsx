import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from './ProductGrid';

interface CartItem extends Product {
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartSidebarProps) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--makeda-gold)' }}>
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
              <h2 className="text-xl" style={{ color: 'var(--makeda-green)' }}>
                Shopping Cart
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex space-x-4 pb-4 border-b border-gray-200">
                    <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm mb-1 truncate" style={{ color: 'var(--makeda-green)' }}>
                        {item.name}
                      </h3>
                      <p className="text-sm mb-2" style={{ color: 'var(--makeda-gold)' }}>
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          style={{ color: 'var(--makeda-green)' }}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          style={{ color: 'var(--makeda-green)' }}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="ml-auto text-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between text-lg">
                <span style={{ color: 'var(--makeda-green)' }}>Total</span>
                <span style={{ color: 'var(--makeda-gold)' }}>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-4 text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{
                  backgroundColor: 'var(--makeda-green)',
                  borderRadius: '8px',
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
