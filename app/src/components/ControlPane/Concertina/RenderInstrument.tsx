import { Fragment } from "react"
import { buttonIndexToRowCol } from "../../../concertina/concertina"
import {
  ButtonPosition,
  CooverNotationId,
  Instrument,
} from "../../../concertina/types"

export type Stroke = {
  index: number
  action: "push" | "pull"
}
export const RenderInstrument = ({
  instrument,
  strokes = [],
  selectStrokes = [],
  repeatedStrokes = [],
}: {
  instrument: Instrument
  strokes?: Stroke[]
  selectStrokes?: Stroke[]
  repeatedStrokes?: Stroke[]
}) => {
  return (
    <div
      style={{
        padding: 20,
        whiteSpace: "nowrap",
      }}
    >
      {instrument.layout.map((btn, i) => {
        return (
          <Fragment key={i}>
            {btn.newRow && <br />}
            <Button
              btn={btn}
              action={strokes.find((stroke) => stroke.index === i)?.action}
              index={i}
              position={buttonIndexToRowCol(instrument, i)}
              cooverNotationId={instrument.layout[i]?.cooverNotationId}
              highlight={!!selectStrokes.find((stroke) => stroke.index === i)}
              starred={!!repeatedStrokes.find((stroke) => stroke.index === i)}
            />
          </Fragment>
        )
      })}
    </div>
  )
}

const Button = ({
  btn,
  action,
  index,
  position,
  cooverNotationId,
  highlight,
  starred,
}: {
  btn: { x: number; push: string; pull: string }
  action?: "push" | "pull"
  index: number
  position: ButtonPosition
  cooverNotationId: CooverNotationId | undefined
  highlight: boolean
  starred: boolean
}) => {
  return (
    <div
      title={`index: ${index}
coover id: ${cooverNotationId?.id}
position: ${position.row}, ${position.col}`}
      style={{
        display: "inline-block",
        width: 50,
        height: 50,
        textAlign: "center",
        marginLeft: btn.x,
        verticalAlign: "bottom",
        backgroundColor: "#5c5c5c",
        color: "black",
        position: "relative",
        borderRadius: 99,
        overflow: "hidden",
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 1.32,
        border: highlight ? "2px dashed white" : "2px solid transparent",
        boxShadow:
          action === "push"
            ? "0px 0px 0px 4px #F6295A"
            : action === "pull"
              ? "0px 0px 0px 4px #0059D6"
              : "",
        zIndex: highlight || action ? 1 : 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          width: "100%",
          height: "50%",
          background: action === "push" ? "#fda2b8" : "transparent",
          verticalAlign: "bottom",
          boxShadow: "inset 0px -2px 0px 0px #3E3D3D",
        }}
      >
        {starred && action === "push" && (
          <span style={{ color: "#C04800" }}>*</span>
        )}
        {btn.push.replace(/[^a-zA-Z#]/g, "")}
        <span
          style={{
            fontSize: 16,
            fontFamily: "Times, serif",
            fontWeight: "bold",
          }}
        >
          {btn.push.replace(/[^0-9]/g, "")}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "50%",
          background: action === "pull" ? "#83aae0" : "transparent",
        }}
      >
        {starred && action === "pull" && (
          <span style={{ color: "#C04800" }}>*</span>
        )}
        {btn.pull.replace(/[^a-zA-Z#]/g, "")}
        <span
          style={{
            fontSize: 16,
            fontFamily: "Garamond, serif",
            fontWeight: "bold",
          }}
        >
          {btn.pull.replace(/[^0-9]/g, "")}
        </span>
      </div>
    </div>
  )
}
