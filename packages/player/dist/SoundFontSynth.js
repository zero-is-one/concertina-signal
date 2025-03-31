import { getSampleEventsFromSoundFont } from "@ryohey/wavelet";
export class SoundFontSynth {
    context;
    synth = null;
    _loadedSoundFontData = null;
    get loadedSoundFontData() {
        return this._loadedSoundFontData;
    }
    get isLoaded() {
        return this._loadedSoundFontData !== null;
    }
    sequenceNumber = 0;
    constructor(context) {
        this.context = context;
    }
    async setup() {
        const url = new URL("@ryohey/wavelet/dist/processor.js", import.meta.url);
        await this.context.audioWorklet.addModule(url);
    }
    async loadSoundFontFromURL(url) {
        const response = await fetch(url);
        const data = await response.arrayBuffer();
        await this.loadSoundFont(data);
    }
    async loadSoundFont(data) {
        if (this.synth !== null) {
            this.synth.disconnect();
        }
        // create new node
        this.synth = new AudioWorkletNode(this.context, "synth-processor", {
            numberOfInputs: 0,
            outputChannelCount: [2],
        });
        this.synth.connect(this.context.destination);
        this.sequenceNumber = 0;
        const sampleEvents = getSampleEventsFromSoundFont(new Uint8Array(data));
        this._loadedSoundFontData = data;
        for (const e of sampleEvents) {
            this.postSynthMessage(e.event, e.transfer);
        }
    }
    postSynthMessage(e, transfer) {
        this.synth?.port.postMessage({ ...e, sequenceNumber: this.sequenceNumber++ }, transfer ?? []);
    }
    sendEvent(event, delayTime = 0) {
        this.postSynthMessage({
            type: "midi",
            midi: event,
            delayTime: delayTime * this.context.sampleRate,
        });
    }
    activate() {
        this.context.resume();
    }
}
//# sourceMappingURL=SoundFontSynth.js.map