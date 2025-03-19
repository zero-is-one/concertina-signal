import { MIDIControlEventNames, MIDIControlEvents } from "midifile-ts"
import { FC } from "react"
import { Localized } from "../../localize/useLocalization"
import { ControlMode } from "../../stores/ControlStore"

export const ControlName: FC<{ mode: ControlMode }> = ({ mode }) => {
  switch (mode.type) {
    case "concertina":
      return "Concertina"
    case "velocity":
      return <Localized name="velocity" />
    case "pitchBend":
      return <Localized name="pitch-bend" />
    case "controller":
      switch (mode.controllerType) {
        case MIDIControlEvents.MSB_MAIN_VOLUME:
          return <Localized name="volume" />
        case MIDIControlEvents.MSB_PAN:
          return <Localized name="panpot" />
        case MIDIControlEvents.MSB_EXPRESSION:
          return <Localized name="expression" />
        case MIDIControlEvents.SUSTAIN:
          return <Localized name="hold-pedal" />
        default:
          return (
            <>
              {MIDIControlEventNames[mode.controllerType] === "Undefined"
                ? `CC${mode.controllerType}`
                : MIDIControlEventNames[mode.controllerType]}
            </>
          )
      }
  }
}
