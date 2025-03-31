import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import Warning from "mdi-react/AlertIcon.js";
import Info from "mdi-react/InformationIcon.js";
const Wrapper = styled.div `
  background: ${({ theme }) => theme.secondaryBackgroundColor};
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
  line-height: 1.5;
`;
const SeverityIcon = ({ severity, ...props }) => {
    switch (severity) {
        case "info":
            return _jsx(Info, { ...props });
        case "warning":
            return _jsx(Warning, { ...props });
    }
};
const Content = styled.div `
  flex-grow: 1;
  display: flex;
  align-items: center;
`;
export const Alert = ({ children, severity, ...props }) => {
    return (_jsxs(Wrapper, { ...props, children: [_jsx(SeverityIcon, { severity: severity, style: { marginRight: "1rem", flexShrink: "0" } }), _jsx(Content, { children: children })] }));
};
//# sourceMappingURL=Alert.js.map