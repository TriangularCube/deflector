export interface GameState {
    board: Board
    target: Target
    history: HistoryEntry[]
    historyPointer: {
        index: number
        positions: ColourAndLocation[]
        gameComplete: boolean
    }
    selection: {
        piece?: ColourAndLocation
        possibleMoves?: {
            North?: Coordinate[]
            West?: Coordinate[]
            South?: Coordinate[]
            East?: Coordinate[]
        }
    }
}

export type Direction = 'north' | 'south' | 'east' | 'west'
export type PieceColour = 'green' | 'yellow' | 'blue' | 'red' | 'silver'
export type Coordinate = [number, number]

export interface Board {
    size: BoardSize
    walls: Coordinate[]
    goals: ColourAndLocation[]
    notValid: Coordinate[]
}

export interface BoardSize {
    x: number
    y: number
}

export interface Target {
    colour: PieceColour | 'any'
    coordinate: Coordinate
}

export interface ColourAndLocation {
    colour: PieceColour
    coordinate: Coordinate
}

export interface HistoryEntry {
    move: Move
    state: ColourAndLocation[]
    gameComplete: boolean
}

export interface Move {
    direction: Direction
    colour: PieceColour
}
