import { FC } from "react";
export interface SongPageProps {
    songId: string;
}
export declare const SongTitle: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}>;
export declare const SongPage: FC<SongPageProps>;
