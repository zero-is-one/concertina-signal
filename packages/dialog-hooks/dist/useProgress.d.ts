import { FC, ReactNode } from "react";
export interface ProgressMessage {
    message: string;
    key: number;
}
type CloseHandler = () => void;
export declare const ProgressContext: import("react").Context<{
    addMessage: (message: ProgressMessage) => CloseHandler;
}>;
interface ProgressProps {
    open: boolean;
    message: string;
}
export declare const ProgressProvider: FC<{
    children: ReactNode;
    component: FC<ProgressProps>;
}>;
export declare const useProgress: () => {
    show(message: string): CloseHandler;
};
export {};
