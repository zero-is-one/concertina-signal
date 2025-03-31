import { jsx as _jsx } from "react/jsx-runtime";
// Copy from https://github.com/firebase/firebaseui-web-react/pull/173#issuecomment-1151532176
import { onAuthStateChanged } from "firebase/auth";
import * as firebaseui from "firebaseui";
import { useEffect, useRef, useState } from "react";
export const FirebaseAuthUI = ({ uiConfig, firebaseAuth, uiCallback, className, style, }) => {
    const [userSignedIn, setUserSignedIn] = useState(false);
    const elementRef = useRef(null);
    useEffect(() => {
        // Get or Create a firebaseUI instance.
        const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() ||
            new firebaseui.auth.AuthUI(firebaseAuth);
        if (uiConfig.signInFlow === "popup") {
            firebaseUiWidget.reset();
        }
        // We track the auth state to reset firebaseUi if the user signs out.
        const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
            if (!user && userSignedIn) {
                firebaseUiWidget.reset();
            }
            setUserSignedIn(!!user);
        });
        // Trigger the callback if any was set.
        if (uiCallback) {
            uiCallback(firebaseUiWidget);
        }
        // Render the firebaseUi Widget.
        // @ts-ignore
        firebaseUiWidget.start(elementRef.current, uiConfig);
        return () => {
            unregisterAuthObserver();
            firebaseUiWidget.reset();
        };
    }, [firebaseui, uiConfig]);
    return _jsx("div", { ref: elementRef, className: className, style: style });
};
//# sourceMappingURL=index.js.map