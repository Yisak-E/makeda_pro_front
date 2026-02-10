import React, { useState } from 'react';
import { X, Package, MapPin, CheckCircle, Clock, Truck, Mail, RefreshCw } from 'lucide-react';
import { Order } from '../admin/OrderQueue';

interface OrderTrackingDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

interface TrackingEvent {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

const mockTrackingEvents: TrackingEvent[] = [
  {
    timestamp: '2026-02-10 10:30 AM',
    status: 'Delivered',
    location: 'New York, NY',
    description: 'Package delivered successfully',
  },
  {
    timestamp: '2026-02-10 08:15 AM',
    status: 'Out for Delivery',
    location: 'New York, NY',
    description: 'Package is out for delivery',
  },
  {
    timestamp: '2026-02-09 06:45 PM',
    status: 'In Transit',
    location: 'Newark, NJ',
    description: 'Package arrived at local facility',
  },
  {
    timestamp: '2026-02-08 02:20 PM',
    status: 'Shipped',
    location: 'Lagos, Nigeria',
    description: 'Package shipped from warehouse',
  },
  {
    timestamp: '2026-02-08 09:00 AM',
    status: 'Processing',
    location: 'Lagos, Nigeria',
    description: 'Order confirmed and being prepared',
  },
];

export function OrderTrackingDashboard({ isOpen, onClose, orders }: OrderTrackingDashboardProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [emailSent, setEmailSent] = useState(false);

  const handleResendNotification = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl" style={{ borderRadius: '8px' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--makeda-gold)' }}>
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
            <h2 className="text-2xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
              Order Tracking
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-100px)]">
          {/* Orders List */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-4 space-y-2">
              {orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`w-full text-left p-4 rounded border-2 transition-all ${
                    selectedOrder?.id === order.id ? 'border-opacity-100' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{
                    borderColor: selectedOrder?.id === order.id ? 'var(--makeda-gold)' : undefined,
                    backgroundColor: selectedOrder?.id === order.id ? 'rgba(212, 175, 55, 0.05)' : undefined,
                    borderRadius: '8px',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm" style={{ color: 'var(--makeda-gold)' }}>
                      {order.orderNumber}
                    </span>
                    <span
                      className="px-2 py-1 rounded text-xs text-white"
                      style={{
                        backgroundColor:
                          order.status === 'Processing' ? '#f59e0b' :
                          order.status === 'Shipped' ? '#3b82f6' : '#10b981'
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.date}</p>
                  <p className="text-sm" style={{ color: 'var(--makeda-green)' }}>
                    ${order.total.toFixed(2)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Tracking Details */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedOrder ? (
              <div className="space-y-6">
                {/* Order Summary Card */}
                <div className="p-6 bg-gray-50 rounded" style={{ borderRadius: '8px' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
                      {selectedOrder.orderNumber}
                    </h3>
                    <button
                      onClick={handleResendNotification}
                      disabled={emailSent}
                      className="flex items-center space-x-2 px-4 py-2 text-sm border rounded hover:bg-white transition-colors disabled:opacity-50"
                      style={{ borderColor: 'var(--makeda-green)', color: 'var(--makeda-green)', borderRadius: '8px' }}
                    >
                      {emailSent ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Email Sent!</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          <span>Resend Notification</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Order Date</p>
                      <p className="text-sm" style={{ color: 'var(--makeda-green)' }}>{selectedOrder.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Items</p>
                      <p className="text-sm" style={{ color: 'var(--makeda-green)' }}>{selectedOrder.items}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Total</p>
                      <p className="text-sm" style={{ color: 'var(--makeda-gold)' }}>${selectedOrder.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="flex justify-between mb-2">
                    {['Processing', 'Shipped', 'In Transit', 'Delivered'].map((stage, index) => {
                      const currentStageIndex = ['Processing', 'Shipped', 'Delivered'].indexOf(selectedOrder.status);
                      const isActive = index <= currentStageIndex;
                      return (
                        <div key={stage} className="flex flex-col items-center flex-1">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                              isActive ? 'text-white' : 'text-gray-400'
                            }`}
                            style={{
                              backgroundColor: isActive ? 'var(--makeda-green)' : '#e5e7eb',
                            }}
                          >
                            {index === 0 && <Clock className="w-5 h-5" />}
                            {index === 1 && <Package className="w-5 h-5" />}
                            {index === 2 && <Truck className="w-5 h-5" />}
                            {index === 3 && <CheckCircle className="w-5 h-5" />}
                          </div>
                          <p className={`text-xs text-center ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                            {stage}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${(['Processing', 'Shipped', 'Delivered'].indexOf(selectedOrder.status) + 1) * 33.33}%`,
                        backgroundColor: 'var(--makeda-green)',
                      }}
                    />
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div>
                  <h4 className="text-lg mb-4 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
                    Tracking History
                  </h4>
                  <div className="space-y-4">
                    {mockTrackingEvents.map((event, index) => (
                      <div key={index} className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: index === 0 ? 'var(--makeda-gold)' : '#e5e7eb' }}
                          />
                          {index !== mockTrackingEvents.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 my-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm" style={{ color: 'var(--makeda-green)' }}>{event.status}</p>
                            <p className="text-xs text-gray-500">{event.timestamp}</p>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{event.description}</p>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {selectedOrder.status === 'Delivered' && (
                  <div className="flex space-x-3">
                    <button
                      className="flex items-center space-x-2 px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
                      style={{ borderColor: 'var(--makeda-green)', color: 'var(--makeda-green)', borderRadius: '8px' }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Return/Refund</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <Package className="w-16 h-16 mx-auto mb-4" />
                  <p>No orders to track</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
