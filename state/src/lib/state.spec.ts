import { Othello, Square, Position} from './state';

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

});