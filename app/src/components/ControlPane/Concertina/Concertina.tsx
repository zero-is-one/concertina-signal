import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Midi } from "tonal"
import { instruments, isNoteNameEqual } from "../../../concertina/concertina"
import { useStores } from "../../../hooks/useStores"
import { isNoteEvent } from "../../../track"
import { RenderInstrument, Stroke } from "./RenderInstrument"

const instrument = instruments["cg-wheatstone-30"]

let prevActionType = "push"

export const Concertina: FC<{ width: number; height: number }> = observer(
  ({ width, height }) => {
    const {
      song,
      pianoRollStore: {
        selectedTrack,
        transform,
        scrollLeft,
        windowedEvents,
        rulerStore: { beats },
        selectedNoteIds,
        cursorX,
        allNotes,
        notes,
      },
    } = useStores()

    const noteInfos = song.tracks
      .flatMap((track, i) => {
        //get all notes from all tracks, add trackId to each note
        return track.events
          .filter(isNoteEvent)
          .map((noteEvent) => ({ noteEvent, track: track, trackIndex: i }))
      })
      .map((n) => {
        // get the noteEvent and its rect
        const rect = transform.getRect(n.noteEvent)
        return {
          rect,
          ...n,
        }
      })
      .filter((noteInfo) => {
        // filter notes that are at the cursor
        return (
          noteInfo.rect.x <= cursorX &&
          cursorX <= noteInfo.rect.x + noteInfo.rect.width
        )
      })

    const names = noteInfos.map((note) =>
      Midi.midiToNoteName(note.noteEvent.noteNumber),
    )

    console.log({ noteInfos, names, cursorX })

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

      if (pushButtons.length > 0 && pullButtons.length === 0) {
        requiresPush = true
      }
      if (pushButtons.length === 0 && pullButtons.length > 0) {
        requiresPull = true
      }
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
