import { Player, SoundFontSynth } from "@signal-app/player";
import { AuthStore } from "./AuthStore.js";
import { CommunitySongStore } from "./CommunitySongStore.js";
import RootViewStore from "./RootViewStore.js";
import { SongStore } from "./SongStore.js";
export default class RootStore {
    readonly userRepository: import("@signal-app/api").IUserRepository;
    readonly cloudSongRepository: import("@signal-app/api").ICloudSongRepository;
    readonly cloudSongDataRepository: import("@signal-app/api").ICloudSongDataRepository;
    readonly songStore: SongStore;
    readonly authStore: AuthStore;
    readonly communitySongStore: CommunitySongStore;
    readonly rootViewStore: RootViewStore;
    readonly player: Player;
    readonly synth: SoundFontSynth;
    constructor();
}
