import { IEventSource, PlayerEvent, SendableEvent } from "@signal-app/player";
import { Song } from "../song/Song.js";
export declare const isEventInRange: <T extends {
    tick: number;
}>(startTick: number, endTick: number) => (e: T) => boolean;
export declare class EventSource implements IEventSource {
    private readonly songProvider;
    constructor(songProvider: {
        song: Song;
    });
    get timebase(): number;
    get endOfSong(): number;
    getEvents(startTick: number, endTick: number): PlayerEvent[];
    getCurrentStateEvents(tick: number): SendableEvent[];
}
export declare const getLast: <T extends {
    tick: number;
}>(events: T[]) => T | undefined;
export declare const isTickBefore: (tick: number) => <T extends {
    tick: number;
}>(e: T) => boolean;
