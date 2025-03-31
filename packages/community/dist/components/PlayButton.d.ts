import { FC } from "react";
export declare const StyledButton: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export interface PlayButtonProps {
    onMouseDown?: () => void;
    isPlaying: boolean;
}
export declare const PlayButton: FC<PlayButtonProps>;
