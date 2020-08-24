import { Field, Orientation } from "./../consts"
import { Battleships } from "../core"
import { createShip } from "../utils"

describe("Battleship game", () => {
  it("should place ship on empty board", () => {
    const game = new Battleships(10)

    const result = game.placeShip(
      createShip("Carrier", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 0 } }),
    )

    expect(result).toBe(true)
  })

  it("shouldn't place a ship overlapping other ship", () => {
    const game = new Battleships(10)

    game.placeShip(createShip("Battleship", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 2, y: 0 } }))

    const result = game.placeShip(
      createShip("Carrier", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 0 } }),
    )

    expect(result).toBe(false)
  })

  it("shouldn't place a ship overlapping not fitting into a board", () => {
    const game = new Battleships(10)

    const result = game.placeShip(
      createShip("Carrier", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 9, y: 0 } }),
    )

    expect(result).toBe(false)
  })

  it("shouldn't allow bad coordinates", () => {
    const game = new Battleships(10)

    const result = game.placeShip(
      createShip("Carrier", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: -18, y: 25 } }),
    )

    expect(result).toBe(false)
  })

  it("should recognize ready board", () => {
    const game = new Battleships(10)

    game.placeShip(createShip("Carrier", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 0 } }))
    game.placeShip(createShip("Battleship", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 1 } }))
    game.placeShip(createShip("Cruiser", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 2 } }))
    game.placeShip(createShip("Destroyer", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 3 } }))
    game.placeShip(createShip("Submarine", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 4 } }))

    expect(game.isBoardReady()).toBe(true)
  })

  it("should recognize not ready board", () => {
    const game = new Battleships(10)

    expect(game.isBoardReady()).toBe(false)
  })

  it("should recognize game over", () => {
    const game = new Battleships(10)

    game.placeShip(createShip("Carrier", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 0 } }))
    game.placeShip(createShip("Battleship", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 1 } }))
    game.placeShip(createShip("Cruiser", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 2 } }))
    game.placeShip(createShip("Destroyer", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 3 } }))
    game.placeShip(createShip("Submarine", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 4 } }))

    game.shoot("A1")
    game.shoot("A2")
    game.shoot("A3")
    game.shoot("A4")
    game.shoot("A5")

    game.shoot("B1")
    game.shoot("B2")
    game.shoot("B3")
    game.shoot("B4")
    game.shoot("B5")

    game.shoot("C1")
    game.shoot("C2")
    game.shoot("C3")
    game.shoot("C4")
    game.shoot("C5")

    game.shoot("D1")
    game.shoot("D2")
    game.shoot("D3")
    game.shoot("D4")
    game.shoot("D5")

    game.shoot("E1")
    game.shoot("E2")
    game.shoot("E3")
    game.shoot("E4")
    game.shoot("E5")

    expect(game.isGameOver()).toBe(true)
  })

  it("should recognize not finished game", () => {
    const game = new Battleships(10)

    game.placeShip(createShip("Carrier", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 0 } }))
    game.placeShip(createShip("Battleship", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 1 } }))
    game.placeShip(createShip("Cruiser", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 2 } }))
    game.placeShip(createShip("Destroyer", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 3 } }))
    game.placeShip(createShip("Submarine", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 4 } }))

    expect(game.isGameOver()).toBe(false)
  })

  it("should random correct board", () => {
    const game = new Battleships(10)

    game.randomFullBoard()

    expect(game.isBoardReady()).toBe(true)
  })

  it("should mark hits", () => {
    const game = new Battleships(10)

    game.placeShip(createShip("Carrier", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 0 } }))

    game.shoot("A1")

    expect(game.view[0][0]).toBe(Field.HIT)
  })

  it("should mark missed shots", () => {
    const game = new Battleships(10)

    game.placeShip(createShip("Carrier", { orientation: Orientation.HORIZONTAL, topLeftCorner: { x: 0, y: 0 } }))

    game.shoot("B1")

    expect(game.view[1][0]).toBe(Field.MISSED)
  })
})
