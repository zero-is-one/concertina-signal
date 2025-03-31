import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { useToast } from "dialog-hooks";
import SkipNext from "mdi-react/SkipNextIcon.js";
import SkipPrevious from "mdi-react/SkipPreviousIcon.js";
import { observer } from "mobx-react-lite";
import { playNextSong, playPreviousSong } from "../actions/song.js";
import { useStores } from "../hooks/useStores.js";
import { BottomPlayerSong } from "./BottomPlayerSong.js";
import { CircleButton } from "./CircleButton.js";
import { PlayButton } from "./PlayButton.js";
const Wrapper = styled.div `
  border-top: 1px solid ${({ theme }) => theme.dividerColor};
  padding: 1rem 0;
`;
const Inner = styled.div `
  width: 80%;
  max-width: 60rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;
export const BottomPlayer = observer(() => {
    const rootStore = useStores();
    const { player, songStore: { currentSong }, } = rootStore;
    const toast = useToast();
    const onClickPlay = () => {
        player.isPlaying ? player.stop() : player.play();
    };
    const onClickPrevious = () => {
        try {
            playPreviousSong(rootStore)();
        }
        catch (e) {
            toast.error(`Failed to play: ${e.message}`);
        }
    };
    const onClickNext = () => {
        try {
            playNextSong(rootStore)();
        }
        catch (e) {
            toast.error(`Failed to play: ${e.message}`);
        }
    };
    return (_jsx(Wrapper, { children: _jsxs(Inner, { children: [_jsx(CircleButton, { onClick: onClickPrevious, children: _jsx(SkipPrevious, {}) }), _jsx(PlayButton, { isPlaying: player.isPlaying, onMouseDown: onClickPlay }), _jsx(CircleButton, { onClick: onClickNext, style: { marginRight: "1rem" }, children: _jsx(SkipNext, {}) }), currentSong && _jsx(BottomPlayerSong, { song: currentSong.metadata })] }) }));
});
//# sourceMappingURL=BottomPlayer.js.map