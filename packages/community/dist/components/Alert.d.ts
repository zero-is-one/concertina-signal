import { FC } from "react";
export type Severity = "info" | "warning";
export declare const Alert: FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    severity: Severity;
}>;
