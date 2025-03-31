import { SynthEvent } from "@ryohey/wavelet";
import { PlayerEvent } from "./PlayerEvent.js";
export declare const toSynthEvents: (events: PlayerEvent[], timebase: number, sampleRate: number) => SynthEvent[];
