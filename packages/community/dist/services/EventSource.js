import maxBy from "lodash/maxBy.js";
import uniq from "lodash/uniq.js";
import { isNotUndefined } from "../helpers/array.js";
import { isControllerEvent, isControllerEventWithType, isPitchBendEvent, isProgramChangeEvent, isSetTempoEvent, } from "../song/identify.js";
export const isEventInRange = (startTick, endTick) => (e) => e.tick >= startTick && e.tick < endTick;
export class EventSource {
    songProvider;
    constructor(songProvider) {
        this.songProvider = songProvider;
    }
    get timebase() {
        return this.songProvider.song.timebase;
    }
    get endOfSong() {
        return this.songProvider.song.endOfSong;
    }
    getEvents(startTick, endTick) {
        return this.songProvider.song.tracks.flatMap((track) => track.events.filter(isEventInRange(startTick, endTick)).map((event) => ({
            ...event,
            trackId: -1,
        })));
    }
    getCurrentStateEvents(tick) {
        return this.songProvider.song.tracks.flatMap((t) => {
            const statusEvents = getStatusEvents(t.events, tick);
            return statusEvents.map((e) => ({
                ...e,
                trackId: -1,
            }));
        });
    }
}
export const getLast = (events) => maxBy(events, (e) => e.tick);
export const isTickBefore = (tick) => (e) => e.tick <= tick;
// collect events which will be retained in the synthesizer
const getStatusEvents = (events, tick) => {
    const controlEvents = events
        .filter(isControllerEvent)
        .filter(isTickBefore(tick));
    // remove duplicated control types
    const recentControlEvents = uniq(controlEvents.map((e) => e.controllerType))
        .map((type) => getLast(controlEvents.filter(isControllerEventWithType(type))))
        .filter(isNotUndefined);
    const setTempo = getLast(events.filter(isSetTempoEvent).filter(isTickBefore(tick)));
    const programChange = getLast(events.filter(isProgramChangeEvent).filter(isTickBefore(tick)));
    const pitchBend = getLast(events.filter(isPitchBendEvent).filter(isTickBefore(tick)));
    return [...recentControlEvents, setTempo, programChange, pitchBend].filter(isNotUndefined);
};
//# sourceMappingURL=EventSource.js.map