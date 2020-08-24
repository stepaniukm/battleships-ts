import { ShipName, Ship, Ships, Field } from "./consts"

const charCodeOfA = 97

export const charToCode = (s: string) => Number(s.toLowerCase().charCodeAt(0)) - charCodeOfA

export const codeToChar = (n: number) => String.fromCharCode(n + charCodeOfA)

export const getRandomCoordGenerator = (size: number) => () => ({
  x: Math.floor(Math.random() * size),
  y: Math.floor(Math.random() * size),
})

export const createShip = (
  type: ShipName,
  { topLeftCorner, orientation }: Omit<Required<Ship>, "length" | "type">,
): Required<Ship> => {
  return {
    ...Ships[type],
    type,
    topLeftCorner,
    orientation,
  }
}

export const isShip = (f: Field) =>
  [Field.Carrier, Field.Battleship, Field.Cruiser, Field.Submarine, Field.Destroyer].includes(f)
