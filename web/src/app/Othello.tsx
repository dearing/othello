import { useState, useEffect } from 'react';
import { Othello, Square } from '@othello/state'


function OthelloBoard() {
    const [game, setGame] = useState<Othello | null>(null);

    useEffect(() => {
        const newGame = new Othello(8); // explicit set for Othello
        setGame(newGame)
    }, []);

    const boardSize = game?.boardSize
    const scoreBlack = game?.getScore(Square.BLACK)
    const scoreWhite = game?.getScore(Square.WHITE)

    // capture a move to test the capture logic
    // game?.captureDisks({ row: 5, col: 2 }, Square.BLACK)
    // game?.togglePlayer() // toggle to white

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'
        }}>
            <div style={{
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontSize: '24px',
                    color: '#2e7d32',
                    marginBottom: '10px'
                }}>{game?.getStatus()}</h2>
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'center',
                    fontSize: '18px'
                }}>
                    <div>Black: {scoreBlack}</div>
                    <div>White: {scoreWhite}</div>
                </div>
            </div>

            <table style={{ 
                backgroundColor: '#1b5e20', 
                borderSpacing: '2px', 
                padding: '8px',
                border: '8px solid #2e7d32',
                borderRadius: '4px',
            }}>
                <tbody>
                    {game?.getBoard().map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((square, colIndex) => {
                                const isValidMove = game?.getValidMoves(game.currentPlayer)
                                    .some(move => move.row === rowIndex && move.col === colIndex);

                                return (
                                    <td
                                        key={colIndex}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            textAlign: 'center',
                                            backgroundColor: '#2e7d32',
                                            cursor: isValidMove ? 'pointer' : 'default',
                                            position: 'relative',
                                            border: '2px solid #1b5e20', // Add cell borders
                                            borderRadius: '2px',         // Slightly round the cell corners
                                        }}
                                        onClick={() => {
                                            if (isValidMove && game) {
                                                const updatedGame = new Othello(game.boardSize);
                                                // Copy the current game state
                                                updatedGame.board = game.board.map(row => [...row]);
                                                updatedGame.currentPlayer = game.currentPlayer;

                                                // Make the move
                                                updatedGame.captureDisks({ row: rowIndex, col: colIndex }, updatedGame.currentPlayer);
                                                updatedGame.togglePlayer();

                                                // Check if next player needs to skip
                                                if (updatedGame.shouldSkipTurn()) {
                                                    updatedGame.togglePlayer();
                                                }

                                                setGame(updatedGame);
                                            }
                                        }}
                                    >
                                        {(square === Square.BLACK || square === Square.WHITE) && (
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                backgroundColor: square === Square.BLACK ? '#000' : '#fff',
                                                position: 'absolute',
                                                top: '5px',
                                                left: '5px',
                                                boxShadow: '2px 2px 2px rgba(0,0,0,0.2)'
                                            }} />
                                        )}
                                        {isValidMove && (
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                backgroundColor: game.currentPlayer === Square.BLACK ? '#000' : '#fff',
                                                opacity: 0.4,
                                                position: 'absolute',
                                                top: '15px',
                                                left: '15px'
                                            }} />
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OthelloBoard;