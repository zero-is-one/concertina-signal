import { cloneDeep } from "lodash"
import { ControllerEvent, MIDIControlEvents, PitchBendEvent } from "midifile-ts"
import { computed, makeObservable, observable } from "mobx"
import { makePersistable } from "mobx-persist-store"
import { ValueEventType } from "../entities/event/ValueEventType"
import { ControlSelection } from "../entities/selection/ControlSelection"
import {
  TrackEventOf,
  isControllerEventWithType,
  isPitchBendEvent,
} from "../track"
import PianoRollStore from "./PianoRollStore"

export type ControlMode =
  | { type: "velocity" }
  | { type: "concertina" }
  | ValueEventType

export const controlModeKey = (controlMode: ControlMode) => {
  switch (controlMode.type) {
    case "concertina":
      return "concertina"
    case "velocity":
      return "velocity"
    case "pitchBend":
      return "pitchBend"
    case "controller":
      return `controller-${controlMode.controllerType}`
  }
}

export const isEqualControlMode = (a: ControlMode, b: ControlMode) => {
  switch (a.type) {
    case "concertina":
    case "velocity":
    case "pitchBend":
      return a.type === b.type
    case "controller":
      switch (b.type) {
        case "concertina":
        case "velocity":
        case "pitchBend":
          return false
        case "controller":
          return ValueEventType.equals(a, b)
      }
  }
}

export type SerializedControlStore = Pick<ControlStore, "controlModes">

export const defaultControlModes: ControlMode[] = [
  {
    type: "concertina",
  },
  {
    type: "velocity",
  },
  {
    type: "pitchBend",
  },
  {
    type: "controller",
    controllerType: MIDIControlEvents.MSB_MAIN_VOLUME,
  },
  {
    type: "controller",
    controllerType: MIDIControlEvents.MSB_PAN,
  },
  {
    type: "controller",
    controllerType: MIDIControlEvents.MSB_EXPRESSION,
  },
  {
    type: "controller",
    controllerType: MIDIControlEvents.SUSTAIN,
  },
  {
    type: "controller",
    controllerType: MIDIControlEvents.MSB_MODWHEEL,
  },
]

export class ControlStore {
  controlMode: ControlMode = { type: "concertina" }
  selection: ControlSelection | null = null
  selectedEventIds: number[] = []

  controlModes: ControlMode[] = defaultControlModes

  constructor(private readonly pianoRollStore: PianoRollStore) {
    makeObservable(this, {
      controlMode: observable,
      selection: observable,
      selectedEventIds: observable,
      controlModes: observable,
      scrollLeft: computed,
      cursorX: computed,
      transform: computed,
      rulerStore: computed,
      selectedTrack: computed,
      quantizer: computed,
      mouseMode: computed,
      cursor: computed,
    })

    makePersistable(this, {
      name: "ControlStore",
      properties: ["controlModes"],
      storage: window.localStorage,
    })
  }

  serialize(): SerializedControlStore {
    return {
      controlModes: cloneDeep(this.controlModes),
    }
  }

  restore(serialized: SerializedControlStore) {
    this.controlModes = serialized.controlModes
  }

  get controlValueEvents(): (
    | TrackEventOf<ControllerEvent>
    | TrackEventOf<PitchBendEvent>
  )[] {
    const { controlMode } = this
    switch (controlMode.type) {
      case "concertina":
        throw new Error("don't use this method for concertina")
      case "velocity":
        throw new Error("don't use this method for velocity")
      case "pitchBend":
        return this.pianoRollStore.filteredEvents(isPitchBendEvent)
      case "controller":
        return this.pianoRollStore.filteredEvents(
          isControllerEventWithType(controlMode.controllerType),
        )
    }
  }

  get scrollLeft() {
    return this.pianoRollStore.scrollLeft
  }

  get cursorX() {
    return this.pianoRollStore.cursorX
  }

  get transform() {
    return this.pianoRollStore.transform
  }

  get rulerStore() {
    return this.pianoRollStore.rulerStore
  }

  get selectedTrack() {
    return this.pianoRollStore.selectedTrack
  }

  get quantizer() {
    return this.pianoRollStore.quantizer
  }

  get mouseMode() {
    return this.pianoRollStore.mouseMode
  }

  get cursor() {
    return this.pianoRollStore.controlCursor
  }
}
