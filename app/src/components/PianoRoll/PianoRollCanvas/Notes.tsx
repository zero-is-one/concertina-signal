import { useTheme } from "@emotion/react"
import Color from "color"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Midi } from "tonal"
import { getNoteActionType } from "../../../concertina/concertina"
import { colorToVec4 } from "../../../gl/color"
import { useStores } from "../../../hooks/useStores"
import { NoteEvent } from "../../../track"
import { NoteCircles } from "./NoteCircles"
import { NoteRectangles } from "./NoteRectangles"

export const Notes: FC<{ zIndex: number }> = observer(({ zIndex }) => {
  const {
    pianoRollStore: { notes, selectedTrack },
  } = useStores()
  const theme = useTheme()

  if (selectedTrack === undefined) {
    return <></>
  }

  const baseColor = Color("yellow")
  const borderColor = colorToVec4(Color("#292B32"))
  const selectedColor = colorToVec4(baseColor.lighten(0.7))
  const backgroundColor = colorToVec4(Color(theme.backgroundColor))
  const baseColorVec4 = colorToVec4(baseColor)

  const eventNotes = notes.map(
    (note) => selectedTrack?.getEventById(note.id) as NoteEvent,
  )

  const notesWithConcertinaColor = notes.map((note, i) => {
    const colorId = {
      push: 1,
      pull: 2,
      both: 3,
      undefined: 0,
    }[
      getNoteActionType(Midi.midiToNoteName(eventNotes[i].noteNumber)) ||
        "undefined"
    ]

    return {
      ...note,
      colorId,
    }
  })

  return (
    <>
      {selectedTrack.isRhythmTrack && (
        <NoteCircles
          strokeColor={borderColor}
          rects={notesWithConcertinaColor}
          inactiveColor={backgroundColor}
          activeColor={baseColorVec4}
          selectedColor={selectedColor}
          zIndex={zIndex}
        />
      )}
      {!selectedTrack.isRhythmTrack && (
        <NoteRectangles
          strokeColor={borderColor}
          inactiveColor={backgroundColor}
          activeColor={baseColorVec4}
          selectedColor={selectedColor}
          rects={notesWithConcertinaColor}
          zIndex={zIndex + 0.1}
        />
      )}
    </>
  )
})
