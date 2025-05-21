import { useState, useEffect } from 'react';
import { Othello, Square } from '@othello/state'

const GameStatus = ({
  currentPlayer,
  blackCount,
  whiteCount
}: {
  currentPlayer: Square;
  blackCount: number;
  whiteCount: number;
}) => {
  return (
    <div className="mt-4 text-xl status-section">
      <div className="flex items-center mb-2">
        <div className="mr-2">Current Player:</div>
        <div className={`w-6 h-6 rounded-full ${currentPlayer === Square.BLACK ? 'bg-black' : 'bg-white border border-gray-400'} piece`}></div>
      </div>
      <div className="flex gap-6">
        <div className="flex items-center score-indicator">
          <div className="w-6 h-6 rounded-full bg-black mr-2 piece"></div>
          <div>Black: {blackCount}</div>
        </div>
        <div className="flex items-center score-indicator">
          <div className="w-6 h-6 rounded-full bg-white border border-gray-400 mr-2 piece"></div>
          <div>White: {whiteCount}</div>
        </div>
      </div>
    </div>
  );
};

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
            {/* <GameStatus size={boardSize} currentPlayer={Square.BLACK} blackCount={scoreBlack} whiteCount={scoreWhite}/> */}
            <ul>
                <li>boardSize: {boardSize}</li>
                <li>scoreBlack: {scoreBlack}</li>
                <li>scoreWhite: {scoreWhite}</li>
                <li>validMoves: {game?.getValidMoves(Square.BLACK).length}</li>
            </ul>
        </div>
    )
}

export default OthelloBoard 