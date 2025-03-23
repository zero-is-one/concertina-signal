import { instruments } from "./instruments"

export type CooverNotationId = {
  hand: "left" | "right"
  id:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "1a"
    | "2a"
    | "3a"
    | "4a"
    | "5a"
}

export type Button = {
  push: string
  pull: string
  x: number
  newRow: boolean
  cooverNotationId?: CooverNotationId
}

export type Instrument = {
  title: string
  layout: Button[]
}

export type InstrumentId = keyof typeof instruments

export type ButtonPosition = {
  row: number
  col: number
}
