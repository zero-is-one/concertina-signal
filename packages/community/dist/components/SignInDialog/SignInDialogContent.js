import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "../Dialog.js";
import styled from "@emotion/styled";
import "firebase/auth";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { Localized } from "../../localize/useLocalization.js";
import { Button } from "../Button.js";
import { StyledFirebaseAuth } from "../StyledFirebaseAuth.js";
const BetaLabel = styled.span `
  border: 1px solid currentColor;
  font-size: 0.8rem;
  padding: 0.1rem 0.4rem;
  margin-left: 1em;
  color: ${({ theme }) => theme.secondaryTextColor};
`;
const Description = styled.div `
  margin: 1rem 0 2rem 0;
  line-height: 1.5;
`;
export const SignInDialogContent = ({ open, onClose, onSuccess, onFailure, }) => {
    return (_jsxs(Dialog, { open: open, onOpenChange: onClose, style: { minWidth: "20rem" }, children: [_jsxs(DialogTitle, { children: [_jsx(Localized, { name: "sign-in" }), _jsx(BetaLabel, { children: "Beta" })] }), _jsx(DialogContent, { children: _jsx(StyledFirebaseAuth, { uiConfig: {
                        signInOptions: [
                            GoogleAuthProvider.PROVIDER_ID,
                            GithubAuthProvider.PROVIDER_ID,
                            "apple.com",
                        ],
                        callbacks: {
                            signInSuccessWithAuthResult() {
                                onSuccess();
                                return false;
                            },
                            signInFailure: onFailure,
                        },
                        signInFlow: "popup",
                    }, firebaseAuth: auth }) }), _jsx(DialogActions, { children: _jsx(Button, { onClick: onClose, children: _jsx(Localized, { name: "close" }) }) })] }));
};
//# sourceMappingURL=SignInDialogContent.js.map