import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { BottomPlayer } from "../components/BottomPlayer.js";
import { Navigation } from "../components/Navigation.js";
const Container = styled.div `
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Content = styled.div `
  flex-grow: 1;
  overflow-y: auto;
  flex-basis: 0;
  padding-bottom: 2rem;
`;
const Inner = styled.div `
  width: 80%;
  max-width: 60rem;
  margin: 0 auto;
`;
export const PageTitle = styled.h1 `
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
export const PageLayout = ({ children, }) => {
    return (_jsxs(Container, { children: [_jsx(Navigation, {}), _jsx(Content, { children: _jsx(Inner, { children: children }) }), _jsx(BottomPlayer, {})] }));
};
//# sourceMappingURL=PageLayout.js.map