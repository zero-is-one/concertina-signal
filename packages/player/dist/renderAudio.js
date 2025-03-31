import { audioDataToAudioBuffer, getSampleEventsFromSoundFont, renderAudio as render, } from "@ryohey/wavelet";
import { toSynthEvents } from "./toSynthEvents.js";
export const renderAudio = async (soundFontData, events, timebase, sampleRate, options) => {
    const sampleEvents = getSampleEventsFromSoundFont(new Uint8Array(soundFontData));
    const synthEvents = toSynthEvents(events, timebase, sampleRate);
    const samples = sampleEvents.map((e) => e.event);
    const audioData = await render(samples, synthEvents, {
        sampleRate,
        bufferSize: options.bufferSize,
        cancel: options.cancel,
        waitForEventLoop: options.waitForEventLoop,
        onProgress: options.onProgress,
    });
    return audioDataToAudioBuffer(audioData);
};
//# sourceMappingURL=renderAudio.js.map