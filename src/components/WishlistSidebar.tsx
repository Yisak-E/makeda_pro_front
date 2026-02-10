import React from 'react';
import { X, Heart, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from './ProductGrid';

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveItem: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export function WishlistSidebar({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveItem,
  onAddToCart,
}: WishlistSidebarProps) {
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
              <Heart className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} fill="var(--makeda-gold)" />
              <h2 className="text-xl" style={{ color: 'var(--makeda-green)' }}>
                Wishlist
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex space-x-4 pb-4 border-b border-gray-200">
                    <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-100">
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
                      <p className="text-sm mb-3" style={{ color: 'var(--makeda-gold)' }}>
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            onAddToCart(item);
                            onRemoveItem(item.id);
                          }}
                          className="flex-1 py-2 px-3 text-xs text-white transition-all duration-200 hover:shadow-md"
                          style={{
                            backgroundColor: 'var(--makeda-green)',
                            borderRadius: '8px',
                          }}
                        >
                          <ShoppingCart className="w-3 h-3 inline mr-1" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="py-2 px-3 text-xs text-red-500 border border-red-500 hover:bg-red-50 transition-colors"
                          style={{ borderRadius: '8px' }}
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
        </div>
      </div>
    </>
  );
}
