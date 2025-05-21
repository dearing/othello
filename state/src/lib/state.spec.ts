import { Othello, Square, Position} from './state';
// AI generated test cases for Othello game logic


describe('Othello', () => {
    it('should initialize an 8x8 board with correct starting positions', () => {
        const othello = new Othello(8);
        // The board should have 8 rows
        expect(othello['board'].length).toBe(8);
        // Each row should have 8 columns
        othello['board'].forEach(row => expect(row.length).toBe(8));

        const mid = 8 / 2;
        // Check initial positions
        expect(othello['board'][mid - 1][mid - 1]).toBe(Square.BLACK);
        expect(othello['board'][mid - 1][mid]).toBe(Square.BLACK);
        expect(othello['board'][mid][mid]).toBe(Square.WHITE);
        expect(othello['board'][mid][mid - 1]).toBe(Square.WHITE);
    });

    it('should count the correct number of BLACK, WHITE after initialization', () => {
        const othello = new Othello(8);
        expect(othello.getScore(Square.BLACK)).toBe(2);
        expect(othello.getScore(Square.WHITE)).toBe(2);
    });

    it('should not change the board if captureDisks is called on an invalid move', () => {
        const othello = new Othello(8);
        const initialBoard = othello.getBoard();
        // Pick a corner that is not a valid move at the start
        othello.captureDisks({ row: 0, col: 0 }, Square.BLACK);
        expect(othello.getBoard()).toEqual(initialBoard);
    });

    it('should place a disk and flip the correct opponent disks when a valid move is made', () => {
        const othello = new Othello(8);
        // Black's valid move at (2,3) should flip (3,3) from WHITE to BLACK
        othello.captureDisks({ row: 2, col: 3 }, Square.BLACK);
        expect(othello.getBoard()[2][3]).toBe(Square.BLACK);
        expect(othello.getBoard()[3][3]).toBe(Square.BLACK);
    });

    it('should not flip any disks if there are no captures for the move', () => {
        const othello = new Othello(8);
        // Place at a position that is not adjacent to any opponent disk
        othello.captureDisks({ row: 0, col: 0 }, Square.BLACK);
        // Board should remain unchanged at that position
        expect(othello.getBoard()[0][0]).toBe(Square.NONE);
    });

    it('should flip multiple disks in a line if the move captures them', () => {
        const othello = new Othello(8);
        // Set up a custom board state for multi-capture
        // Black at (3,3), White at (3,4), (3,5), Black at (3,6)
        othello['board'][3][3] = Square.BLACK;
        othello['board'][3][4] = Square.WHITE;
        othello['board'][3][5] = Square.WHITE;
        othello['board'][3][6] = Square.BLACK;
        // Now, Black plays at (3,2) to flip (3,3), (3,4), (3,5)
        othello.captureDisks({ row: 3, col: 2 }, Square.BLACK);
        expect(othello.getBoard()[3][2]).toBe(Square.BLACK);
        expect(othello.getBoard()[3][3]).toBe(Square.BLACK);
        expect(othello.getBoard()[3][4]).toBe(Square.BLACK);
        expect(othello.getBoard()[3][5]).toBe(Square.BLACK);
    });

    it('should allow White to capture Black disks', () => {
        const othello = new Othello(8);
        // Black moves at (2,3)
        othello.captureDisks({ row: 2, col: 3 }, Square.BLACK);
        // Now White moves at (2,2), which should flip (3,3) back to WHITE
        othello.captureDisks({ row: 2, col: 2 }, Square.WHITE);
        expect(othello.getBoard()[2][2]).toBe(Square.WHITE);
        expect(othello.getBoard()[3][3]).toBe(Square.WHITE);
    });

    describe('getCaptures', () => {
        it('should return empty array if move does not capture any disks', () => {
            const othello = new Othello(8);
            // Corner move at start is not a capture
            const captures = othello.getCaptures({ row: 0, col: 0 }, Square.BLACK);
            expect(captures).toEqual([]);
        });

        it('should return correct positions for a simple horizontal capture', () => {
            const othello = new Othello(8);
            // Set up: Black at (3,3), White at (3,4), Black at (3,5)
            othello['board'][3][3] = Square.BLACK;
            othello['board'][3][4] = Square.WHITE;
            othello['board'][3][5] = Square.BLACK;
            // Black plays at (3,2) to capture (3,3) and (3,4)
            const captures = othello.getCaptures({ row: 3, col: 2 }, Square.BLACK);
            expect(captures).toContainEqual({ row: 3, col: 3 });
            expect(captures).toContainEqual({ row: 3, col: 4 });
            expect(captures.length).toBe(2);
        });

        it('should return correct positions for a simple vertical capture', () => {
            const othello = new Othello(8);
            // Set up: Black at (3,3), White at (4,3), Black at (5,3)
            othello['board'][3][3] = Square.BLACK;
            othello['board'][4][3] = Square.WHITE;
            othello['board'][5][3] = Square.BLACK;
            // Black plays at (2,3) to capture (3,3) and (4,3)
            const captures = othello.getCaptures({ row: 2, col: 3 }, Square.BLACK);
            expect(captures).toContainEqual({ row: 3, col: 3 });
            expect(captures).toContainEqual({ row: 4, col: 3 });
            expect(captures.length).toBe(2);
        });

        it('should return correct positions for a diagonal capture', () => {
            const othello = new Othello(8);
            // Set up: Black at (2,2), White at (3,3), Black at (4,4)
            othello['board'][2][2] = Square.BLACK;
            othello['board'][3][3] = Square.WHITE;
            othello['board'][4][4] = Square.BLACK;
            // Black plays at (1,1) to capture (2,2) and (3,3)
            const captures = othello.getCaptures({ row: 1, col: 1 }, Square.BLACK);
            expect(captures).toContainEqual({ row: 2, col: 2 });
            expect(captures).toContainEqual({ row: 3, col: 3 });
            expect(captures.length).toBe(2);
        });

        it('should return multiple positions if move captures in more than one direction', () => {
            const othello = new Othello(8);
            // Set up: Black at (3,3), White at (3,4), Black at (3,5)
            //         White at (4,3), Black at (5,3)
            othello['board'][3][3] = Square.BLACK;
            othello['board'][3][4] = Square.WHITE;
            othello['board'][3][5] = Square.BLACK;
            othello['board'][4][3] = Square.WHITE;
            othello['board'][5][3] = Square.BLACK;
            // Black plays at (3,2) to capture (3,3), (3,4), (4,3)
            const captures = othello.getCaptures({ row: 3, col: 2 }, Square.BLACK);
            expect(captures).toContainEqual({ row: 3, col: 3 });
            expect(captures).toContainEqual({ row: 3, col: 4 });
            expect(captures).toContainEqual({ row: 4, col: 3 });
            expect(captures.length).toBe(3);
        });

        it('should not capture if there is no bounding disk of the player', () => {
            const othello = new Othello(8);
            // White at (3,3), (3,4), but no Black at (3,5)
            othello['board'][3][3] = Square.WHITE;
            othello['board'][3][4] = Square.WHITE;
            // Black plays at (3,2) - should not capture anything
            const captures = othello.getCaptures({ row: 3, col: 2 }, Square.BLACK);
            expect(captures).toEqual([]);
        });

        it('should not go out of bounds when checking for captures', () => {
            const othello = new Othello(8);
            // Set up: Black at (0,7), White at (0,6)
            othello['board'][0][7] = Square.BLACK;
            othello['board'][0][6] = Square.WHITE;
            // Black plays at (0,5) to capture (0,6)
            const captures = othello.getCaptures({ row: 0, col: 5 }, Square.BLACK);
            expect(captures).toContainEqual({ row: 0, col: 6 });
            expect(captures.length).toBe(1);
        });

        describe('getValidMoves', () => {
            it('should return correct valid moves for Black at game start', () => {
                const othello = new Othello(8);
                const moves = othello.getValidMoves(Square.BLACK);
                // At start, Black can move at (2,3), (3,2), (4,5), (5,4)
                expect(moves).toEqual(
                    expect.arrayContaining([
                        { row: 2, col: 3 },
                        { row: 3, col: 2 },
                        { row: 4, col: 5 },
                        { row: 5, col: 4 }
                    ])
                );
                expect(moves.length).toBe(4);
            });

            it('should return correct valid moves for White after Black moves at (2,3)', () => {
                const othello = new Othello(8);
                othello.captureDisks({ row: 2, col: 3 }, Square.BLACK);
                const moves = othello.getValidMoves(Square.WHITE);
                // After Black moves at (2,3), White can move at (2,2), (2,4), (4,2)
                expect(moves).toEqual(
                    expect.arrayContaining([
                        { row: 2, col: 2 },
                        { row: 2, col: 4 },
                        { row: 4, col: 2 }
                    ])
                );
                expect(moves.length).toBe(3);
            });

            it('should return an empty array if there are no valid moves for the player', () => {
                const othello = new Othello(8);
                // Fill the board with BLACK except one empty spot
                for (let row = 0; row < 8; row++) {
                    for (let col = 0; col < 8; col++) {
                        othello['board'][row][col] = Square.BLACK;
                    }
                }
                othello['board'][7][7] = Square.NONE;
                const moves = othello.getValidMoves(Square.WHITE);
                expect(moves).toEqual([]);
            });

            it('should not return positions that are already occupied', () => {
                const othello = new Othello(8);
                // Fill a spot with BLACK
                othello['board'][2][3] = Square.BLACK;
                const moves = othello.getValidMoves(Square.BLACK);
                // (2,3) should not be a valid move anymore
                expect(moves).not.toContainEqual({ row: 2, col: 3 });
            });

            it('should return correct valid moves after several moves', () => {
                const othello = new Othello(8);
                othello.captureDisks({ row: 2, col: 3 }, Square.BLACK);
                othello.captureDisks({ row: 2, col: 2 }, Square.WHITE);
                const moves = othello.getValidMoves(Square.BLACK);
                // After these moves, Black should have valid moves at (2,4), (4,2), (1,2)
                expect(moves).toEqual(
                    expect.arrayContaining([
                        { row: 2, col: 4 },
                        { row: 4, col: 2 },
                        { row: 1, col: 2 }
                    ])
                );
            });

            describe('togglePlayer', () => {
                it('should switch from BLACK to WHITE', () => {
                    const othello = new Othello(8);
                    expect(othello.currentPlayer).toBe(Square.BLACK);
                    othello.togglePlayer();
                    expect(othello.currentPlayer).toBe(Square.WHITE);
                });

                it('should switch from WHITE to BLACK', () => {
                    const othello = new Othello(8);
                    othello.currentPlayer = Square.WHITE;
                    othello.togglePlayer();
                    expect(othello.currentPlayer).toBe(Square.BLACK);
                });

                it('should toggle back and forth between players', () => {
                    const othello = new Othello(8);
                    expect(othello.currentPlayer).toBe(Square.BLACK);
                    othello.togglePlayer();
                    expect(othello.currentPlayer).toBe(Square.WHITE);
                    othello.togglePlayer();
                    expect(othello.currentPlayer).toBe(Square.BLACK);
                });
            });
        });
    });

});