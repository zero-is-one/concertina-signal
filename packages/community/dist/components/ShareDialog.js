import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { Localized, useLocalization } from "../localize/useLocalization.js";
import { Button } from "./Button.js";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "./Dialog.js";
import { LinkShare } from "./LinkShare.js";
export const ShareDialog = observer(({ song, open, onClose }) => {
    const localized = useLocalization();
    return (_jsxs(Dialog, { open: open, onOpenChange: onClose, style: { minWidth: "20rem" }, children: [_jsx(DialogTitle, { children: _jsx(Localized, { name: "share" }) }), _jsx(DialogContent, { children: _jsx(LinkShare, { url: getCloudSongUrl(song.id), text: `🎶 ${song.name} by ${song.user?.name} from @signalmidi\n#midi #signalmidi` }) }), _jsx(DialogActions, { children: _jsx(Button, { onClick: onClose, children: _jsx(Localized, { name: "close" }) }) })] }));
});
const getCloudSongUrl = (cloudSongId) => `${window.location.origin}/songs/${cloudSongId}`;
//# sourceMappingURL=ShareDialog.js.map