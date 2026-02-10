import React, { useState } from 'react';
import { X, CreditCard, Shield, Check, Edit, Bitcoin } from 'lucide-react';
import { User } from './EnhancedAuthModal';

interface CheckoutFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  total: number;
  user: User | null;
}

type CheckoutStep = 'shipping' | 'payment' | 'confirm';

export function CheckoutFlow({ isOpen, onClose, onSuccess, total, user }: CheckoutFlowProps) {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'crypto'>('card');
  const [isEditingShipping, setIsEditingShipping] = useState(!user);
  const [shippingData, setShippingData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    country: user?.country || '',
  });
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirm');
  };

  const handleConfirmOrder = () => {
    onSuccess();
    setStep('shipping');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--makeda-gold)' }}>
            <h2 className="text-2xl" style={{ color: 'var(--makeda-green)' }}>
              Checkout
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    step === 'shipping' ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--makeda-green)',
                    ringColor: 'var(--makeda-gold)',
                  }}
                >
                  1
                </div>
                <span className="ml-2 text-sm">Shipping</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300" />
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    step === 'payment' ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{
                    backgroundColor: step === 'payment' || step === 'confirm' ? 'var(--makeda-green)' : '#ccc',
                    ringColor: 'var(--makeda-gold)',
                  }}
                >
                  2
                </div>
                <span className="ml-2 text-sm">Payment</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300" />
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    step === 'confirm' ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{
                    backgroundColor: step === 'confirm' ? 'var(--makeda-green)' : '#ccc',
                    ringColor: 'var(--makeda-gold)',
                  }}
                >
                  3
                </div>
                <span className="ml-2 text-sm">Confirm</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 240px)' }}>
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <h3 className="text-lg mb-4" style={{ color: 'var(--makeda-green)' }}>
                  Shipping Details
                </h3>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    value={shippingData.fullName}
                    onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                    style={{ borderRadius: '8px', focusRingColor: 'var(--makeda-gold)' }}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={shippingData.email}
                    onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Address</label>
                  <input
                    type="text"
                    required
                    value={shippingData.address}
                    onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">City</label>
                    <input
                      type="text"
                      required
                      value={shippingData.city}
                      onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                      style={{ borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={shippingData.postalCode}
                      onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                      style={{ borderRadius: '8px' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Country</label>
                  <input
                    type="text"
                    required
                    value={shippingData.country}
                    onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-white mt-6 transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--makeda-green)',
                    borderRadius: '8px',
                  }}
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <h3 className="text-lg mb-4" style={{ color: 'var(--makeda-green)' }}>
                  Payment Method
                </h3>

                {/* Payment Method Toggle */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 py-4 px-6 border-2 transition-all duration-200 ${
                      paymentMethod === 'card' ? 'border-opacity-100' : 'border-gray-300 border-opacity-50'
                    }`}
                    style={{
                      borderRadius: '8px',
                      borderColor: paymentMethod === 'card' ? 'var(--makeda-gold)' : undefined,
                      backgroundColor: paymentMethod === 'card' ? 'rgba(212, 175, 55, 0.1)' : undefined,
                    }}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--makeda-green)' }} />
                    <span className="text-sm">Visa/Mastercard</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex-1 py-4 px-6 border-2 transition-all duration-200 ${
                      paymentMethod === 'paypal' ? 'border-opacity-100' : 'border-gray-300 border-opacity-50'
                    }`}
                    style={{
                      borderRadius: '8px',
                      borderColor: paymentMethod === 'paypal' ? 'var(--makeda-gold)' : undefined,
                      backgroundColor: paymentMethod === 'paypal' ? 'rgba(212, 175, 55, 0.1)' : undefined,
                    }}
                  >
                    <Shield className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--makeda-green)' }} />
                    <span className="text-sm">PayPal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`flex-1 py-4 px-6 border-2 transition-all duration-200 ${
                      paymentMethod === 'crypto' ? 'border-opacity-100' : 'border-gray-300 border-opacity-50'
                    }`}
                    style={{
                      borderRadius: '8px',
                      borderColor: paymentMethod === 'crypto' ? 'var(--makeda-gold)' : undefined,
                      backgroundColor: paymentMethod === 'crypto' ? 'rgba(212, 175, 55, 0.1)' : undefined,
                    }}
                  >
                    <Bitcoin className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--makeda-green)' }} />
                    <span className="text-sm">Crypto</span>
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                        style={{ borderRadius: '8px' }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2 text-gray-700">Expiry Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2 text-gray-700">CVV</label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-gray-50 text-center" style={{ borderRadius: '8px' }}>
                    <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--makeda-green)' }} />
                    <p className="text-gray-600">You will be redirected to PayPal to complete your payment securely.</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 text-white mt-6 transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--makeda-green)',
                    borderRadius: '8px',
                  }}
                >
                  Continue to Confirm
                </button>
              </form>
            )}

            {step === 'confirm' && (
              <div className="space-y-6">
                <h3 className="text-lg mb-4" style={{ color: 'var(--makeda-green)' }}>
                  Order Summary
                </h3>

                <div className="p-6 bg-gray-50 space-y-4" style={{ borderRadius: '8px' }}>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span style={{ color: 'var(--makeda-green)' }}>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span style={{ color: 'var(--makeda-green)' }}>Free</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-lg">
                    <span style={{ color: 'var(--makeda-green)' }}>Total</span>
                    <span style={{ color: 'var(--makeda-gold)' }}>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-6 border-2 space-y-2" style={{ borderRadius: '8px', borderColor: 'var(--makeda-gold)' }}>
                  <h4 className="text-sm" style={{ color: 'var(--makeda-green)' }}>Shipping to:</h4>
                  <p className="text-sm text-gray-600">{shippingData.fullName}</p>
                  <p className="text-sm text-gray-600">{shippingData.address}</p>
                  <p className="text-sm text-gray-600">
                    {shippingData.city}, {shippingData.postalCode}
                  </p>
                  <p className="text-sm text-gray-600">{shippingData.country}</p>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="w-full py-4 text-white transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--makeda-green)',
                    borderRadius: '8px',
                  }}
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}