import { Field } from "./../consts"
import { charToCode, isShip } from "../utils"

describe("Utils", () => {
  it("should convert uppercase and lowercase coord to the same number", () => {
    const codeU = charToCode("A")
    const codeL = charToCode("a")

    expect(codeU).toBe(0)
    expect(codeL).toBe(0)
  })

  it("should recognize ship", () => {
    const is = isShip(Field.Destroyer)
    const isNot = isShip(Field.HIT)

    expect(is).toBe(true)
    expect(isNot).toBe(false)
  })
})
