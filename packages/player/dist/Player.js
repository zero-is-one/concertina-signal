import range from "lodash/range.js";
import throttle from "lodash/throttle.js";
import { MIDIControlEvents } from "midifile-ts";
import { computed, makeObservable, observable } from "mobx";
import { EventScheduler } from "./EventScheduler.js";
import { controllerMidiEvent } from "./MidiEventFactory.js";
const TIMER_INTERVAL = 50;
const LOOK_AHEAD_TIME = 50;
export const DEFAULT_TEMPO = 120;
export class Player {
    output;
    eventSource;
    scheduler = null;
    interval = null;
    _currentTempo = DEFAULT_TEMPO;
    _currentTick = 0;
    _isPlaying = false;
    disableSeek = false;
    loop = null;
    constructor(output, eventSource) {
        this.output = output;
        this.eventSource = eventSource;
        makeObservable(this, {
            _currentTick: observable,
            _isPlaying: observable,
            loop: observable,
            position: computed,
            isPlaying: computed,
        });
    }
    play() {
        if (this.isPlaying) {
            console.warn("called play() while playing. aborted.");
            return;
        }
        this.scheduler = new EventScheduler((startTick, endTick) => this.eventSource.getEvents(startTick, endTick), () => this.allNotesOffEvents(), this._currentTick, this.eventSource.timebase, TIMER_INTERVAL + LOOK_AHEAD_TIME);
        this._isPlaying = true;
        this.output.activate();
        this.interval = window.setInterval(() => this._onTimer(), TIMER_INTERVAL);
        this.output.activate();
    }
    set position(tick) {
        if (!Number.isInteger(tick)) {
            console.warn("Player.tick should be an integer", tick);
        }
        if (this.disableSeek) {
            return;
        }
        tick = Math.min(Math.max(Math.floor(tick), 0), this.eventSource.endOfSong);
        if (this.scheduler) {
            this.scheduler.seek(tick);
        }
        this._currentTick = tick;
        if (this.isPlaying) {
            this.allSoundsOff();
        }
        this.sendCurrentStateEvents();
    }
    get position() {
        return this._currentTick;
    }
    get isPlaying() {
        return this._isPlaying;
    }
    get numberOfChannels() {
        return 0xf;
    }
    allSoundsOffChannel(ch) {
        this.sendEvent(controllerMidiEvent(0, ch, MIDIControlEvents.ALL_SOUNDS_OFF, 0));
    }
    allSoundsOff() {
        for (const ch of range(0, this.numberOfChannels)) {
            this.allSoundsOffChannel(ch);
        }
    }
    allSoundsOffExclude(channel) {
        for (const ch of range(0, this.numberOfChannels)) {
            if (ch !== channel) {
                this.allSoundsOffChannel(ch);
            }
        }
    }
    allNotesOffEvents() {
        return range(0, this.numberOfChannels).map((ch) => ({
            ...controllerMidiEvent(0, ch, MIDIControlEvents.ALL_NOTES_OFF, 0),
            trackId: -1, // do not mute
        }));
    }
    resetControllers() {
        for (const ch of range(0, this.numberOfChannels)) {
            this.sendEvent(controllerMidiEvent(0, ch, MIDIControlEvents.RESET_CONTROLLERS, 0x7f));
        }
    }
    stop() {
        this.scheduler = null;
        this.allSoundsOff();
        this._isPlaying = false;
        if (this.interval !== null) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    reset() {
        this.resetControllers();
        this.stop();
        this._currentTick = 0;
    }
    /*
     to restore synthesizer state (e.g. pitch bend)
     collect all previous state events
     and send them to the synthesizer
    */
    sendCurrentStateEvents() {
        this.eventSource.getCurrentStateEvents(this._currentTick).forEach((e) => {
            this.applyPlayerEvent(e);
            this.sendEvent(e);
        });
    }
    get currentTempo() {
        return this._currentTempo;
    }
    set currentTempo(value) {
        this._currentTempo = value;
    }
    // delayTime: seconds, timestampNow: milliseconds
    sendEvent(event, delayTime = 0, timestampNow = performance.now(), trackId) {
        this.output.sendEvent(event, delayTime, timestampNow, trackId);
    }
    syncPosition = throttle(() => {
        if (this.scheduler !== null) {
            this._currentTick = this.scheduler.scheduledTick;
        }
    }, 50);
    applyPlayerEvent(e) {
        if (e.type !== "channel" && "subtype" in e) {
            switch (e.subtype) {
                case "setTempo":
                    this._currentTempo = 60000000 / e.microsecondsPerBeat;
                    break;
                default:
                    break;
            }
        }
    }
    _onTimer() {
        if (this.scheduler === null) {
            return;
        }
        const timestamp = performance.now();
        this.scheduler.loop =
            this.loop !== null && this.loop.enabled ? this.loop : null;
        const events = this.scheduler.readNextEvents(this._currentTempo, timestamp);
        events.forEach(({ event: e, timestamp: time }) => {
            if (e.type === "channel") {
                const delayTime = (time - timestamp) / 1000;
                this.sendEvent(e, delayTime, timestamp, e.trackId);
            }
            else {
                this.applyPlayerEvent(e);
            }
        });
        if (this.scheduler.scheduledTick >= this.eventSource.endOfSong) {
            this.stop();
        }
        this.syncPosition();
    }
    // convenience methods
    playOrPause() {
        if (this.isPlaying) {
            this.stop();
        }
        else {
            this.play();
        }
    }
    setLoopBegin(tick) {
        this.loop = {
            end: Math.max(tick, this.loop?.end ?? tick),
            enabled: this.loop?.enabled ?? false,
            begin: tick,
        };
    }
    setLoopEnd(tick) {
        this.loop = {
            begin: Math.min(tick, this.loop?.begin ?? tick),
            enabled: this.loop?.enabled ?? false,
            end: tick,
        };
    }
    toggleEnableLoop() {
        if (this.loop === null) {
            return;
        }
        this.loop = { ...this.loop, enabled: !this.loop.enabled };
    }
}
//# sourceMappingURL=Player.js.map