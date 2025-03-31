import { FC, ReactNode } from "react";
export type ToastSeverity = "warning" | "error" | "info" | "success";
export interface ToastMessage {
    message: string;
    severity: ToastSeverity;
    key: number;
}
export declare const ToastContext: import("react").Context<{
    addMessage: (message: ToastMessage) => void;
}>;
interface ToastProps {
    message: string;
    severity: ToastSeverity;
    onExited: () => void;
}
export declare const ToastProvider: FC<{
    children: ReactNode;
    component: FC<ToastProps>;
}>;
export declare const useToast: () => {
    show: (message: string, options: {
        severity: ToastSeverity;
    }) => void;
    info(message: string): void;
    success(message: string): void;
    warning(message: string): void;
    error(message: string): void;
};
export {};
