import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, DollarSign, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';

const salesData = [
  { month: 'Jan', revenue: 12500, orders: 85 },
  { month: 'Feb', revenue: 15800, orders: 102 },
  { month: 'Mar', revenue: 18200, orders: 118 },
  { month: 'Apr', revenue: 16900, orders: 95 },
  { month: 'May', revenue: 22100, orders: 142 },
  { month: 'Jun', revenue: 24500, orders: 156 },
];

const productPerformance = [
  { name: 'Royal Dress', value: 35 },
  { name: 'Heritage Collection', value: 28 },
  { name: 'Executive Suit', value: 22 },
  { name: 'Others', value: 15 },
];

const COLORS = ['#D4AF37', '#0A2F1F', '#E8DCC4', '#999'];

export function BrandAnalytics() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderRadius: '8px' }}>
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8" style={{ color: 'var(--makeda-gold)' }} />
            <span className="flex items-center text-xs text-green-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              12.5%
            </span>
          </div>
          <p className="text-2xl mb-1" style={{ color: 'var(--makeda-green)' }}>$24,500</p>
          <p className="text-sm text-gray-600">Monthly Revenue</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderRadius: '8px' }}>
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8" style={{ color: 'var(--makeda-green)' }} />
            <span className="flex items-center text-xs text-green-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              8.3%
            </span>
          </div>
          <p className="text-2xl mb-1" style={{ color: 'var(--makeda-green)' }}>156</p>
          <p className="text-sm text-gray-600">Orders This Month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderRadius: '8px' }}>
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" style={{ color: 'var(--makeda-gold)' }} />
            <span className="flex items-center text-xs text-red-600">
              <ArrowDown className="w-4 h-4 mr-1" />
              2.1%
            </span>
          </div>
          <p className="text-2xl mb-1" style={{ color: 'var(--makeda-green)' }}>$157</p>
          <p className="text-sm text-gray-600">Avg. Order Value</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderRadius: '8px' }}>
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8 text-orange-500" />
            <span className="flex items-center text-xs text-gray-600">
              5 items
            </span>
          </div>
          <p className="text-2xl mb-1" style={{ color: 'var(--makeda-green)' }}>Low Stock</p>
          <p className="text-sm text-gray-600">Needs Restocking</p>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderRadius: '8px' }}>
        <h3 className="text-xl mb-6 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
          Sales Trend (6 Months)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8DCC4" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#D4AF37"
              strokeWidth={3}
              dot={{ fill: '#D4AF37', r: 5 }}
              name="Revenue ($)"
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#0A2F1F"
              strokeWidth={3}
              dot={{ fill: '#0A2F1F', r: 5 }}
              name="Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Performance */}
        <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderRadius: '8px' }}>
          <h3 className="text-xl mb-6 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
            Product Performance
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={productPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {productPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Restocking Alerts */}
        <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderRadius: '8px' }}>
          <h3 className="text-xl mb-6 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
            Restocking Alerts
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Ankara Maxi Dress', stock: 5, reorder: 20, status: 'critical' },
              { name: 'Elegant Evening Gown', stock: 7, reorder: 15, status: 'warning' },
              { name: 'Heritage Print Collection', stock: 8, reorder: 15, status: 'warning' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border-l-4 rounded"
                style={{
                  borderLeftColor: item.status === 'critical' ? '#dc2626' : '#f59e0b',
                  backgroundColor: item.status === 'critical' ? '#fee2e2' : '#fef3c7',
                  borderRadius: '8px',
                }}
              >
                <div>
                  <p className="text-sm" style={{ color: 'var(--makeda-green)' }}>{item.name}</p>
                  <p className="text-xs text-gray-600">Stock: {item.stock} units</p>
                </div>
                <button
                  className="px-3 py-1 text-xs text-white rounded hover:opacity-90"
                  style={{ backgroundColor: 'var(--makeda-green)', borderRadius: '8px' }}
                >
                  Reorder {item.reorder}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supplier Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderRadius: '8px' }}>
        <h3 className="text-xl mb-6 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
          Supplier Performance Metrics
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Supplier</th>
                <th className="px-6 py-3 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>On-Time Delivery</th>
                <th className="px-6 py-3 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Quality Rating</th>
                <th className="px-6 py-3 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Orders (30d)</th>
                <th className="px-6 py-3 text-left text-sm" style={{ color: 'var(--makeda-green)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Afri Textiles Co.', delivery: 98, quality: 4.8, orders: 45, status: 'excellent' },
                { name: 'Heritage Fabrics Ltd.', delivery: 95, quality: 4.6, orders: 32, status: 'good' },
                { name: 'Premium Threads Inc.', delivery: 88, quality: 4.2, orders: 18, status: 'average' },
              ].map((supplier, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--makeda-green)' }}>{supplier.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${supplier.delivery}%`,
                            backgroundColor: supplier.delivery >= 95 ? '#10b981' : '#f59e0b',
                          }}
                        />
                      </div>
                      <span className="text-xs">{supplier.delivery}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span style={{ color: 'var(--makeda-gold)' }}>★ {supplier.quality}/5.0</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{supplier.orders}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        supplier.status === 'excellent'
                          ? 'bg-green-100 text-green-800'
                          : supplier.status === 'good'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {supplier.status.toUpperCase()}
                    </span>
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
