import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useToast } from "dialog-hooks";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useAsyncEffect } from "../hooks/useAsyncEffect.js";
import { useStores } from "../hooks/useStores.js";
import { CircularProgress } from "./CircularProgress.js";
import { SongList } from "./SongList.js";
export const UserSongList = observer(({ userId }) => {
    const rootStore = useStores();
    const { communitySongStore, cloudSongRepository, authStore: { authUser }, } = rootStore;
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [songs, setSongs] = useState([]);
    useAsyncEffect(async () => {
        try {
            let songs;
            if (userId === authUser?.uid) {
                songs = await cloudSongRepository.getMySongs();
            }
            else {
                songs = await cloudSongRepository.getPublicSongsByUser(userId);
            }
            communitySongStore.songs = songs;
            setSongs(songs);
        }
        catch (e) {
            toast.error(e.message);
        }
        finally {
            setIsLoading(false);
        }
    }, [userId]);
    if (isLoading) {
        return (_jsxs(_Fragment, { children: [_jsx(CircularProgress, {}), " Loading..."] }));
    }
    return _jsx(SongList, { songs: songs });
});
//# sourceMappingURL=UserSongList.js.map