import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { SongListItem } from "./SongListItem.js";
export const SongList = observer(({ songs }) => {
    if (songs.length === 0) {
        return _jsx("div", { children: "No songs" });
    }
    return (_jsx(_Fragment, { children: songs.map((song) => (_jsx(SongListItem, { song: song }, song.id))) }));
});
//# sourceMappingURL=SongList.js.map