import React, { FC, PropsWithChildren } from "react";
export type MenuProps = PropsWithChildren<{
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger: React.ReactNode;
}>;
export declare const Menu: FC<MenuProps>;
export type MenuItemProps = React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
    disabled?: boolean;
};
export declare const MenuItem: FC<MenuItemProps>;
export declare const MenuDivider: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>, {}>;
