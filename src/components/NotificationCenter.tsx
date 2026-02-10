import React, { useState } from 'react';
import { X, Bell, Mail, MessageSquare, CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import { NotificationLog } from '../data/mockData';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  logs: NotificationLog[];
}

export function NotificationCenter({ isOpen, onClose, logs }: NotificationCenterProps) {
  const [filter, setFilter] = useState<'all' | 'email' | 'sms'>('all');
  const [resendingId, setResendingId] = useState<string | null>(null);

  const filteredLogs = logs.filter(log => filter === 'all' || log.type === filter);

  const handleResend = (id: string) => {
    setResendingId(id);
    setTimeout(() => {
      setResendingId(null);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl" style={{ borderRadius: '8px' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--makeda-gold)' }}>
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
            <div>
              <h2 className="text-2xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
                Notification Center
              </h2>
              <p className="text-sm text-gray-600">Email & SMS delivery logs</p>
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

        {/* Filter Tabs */}
        <div className="flex space-x-1 p-4 border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded text-sm transition-colors ${
              filter === 'all' ? 'text-white' : 'text-gray-600 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: filter === 'all' ? 'var(--makeda-green)' : 'transparent',
              borderRadius: '8px',
            }}
          >
            All ({logs.length})
          </button>
          <button
            onClick={() => setFilter('email')}
            className={`flex items-center space-x-2 px-4 py-2 rounded text-sm transition-colors ${
              filter === 'email' ? 'text-white' : 'text-gray-600 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: filter === 'email' ? 'var(--makeda-green)' : 'transparent',
              borderRadius: '8px',
            }}
          >
            <Mail className="w-4 h-4" />
            <span>Email ({logs.filter(l => l.type === 'email').length})</span>
          </button>
          <button
            onClick={() => setFilter('sms')}
            className={`flex items-center space-x-2 px-4 py-2 rounded text-sm transition-colors ${
              filter === 'sms' ? 'text-white' : 'text-gray-600 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: filter === 'sms' ? 'var(--makeda-green)' : 'transparent',
              borderRadius: '8px',
            }}
          >
            <MessageSquare className="w-4 h-4" />
            <span>SMS ({logs.filter(l => l.type === 'sms').length})</span>
          </button>
        </div>

        {/* Notification List */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {filteredLogs.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: log.type === 'email' ? 'rgba(10, 47, 31, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                        }}
                      >
                        {log.type === 'email' ? (
                          <Mail className="w-5 h-5" style={{ color: 'var(--makeda-green)' }} />
                        ) : (
                          <MessageSquare className="w-5 h-5" style={{ color: 'var(--makeda-gold)' }} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="text-sm" style={{ color: 'var(--makeda-green)' }}>
                            {log.subject}
                          </p>
                          {log.status === 'sent' && (
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          )}
                          {log.status === 'failed' && (
                            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                          )}
                          {log.status === 'pending' && (
                            <Clock className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-1">To: {log.recipient}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{log.timestamp}</span>
                          {log.orderNumber && (
                            <span className="px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--makeda-sand)', color: 'var(--makeda-green)' }}>
                              {log.orderNumber}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          log.status === 'sent' ? 'bg-green-100 text-green-800' :
                          log.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {log.status.toUpperCase()}
                      </span>
                      {log.status === 'sent' && (
                        <button
                          onClick={() => handleResend(log.id)}
                          disabled={resendingId === log.id}
                          className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                          title="Resend notification"
                        >
                          <RefreshCw className={`w-4 h-4 text-gray-600 ${resendingId === log.id ? 'animate-spin' : ''}`} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <Bell className="w-16 h-16 mx-auto mb-4" />
                <p>No notifications found</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl mb-1" style={{ color: 'var(--makeda-green)' }}>
                {logs.filter(l => l.status === 'sent').length}
              </p>
              <p className="text-xs text-gray-600">Sent</p>
            </div>
            <div>
              <p className="text-2xl mb-1 text-yellow-600">
                {logs.filter(l => l.status === 'pending').length}
              </p>
              <p className="text-xs text-gray-600">Pending</p>
            </div>
            <div>
              <p className="text-2xl mb-1 text-red-600">
                {logs.filter(l => l.status === 'failed').length}
              </p>
              <p className="text-xs text-gray-600">Failed</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
