export type SchedulableEvent = {
    tick: number;
};
export interface EventSchedulerLoop {
    begin: number;
    end: number;
}
type WithTimestamp<E> = {
    event: E;
    timestamp: number;
};
/**
 * Class for reading chronological events.
 * Perform lookahead to schedule accurately.
 * https://www.html5rocks.com/ja/tutorials/audio/scheduling/
 */
export declare class EventScheduler<E extends SchedulableEvent> {
    lookAheadTime: number;
    timebase: number;
    loop: EventSchedulerLoop | null;
    private _currentTick;
    private _scheduledTick;
    private _prevTime;
    private _getEvents;
    private _createLoopEndEvents;
    constructor(getEvents: (startTick: number, endTick: number) => E[], createLoopEndEvents: () => Omit<E, "tick">[], tick?: number, timebase?: number, lookAheadTime?: number);
    get scheduledTick(): number;
    millisecToTick(ms: number, bpm: number): number;
    seek(tick: number): void;
    readNextEvents(bpm: number, timestamp: number): WithTimestamp<E>[];
}
export {};
