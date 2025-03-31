import { CloudSong, ICloudSongDataRepository } from "@signal-app/api";
import { Song } from "../song/Song.js";
export interface SongItem {
    song: Song;
    metadata: CloudSong;
}
export declare class SongStore {
    private readonly songDataRepository;
    currentSong: SongItem | null;
    isLoading: boolean;
    constructor(songDataRepository: ICloudSongDataRepository);
    get song(): Song;
    loadSong(cloudSong: CloudSong): Promise<void>;
}
