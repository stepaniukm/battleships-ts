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

export const isShip = (f: Field) => [Field.Carrier, Field.Battleship, Field.Cruiser, Field.Submarine, Field.Destroyer].includes(f)

export type Board = Field[][]

export enum Players {
  HUMAN = "HUMAN",
  AI = "AI",
}

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

export const createShip = (type: ShipName, { topLeftCorner, orientation }: Omit<Required<Ship>, "length" | "type">): Required<Ship> => {
  return {
    ...Ships[type],
    type,
    topLeftCorner,
    orientation,
  }
}

export const FULL_FLEET = 5 + 4 + 3 + 3 + 2
