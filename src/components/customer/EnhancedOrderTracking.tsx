import React, { useState } from 'react';
import { X, Package, MapPin, CheckCircle, Clock, Truck, Mail, Phone, Navigation } from 'lucide-react';
import { Order } from '../admin/OrderQueue';

interface EnhancedOrderTrackingProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

interface TrackingEvent {
  timestamp: string;
  status: string;
  location: string;
  description: string;
  coordinates?: { lat: number; lng: number };
}

const mockTrackingEvents: TrackingEvent[] = [
  {
    timestamp: '2026-02-10 10:30 AM',
    status: 'Delivered',
    location: 'New York, NY, USA',
    description: 'Package delivered successfully',
    coordinates: { lat: 40.7128, lng: -74.0060 },
  },
  {
    timestamp: '2026-02-10 08:15 AM',
    status: 'Out for Delivery',
    location: 'New York, NY, USA',
    description: 'Package is out for delivery',
    coordinates: { lat: 40.7580, lng: -73.9855 },
  },
  {
    timestamp: '2026-02-09 06:45 PM',
    status: 'In Transit',
    location: 'Newark, NJ, USA',
    description: 'Package arrived at local facility',
    coordinates: { lat: 40.7357, lng: -74.1724 },
  },
  {
    timestamp: '2026-02-09 02:20 AM',
    status: 'International Hub',
    location: 'London, UK',
    description: 'Cleared customs and in transit',
    coordinates: { lat: 51.5074, lng: -0.1278 },
  },
  {
    timestamp: '2026-02-08 02:20 PM',
    status: 'Shipped',
    location: 'Lagos, Nigeria',
    description: 'Package shipped from warehouse',
    coordinates: { lat: 6.5244, lng: 3.3792 },
  },
  {
    timestamp: '2026-02-08 09:00 AM',
    status: 'Processing',
    location: 'Lagos, Nigeria',
    description: 'Order confirmed and being prepared',
    coordinates: { lat: 6.5244, lng: 3.3792 },
  },
];

