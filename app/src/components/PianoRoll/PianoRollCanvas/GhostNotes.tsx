import { useTheme } from "@emotion/react"
import Color from "color"
import { vec4 } from "gl-matrix"
import { observer } from "mobx-react-lite"
import { FC, useMemo } from "react"
import { Midi } from "tonal"
import { getNoteActionType } from "../../../concertina/concertina"
import { Range } from "../../../entities/geometry/Range"
import { colorToVec4 } from "../../../gl/color"
import { isEventOverlapRange } from "../../../helpers/filterEvents"
import { useStores } from "../../../hooks/useStores"
import { isNoteEvent, TrackId } from "../../../track"
import { trackColorToVec4 } from "../../../track/TrackColor"
import { NoteCircles } from "./NoteCircles"
import { NoteRectangles } from "./NoteRectangles"

export const GhostNotes: FC<{ zIndex: number; trackId: TrackId }> = observer(
  ({ zIndex, trackId }) => {
    const {
      song,
      pianoRollStore: { transform, scrollLeft, canvasWidth },
    } = useStores()
    const theme = useTheme()
    const track = song.getTrack(trackId)

    if (track === undefined) {
      return <></>
    }

    const windowedEvents = useMemo(
      () =>
        track.events
          .filter(isNoteEvent)
          .filter(
            isEventOverlapRange(
              Range.fromLength(
                transform.getTick(scrollLeft),
                transform.getTick(canvasWidth),
              ),
            ),
          ),
      [scrollLeft, canvasWidth, transform.horizontalId, track.events],
    )

    const notes = useMemo(
      () =>
        windowedEvents.map((e) => {
          const rect = track.isRhythmTrack
            ? transform.getDrumRect(e)
            : transform.getRect(e)

          const colorId = {
            push: 1,
            pull: 2,
            both: 3,
            undefined: 0,
          }[getNoteActionType(Midi.midiToNoteName(e.noteNumber)) || "undefined"]

          return {
            ...rect,
            id: e.id,
            velocity: 126, // draw opaque when ghost
            isSelected: false,
            colorId,
          }
        }),
      [windowedEvents, transform, track.isRhythmTrack],
    )

    const ghostNoteColor = colorToVec4(Color(theme.ghostNoteColor))
    const transparentColor = vec4.zero(vec4.create())
    const trackColor =
      track.color !== undefined ? trackColorToVec4(track.color) : null
    const ghostedColor =
      trackColor !== null
        ? vec4.lerp(vec4.create(), trackColor, ghostNoteColor, 0.7)
        : ghostNoteColor

    if (track.isRhythmTrack) {
      return (
        <NoteCircles
          strokeColor={transparentColor}
          rects={notes}
          inactiveColor={transparentColor}
          activeColor={ghostedColor}
          selectedColor={ghostedColor} // TODO: velocity を使わないシェーダを書く
          zIndex={zIndex}
        />
      )
    }
    return (
      <NoteRectangles
        rects={notes}
        strokeColor={transparentColor}
        inactiveColor={transparentColor}
        activeColor={ghostedColor}
        selectedColor={ghostedColor} // TODO: velocity を使わないシェーダを書く
        zIndex={zIndex + 0.1}
      />
    )
  },
)
