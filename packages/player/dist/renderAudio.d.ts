import { PlayerEvent } from "./PlayerEvent.js";
export declare const renderAudio: (soundFontData: ArrayBuffer, events: PlayerEvent[], timebase: number, sampleRate: number, options: {
    bufferSize: number;
    cancel?: () => boolean;
    waitForEventLoop?: () => Promise<void>;
    onProgress?: (numFrames: number, totalFrames: number) => void;
}) => Promise<AudioBuffer>;
