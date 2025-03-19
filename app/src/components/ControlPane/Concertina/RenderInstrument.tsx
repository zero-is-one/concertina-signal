import { Fragment } from "react"
import { Instrument } from "../../../concertina/concertina"

export type Stroke = {
  index: number
  action: "push" | "pull"
}
export const RenderInstrument = ({
  instrument,
  strokes = [],
}: {
  instrument: Instrument
  strokes?: Stroke[]
}) => {
  return (
    <div>
      {instrument.layout.map((btn, i) => {
        return (
          <Fragment key={i}>
            {btn.newRow && <br />}
            <Button
              btn={btn}
              action={strokes.find((stroke) => stroke.index === i)?.action}
              index={i}
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
}: {
  btn: { x: number; push: string; pull: string }
  action?: "push" | "pull"
  index: number
}) => {
  return (
    <div
      style={{
        display: "inline-block",
        width: 50,
        height: 50,
        textAlign: "center",
        marginLeft: btn.x,
        verticalAlign: "bottom",
        backgroundColor:
          action === "push" ? "red" : action === "pull" ? "blue" : "white",
        border: "1px solid black",
        color: "black",
      }}
    >
      {btn.push}
      <br />
      {btn.pull}
      <br />
      {index}
    </div>
  )
}
