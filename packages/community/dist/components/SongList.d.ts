import { CloudSong } from "@signal-app/api";
import { FC } from "react";
export interface SongListProps {
    songs: CloudSong[];
}
export declare const SongList: FC<SongListProps>;
