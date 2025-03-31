import { FC } from "react";
import "firebase/auth";
export interface SignInDialogContentProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onFailure: (error: firebaseui.auth.AuthUIError) => void;
}
export declare const SignInDialogContent: FC<SignInDialogContentProps>;
