import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TwitterShareButton, VKIcon, VKShareButton, WeiboIcon, WeiboShareButton, WhatsappIcon, WhatsappShareButton, XIcon, } from "react-share";
import { CopyTextForm } from "./CopyTextForm.js";
const Buttons = styled.div `
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
  grid-gap: 0.5rem;

  & > button:hover {
    opacity: 0.8;
  }
`;
export const LinkShare = ({ url, text }) => {
    return (_jsxs(_Fragment, { children: [_jsx(CopyTextForm, { text: url }), _jsxs(Buttons, { children: [_jsx(TwitterShareButton, { url: url, title: text, children: _jsx(XIcon, { size: 32, round: true }) }), _jsx(FacebookShareButton, { url: url, children: _jsx(FacebookIcon, { size: 32, round: true }) }), _jsx(WhatsappShareButton, { url: url, title: text, children: _jsx(WhatsappIcon, { size: 32, round: true }) }), _jsx(VKShareButton, { url: url, title: text, children: _jsx(VKIcon, { size: 32, round: true }) }), _jsx(WeiboShareButton, { url: url, title: text, children: _jsx(WeiboIcon, { size: 32, round: true }) }), _jsx(EmailShareButton, { url: url, subject: "Check out this song on signal", children: _jsx(EmailIcon, { size: 32, round: true }) })] })] }));
};
//# sourceMappingURL=LinkShare.js.map