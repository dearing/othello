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

    // TODO: return positions of valid moves
    // idea here is to return an array of squares that the component can decorate with 'onClick' for UX
    // and can be used to determine if the game is over if no one has any valid moves
    public getValidMoves(player: Square): Position[] {
        let moves: Position[] = [];

        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.getCaptures({ row, col }, player).length > 0) {
                    moves.push({ row, col });
                }
            }
        }

        return moves
    }

    // TODO: return array of captured positions for a given player
    // We want to work backwards from a given position and square type, recording positions until we meet the same type again
    // NOTE: a capture list infers a capture check but the calling function would have to know remember the start position
    public getCaptures(pos: Position, player: Square): Position[] {
        // TODO: gotta be a better way to represent a board in a null state than my ENUM approach
        // if we are black, our opponent is white otherwise they must be black
        const opponent = player === Square.BLACK ? Square.WHITE : Square.BLACK
        let captures: Position[] = [];

        // NOTE: borrowed from AI snooping: I was thinking of a mask to overlay over each
        //       position but rather long chain of statements, this array approach was more elegant.
        const DIRECTIONS = [
            { row: -1, col: -1 }, // NW
            { row: -1, col: 0 },  // N
            { row: -1, col: 1 },  // NE
            { row: 0, col: -1 },  // W
            { row: 0, col: 1 },   // E
            { row: 1, col: -1 },  // SW
            { row: 1, col: 0 },   // S
            { row: 1, col: 1 }    // SE
        ];


        // TODO: the two running checks feel like they could be combined more elegantly
        for (const dir of DIRECTIONS) {

            // store our running positions in case it becomes valid
            let running: Position[] = [];

            // combine the current position we are checking with the current direction offset
            //let check = {row: pos.row + dir.row, col: pos.col + dir.col}
            let row = pos.row + dir.row
            let col = pos.col + dir.col

            // TODO: this is ugly but I don't want to go refactor my functions to accept (row, col) instead of position yet
            // if within bounds and the direction is an opponent's square, we have run
            while (this.withinBounds({ row: row, col: col }) && this.board[row][col] === opponent) {
                const pos: Position = { row: row, col: col };
                running.push(pos);
                row += dir.row;
                col += dir.col;
            }

            // finally, if we have a run and then hit ourselves we got a valid move!
            if (running.length > 0 && this.board[row][col] === player) {
                captures.push(...running)
            }

        }

        return captures

    }

    // TODO: return if valid move
    public isValidMove(pos: Position): boolean {
        // short out of outside of bounds
        if (this.withinBounds(pos)) {
            return false
        }
        return false
    }

    // helper to check if the pos is within bounds
    private withinBounds(pos: Position): boolean {
        return pos.row >= 0 && pos.row < this.boardSize && pos.col >= 0 && pos.col < this.boardSize
    }

}
