import { DistributiveOmit } from "@emotion/react";
import { AnyEvent } from "midifile-ts";
export type TrackEventOf<T> = DistributiveOmit<T, "deltaTime"> & {
    tick: number;
};
export type TrackEvent = TrackEventOf<AnyEvent>;
export interface Track {
    events: TrackEvent[];
    endOfTrack: number;
}
interface Midi {
    header: {
        ticksPerBeat: number;
    };
    tracks: AnyEvent[][];
}
export declare class Song {
    readonly timebase: number;
    readonly endOfSong: number;
    readonly tracks: Track[];
    constructor(midi: Midi);
}
export declare const emptySong: () => Song;
export {};
