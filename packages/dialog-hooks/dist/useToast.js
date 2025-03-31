import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
export const ToastContext = createContext(null);
export const ToastProvider = ({ children, component: Toast }) => {
    const [messages, setMessages] = useState([]);
    const removeMessage = (key) => setMessages((arr) => arr.filter((m) => m.key !== key));
    return (_jsxs(ToastContext.Provider, { value: {
            addMessage(message) {
                setMessages((arr) => [...arr, message]);
            },
        }, children: [children, messages.map((m) => (_jsx(Toast, { message: m.message, severity: m.severity, onExited: () => removeMessage(m.key) }, m.key)))] }));
};
export const useToast = () => {
    const { addMessage } = useContext(ToastContext);
    const show = (message, options) => {
        addMessage({ message, ...options, key: new Date().getTime() });
    };
    return {
        show,
        info(message) {
            show(message, { severity: "info" });
        },
        success(message) {
            show(message, { severity: "success" });
        },
        warning(message) {
            show(message, { severity: "warning" });
        },
        error(message) {
            show(message, { severity: "error" });
        },
    };
};
//# sourceMappingURL=useToast.js.map