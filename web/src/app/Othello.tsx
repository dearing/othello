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
        <>
            <div>
                <ul>
                    <li>boardSize: {boardSize}</li>
                    <li>scoreBlack: {scoreBlack}</li>
                    <li>scoreWhite: {scoreWhite}</li>
                    <li>board: {JSON.stringify(game?.getBoard())}</li>
                    <li>validMoves: {JSON.stringify(game?.getValidMoves(game?.currentPlayer))}</li>
                </ul>
            </div>

            <div>
                <h2>{game?.getStatus()}</h2>
                <table>
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
                                                border: '1px solid black',
                                                background: isValidMove ? '#cfc' : undefined,
                                                cursor: isValidMove ? 'pointer' : 'default'
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
                                                    setGame(updatedGame);
                                                }
                                            }}
                                        >
                                            {square === Square.BLACK ? 'B' : square === Square.WHITE ? 'W' : ''}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>

    )
}

export default OthelloBoard;