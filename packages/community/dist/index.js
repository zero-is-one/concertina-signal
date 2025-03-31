import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { App } from "./components/App.js";
export function app() {
    const root = createRoot(document.querySelector("#root"));
    root.render(_jsx(App, {}));
}
//# sourceMappingURL=index.js.map