export const isProgramChangeEvent = (e) => "subtype" in e && e.subtype === "programChange";
export const isPitchBendEvent = (e) => "subtype" in e && e.subtype === "pitchBend";
export const isEndOfTrackEvent = (e) => "subtype" in e && e.subtype === "endOfTrack";
export const isSetTempoEvent = (e) => "subtype" in e && e.subtype === "setTempo";
export const isTimeSignatureEvent = (e) => "subtype" in e && e.subtype === "timeSignature";
export const isControllerEvent = (e) => "subtype" in e && e.subtype === "controller";
export const isControllerEventWithType = (controllerType) => (e) => isControllerEvent(e) && e.controllerType === controllerType;
export const isVolumeEvent = isControllerEventWithType(7);
export const isPanEvent = isControllerEventWithType(10);
export const isModulationEvent = isControllerEventWithType(1);
export const isExpressionEvent = isControllerEventWithType(0x0b);
export const isSequencerSpecificEvent = (e) => "subtype" in e && e.subtype === "sequencerSpecific";
//# sourceMappingURL=identify.js.map