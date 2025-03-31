import { SendableEvent, SynthOutput } from "./SynthOutput.js";
export declare class SoundFontSynth implements SynthOutput {
    private readonly context;
    private synth;
    private _loadedSoundFontData;
    get loadedSoundFontData(): ArrayBuffer | null;
    get isLoaded(): boolean;
    private sequenceNumber;
    constructor(context: AudioContext);
    setup(): Promise<void>;
    loadSoundFontFromURL(url: string): Promise<void>;
    loadSoundFont(data: ArrayBuffer): Promise<void>;
    private postSynthMessage;
    sendEvent(event: SendableEvent, delayTime?: number): void;
    activate(): void;
}
