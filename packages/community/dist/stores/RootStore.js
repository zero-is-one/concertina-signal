import { createCloudSongDataRepository, createCloudSongRepository, createUserRepository, } from "@signal-app/api";
import { Player, SoundFontSynth } from "@signal-app/player";
import { auth, firestore } from "../firebase/firebase.js";
import { EventSource } from "../services/EventSource.js";
import { AuthStore } from "./AuthStore.js";
import { CommunitySongStore } from "./CommunitySongStore.js";
import RootViewStore from "./RootViewStore.js";
import { SongStore } from "./SongStore.js";
export default class RootStore {
    userRepository = createUserRepository(firestore, auth);
    cloudSongRepository = createCloudSongRepository(firestore, auth);
    cloudSongDataRepository = createCloudSongDataRepository(firestore, auth);
    songStore = new SongStore(this.cloudSongDataRepository);
    authStore = new AuthStore(this.userRepository);
    communitySongStore = new CommunitySongStore();
    rootViewStore = new RootViewStore();
    player;
    synth;
    constructor() {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        this.synth = new SoundFontSynth(context);
        const eventSource = new EventSource(this.songStore);
        this.player = new Player(this.synth, eventSource);
    }
}
//# sourceMappingURL=RootStore.js.map