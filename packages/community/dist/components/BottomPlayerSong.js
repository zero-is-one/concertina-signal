import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { Link } from "wouter";
import { Localized } from "../localize/useLocalization.js";
const Avatar = styled.img `
  border: 1px ${({ theme }) => theme.dividerColor} solid;
  border-radius: 999px;
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
`;
const Wrapper = styled.div `
  display: flex;
  align-items: center;
  flex-grow: 1;
  width: 15rem;
  flex-shrink: 0;
`;
const Author = styled.a `
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 90%;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
const Title = styled.a `
  color: ${({ theme }) => theme.textColor};
  display: block;
  font-weight: 600;
  font-size: 130%;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
export const BottomPlayerSong = ({ song }) => {
    return (_jsx(Wrapper, { children: _jsxs("div", { children: [_jsx(Link, { href: `/songs/${song.id}`, style: { color: "currentColor", textDecoration: "none" }, children: _jsx(Title, { children: song.name.length > 0 ? (song.name) : (_jsx(Localized, { name: "untitled-song" })) }) }), song.user && (_jsx(Link, { href: `/users/${song.user.id}`, style: { color: "currentColor", textDecoration: "none" }, children: _jsx(Author, { children: song.user.name }) }))] }) }));
};
//# sourceMappingURL=BottomPlayerSong.js.map