import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
export const ProgressContext = createContext(null);
export const ProgressProvider = ({ children, component: Progress }) => {
    const [messages, setMessages] = useState([]);
    const removeMessage = (key) => setMessages((arr) => arr.filter((m) => m.key !== key));
    return (_jsxs(ProgressContext.Provider, { value: {
            addMessage(message) {
                setMessages((arr) => [...arr, message]);
                return () => removeMessage(message.key);
            },
        }, children: [children, messages.map((m) => (_jsx(Progress, { open: true, message: m.message }, m.key)))] }));
};
export const useProgress = () => {
    const { addMessage } = useContext(ProgressContext);
    return {
        show(message) {
            return addMessage({ message, key: new Date().getTime() });
        },
    };
};
//# sourceMappingURL=useProgress.js.map