export function EnhancedOrderTracking({ isOpen, onClose, orders }: EnhancedOrderTrackingProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [emailSent, setEmailSent] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const handleResendNotification = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl" style={{ borderRadius: '8px' }}>
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
          {/* Orders List Sidebar */}
          <div className="w-80 border-r border-gray-200 overflow-y-auto bg-gray-50">
            <div className="p-4 space-y-2">
              <h3 className="text-sm text-gray-600 mb-3">Your Orders</h3>
              {orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`w-full text-left p-4 rounded border-2 transition-all ${
                    selectedOrder?.id === order.id ? 'border-opacity-100 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{
                    borderColor: selectedOrder?.id === order.id ? 'var(--makeda-gold)' : undefined,
                    backgroundColor: selectedOrder?.id === order.id ? 'white' : 'transparent',
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
                          order.status === 'Shipped' ? '#3b82f6' : '#10b981',
                        borderRadius: '4px',
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{order.date}</p>
                  <p className="text-sm" style={{ color: 'var(--makeda-green)' }}>
                    ${order.total.toFixed(2)} • {order.items} items
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Tracking Details */}
          <div className="flex-1 overflow-y-auto">
            {selectedOrder ? (
              <div className="p-6 space-y-6">
                {/* Order Summary Card */}
                <div className="p-6 bg-gray-50 rounded" style={{ borderRadius: '8px' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-serif mb-1" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
                        {selectedOrder.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-600">Order Date: {selectedOrder.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleResendNotification}
                        disabled={emailSent}
                        className="flex items-center space-x-2 px-4 py-2 text-sm border rounded hover:bg-white transition-colors disabled:opacity-50"
                        style={{ borderColor: 'var(--makeda-green)', color: 'var(--makeda-green)', borderRadius: '8px' }}
                      >
                        {emailSent ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Sent!</span>
                          </>
                        ) : (
                          <>
                            <Mail className="w-4 h-4" />
                            <span>Resend Email</span>
                          </>
                        )}
                      </button>
                      <button
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-white rounded transition-colors"
                        style={{ backgroundColor: 'var(--makeda-green)', borderRadius: '8px' }}
                      >
                        <Phone className="w-4 h-4" />
                        <span>SMS</span>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Customer</p>
                      <p className="text-sm" style={{ color: 'var(--makeda-green)' }}>{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Items</p>
                      <p className="text-sm" style={{ color: 'var(--makeda-green)' }}>{selectedOrder.items} items</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Total</p>
                      <p className="text-sm" style={{ color: 'var(--makeda-gold)' }}>${selectedOrder.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* View Toggle */}
                <div className="flex space-x-2 border-b border-gray-200">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 text-sm transition-colors ${
                      viewMode === 'list' ? 'border-b-2' : 'text-gray-500'
                    }`}
                    style={{
                      borderColor: viewMode === 'list' ? 'var(--makeda-gold)' : 'transparent',
                      color: viewMode === 'list' ? 'var(--makeda-green)' : undefined,
                    }}
                  >
                    Timeline View
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-4 py-2 text-sm transition-colors ${
                      viewMode === 'map' ? 'border-b-2' : 'text-gray-500'
                    }`}
                    style={{
                      borderColor: viewMode === 'map' ? 'var(--makeda-gold)' : 'transparent',
                      color: viewMode === 'map' ? 'var(--makeda-green)' : undefined,
                    }}
                  >
                    <Navigation className="w-4 h-4 inline mr-1" />
                    Map View
                  </button>
                </div>

                {viewMode === 'list' ? (
                  /* Timeline View */
                  <div>
                    <h4 className="text-lg mb-4 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
                      Tracking History
                    </h4>
                    <div className="space-y-4">
                      {mockTrackingEvents.map((event, index) => (
                        <div key={index} className="flex">
                          <div className="flex flex-col items-center mr-4">
                            <div
                              className="w-4 h-4 rounded-full border-4 border-white shadow-md"
                              style={{ backgroundColor: index === 0 ? 'var(--makeda-gold)' : '#10b981' }}
                            />
                            {index !== mockTrackingEvents.length - 1 && (
                              <div className="w-0.5 h-full bg-gray-300 my-1" />
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
                ) : (
                  /* Map View */
                  <div>
                    <h4 className="text-lg mb-4 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
                      Delivery Route
                    </h4>
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '400px', borderRadius: '8px' }}>
                      {/* Simulated Map */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                        <svg className="w-full h-full" viewBox="0 0 800 400">
                          {/* Route Path */}
                          <path
                            d="M 100,350 Q 200,300 300,280 T 500,200 T 700,150"
                            fill="none"
                            stroke="var(--makeda-green)"
                            strokeWidth="3"
                            strokeDasharray="10,5"
                          />
                          
                          {/* Location Markers */}
                          {mockTrackingEvents.map((event, index) => {
                            const x = 100 + (index * 120);
                            const y = 350 - (index * 40);
                            return (
                              <g key={index}>
                                <circle
                                  cx={x}
                                  cy={y}
                                  r="8"
                                  fill={index === 0 ? 'var(--makeda-gold)' : 'var(--makeda-green)'}
                                  stroke="white"
                                  strokeWidth="3"
                                />
                                <text
                                  x={x}
                                  y={y + 25}
                                  fontSize="10"
                                  fill="#666"
                                  textAnchor="middle"
                                >
                                  {event.status}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>

                      {/* Map Legend */}
                      <div className="absolute bottom-4 right-4 bg-white p-4 rounded shadow-lg" style={{ borderRadius: '8px' }}>
                        <h5 className="text-xs mb-2" style={{ color: 'var(--makeda-green)' }}>Tracking Legend</h5>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--makeda-gold)' }}></div>
                            <span>Current Location</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--makeda-green)' }}></div>
                            <span>Previous Checkpoint</span>
                          </div>
                        </div>
                      </div>

                      {/* Current Location Info */}
                      <div className="absolute top-4 left-4 bg-white p-4 rounded shadow-lg max-w-xs" style={{ borderRadius: '8px' }}>
                        <div className="flex items-start space-x-3">
                          <Truck className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--makeda-gold)' }} />
                          <div>
                            <p className="text-sm mb-1" style={{ color: 'var(--makeda-green)' }}>
                              {mockTrackingEvents[0].status}
                            </p>
                            <p className="text-xs text-gray-600">{mockTrackingEvents[0].description}</p>
                            <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                              <MapPin className="w-3 h-3" />
                              <span>{mockTrackingEvents[0].location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Location Details */}
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {mockTrackingEvents.slice(0, 3).map((event, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded" style={{ borderRadius: '8px' }}>
                          <p className="text-xs text-gray-600 mb-1">{event.status}</p>
                          <p className="text-sm" style={{ color: 'var(--makeda-green)' }}>{event.location}</p>
                          <p className="text-xs text-gray-500 mt-1">{event.timestamp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estimated Delivery */}
                <div className="p-4 bg-green-50 border border-green-200 rounded" style={{ borderRadius: '8px' }}>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm mb-1" style={{ color: 'var(--makeda-green)' }}>
                        Estimated Delivery
                      </p>
                      <p className="text-xs text-gray-600">
                        {selectedOrder.status === 'Delivered' 
                          ? 'Package was delivered on Feb 10, 2026' 
                          : 'Expected by Feb 12, 2026 (2 days)'}
                      </p>
                    </div>
                  </div>
                </div>
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
