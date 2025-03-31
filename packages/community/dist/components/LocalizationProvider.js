import { jsx as _jsx } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { LocalizationContext } from "../localize/useLocalization.js";
export const LocalizationProvider = observer(({ children }) => {
    return (_jsx(LocalizationContext.Provider, { value: {
            language: null, // Use the browser's language
        }, children: children }));
});
//# sourceMappingURL=LocalizationProvider.js.map