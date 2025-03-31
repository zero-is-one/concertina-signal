export function tickToMillisec(tick, bpm, timebase) {
    return (tick / (timebase / 60) / bpm) * 1000;
}
//# sourceMappingURL=tick.js.map