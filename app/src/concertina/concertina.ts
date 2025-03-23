import { Midi } from "tonal"
import { instruments } from "./instruments"
import { ButtonPosition, Instrument, InstrumentId } from "./types"

export const getNoteActionType = (
  note: string,
  instrument: InstrumentId = "cg-wheatstone-30",
) => {
  const layout = instruments[instrument].layout

  const actions: string[] = []

  layout.forEach((noteAction) => {
    if (isNoteNameEqual(noteAction.push, note)) {
      actions.push("push")
    }

    if (isNoteNameEqual(noteAction.pull, note)) {
      actions.push("pull")
    }
  })

  //return push, pull, both or undefined

  if (actions.includes("push") && actions.includes("pull")) {
    return "both"
  } else if (actions.includes("push")) {
    return "push"
  } else if (actions.includes("pull")) {
    return "pull"
  }
}

export const isNoteNameEqual = (note1: string, note2: string) => {
  return Midi.toMidi(note1) === Midi.toMidi(note2)
}

export const buttonIndexToRowCol = (
  instrument: Instrument,
  index: number,
): ButtonPosition => {
  let row = 0
  let col = -1
  let i = 0

  for (const button of instrument.layout) {
    if (button.newRow) {
      row++
      col = 0
    } else {
      col++
    }
    if (i === index) {
      return { row, col }
    }
    i++
  }

  throw new Error("Index out of bounds")
}

export const findClosestButtonAmongSet = (
  instrument: Instrument,
  index: number,
  indices: number[],
) => {
  const position = buttonIndexToRowCol(instrument, index)
  let closestIndex = -1
  let closestDistance = Infinity

  instrument.layout.forEach((_, i) => {
    if (!indices.includes(i)) return

    const buttonPosition = buttonIndexToRowCol(instrument, i)
    const distance =
      Math.abs(position.row - buttonPosition.row) +
      Math.abs(position.col - buttonPosition.col) // manhattan distance
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = i
    }
  })

  return {
    index: closestIndex,
    distance: closestDistance,
  }
}
