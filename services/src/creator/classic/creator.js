import deepcopy from 'deepcopy'
import shuffle from 'shuffle-array'

import { Boards } from './utils/quadrants.js'
import { rotateQuad, shiftQuad } from './utils/manipulate.js'
import { wallNormalizer } from '../utils/normalize.js'

const createNewBoard = () => {
  const newBoard = {}

  newBoard.size = {
    x: 16,
    y: 16,
  }

  // Randomly choose 4 boards
  const newQuads = deepcopy(Boards)

  shuffle(newQuads.A)
  shuffle(newQuads.B)
  shuffle(newQuads.C)
  shuffle(newQuads.D)

  let quadrants = [newQuads.A[0], newQuads.B[0], newQuads.C[0], newQuads.D[0]]

  // Shuffle them
  quadrants = shuffle(quadrants)

  newBoard.boardIds = quadrants.map(q => q.id)

  // Then rotate them as necessary
  for (const i of [1, 2, 3]) {
    quadrants[i] = rotateQuad(quadrants[i], i)
  }

  // Shift the quadrants as needed
  quadrants[1] = shiftQuad(quadrants[1], 8, 0)
  quadrants[2] = shiftQuad(quadrants[2], 8, 8)
  quadrants[3] = shiftQuad(quadrants[3], 0, 8)

  // Pull out all walls
  const newWalls = []
  quadrants.forEach(quadrant => {
    newWalls.push(...quadrant.walls)
  })
  // Normalize All Wall Coordinates
  newWalls.forEach((wall, index) => {
    newWalls[index] = wallNormalizer(wall)
  })

  newBoard.walls = newWalls

  const newGoals = []
  quadrants.forEach(quadrant => {
    newGoals.push(...quadrant.goals)
  })
  newBoard.goals = newGoals

  const newNotValid = []
  quadrants.forEach(quadrant => {
    newNotValid.push(...quadrant.notValid)
  })
  newBoard.notValid = newNotValid

  return newBoard
}

const generateRandomCoordinate = (board, blacklist) => {
  let x, y

  do {
    x = Math.floor(Math.random() * board.size.x)
    y = Math.floor(Math.random() * board.size.y)
  } while (
    board.notValid.some(element => element[0] === x && element[1] === y) ||
    board.goals.some(element => element[0] === x && element[1] === y) ||
    (blacklist &&
      blacklist.some(element => element[0] === x && element[1] === y))
  )

  return [x, y]
}

const generatePuzzleFromBoard = board => {
  const puzzle = {}

  puzzle.target = board.goals[Math.floor(Math.random() * board.goals.length)]

  puzzle.pieces = []

  for (const colour of ['red', 'green', 'blue', 'yellow', 'silver']) {
    let blacklist = puzzle.pieces.map(element => element.coordinate)
    blacklist.push(puzzle.target.coordinate)

    puzzle.pieces.push({
      colour,
      coordinate: generateRandomCoordinate(board, blacklist),
    })
  }

  // TODO make sure generated puzzle can't be solved in less than X moves

  return puzzle
}

export const handler = () => {
  const board = createNewBoard()
  const puzzle = generatePuzzleFromBoard(board)

  console.log(puzzle)
}
