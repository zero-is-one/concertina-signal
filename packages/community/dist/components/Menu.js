import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { Content, Portal, Root, Trigger } from "@radix-ui/react-dropdown-menu";
const StyledContent = styled(Content) `
  background: ${({ theme }) => theme.secondaryBackgroundColor};
  border-radius: 0.5rem;
  box-shadow: 0 1rem 3rem ${({ theme }) => theme.shadowColor};
  border: 1px solid ${({ theme }) => theme.backgroundColor};
  margin: 0 1rem;
  padding: 0.5rem 0;
`;
const List = styled.ul `
  list-style: none;
  padding: 0;
  margin: 0;
`;
export const Menu = ({ trigger, open, onOpenChange, children, }) => {
    return (_jsxs(Root, { open: open, onOpenChange: onOpenChange, children: [_jsx(Trigger, { asChild: true, children: trigger }), _jsx(Portal, { children: _jsx(StyledContent, { children: _jsx(List, { children: children }) }) })] }));
};
const StyledLi = styled.li `
  font-size: 0.8rem;
  color: ${({ theme, disabled }) => disabled ? theme.secondaryTextColor : theme.textColor};
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: pointer;

  &:hover {
    background: ${({ theme, disabled }) => disabled ? "transparent" : theme.highlightColor};
  }
`;
export const MenuItem = ({ children, ...props }) => (_jsx(StyledLi, { ...props, children: children }));
export const MenuDivider = styled.hr `
  border: none;
  border-top: 1px solid ${({ theme }) => theme.dividerColor};
`;
//# sourceMappingURL=Menu.js.map