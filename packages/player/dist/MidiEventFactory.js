export function controllerMidiEvent(deltaTime, channel, controllerType, value) {
    return {
        deltaTime,
        type: "channel",
        subtype: "controller",
        channel,
        controllerType,
        value,
    };
}
//# sourceMappingURL=MidiEventFactory.js.map