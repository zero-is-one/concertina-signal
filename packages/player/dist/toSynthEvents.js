import { tickToMillisec } from "./tick.js";
export const toSynthEvents = (events, timebase, sampleRate) => {
    events = events.sort((a, b) => a.tick - b.tick);
    let keyframe = {
        tick: 0,
        bpm: 120,
        timestamp: 0,
    };
    const synthEvents = [];
    for (const e of events) {
        const timestamp = tickToMillisec(e.tick - keyframe.tick, keyframe.bpm, timebase) +
            keyframe.timestamp;
        const delayTime = (timestamp / 1000) * sampleRate;
        switch (e.type) {
            case "channel":
                synthEvents.push({
                    type: "midi",
                    midi: e,
                    delayTime,
                });
            case "meta":
                switch (e.subtype) {
                    case "setTempo":
                        keyframe = {
                            tick: e.tick,
                            bpm: (60 * 1000000) / e.microsecondsPerBeat,
                            timestamp,
                        };
                        break;
                }
        }
    }
    return synthEvents;
};
//# sourceMappingURL=toSynthEvents.js.map