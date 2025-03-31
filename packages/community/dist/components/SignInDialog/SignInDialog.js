import { jsx as _jsx } from "react/jsx-runtime";
import { useToast } from "dialog-hooks";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { useStores } from "../../hooks/useStores.js";
import { useLocalization } from "../../localize/useLocalization.js";
import { SignInDialogContent } from "./SignInDialogContent.js";
export const SignInDialog = observer(() => {
    const rootStore = useStores();
    const { rootViewStore, rootViewStore: { openSignInDialog }, } = rootStore;
    const toast = useToast();
    const localized = useLocalization();
    const onClose = useCallback(() => (rootViewStore.openSignInDialog = false), [rootViewStore]);
    const signInSuccessWithAuthResult = async () => {
        rootViewStore.openSignInDialog = false;
        toast.success(localized["success-sign-in"]);
    };
    const signInFailure = (error) => {
        console.warn(error);
    };
    return (_jsx(SignInDialogContent, { open: openSignInDialog, onClose: onClose, onSuccess: signInSuccessWithAuthResult, onFailure: signInFailure }));
});
//# sourceMappingURL=SignInDialog.js.map