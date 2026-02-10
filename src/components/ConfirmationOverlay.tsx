import React from 'react';
import { CheckCircle, Package, Mail } from 'lucide-react';

interface ConfirmationOverlayProps {
  isOpen: boolean;
  orderNumber: string;
  total: number;
  itemCount: number;
  onClose: () => void;
}

export function ConfirmationOverlay({
  isOpen,
  orderNumber,
  total,
  itemCount,
  onClose,
}: ConfirmationOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-lg w-full max-w-lg p-8 text-center shadow-2xl animate-scaleIn relative overflow-hidden"
        style={{ borderRadius: '8px' }}
      >
        {/* Gold Accent Border */}
        <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: 'var(--makeda-gold)' }} />
        
        {/* Animated Checkmark */}
        <div className="mb-6 relative inline-block">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--makeda-gold)' }}>
              <CheckCircle
                className="w-12 h-12 text-white animate-bounce"
                strokeWidth={3}
              />
            </div>
          </div>
        </div>

        <h2 className="text-4xl mb-3 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
          Order Confirmed!
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase from Makeda Threads
        </p>

        {/* Order Summary Card */}
        <div className="bg-gray-50 p-6 mb-6" style={{ borderRadius: '8px' }}>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Package className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
            <span className="text-sm text-gray-600">Order Number</span>
          </div>
          <p className="text-2xl font-mono tracking-wider mb-4" style={{ color: 'var(--makeda-gold)' }}>
            {orderNumber}
          </p>
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Items:</span>
              <span style={{ color: 'var(--makeda-green)' }}>{itemCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total:</span>
              <span className="text-xl" style={{ color: 'var(--makeda-gold)' }}>
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Email Confirmation Notice */}
        <div className="flex items-center justify-center space-x-2 mb-6 text-sm text-gray-500">
          <Mail className="w-4 h-4" />
          <p>A confirmation email has been sent to your inbox</p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onClose}
          className="w-full py-4 text-white transition-all duration-300 hover:shadow-lg"
          style={{
            backgroundColor: 'var(--makeda-green)',
            borderRadius: '8px',
          }}
        >
          Continue Shopping
        </button>

        <p className="text-xs text-gray-400 mt-4">
          ✨ We appreciate your trust in luxury African fashion
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
