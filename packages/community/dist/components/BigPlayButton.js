import { jsx as _jsx } from "react/jsx-runtime";
import styled from "@emotion/styled";
import Pause from "mdi-react/PauseIcon.js";
import PlayArrow from "mdi-react/PlayArrowIcon.js";
import { CircleButton } from "./CircleButton.js";
export const StyledButton = styled(CircleButton) `
  background: ${({ theme }) => theme.themeColor};

  &:hover {
    background: ${({ theme }) => theme.themeColor};
    opacity: 0.8;
  }

  &.active {
    background: ${({ theme }) => theme.themeColor};
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
export const BigPlayButton = ({ onMouseDown, isPlaying, }) => {
    return (_jsx(StyledButton, { onMouseDown: onMouseDown, className: isPlaying ? "active" : undefined, children: isPlaying ? _jsx(Pause, {}) : _jsx(PlayArrow, {}) }));
};
//# sourceMappingURL=BigPlayButton.js.map