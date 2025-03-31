import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { useToast } from "dialog-hooks";
import Circle from "mdi-react/CircleIcon.js";
import Pause from "mdi-react/PauseIcon.js";
import PlayArrow from "mdi-react/PlayArrowIcon.js";
import { observer } from "mobx-react-lite";
import { playSong } from "../actions/song.js";
import { formatTimeAgo } from "../helpers/formatTimeAgo.js";
import { useStores } from "../hooks/useStores.js";
import { Localized } from "../localize/useLocalization.js";
const Content = styled.div `
  display: flex;
  align-items: center;
  flex-grow: 1;
`;
const Username = styled.div `
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 90%;
`;
const Title = styled.div `
  word-break: break-all;
  font-weight: 600;
  font-size: 130%;
`;
const PlayButtonWrapper = styled.div `
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin-right: 0.5rem;

  .arrow {
    display: none;
  }
  .circle {
    display: block;
    width: 0.5rem;
    opacity: 0.2;
  }
`;
const PlayButton = ({ isPlaying }) => {
    return (_jsx(PlayButtonWrapper, { children: isPlaying ? (_jsx(Pause, {})) : (_jsxs(_Fragment, { children: [_jsx(Circle, { className: "circle" }), _jsx(PlayArrow, { className: "arrow" })] })) }));
};
const Wrapper = styled.div `
  display: flex;
  padding: 0.5rem 0;
  cursor: pointer;
  border-radius: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.highlightColor};

    .arrow {
      display: block;
    }
    .circle {
      display: none;
    }
  }
`;
const PlayCount = styled.div `
  display: flex;
  align-items: center;
  margin-right: 1rem;
  color: ${({ theme }) => theme.secondaryTextColor};
`;
const Time = styled.div `
  display: flex;
  align-items: center;
  margin-right: 1rem;
  color: ${({ theme }) => theme.secondaryTextColor};
  flex-shrink: 0;
  min-width: 4rem;
`;
const Tag = styled.div `
  display: flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.highlightColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 90%;
  margin-right: 0.5rem;
`;
const Labels = styled.div `
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;
export const SongListItem = observer(({ song }) => {
    const rootStore = useStores();
    const { player, songStore: { currentSong }, } = rootStore;
    const toast = useToast();
    const isPlaying = player.isPlaying && currentSong?.metadata.id === song.id;
    const onClick = () => {
        if (player.isPlaying && currentSong?.metadata.id === song.id) {
            player.stop();
        }
        else {
            try {
                playSong(rootStore)(song);
            }
            catch (e) {
                toast.error(`Failed to play: ${e.message}`);
            }
        }
    };
    return (_jsxs(Wrapper, { onClick: onClick, children: [_jsx(PlayButton, { isPlaying: isPlaying }), _jsxs(Content, { children: [_jsxs(Labels, { children: [_jsx(Title, { children: song.name.length > 0 ? (song.name) : (_jsx(Localized, { name: "untitled-song" })) }), _jsx(Username, { children: song.user?.name })] }), !song.isPublic && _jsx(Tag, { children: "Private" })] }), _jsxs(PlayCount, { children: [_jsx(PlayArrow, { size: 14, style: { marginRight: "0.25rem" } }), song.playCount ?? 0] }), _jsx(Time, { children: formatTimeAgo(song.updatedAt) })] }));
});
//# sourceMappingURL=SongListItem.js.map