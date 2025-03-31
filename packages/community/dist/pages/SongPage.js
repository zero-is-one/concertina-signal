import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { useToast } from "dialog-hooks";
import DownloadIcon from "mdi-react/DownloadIcon.js";
import PlayArrow from "mdi-react/PlayArrowIcon.js";
import ShareIcon from "mdi-react/ShareIcon.js";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { playSong } from "../actions/song.js";
import { Alert } from "../components/Alert.js";
import { BigPlayButton } from "../components/BigPlayButton.js";
import { Button } from "../components/Button.js";
import { CircularProgress } from "../components/CircularProgress.js";
import { ShareDialog } from "../components/ShareDialog.js";
import { downloadBlob } from "../helpers/downloadBlob.js";
import { useAsyncEffect } from "../hooks/useAsyncEffect.js";
import { useStores } from "../hooks/useStores.js";
import { PageLayout, PageTitle } from "../layouts/PageLayout.js";
import { Localized } from "../localize/useLocalization.js";
export const SongTitle = styled.h1 `
  margin: 0;
  font-size: 300%;
`;
const Author = styled.p `
  color: ${({ theme }) => theme.secondaryTextColor};
  margin: 0.25rem 0 0 0;
`;
const AuthorLink = styled.a `
  color: currentColor;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
const Header = styled.div `
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 4rem;
`;
const HeaderRight = styled.div `
  margin-left: 1rem;
`;
const Content = styled.div ``;
const Metadata = styled.div `
  color: ${({ theme }) => theme.secondaryTextColor};
  margin-bottom: 0.5rem;
`;
const Actions = styled.div `
  display: flex;
  margin-bottom: 1rem;
`;
const ActionButton = styled(Button) `
  background: ${({ theme }) => theme.secondaryBackgroundColor};
  margin-right: 0.5rem;
`;
const Stats = styled.div `
  margin-bottom: 1rem;
`;
const PlayCount = styled.div `
  display: flex;
  align-items: center;
  margin-right: 1rem;
  color: ${({ theme }) => theme.secondaryTextColor};
`;
export const SongPage = observer(({ songId }) => {
    const rootStore = useStores();
    const { cloudSongRepository, cloudSongDataRepository, player, songStore: { currentSong }, } = rootStore;
    const [isLoading, setIsLoading] = useState(true);
    const [song, setSong] = useState(null);
    const [error, setError] = useState(null);
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const toast = useToast();
    const isPlaying = player.isPlaying && song !== null && currentSong?.metadata.id === song.id;
    const onClickPlay = () => {
        if (song === null) {
            return;
        }
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
    const onClickDownload = async () => {
        if (song === null) {
            return;
        }
        const songData = await cloudSongDataRepository.get(song.songDataId);
        const blob = new Blob([songData], { type: "application/octet-stream" });
        const sanitizedFileName = song.name.replace(/[\\/:"*?<>|]/g, "_");
        const filename = `${sanitizedFileName}.mid`;
        downloadBlob(blob, filename);
    };
    useAsyncEffect(async () => {
        try {
            const song = await cloudSongRepository.get(songId);
            setSong(song);
            setIsLoading(false);
        }
        catch (e) {
            setError(e);
        }
    }, [songId]);
    if (isLoading) {
        return (_jsxs(PageLayout, { children: [_jsx(PageTitle, { children: "Song" }), _jsx(CircularProgress, {}), " Loading..."] }));
    }
    if (error !== null) {
        return (_jsxs(PageLayout, { children: [_jsx(PageTitle, { children: "Song" }), _jsxs(Alert, { severity: "warning", children: ["Failed to load song: ", error.message] })] }));
    }
    if (song === null) {
        return (_jsxs(PageLayout, { children: [_jsx(PageTitle, { children: "Song" }), _jsx(Alert, { severity: "warning", children: _jsx(Localized, { name: "song-not-found" }) })] }));
    }
    return (_jsxs(PageLayout, { children: [_jsx(Helmet, { children: _jsx("title", { children: `${song.name} - signal` }) }), _jsxs(Header, { children: [_jsx(BigPlayButton, { isPlaying: isPlaying, onMouseDown: onClickPlay }), _jsxs(HeaderRight, { children: [_jsx(SongTitle, { style: { marginBottom: 0 }, children: song.name }), song.user && (_jsxs(Author, { children: ["by", " ", _jsx(Link, { href: `/users/${song.user.id}`, style: { color: "currentColor", textDecoration: "none" }, children: _jsx(AuthorLink, { children: song.user.name }) })] }))] })] }), _jsxs(Content, { children: [_jsx(Stats, { children: _jsxs(PlayCount, { children: [_jsx(PlayArrow, { size: 14, style: { marginRight: "0.25rem" } }), song.playCount ?? 0, " ", song.playCount === 1 ? (_jsx(Localized, { name: "play-count-1" })) : (_jsx(Localized, { name: "play-count" }))] }) }), _jsxs(Actions, { children: [_jsxs(ActionButton, { onClick: onClickDownload, children: [_jsx(DownloadIcon, { size: "1rem", style: { marginRight: "0.5rem" } }), _jsx(Localized, { name: "download" })] }), _jsxs(ActionButton, { onClick: () => setIsShareDialogOpen(true), children: [_jsx(ShareIcon, { size: "1rem", style: { marginRight: "0.5rem" } }), _jsx(Localized, { name: "share" })] })] }), _jsxs(Metadata, { children: [_jsx(Localized, { name: "created-at" }), " ", song.createdAt.toLocaleString()] }), song.publishedAt && (_jsxs(Metadata, { children: [_jsx(Localized, { name: "published-at" }), " ", song.publishedAt.toLocaleString()] })), _jsxs(Metadata, { children: [_jsx(Localized, { name: "updated-at" }), " ", song.updatedAt.toLocaleString()] })] }), _jsx(ShareDialog, { open: isShareDialogOpen, onClose: () => setIsShareDialogOpen(false), song: song })] }));
});
//# sourceMappingURL=SongPage.js.map