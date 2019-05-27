/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Square from './components/Square';
import ResetButton from './components/Reset';
import useTicTacToe from './hooks/tictactoe';
import Badge from './components/Badge';
import aiMove from './api';

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
}
function App() {
  const [game, nextMove, resetGame, useWinner] = useTicTacToe();
  const [winners, setWinner] = useState({ p1: 0, p2: 0 });

  useWinner((player) => {
    setWinner(player === -1
      ? { ...winners, p1: winners.p1 + 1 }
      : { ...winners, p2: winners.p2 + 1 });
  }, game);
  const ai = useCallback(async () => {
    const url = '/.netlify/functions/brain';
    await delay(1000);
    const move = await aiMove(url, game);
    nextMove(move);
  }, [game, nextMove]);

  useEffect(() => {
    ai();
  }, [nextMove]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-200 ">
      <Board>
        {game.map((piece, i) => (
          <Square
            key={i}
            position={i}
            value={piece}
            onClick={() => nextMove(i)}
          />
        ))}
      </Board>
      <div className="flex flex-col">
        <Badge color="green" player={1} won={winners.p1} />
        <Badge color="blue" player={2} won={winners.p2} />
        <ResetButton onClick={resetGame} />
      </div>

    </div>
  );
}

export default App;
