import { addTick } from "../helpers/addTick.js";
import { getEndOfTrack } from "../track/Track.js";
export class Song {
    timebase;
    endOfSong;
    tracks;
    constructor(midi) {
        this.timebase = midi.header.ticksPerBeat;
        this.tracks = midi.tracks.map((track) => {
            const events = addTick(track);
            const endOfTrack = getEndOfTrack(events);
            return { events, endOfTrack };
        });
        this.endOfSong = this.tracks
            .map((track) => track.endOfTrack)
            .reduce((a, b) => Math.max(a, b), 0);
    }
}
export const emptySong = () => new Song({
    header: { ticksPerBeat: 480 },
    tracks: [],
});
//# sourceMappingURL=Song.js.map