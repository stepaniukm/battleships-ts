import {
  emptyBoard,
  Board,
  Players,
  Ship,
  Orientation,
  Field,
  FULL_FLEET,
  createShip,
  fleet,
  isShip,
  Coord,
} from "./consts"
import { charToCode, getRandomCoordGenerator, codeToChar } from "./utils"

type PlayerInfo = {
  board: Board
  view: Board
}

export class Battleships {
  public [Players.HUMAN]: PlayerInfo
  public [Players.AI]: PlayerInfo
  public turn: Players = Players.HUMAN
  public size: number
  public inProgress = false
  public randomCoord: () => Coord

  constructor(size: number) {
    this.size = size
    this.turn = Players.HUMAN
    this[Players.HUMAN] = {
      board: emptyBoard(size),
      view: emptyBoard(size),
    }
    this[Players.AI] = {
      board: emptyBoard(size),
      view: emptyBoard(size),
    }
    this.randomCoord = getRandomCoordGenerator(size)
  }
  canPlace(player: Players, { topLeftCorner, orientation, length }: Required<Ship>) {
    const { x, y } = topLeftCorner

    const squares = this[player].board
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

  placeShip(player: Players, ship: Required<Ship>) {
    if (this.canPlace(player, ship)) {
      const { topLeftCorner, orientation, length, type } = ship
      const { x, y } = topLeftCorner

      this[player].board = this[player].board.map((row, i) =>
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

  isBoardReady(player: Players) {
    return (
      this[player].board.flat().reduce((counter, field) => {
        return isShip(field) ? counter + 1 : counter
      }, 0) === FULL_FLEET
    )
  }

  isGameOver() {
    const countHUMAN = this[Players.HUMAN].board.flat().reduce((counter, field) => {
      return isShip(field) ? counter + 1 : counter
    }, 0)

    const countAI = this[Players.AI].board.flat().reduce((counter, field) => {
      return isShip(field) ? counter + 1 : counter
    }, 0)

    if (countHUMAN === 0) return { isOver: true, winner: Players.AI }
    if (countAI === 0) return { isOver: true, winner: Players.HUMAN }
    else return { isOver: false }
  }

  randomFullBoard(player: Players) {
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
      } while (!this.placeShip(player, ship))
    }
  }

  oppositePlayer(p: Players) {
    if (p === Players.AI) return Players.HUMAN
    else return Players.AI
  }

  getAIShoot(): string {
    const fieldsToUse = this[Players.HUMAN].board.flatMap((row, i) =>
      row
        .map((field, j) => ({ x: j, y: i, field }))
        .filter((withCoord) => {
          return isShip(withCoord.field) || withCoord.field === Field.EMPTY
        }),
    )

    const l = fieldsToUse.length
    const { x, y } = fieldsToUse[Math.floor(Math.random() * l)]

    return `${codeToChar(y)}${x + 1}`
  }

  shoot(shooter: Players, position: string = this.getAIShoot()) {
    console.log(position)
    if (this.turn !== shooter) return

    const [r, c] = position

    const row = charToCode(r)
    const column = Number(c) - 1

    const shooterView = this[shooter].view
    const battlefield = this[this.oppositePlayer(shooter)].board

    const field = battlefield[row][column]

    console.log(field)

    if (isShip(field)) {
      shooterView[row][column] = Field.HIT
      battlefield[row][column] = Field.HIT
    } else {
      shooterView[row][column] = Field.MISSED
      battlefield[row][column] = Field.MISSED
      this.turn = this.oppositePlayer(this.turn)
    }
  }

  reset() {
    this[Players.HUMAN]
  }
}
