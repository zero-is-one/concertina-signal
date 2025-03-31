import { FC, ReactNode } from "react";
export declare const PromptProvider: FC<{
    children: ReactNode;
    component: FC<PromptProps>;
}>;
export interface PromptOptions {
    title: string;
    message?: string;
    initialText?: string;
    okText?: string;
    cancelText?: string;
}
export type PromptProps = PromptOptions & {
    callback: (text: string | null) => void;
};
export declare const PromptContext: import("react").Context<{
    setPrompt: (props: PromptProps | null) => void;
}>;
export declare const usePrompt: () => {
    show(options: PromptOptions): Promise<string | null>;
};
