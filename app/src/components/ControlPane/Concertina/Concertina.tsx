import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Midi } from "tonal"
import { instruments, isNoteNameEqual } from "../../../concertina/concertina"
import { useStores } from "../../../hooks/useStores"
import { isNoteEvent, NoteEvent } from "../../../track"
import { RenderInstrument, Stroke } from "./RenderInstrument"

const instrument = instruments["cg-wheatstone-30"]

let prevActionType = "push"

export const Concertina: FC<{ width: number; height: number }> = observer(
  ({ width, height }) => {
    const {
      pianoRollStore: {
        selectedTrack,
        transform,
        scrollLeft,
        windowedEvents,
        rulerStore: { beats },
        selectedNoteIds,
        cursorX,
        allNotes,
      },
    } = useStores()

    const notesInOrAtCursor = allNotes.filter((note) => {
      return note.x <= cursorX && cursorX <= note.x + note.width
    })

    const notes = notesInOrAtCursor
      .map((note) => selectedTrack?.getEventById(note.id) as NoteEvent)
      .filter((note) => isNoteEvent(note))

    console.log({ notes })

    const names = notes.map((note) => Midi.midiToNoteName(note.noteNumber))

    console.log({ cursorX, selectedNoteIds, allNotes, notes, names })

    let requiresPull = false
    let requiresPush = false
    let strokes: Stroke[] = []

    names.forEach((name) => {
      const pushButtons: Stroke[] = []
      const pullButtons: Stroke[] = []

      instrument.layout.forEach((btn, i) => {
        if (isNoteNameEqual(btn.push, name)) {
          pushButtons.push({ index: i, action: "push" })
        } else if (isNoteNameEqual(btn.pull, name)) {
          pullButtons.push({ index: i, action: "pull" })
        }
      })

      strokes.push(...pushButtons, ...pullButtons)

      console.log({ name, pushButtons, pullButtons })

      if (pushButtons.length > 0 && pullButtons.length === 0) {
        requiresPush = true
      }
      if (pushButtons.length === 0 && pullButtons.length > 0) {
        requiresPull = true
      }
    })

    console.log({
      cursorX,
      selectedNoteIds,
      allNotes,
      notes,
      names,
      requiresPush,
      requiresPull,
    })

    if (!requiresPull && !requiresPush) {
      requiresPush = prevActionType === "push"
      requiresPull = prevActionType === "pull"
    }

    if (!requiresPush && requiresPull) {
      strokes = strokes.filter((stroke) => stroke.action !== "push")
      prevActionType = "pull"
    }

    if (!requiresPull && requiresPush) {
      strokes = strokes.filter((stroke) => stroke.action !== "pull")
      prevActionType = "push"
    }

    return (
      <div>
        <RenderInstrument instrument={instrument} strokes={strokes} />
        {names.join(",")}
        <br />
        dd
        {requiresPull && "requires pull"}
        {requiresPush && "requires push"}
      </div>
    )
  },
)
