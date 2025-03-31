import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import Color from "color";
import AccountCircle from "mdi-react/AccountCircleIcon.js";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { useLocation } from "wouter";
import { auth } from "../firebase/firebase.js";
import { useStores } from "../hooks/useStores.js";
import { Localized } from "../localize/useLocalization.js";
import { Menu, MenuItem } from "./Menu.js";
const IconStyle = {
    width: "1.3rem",
    height: "1.3rem",
    fill: "currentColor",
};
export const Tab = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center; 
  padding: 0 0.5rem;
  height: 2rem;
  font-size: 0.75rem;
  border-radius: 0.2rem;
  color: ${({ theme }) => theme.secondaryTextColor};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.highlightColor};
  }
  &:active {
    background: ${({ theme }) => Color(theme.secondaryBackgroundColor).lighten(0.1).hex()};
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}
`;
export const TabTitle = styled.span `
  margin-left: 0.5rem;

  @media (max-width: 850px) {
    display: none;
  }
`;
export const UserButton = observer(() => {
    const ref = useRef(null);
    const { authStore: { authUser, user }, rootViewStore, } = useStores();
    const [_, navigate] = useLocation();
    const onClickSignIn = () => {
        rootViewStore.openSignInDialog = true;
    };
    const onClickSignOut = async () => {
        await auth.signOut();
    };
    if (authUser === null) {
        return (_jsxs(Tab, { onClick: onClickSignIn, children: [_jsx(AccountCircle, { style: IconStyle }), _jsx(TabTitle, { children: _jsx(Localized, { name: "sign-in" }) })] }));
    }
    return (_jsxs(Menu, { trigger: _jsxs(Tab, { ref: ref, children: [_jsx(AccountCircle, { style: IconStyle }), _jsx(TabTitle, { children: user?.name ?? authUser.displayName })] }), children: [_jsx(MenuItem, { onClick: () => navigate(`/users/${authUser.uid}`), children: _jsx(Localized, { name: "profile" }) }), _jsx(MenuItem, { onClick: () => navigate("/profile"), children: _jsx(Localized, { name: "edit-profile" }) }), _jsx(MenuItem, { onClick: onClickSignOut, children: _jsx(Localized, { name: "sign-out" }) })] }));
});
//# sourceMappingURL=UserButton.js.map