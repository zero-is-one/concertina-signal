import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { keyframes, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import * as Portal from "@radix-ui/react-portal";
import Error from "mdi-react/AlertCircleIcon.js";
import Warning from "mdi-react/AlertIcon.js";
import CheckCircle from "mdi-react/CheckCircleIcon.js";
import Info from "mdi-react/InformationIcon.js";
import { useEffect, useState } from "react";
const contentShow = keyframes `
  from {
    opacity: 0;
    transform: translate(0, 0.5rem) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
`;
const contentHide = keyframes `
  from {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(0, 0.5rem) scale(0.96);
  }
`;
const Root = styled(Portal.Root) `
  position: fixed;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
`;
const Content = styled.div `
  margin: 0 auto;
  background: ${({ theme }) => theme.secondaryBackgroundColor};
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  box-shadow: 0 0.5rem 3rem ${({ theme }) => theme.shadowColor};
  display: flex;
  align-items: center;

  animation: ${({ show }) => show ? contentShow : contentHide}
    500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;
const SeverityIcon = ({ severity }) => {
    const theme = useTheme();
    const fill = colorForSeverity(severity, theme);
    switch (severity) {
        case "error":
            return _jsx(Error, { style: { fill } });
        case "info":
            return _jsx(Info, { style: { fill } });
        case "success":
            return _jsx(CheckCircle, { style: { fill } });
        case "warning":
            return _jsx(Warning, { style: { fill } });
    }
};
const exitDuration = 5000;
export const Toast = ({ message, severity, onExited }) => {
    const [show, setShow] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => setShow(false), exitDuration - 500);
        const timeout2 = setTimeout(onExited, exitDuration);
        return () => {
            clearTimeout(timeout);
            clearTimeout(timeout2);
        };
    });
    return (_jsx(Root, { children: _jsxs(Content, { show: show, children: [_jsx(SeverityIcon, { severity: severity }), _jsx("div", { style: { width: "0.5rem" } }), message] }) }));
};
const colorForSeverity = (severity, theme) => {
    switch (severity) {
        case "error":
            return theme.redColor;
        case "info":
            return theme.textColor;
        case "success":
            return theme.greenColor;
        case "warning":
            return theme.yellowColor;
    }
};
//# sourceMappingURL=Toast.js.map