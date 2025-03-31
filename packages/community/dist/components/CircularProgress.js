import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from "@emotion/react";
import NinetyRingWithBg from "@ryohey/react-svg-spinners/dist/NinetyRingWithBg.js";
export const CircularProgress = ({ size = "2rem", }) => {
    const theme = useTheme();
    return (_jsx(NinetyRingWithBg, { style: { width: size, height: size }, color: theme.themeColor }));
};
//# sourceMappingURL=CircularProgress.js.map