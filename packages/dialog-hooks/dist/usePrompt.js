import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
export const PromptProvider = ({ children, component: PromptDialog }) => {
    const [prompt, setPrompt] = useState(null);
    return (_jsxs(PromptContext.Provider, { value: {
            setPrompt,
        }, children: [children, prompt !== null && _jsx(PromptDialog, { ...prompt })] }));
};
export const PromptContext = createContext(null);
export const usePrompt = () => {
    const { setPrompt } = useContext(PromptContext);
    return {
        async show(options) {
            return new Promise((resolve, _reject) => {
                setPrompt({
                    ...options,
                    callback: (text) => resolve(text),
                });
            });
        },
    };
};
//# sourceMappingURL=usePrompt.js.map