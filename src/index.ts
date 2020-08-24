import readline from "readline"
import { Board } from "./core/consts"
import { Battleships } from "./core/core"
import { codeToChar } from "./core/utils"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = (q: string): Promise<string> =>
  new Promise((res) => {
    rl.question(q, (s) => res(s))
  })

const view = (board: Board) => {
  const l = board[0].length
  const line = Array.from({ length: l + 1 }, (v, k) => k)
  const letters = line.map(codeToChar).values()

  return [
    line.map((el) => (el === 0 ? " " : el)).join(" "),
    ...board.map((row) => [letters.next().value, ...row].join(" ")),
  ].join("\n")
}

const gameLoop = async () => {
  console.log("\n--------------------------------")
  console.log("Hello in simple battleships game")

  const isReady = await question("Are you ready? (Y/N): ")

  if (isReady.toLowerCase() === "n" || isReady.toLowerCase() === "no") rl.close()

  const game = new Battleships(10)
  game.randomFullBoard()

  console.log("\n" + "Random board was generated successfully! \n")
  console.log(`Legend: 
  X - HIT
  M - MISSED SHOT \n`)

  do {
    const shoot = await question("Where do you want to shoot?: ")
    const error = game.shoot(shoot)

    if (error) {
      console.log("\n" + error + "\n")
    } else {
      console.log("\nVIEW:\n")
      console.log(view(game.view) + "\n")
    }
  } while (!game.isGameOver())

  console.log("Congratulations! You won")
}

gameLoop().catch(console.error)
