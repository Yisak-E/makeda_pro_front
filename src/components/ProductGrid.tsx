import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, ShoppingCart, Package } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stockQuantity?: number;
  discountPercentage?: number;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
}

export function ProductGrid({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}: ProductGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h2 className="text-3xl mb-2 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
          Trending Now
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--makeda-gold)' }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const discountedPrice = product.discountPercentage 
            ? product.price * (1 - product.discountPercentage / 100)
            : product.price;
          const isLowStock = (product.stockQuantity ?? 0) < 10;
          const isOutOfStock = (product.stockQuantity ?? 0) === 0;
          
          return (
            <div
              key={product.id}
              className="group relative bg-white overflow-hidden transition-all duration-300 hover:shadow-xl"
              style={{ borderRadius: '8px' }}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Discount Badge */}
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 px-3 py-1 text-white text-sm rounded" style={{ backgroundColor: '#dc2626' }}>
                    {product.discountPercentage}% OFF
                  </div>
                )}

                {/* Out of Stock Overlay */}
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-lg px-4 py-2 bg-black/80 rounded">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Hover Overlay */}
                {!isOutOfStock && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-3 bg-white rounded-full hover:scale-110 transition-transform duration-200"
                      aria-label="Add to Cart"
                    >
                      <ShoppingCart className="w-5 h-5" style={{ color: 'var(--makeda-green)' }} />
                    </button>
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className="p-3 bg-white rounded-full hover:scale-110 transition-transform duration-200"
                      aria-label="Add to Wishlist"
                    >
                      <Heart
                        className="w-5 h-5"
                        style={{ color: 'var(--makeda-green)' }}
                        fill={wishlistIds.has(product.id) ? 'var(--makeda-gold)' : 'none'}
                      />
                    </button>
                  </div>
                )}

                {/* Wishlist Badge */}
                {wishlistIds.has(product.id) && (
                  <div
                    className="absolute top-3 right-3 p-2 rounded-full"
                    style={{ backgroundColor: 'var(--makeda-gold)' }}
                  >
                    <Heart className="w-4 h-4 text-white" fill="white" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="mb-2" style={{ color: 'var(--makeda-green)' }}>
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {product.discountPercentage && product.discountPercentage > 0 ? (
                      <>
                        <p className="text-lg" style={{ color: 'var(--makeda-gold)' }}>
                          ${discountedPrice.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-400 line-through">
                          ${product.price.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="text-lg" style={{ color: 'var(--makeda-gold)' }}>
                        ${product.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                {/* Stock Indicator */}
                <div className="flex items-center space-x-1 text-xs">
                  <Package className="w-3 h-3" style={{ color: isLowStock ? '#dc2626' : '#10b981' }} />
                  <span style={{ color: isOutOfStock ? '#dc2626' : isLowStock ? '#f59e0b' : '#10b981' }}>
                    {isOutOfStock ? 'Out of Stock' : `${product.stockQuantity} in stock`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}