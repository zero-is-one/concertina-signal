import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
export const DialogProvider = ({ children, component: ActionDialog, }) => {
    const [dialog, setDialog] = useState(null);
    return (_jsxs(DialogContext.Provider, { value: { setDialog }, children: [children, dialog !== null && _jsx(ActionDialog, { ...dialog })] }));
};
export const DialogContext = createContext(null);
export const useDialog = () => {
    const { setDialog } = useContext(DialogContext);
    return {
        async show(options) {
            return new Promise((resolve, _reject) => {
                setDialog({
                    ...options,
                    callback: (key) => resolve(key),
                });
            });
        },
    };
};
//# sourceMappingURL=useDialog.js.map