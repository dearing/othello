/*

basic rules:

Two players compete, using 64 identical game pieces ("disks") 
that are light on one side and dark on the other. Each player 
chooses one color to use throughout the game. Players take 
turns placing one disk on an empty square, with their assigned 
color facing up. After a play is made, any disks of the 
opponent's color that lie in a straight line bounded by the 
one just played and another one in the current player's color 
are turned over. When all playable empty squares are filled, 
the player with more disks showing in their own color wins the game.

source: https://en.wikipedia.org/wiki/Reversi
*/

// we need to represent a current 'state' of a square as empty or a player's disk
export enum Square {
    NONE = 0,
    BLACK = 1,
    WHITE = 2
}

export interface Position {
    row: number;
    col: number;
}

export class Othello {

    private board: Square[][] // we'll do this as a 2D array
    constructor(
        // Othello variant played on an 8x8 board
        readonly boardSize: number,
    ) {
        this.board = Array(this.boardSize)
            .fill(Square.NONE)
            .map(() => Array(this.boardSize).fill(Square.NONE))
        const mid = this.boardSize / 2; // as far as I know, othello games would always(?) be centered
        this.board[mid - 1][mid - 1] = Square.BLACK;
        this.board[mid - 1][mid] = Square.BLACK;
        this.board[mid][mid] = Square.WHITE;
        this.board[mid][mid - 1] = Square.WHITE;
    }

    // accept a square type and return the sum of counts
    public getScore(square: Square): number {
        // filter out and count the matches
        return this.board.flat().filter(sq => sq === square).length;
    }

    // this should be our way to get a copy out for consuming in a component
    public getBoard(): Square[][] {
        return this.board.map(row => [...row])
    }

}
