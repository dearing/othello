import { useState, useEffect } from 'react';
import { Othello, Square } from '@othello/state'

function OthelloBoard() {
    const [game, setGame] = useState<Othello | null>(null);

    useEffect(() => {
        const newGame = new Othello(8); // explicit set for Othello
        setGame(newGame)
    });

    const boardSize = game?.boardSize
    const scoreBlack = game?.getScore(Square.BLACK)
    const scoreWhite = game?.getScore(Square.WHITE)

    return (
        <div>
            <ul>
            <li>boardSize: {boardSize}</li>
            <li>scoreBlack: {scoreBlack}</li>
            <li>scoreWhite: {scoreWhite}</li>
            </ul>
        </div>
    )
}

export default OthelloBoard