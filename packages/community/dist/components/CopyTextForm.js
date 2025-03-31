import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { useToast } from "dialog-hooks";
import { useCallback } from "react";
import { Localized, useLocalization } from "../localize/useLocalization.js";
import { PrimaryButton } from "./Button.js";
const Form = styled.div `
  display: flex;
  flex-grow: 1;
`;
const Input = styled.input `
  flex-grow: 1;
  border: none;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  outline: none;
  margin-right: 0.5rem;
`;
const Action = styled.div ``;
export const CopyTextForm = ({ text }) => {
    const toast = useToast();
    const localized = useLocalization();
    const onClick = useCallback(() => {
        navigator.clipboard.writeText(text);
        toast.success(localized["copied"]);
    }, [text]);
    return (_jsxs(Form, { children: [_jsx(Input, { type: "text", value: text, readOnly: true, onFocus: (e) => {
                    e.target.select();
                } }), _jsx(Action, { children: _jsx(PrimaryButton, { onClick: onClick, children: _jsx(Localized, { name: "copy" }) }) })] }));
};
//# sourceMappingURL=CopyTextForm.js.map