export interface GameState {
    board: Board
    target: Target
    pieces: ColourAndLocation[]
    history: HistoryEntry[]
    viewMove: number
    selection: {
        piece?: ColourAndLocation
        possibleMoves?: {
            North?: Coordinate[]
            West?: Coordinate[]
            South?: Coordinate[]
            East?: Coordinate[]
        }
    }
    gameComplete: boolean
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
}

export interface Move {
    direction: Direction
    colour: PieceColour
}
