import React, { useState } from 'react';
import Board from './components/Board';
import Square from './components/Square';
import Button from './components/Button';
import useTicTacToe from './hooks/tictactoe';
import useInterval from './hooks/interval';
import Badge from './components/Badge';
import logic from './ai/logic';

function App() {
  const [game, player, nextMove, resetGame, useWinner] = useTicTacToe();
  const [winners, setWinner] = useState({ p1: 0, p2: 0 });
  const [ai2, setAI2] = useState('game.indexOf(0)');
  const [paused, setPaused] = useState(false);
  useWinner((winner) => {
    if (winner !== '0') {
      setWinner(winner === -1
        ? { ...winners, p1: winners.p1 + 1 }
        : { ...winners, p2: winners.p2 + 1 });
    }
  }, game);

  useInterval(() => {
    if (paused === false) {
      if (player === 1) {
        nextMove(logic(game));
      } else {
        try {
          // eslint-disable-next-line no-eval
          nextMove(eval(ai2));
        } catch (e) {
          setPaused(!paused);
          setWinner({ p1: 0, p2: 0 });
          resetGame();
        }
      }
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
        <Button
          onClick={() => {
            setPaused(!paused);
            setWinner({ p1: 0, p2: 0 });
            resetGame();
          }}
          text={paused ? 'Play' : 'Pause'}
        />
        <Button
          onClick={() => {
            setWinner({ p1: 0, p2: 0 });
            resetGame();
            setAI2('game.indexOf(0)');
          }}
          text="Reset"
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ai2">
          AI 2 Code
          <textarea value={ai2} onChange={e => setAI2(e.target.value)} rows="5" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ai2" type="text" placeholder="game.indexOf(0)" />
        </label>

      </div>
    </div>
  );
}

export default App;