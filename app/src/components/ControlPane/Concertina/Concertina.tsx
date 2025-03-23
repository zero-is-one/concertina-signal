import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Midi } from "tonal"
import { isNoteNameEqual } from "../../../concertina/concertina"
import { instruments } from "../../../concertina/instruments"
import { useStores } from "../../../hooks/useStores"
import { isNoteEvent } from "../../../track"
import { RenderInstrument, Stroke } from "./RenderInstrument"

const instrument = instruments["cg-wheatstone-30"]

let prevDesiredAction: Stroke["action"] | null = "push"

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

    const namesInRange = names.filter((name) => {
      return instrument.layout.some((btn) => {
        return (
          isNoteNameEqual(btn.push, name) || isNoteNameEqual(btn.pull, name)
        )
      })
    })

    const canBePlayedWithAllPush = namesInRange.every((name) =>
      instrument.layout.some((btn) => isNoteNameEqual(btn.push, name)),
    )

    const canBePlayedWithAllPull = namesInRange.every((name) =>
      instrument.layout.some((btn) => isNoteNameEqual(btn.pull, name)),
    )

    const canBePlayed = canBePlayedWithAllPush || canBePlayedWithAllPull
    const canBePlayedWithBoth = canBePlayedWithAllPush && canBePlayedWithAllPull

    const desiredAction = !canBePlayed
      ? null
      : canBePlayedWithBoth
        ? prevDesiredAction
        : canBePlayedWithAllPush
          ? "push"
          : "pull"

    const possibleStrokes: Stroke[] = names
      .map((name) => {
        return instrument.layout.map((btn, i) => [
          isNoteNameEqual(btn.push, name)
            ? { index: i, action: "push" as const }
            : null,
          isNoteNameEqual(btn.pull, name)
            ? { index: i, action: "pull" as const }
            : null,
        ])
      })
      .flat(2)
      .filter((stroke) => stroke !== null)

    const strokes = possibleStrokes.filter(
      (stroke) => stroke.action === desiredAction || !desiredAction,
    )

    prevDesiredAction = desiredAction

    console.log({
      names,
      namesInRange,
      canBePlayedWithAllPush,
      canBePlayedWithAllPull,
      canBePlayedWithBoth,
      desiredAction,
      strokes,
    })

    return (
      <div>
        <RenderInstrument instrument={instrument} strokes={strokes} />
        {names.join(",")}
        <br />
        {!canBePlayed && <b style={{ color: "red" }}>cant be played</b>}
        <br />
        {canBePlayedWithAllPush ? "can be played with all push" : ""}
        <br />
        {canBePlayedWithAllPull ? "can be played with all pull" : ""}
      </div>
    )
  },
)
