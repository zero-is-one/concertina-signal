import { CloudSong } from "@signal-app/api";
import { FC } from "react";
export interface ShareDialogProps {
    song: CloudSong;
    open: boolean;
    onClose: () => void;
}
export declare const ShareDialog: FC<ShareDialogProps>;
