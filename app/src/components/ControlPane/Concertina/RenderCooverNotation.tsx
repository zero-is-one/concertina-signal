import { AbcNotation } from "tonal"
import { Instrument } from "../../../concertina/types"
import { RenderAbc } from "./RenderAbc"
import { Stroke } from "./RenderInstrument"

export const RenderCooverNotation = ({
  mainStroke,
  strokes,
  instrument,
}: {
  mainStroke: Stroke | undefined
  strokes: Stroke[]
  instrument: Instrument
}) => {
  const mainNote = mainStroke
    ? instrument.layout[mainStroke.index][mainStroke.action]
    : null

  const abcNote = mainNote ? AbcNotation.scientificToAbcNotation(mainNote) : "z"

  const leftHandCooverIds = strokes
    .filter(
      (stroke) =>
        instrument.layout[stroke.index].cooverNotationId?.hand === "left",
    )
    .map((stroke) => instrument.layout[stroke.index].cooverNotationId?.id || "")
    .sort(cooverIdSortFn)

  const rightHandCooverIds = strokes
    .filter(
      (stroke) =>
        instrument.layout[stroke.index].cooverNotationId?.hand === "right",
    )
    .map((stroke) => instrument.layout[stroke.index].cooverNotationId?.id || "")
    .sort(cooverIdSortFn)

  const abc = `X: 1
  |:"^\\n${rightHandCooverIds.join("\\n")}""_${leftHandCooverIds.join("\\n")}"${abcNote}2
  `

  return <RenderAbc abc={abc} />
}

const cooverIdSortFn = (a: string, b: string) => {
  const aId = isNaN(Number(a)) ? "-" + parseInt(a) : a
  const bId = isNaN(Number(b)) ? "-" + parseInt(b) : b

  return Number(aId) - Number(bId)
}
