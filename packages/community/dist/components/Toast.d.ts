import { ToastSeverity } from "dialog-hooks";
import { FC } from "react";
export interface ToastProps {
    message: string;
    severity: ToastSeverity;
    onExited: () => void;
}
export declare const Toast: FC<ToastProps>;
