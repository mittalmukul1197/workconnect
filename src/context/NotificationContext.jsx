import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Match Success',
      message: '3 highly matched workers found for your tailoring requirement in Rajpura.',
      type: 'match',
      read: false,
      timestamp: '10 mins ago'
    },
    {
      id: 'notif-2',
      title: 'New Work Opportunity',
      message: 'Crafted Threads Boutique posted a 100-piece stitching order 3.2 km away.',
      type: 'job',
      read: false,
      timestamp: '25 mins ago'
    }
  ]);

  const [toasts, setToasts] = useState([]);

  const addNotification = (notif) => {
    const newObj = {
      id: `notif-${Date.now()}`,
      read: false,
      timestamp: 'Just now',
      ...notif
    };
    setNotifications((prev) => [newObj, ...prev]);
    showToast(newObj.title, newObj.message, newObj.type);
  };

  const showToast = (title, message, type = 'info') => {
    const toastId = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id: toastId, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 4500);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        showToast,
        markAllAsRead,
        toasts
      }}
    >
      {children}
      {/* Toast Alert Render Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-white border border-indigo-200 shadow-xl animate-bounce-short text-slate-900"
          >
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
              <span className="font-bold text-xs uppercase">{t.type}</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-900">{t.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5">{t.message}</p>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
