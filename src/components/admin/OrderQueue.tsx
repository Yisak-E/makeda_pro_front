import React, { useState } from 'react';
import { Check, X, Package, AlertCircle } from 'lucide-react';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  refundStatus: 'None' | 'Requested' | 'Approved' | 'Denied';
  refundReason?: string;
  date: string;
  items: number;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'MT8A4F2G',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    total: 349.99,
    status: 'Processing',
    refundStatus: 'None',
    date: '2026-02-04',
    items: 2,
  },
  {
    id: '2',
    orderNumber: 'MT3H7K9L',
    customerName: 'Michael Chen',
    customerEmail: 'michael@example.com',
    total: 189.99,
    status: 'Shipped',
    refundStatus: 'Requested',
    refundReason: 'Product not as described',
    date: '2026-02-02',
    items: 1,
  },
  {
    id: '3',
    orderNumber: 'MT5D1P8Q',
    customerName: 'Emma Williams',
    customerEmail: 'emma@example.com',
    total: 459.99,
    status: 'Delivered',
    refundStatus: 'None',
    date: '2026-01-28',
    items: 1,
  },
];

export function OrderQueue() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const handleStatusChange = (id: string, newStatus: Order['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleRefundAction = (id: string, action: 'Approved' | 'Denied') => {
    setOrders(orders.map(o => o.id === id ? { ...o, refundStatus: action } : o));
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Processing': return '#f59e0b';
      case 'Shipped': return '#3b82f6';
      case 'Delivered': return '#10b981';
      default: return '#6b7280';
    }
  };

  const refundRequests = orders.filter(o => o.refundStatus === 'Requested');

  return (
    <div className="space-y-6">
      {/* Refund Requests */}
      {refundRequests.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm" style={{ borderRadius: '8px' }}>
          <div className="p-6 border-b border-gray-200 flex items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
              Refund Requests ({refundRequests.length})
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {refundRequests.map((order) => (
              <div key={order.id} className="border-2 border-red-200 p-4 bg-red-50" style={{ borderRadius: '8px' }}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-mono" style={{ color: 'var(--makeda-gold)' }}>{order.orderNumber}</h4>
                    <p className="text-sm text-gray-600">{order.customerName} • {order.customerEmail}</p>
                    <p className="text-sm mt-2"><strong>Reason:</strong> {order.refundReason}</p>
                  </div>
                  <span className="px-3 py-1 bg-red-500 text-white text-sm rounded">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRefundAction(order.id, 'Approved')}
                    className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleRefundAction(order.id, 'Denied')}
                    className="flex items-center space-x-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Deny</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Orders */}
      <div className="bg-white rounded-lg shadow-sm" style={{ borderRadius: '8px' }}>
        <div className="p-6 border-b border-gray-200 flex items-center space-x-2">
          <Package className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
          <h3 className="text-xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
            All Orders
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Order #</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Customer</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Date</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Items</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Total</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Status</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Refund</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm" style={{ color: 'var(--makeda-gold)' }}>
                      {order.orderNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm" style={{ color: 'var(--makeda-green)' }}>{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-6 py-4">
                    <span style={{ color: 'var(--makeda-gold)' }}>${order.total.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      className="px-2 py-1 rounded text-xs text-white border-none"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    {order.refundStatus !== 'None' ? (
                      <span className={`px-2 py-1 rounded text-xs ${
                        order.refundStatus === 'Requested' ? 'bg-yellow-100 text-yellow-800' :
                        order.refundStatus === 'Approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.refundStatus}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-xs px-3 py-1 rounded hover:opacity-80"
                      style={{ backgroundColor: 'var(--makeda-green)', color: 'white' }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
