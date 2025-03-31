import { read } from "midifile-ts";
import { computed, makeObservable, observable } from "mobx";
import { Song, emptySong } from "../song/Song.js";
export class SongStore {
    songDataRepository;
    currentSong = null;
    isLoading = false;
    constructor(songDataRepository) {
        this.songDataRepository = songDataRepository;
        makeObservable(this, {
            song: computed,
            currentSong: observable,
            isLoading: observable,
        });
    }
    get song() {
        return this.currentSong?.song ?? emptySong();
    }
    async loadSong(cloudSong) {
        this.isLoading = true;
        const songData = await this.songDataRepository.get(cloudSong.songDataId);
        const song = new Song(read(songData));
        this.currentSong = {
            song,
            metadata: cloudSong,
        };
        this.isLoading = false;
    }
}
//# sourceMappingURL=SongStore.js.map