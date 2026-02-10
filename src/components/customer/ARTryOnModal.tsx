import React, { useState } from 'react';
import { X, Camera, RotateCw, Maximize, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '../ProductGrid';

interface ARTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
}

export function ARTryOnModal({ isOpen, onClose, product, onAddToCart }: ARTryOnModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Simulate AR loading
      setTimeout(() => setIsLoading(false), 1500);
    }
  }, [isOpen]);

  const handleStartCamera = () => {
    setCameraActive(true);
  };

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product);
      onClose();
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl" style={{ borderRadius: '8px' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--makeda-gold)' }}>
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6" style={{ color: 'var(--makeda-gold)' }} />
            <div>
              <h2 className="text-xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
                AR Virtual Try-On
              </h2>
              <p className="text-sm text-gray-600">{product.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AR View Area */}
        <div className="flex-1 relative overflow-hidden bg-gray-900">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--makeda-gold)', borderTopColor: 'transparent' }}></div>
                <p className="text-lg mb-2">Loading AR Experience...</p>
                <p className="text-sm text-gray-400">Preparing 3D model</p>
              </div>
            </div>
          ) : !cameraActive ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-md">
                <Camera className="w-24 h-24 mx-auto mb-6" style={{ color: 'var(--makeda-gold)' }} />
                <h3 className="text-2xl mb-4 font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Try On {product.name}
                </h3>
                <p className="text-gray-300 mb-6">
                  Use your camera to see how this item looks on you in real-time
                </p>
                <button
                  onClick={handleStartCamera}
                  className="px-8 py-4 text-white rounded transition-all hover:shadow-lg"
                  style={{ backgroundColor: 'var(--makeda-gold)', borderRadius: '8px' }}
                >
                  <Camera className="w-5 h-5 inline mr-2" />
                  Enable Camera
                </button>
                <p className="text-xs text-gray-500 mt-4">
                  Your privacy is protected. Camera access is used only for AR try-on.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Simulated AR Camera View */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 object-cover opacity-50"
                  style={{ filter: 'blur(2px)' }}
                />
              </div>

              {/* AR Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-96 border-2 border-dashed" style={{ borderColor: 'var(--makeda-gold)' }}>
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4" style={{ borderColor: 'var(--makeda-gold)' }}></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4" style={{ borderColor: 'var(--makeda-gold)' }}></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4" style={{ borderColor: 'var(--makeda-gold)' }}></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4" style={{ borderColor: 'var(--makeda-gold)' }}></div>
                </div>
              </div>

              {/* AR Controls */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 pointer-events-auto">
                <button
                  className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  style={{ borderRadius: '50%' }}
                  title="Rotate"
                >
                  <RotateCw className="w-6 h-6 text-white" />
                </button>
                <button
                  className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  style={{ borderRadius: '50%' }}
                  title="Fullscreen"
                >
                  <Maximize className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Status Indicator */}
              <div className="absolute top-6 left-6 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/50">
                <div className="flex items-center space-x-2 text-white text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>AR Active</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Price</p>
            <p className="text-2xl" style={{ color: 'var(--makeda-gold)' }}>
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border rounded hover:bg-gray-50 transition-colors"
              style={{ borderColor: 'var(--makeda-green)', color: 'var(--makeda-green)', borderRadius: '8px' }}
            >
              Close
            </button>
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-2 px-6 py-3 text-white rounded transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--makeda-green)', borderRadius: '8px' }}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
