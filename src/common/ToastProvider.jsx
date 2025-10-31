// src/common/ToastProvider.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((message, type = 'info', ms = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, ms);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} className="max-w-xs shadow-lg p-3 rounded-lg bg-white border">
            <div className="text-sm">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
