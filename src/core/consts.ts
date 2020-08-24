/* eslint-disable prettier/prettier */
export enum Field {
  EMPTY = " ",
  MISSED = "M",
  HIT = "X",

  Carrier = "C",
  Battleship = "B",
  Cruiser = "R",
  Submarine = "S",
  Destroyer = "D"
}

export type ShipsFields = Field.Battleship | Field.Carrier | Field.Cruiser | Field.Destroyer | Field.Submarine

export const shipShortToName: Record<ShipsFields, ShipName> = {
   "C": "Carrier",
   "B": "Battleship",
   "R": "Cruiser",
   "S": "Submarine",
   "D": "Destroyer"
}

export type Board = Field[][]

export const emptyBoard = (size: number) =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => Field.EMPTY))

export enum Orientation {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
}

export type Coord = {
  x: number
  y: number
}

export type ShipName = "Carrier" | "Battleship" | "Cruiser" | "Submarine" | "Destroyer"

export type Ship = {
  type: ShipName
  orientation?: Orientation
  length: number
  topLeftCorner?: Coord
}

export const Ships: Record<ShipName, Ship> = {
  Carrier: {
    type: "Carrier",
    length: 5,
  },
  Battleship: {
    type: "Battleship",
    length: 4,
  },
  Cruiser: {
    type: "Cruiser",
    length: 3,
  },
  Submarine: {
    type: "Submarine",
    length: 3,
  },
  Destroyer: {
    type: "Destroyer",
    length: 2,
  },
}

export const fleet = Object.keys(Ships) as ShipName[]

export const FULL_FLEET = 5 + 4 + 3 + 3 + 2
