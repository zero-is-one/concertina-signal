import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Midi } from "tonal"
import {
  findClosestButtonAmongSet,
  isNoteNameEqual,
} from "../../../concertina/concertina"
import { instruments } from "../../../concertina/instruments"
import { useStores } from "../../../hooks/useStores"
import { isNoteEvent } from "../../../track"
import { RenderCooverNotation } from "./RenderCooverNotation"
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

    // if a note is repeated, keep the button that is farthest from any other button
    namesInRange.forEach((name) => {
      if (!canBePlayed) return

      // what are the repeated buttons on the instrument
      const repeatedButtons = strokes.filter((stroke) => {
        return isNoteNameEqual(
          instrument.layout[stroke.index][stroke.action],
          name,
        )
      })

      if (repeatedButtons.length <= 1) return // no repeats

      const closestButtonsMap = repeatedButtons.map((button) => {
        return {
          button,
          closestButton: findClosestButtonAmongSet(
            instrument,
            button.index,
            strokes
              .map((b) => b.index)
              .filter((i) => !repeatedButtons.map((b) => b.index).includes(i)),
          ),
        }
      })

      //select the button that is farthest from any button
      const farthestButton = closestButtonsMap.reduce((acc, curr) => {
        return acc.closestButton.distance > curr.closestButton.distance
          ? acc
          : curr
      })

      // keep the farthest button and remove the rest
      const buttonsToRemove = repeatedButtons.filter(
        (button) => button.index !== farthestButton.button.index,
      )

      buttonsToRemove.forEach((button) => {
        const index = strokes.findIndex(
          (stroke) => stroke.index === button.index,
        )
        strokes.splice(index, 1)
      })
    })

    prevDesiredAction = desiredAction || "push"

    // get the lowest track that is not a conductor
    const melodyTrackIndex = song.tracks.findIndex(
      (track) => track.isConductorTrack === false,
    )

    // const mainStroke = song.tracks[0]
    // //.events.filter(isNoteEvent)
    // // .map((noteEvent) => {
    // //   const rect = transform.getRect(noteEvent)
    // //   return {
    // //     rect,
    // //     noteEvent,
    // //   }
    // // })
    // // .find((noteInfo) => {
    // //   return (
    // //     noteInfo.rect.x <= cursorX &&
    // //     cursorX <= noteInfo.rect.x + noteInfo.rect.width
    // //   )
    // // })

    // get the noteInfo of the note with the lowest trackIndex
    const mainNoteInfo = noteInfos.find(
      (noteInfo) => noteInfo.trackIndex === melodyTrackIndex,
    )

    const mainStrokeForCoover = strokes.find((stroke) => {
      return (
        mainNoteInfo &&
        isNoteNameEqual(
          instrument.layout[stroke.index][stroke.action],
          Midi.midiToNoteName(mainNoteInfo.noteEvent.noteNumber),
        )
      )
    })

    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <RenderInstrument instrument={instrument} strokes={strokes} />
        <RenderCooverNotation
          mainStroke={mainStrokeForCoover}
          strokes={strokes}
          instrument={instrument}
        />

        <div>
          {names.join(",")}
          <br />
          {!canBePlayed && <b style={{ color: "red" }}>cant be played</b>}
          <br />
          {canBePlayedWithAllPush ? "can be played with all push" : ""}
          <br />
          {canBePlayedWithAllPull ? "can be played with all pull" : ""}
        </div>
      </div>
    )
  },
)
