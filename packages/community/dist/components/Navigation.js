import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import Color from "color";
import PlusIcon from "mdi-react/PlusIcon.js";
import { observer } from "mobx-react-lite";
import { Link } from "wouter";
import LogoWhite from "../images/logo-white.svg";
import { Localized } from "../localize/useLocalization.js";
import { UserButton } from "./UserButton.js";
const Container = styled.div `
  width: 80%;
  max-width: 60rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LogoWrapper = styled.div `
  display: flex;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
const NavigationWrapper = styled.div `
  display: flex;
  align-items: center;
  height: 5rem;
`;
const Right = styled.div `
  display: flex;
  align-items: center;
`;
const CreateButton = styled.a `
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 0.2rem;
  color: ${({ theme }) => theme.textColor};
  padding: 0 0.5rem;
  cursor: pointer;
  height: 2rem;
  outline: none;
  font-size: 0.8rem;
  text-decoration: none;
  font-weight: 600;
  margin-right: 1rem;

  &:hover {
    background: ${({ theme }) => theme.highlightColor};
  }
  &:active {
    background: ${({ theme }) => Color(theme.secondaryBackgroundColor).lighten(0.1).hex()};
  }
`;
export const Navigation = observer(() => {
    return (_jsx(NavigationWrapper, { children: _jsxs(Container, { children: [_jsx(LogoWrapper, { children: _jsx(Link, { href: "/home", children: _jsx(LogoWhite, { width: null, height: 28, viewBox: "16 0 449 120" }) }) }), _jsxs(Right, { children: [_jsxs(CreateButton, { href: "/edit", target: "_blank", children: [_jsx(PlusIcon, { size: "1rem", style: { marginRight: "0.5rem" } }), _jsx(Localized, { name: "create-new" })] }), _jsx(UserButton, {})] })] }) }));
});
//# sourceMappingURL=Navigation.js.map