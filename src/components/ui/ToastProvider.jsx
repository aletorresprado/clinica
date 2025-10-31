import React, { createContext, useContext, useState, useCallback } from 'react'


const ToastContext = createContext(null)


export function useToast() {
return useContext(ToastContext)
}


export function ToastProvider({ children }) {
const [toasts, setToasts] = useState([])


const addToast = useCallback((message) => {
const id = Date.now().toString()
setToasts((t) => [...t, { id, message }])
setTimeout(() => setToasts((t) => t.filter(x => x.id !== id)), 3500)
}, [])


return (
<ToastContext.Provider value={{ addToast }}>
{children}
<div className="toast-container">
{toasts.map(t => (
<div key={t.id} className="mb-2 px-4 py-2 bg-gray-900 text-white rounded shadow">{t.message}</div>
))}
</div>
</ToastContext.Provider>
)
}
export default ToastProvider