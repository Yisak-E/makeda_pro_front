import React from 'react';
import { CheckCircle, Package } from 'lucide-react';

interface SuccessScreenProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
}

export function SuccessScreen({ isOpen, onClose, orderNumber }: SuccessScreenProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-8 text-center shadow-2xl" style={{ borderRadius: '8px' }}>
        {/* Gold Checkmark */}
        <div className="mb-6 relative inline-block">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto animate-pulse"
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
          >
            <CheckCircle
              className="w-16 h-16"
              style={{ color: 'var(--makeda-gold)' }}
              strokeWidth={2}
            />
          </div>
        </div>

        <h2 className="text-3xl mb-4" style={{ color: 'var(--makeda-green)' }}>
          Order Confirmed!
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="bg-gray-50 p-4 mb-6" style={{ borderRadius: '8px' }}>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Package className="w-5 h-5" style={{ color: 'var(--makeda-green)' }} />
            <span className="text-sm text-gray-600">Order Number</span>
          </div>
          <p className="text-lg tracking-wide" style={{ color: 'var(--makeda-gold)' }}>
            {orderNumber}
          </p>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          A confirmation email has been sent to your email address with order details and tracking information.
        </p>

        <button
          onClick={onClose}
          className="w-full py-4 text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
          style={{
            backgroundColor: 'var(--makeda-green)',
            borderRadius: '8px',
          }}
        >
          Continue Shopping
        </button>

        <p className="text-xs text-gray-400 mt-4">
          We appreciate your trust in Makeda Threads
        </p>
      </div>
    </div>
  );
}
