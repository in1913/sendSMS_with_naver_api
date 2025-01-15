import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const [state, setState] = useState('');

    const toggleShowToast = () => setShowToast(!showToast);

    const showToastMessage = (msg, state) => {
        setMessage(msg);
        setState(state);
        setShowToast(true);
    };

    return (
        <ToastContext.Provider value={{ showToast, toggleShowToast, message, state, showToastMessage }}>
            {children}
        </ToastContext.Provider>
    );
};