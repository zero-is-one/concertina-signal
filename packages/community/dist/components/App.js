import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeProvider } from "@emotion/react";
import { ToastProvider } from "dialog-hooks";
import { HelmetProvider } from "react-helmet-async";
import { Toast } from "../components/Toast.js";
import { StoreContext } from "../hooks/useStores.js";
import RootStore from "../stores/RootStore.js";
import { defaultTheme } from "../theme/Theme.js";
import { GlobalCSS } from "./GlobalCSS.js";
import { RootView } from "./RootView.js";
export const App = () => {
    return (_jsx(StoreContext.Provider, { value: new RootStore(), children: _jsx(ThemeProvider, { theme: defaultTheme, children: _jsx(HelmetProvider, { children: _jsxs(ToastProvider, { component: Toast, children: [_jsx(GlobalCSS, {}), _jsx(RootView, {})] }) }) }) }));
};
//# sourceMappingURL=App.js.map