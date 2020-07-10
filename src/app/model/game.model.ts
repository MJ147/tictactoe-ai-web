export interface Square {
    id: number;
    value: number;
    numberInBoard: number;
}

export interface Board {
    id: number;
    squares: Square[];
}

export interface Player {
    id: number;
    value: number;
}

export interface Game {
    id: number;
    board: Board;
    players: Player[];
}
