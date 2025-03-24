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
  highlightStrokes = [],
}: {
  instrument: Instrument
  strokes?: Stroke[]
  highlightStrokes?: Stroke[]
}) => {
  return (
    <div
      style={{
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
              highlight={
                !!highlightStrokes.find((stroke) => stroke.index === i)
              }
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
}: {
  btn: { x: number; push: string; pull: string }
  action?: "push" | "pull"
  index: number
  position: ButtonPosition
  cooverNotationId: CooverNotationId | undefined
  highlight: boolean
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
        backgroundColor: "#3E3E3E",
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
          boxShadow: "inset 0px -2px 0px 0px #292828",
        }}
      >
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
