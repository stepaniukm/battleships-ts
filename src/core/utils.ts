export const charToCode = (s: string) => Number(s.toLowerCase().charCodeAt(0)) - 97

export const codeToChar = (n: number) => String.fromCharCode(97 + n)

export const getRandomCoordGenerator = (size: number) => () => ({
  x: Math.floor(Math.random() * size),
  y: Math.floor(Math.random() * size),
})
