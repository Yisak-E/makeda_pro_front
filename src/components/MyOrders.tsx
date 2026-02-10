import React, { useState } from 'react';
import { Package, AlertCircle, X, Calendar, DollarSign, Clock, CheckCircle, RefreshCw } from 'lucide-react';
import { Order } from './admin/OrderQueue';

interface MyOrdersProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onRequestRefund: (orderId: string, reason: string) => void;
}

export function MyOrders({ isOpen, onClose, orders, onRequestRefund }: MyOrdersProps) {
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [refundReason, setRefundReason] = useState('');
  const [showPolicy, setShowPolicy] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'processing' | 'shipped' | 'delivered'>('all');

  const handleRefundRequest = () => {
    if (selectedOrder && refundReason) {
      onRequestRefund(selectedOrder.id, refundReason);
      setRefundModalOpen(false);
      setRefundReason('');
      setSelectedOrder(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl" style={{ borderRadius: '8px' }}>
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--makeda-gold)' }}>
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
            <h2 className="text-2xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
              My Orders
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
          <div className="mb-4">
            <button
              onClick={() => setShowPolicy(!showPolicy)}
              className="text-sm px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              style={{ borderColor: 'var(--makeda-gold)', color: 'var(--makeda-green)' }}
            >
              View Refund Policy
            </button>
          </div>

          {showPolicy && (
            <div className="mb-6 p-4 bg-gray-50 border rounded-lg" style={{ borderRadius: '8px' }}>
              <h4 className="mb-2" style={{ color: 'var(--makeda-green)' }}>Refund Policy</h4>
              <p className="text-sm text-gray-600">
                Full refund within 30 days of purchase. Items must be unworn and in original packaging. 
                Refund processed within 7-10 business days after approval.
              </p>
            </div>
          )}

          <div className="mb-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`text-sm px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors ${activeTab === 'all' ? 'bg-gray-50' : ''}`}
              style={{ borderColor: 'var(--makeda-gold)', color: 'var(--makeda-green)' }}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('processing')}
              className={`text-sm px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors ${activeTab === 'processing' ? 'bg-gray-50' : ''}`}
              style={{ borderColor: 'var(--makeda-gold)', color: 'var(--makeda-green)' }}
            >
              Processing
            </button>
            <button
              onClick={() => setActiveTab('shipped')}
              className={`text-sm px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors ${activeTab === 'shipped' ? 'bg-gray-50' : ''}`}
              style={{ borderColor: 'var(--makeda-gold)', color: 'var(--makeda-green)' }}
            >
              Shipped
            </button>
            <button
              onClick={() => setActiveTab('delivered')}
              className={`text-sm px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors ${activeTab === 'delivered' ? 'bg-gray-50' : ''}`}
              style={{ borderColor: 'var(--makeda-gold)', color: 'var(--makeda-green)' }}
            >
              Delivered
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border-2 p-4"
                  style={{
                    borderRadius: '8px',
                    borderColor: order.refundStatus === 'Requested' ? '#fbbf24' : 'var(--makeda-gold)',
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-mono text-lg" style={{ color: 'var(--makeda-gold)' }}>
                        {order.orderNumber}
                      </h4>
                      <p className="text-sm text-gray-600">Ordered on {order.date}</p>
                      <p className="text-sm text-gray-600">{order.items} item(s)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl" style={{ color: 'var(--makeda-green)' }}>
                        ${order.total.toFixed(2)}
                      </p>
                      <span
                        className="inline-block px-3 py-1 rounded text-xs text-white mt-2"
                        style={{
                          backgroundColor:
                            order.status === 'Processing' ? '#f59e0b' :
                            order.status === 'Shipped' ? '#3b82f6' : '#10b981'
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {order.refundStatus !== 'None' && (
                    <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        Refund Status: <strong>{order.refundStatus}</strong>
                        {order.refundReason && ` - ${order.refundReason}`}
                      </span>
                    </div>
                  )}

                  {order.refundStatus === 'None' && order.status === 'Delivered' && (
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setRefundModalOpen(true);
                      }}
                      className="px-4 py-2 border text-sm rounded hover:bg-gray-50 transition-colors"
                      style={{ borderColor: 'var(--makeda-green)', color: 'var(--makeda-green)' }}
                    >
                      Request Refund
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Refund Request Modal */}
      {refundModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6" style={{ borderRadius: '8px' }}>
            <h3 className="text-xl mb-4 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
              Request Refund
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Order: {selectedOrder?.orderNumber}
            </p>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-700">Reason for Refund</label>
              <textarea
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Please describe why you're requesting a refund..."
                style={{ borderRadius: '8px' }}
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleRefundRequest}
                disabled={!refundReason}
                className="flex-1 py-3 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--makeda-green)', borderRadius: '8px' }}
              >
                Submit Request
              </button>
              <button
                onClick={() => {
                  setRefundModalOpen(false);
                  setRefundReason('');
                  setSelectedOrder(null);
                }}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded"
                style={{ borderRadius: '8px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}