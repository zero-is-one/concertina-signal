import * as firebaseui from "firebaseui";
export interface Props {
    uiConfig: firebaseui.auth.Config;
    uiCallback?(ui: firebaseui.auth.AuthUI): void;
    firebaseAuth: any;
    className?: string;
    style?: React.CSSProperties;
}
export declare const FirebaseAuthUI: ({ uiConfig, firebaseAuth, uiCallback, className, style, }: Props) => import("react/jsx-runtime").JSX.Element;
