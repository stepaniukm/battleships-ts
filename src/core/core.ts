import { emptyBoard, Board, Ship, Orientation, Field, FULL_FLEET, fleet, Coord } from "./consts"
import { charToCode, getRandomCoordGenerator, createShip, isShip } from "./utils"

type PlayerInfo = {
  board: Board
  view: Board
}

export class Battleships {
  public view: Board
  private board: Board
  public size: number
  public randomCoord: () => Coord

  constructor(size: number) {
    this.size = size
    this.board = emptyBoard(size)
    this.view = emptyBoard(size)
    this.randomCoord = getRandomCoordGenerator(size)
  }

  canPlace({ topLeftCorner, orientation, length }: Required<Ship>) {
    const { x, y } = topLeftCorner

    const squares = this.board
      .map((row, i) =>
        row.filter((_, j) => {
          if (orientation === Orientation.HORIZONTAL) {
            return i === y && j - x < length && j - x >= 0
          } else {
            return j === x && i - y < length && i - y >= 0
          }
        }),
      )
      .flat()
      .filter((el) => el)

    return squares.every((el) => el === Field.EMPTY) && squares.length === length
  }

  placeShip(ship: Required<Ship>) {
    if (this.canPlace(ship)) {
      const { topLeftCorner, orientation, length, type } = ship
      const { x, y } = topLeftCorner

      this.board = this.board.map((row, i) =>
        row.map((field, j) => {
          if (orientation === Orientation.HORIZONTAL) {
            if (i === y && j - x < length && j - x >= 0) {
              return Field[type]
            }
            return field
          } else {
            if (j === x && i - y < length && i - y >= 0) {
              return Field[type]
            }
            return field
          }
        }),
      )
      return true
    } else {
      return false
    }
  }

  isBoardReady() {
    return (
      this.board.flat().reduce((counter, field) => {
        return isShip(field) ? counter + 1 : counter
      }, 0) === FULL_FLEET
    )
  }

  isGameOver() {
    const count = this.board.flat().reduce((counter, field) => {
      return isShip(field) ? counter + 1 : counter
    }, 0)

    if (count === 0) return true
    else return false
  }

  randomFullBoard() {
    for (const shipType of fleet) {
      let ship
      do {
        const { x, y } = this.randomCoord()
        const orientation = [Orientation.HORIZONTAL, Orientation.VERTICAL][Math.round(Math.random())]
        ship = createShip(shipType, {
          orientation,
          topLeftCorner: {
            x,
            y,
          },
        })
      } while (!this.placeShip(ship))
    }
  }

  shoot(position: string) {
    const [r, ...c] = position

    const row = charToCode(r)
    const column = Number(c.join("")) - 1

    if (row < 0 || column < 0 || row > this.size || column > this.size) {
      return "Bad coordinates, please try again"
    }

    const field = this.board[row][column]

    if (isShip(field)) {
      this.view[row][column] = Field.HIT
      this.board[row][column] = Field.HIT
    } else {
      this.view[row][column] = Field.MISSED
      this.board[row][column] = Field.MISSED
    }
  }

  reset() {
    this.board = emptyBoard(this.size)
    this.view = emptyBoard(this.size)
  }
}
