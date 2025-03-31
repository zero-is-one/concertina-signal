import { PlayerEvent } from "./PlayerEvent.js";
import { SendableEvent, SynthOutput } from "./SynthOutput.js";
export interface LoopSetting {
    begin: number;
    end: number;
    enabled: boolean;
}
export declare const DEFAULT_TEMPO = 120;
export interface IEventSource {
    timebase: number;
    endOfSong: number;
    getEvents(startTick: number, endTick: number): PlayerEvent[];
    getCurrentStateEvents(tick: number): SendableEvent[];
}
export declare class Player {
    private readonly output;
    private readonly eventSource;
    private scheduler;
    private interval;
    private _currentTempo;
    private _currentTick;
    private _isPlaying;
    disableSeek: boolean;
    loop: LoopSetting | null;
    constructor(output: SynthOutput, eventSource: IEventSource);
    play(): void;
    set position(tick: number);
    get position(): number;
    get isPlaying(): boolean;
    get numberOfChannels(): number;
    allSoundsOffChannel(ch: number): void;
    allSoundsOff(): void;
    allSoundsOffExclude(channel: number): void;
    private allNotesOffEvents;
    private resetControllers;
    stop(): void;
    reset(): void;
    sendCurrentStateEvents(): void;
    get currentTempo(): number;
    set currentTempo(value: number);
    sendEvent(event: SendableEvent, delayTime?: number, timestampNow?: number, trackId?: number): void;
    private syncPosition;
    private applyPlayerEvent;
    private _onTimer;
    playOrPause(): void;
    setLoopBegin(tick: number): void;
    setLoopEnd(tick: number): void;
    toggleEnableLoop(): void;
}
