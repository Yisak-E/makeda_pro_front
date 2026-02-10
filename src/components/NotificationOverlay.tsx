import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X, Tag } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info' | 'discount';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

interface NotificationOverlayProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export function NotificationOverlay({ notifications, onDismiss }: NotificationOverlayProps) {
  useEffect(() => {
    notifications.forEach((notification) => {
      const duration = notification.duration || 5000;
      const timer = setTimeout(() => {
        onDismiss(notification.id);
      }, duration);
      return () => clearTimeout(timer);
    });
  }, [notifications, onDismiss]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[100] space-y-3 pointer-events-none">
      {notifications.map((notification) => {
        const Icon =
          notification.type === 'success'
            ? CheckCircle
            : notification.type === 'error'
            ? AlertCircle
            : notification.type === 'discount'
            ? Tag
            : Info;

        const bgColor =
          notification.type === 'success'
            ? '#10b981'
            : notification.type === 'error'
            ? '#ef4444'
            : notification.type === 'discount'
            ? 'var(--makeda-gold)'
            : '#3b82f6';

        return (
          <div
            key={notification.id}
            className="pointer-events-auto bg-white rounded-lg shadow-2xl p-4 min-w-[320px] max-w-md animate-slideIn border-l-4"
            style={{ borderLeftColor: bgColor, borderRadius: '8px' }}
          >
            <div className="flex items-start space-x-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${bgColor}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: bgColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm mb-1" style={{ color: 'var(--makeda-green)' }}>
                  {notification.title}
                </h4>
                <p className="text-xs text-gray-600">{notification.message}</p>
              </div>
              <button
                onClick={() => onDismiss(notification.id)}
                className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
