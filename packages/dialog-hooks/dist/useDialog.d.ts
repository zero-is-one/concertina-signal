import { FC, ReactNode } from "react";
type KeyType = string | number | symbol | boolean;
export interface DialogProviderProps<Keys extends KeyType> {
    children: ReactNode;
    component: FC<DialogProps<Keys>>;
}
export declare const DialogProvider: <Keys extends KeyType>({ children, component: ActionDialog, }: DialogProviderProps<Keys>) => import("react/jsx-runtime").JSX.Element;
export interface DialogOptions<Keys extends KeyType> {
    title: string;
    message?: string;
    actions: DialogAction<Keys>[];
}
export interface DialogAction<Key extends KeyType> {
    title: string;
    key: Key;
}
export type DialogProps<Keys extends KeyType> = DialogOptions<Keys> & {
    callback: (key: Keys | null) => void;
};
export declare const DialogContext: import("react").Context<{
    setDialog: (props: DialogProps<any> | null) => void;
}>;
export declare const useDialog: () => {
    show<Keys extends KeyType>(options: DialogOptions<Keys>): Promise<Keys>;
};
export {};
