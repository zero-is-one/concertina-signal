import { CloudSong } from "@signal-app/api";
import RootStore from "../stores/RootStore.js";
export declare const playSong: ({ songStore, player, cloudSongRepository, synth }: RootStore) => (song: CloudSong) => Promise<void>;
export declare const playPreviousSong: (rootStore: RootStore) => () => Promise<void>;
export declare const playNextSong: (rootStore: RootStore) => () => Promise<void>;
