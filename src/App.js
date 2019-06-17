import React, { useState } from 'react';
import Board from './components/Board';
import Square from './components/Square';
import ResetButton from './components/Reset';
import useTicTacToe from './hooks/tictactoe';
import useInterval from './hooks/interval';
import Badge from './components/Badge';
import logic from './ai/logic';

function App() {
  const [game, player, nextMove, resetGame, useWinner] = useTicTacToe();
  const [winners, setWinner] = useState({ p1: 0, p2: 0 });

  useWinner((winner) => {
    if (winner !== '0') {
      setWinner(winner === -1
        ? { ...winners, p1: winners.p1 + 1 }
        : { ...winners, p2: winners.p2 + 1 });
    }
  }, game);

  useInterval(() => {
    if (player === 1) {
      nextMove(logic(game));
    } else {
      nextMove(game.indexOf(0));
    }
  }, 50);

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
        <ResetButton onClick={() => {
          setWinner({ p1: 0, p2: 0 });
          resetGame();
        }}
        />
      </div>

    </div>
  );
}

export default App;
