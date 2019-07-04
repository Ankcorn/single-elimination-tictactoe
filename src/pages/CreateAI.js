import React, { useState } from 'react';
// import { injectMocks } from 'data-mocks-temp';
import Board from '../components/Board';
import Square from '../components/Square';
import UserAI from '../components/UserAI';
import Controls from '../components/Controls';
import useTicTacToe from '../hooks/tictactoe';
import useInterval from '../hooks/interval';
import logic from '../ai/logic';
import Leader from '../components/Leader';


function Create() {
  const [game, player, nextMove, resetGame, useWinner] = useTicTacToe();
  const [winners, setWinner] = useState({ p1: 0, p2: 0 });
  const [ai2, setAI2] = useState('game.indexOf(0)');
  const [panelOpen, setPanel] = useState(false);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(undefined);

  useWinner((winner) => {
    if (winner !== '0') {
      setWinner(winner === -1
        ? { ...winners, p1: winners.p1 + 1 }
        : { ...winners, p2: winners.p2 + 1 });
    }
  }, game);

  useInterval(() => {
    if (paused === false) {
      setError(undefined);
      try {
        if (player === 1) {
          nextMove(logic(game));
        } else {
          // eslint-disable-next-line no-eval
          nextMove(eval(ai2));
        }
      } catch (e) {
        setError(e.message);
        setPaused(!paused);
        setWinner({ p1: 0, p2: 0 });
        resetGame();
      }
    }
  }, 50);

  return (
    <div className="flex flex-col sm:flex-row">
      <Leader open={panelOpen} toggle={() => setPanel(!panelOpen)} />
      <div className="flex flex-col sm:flex-row justify-around items-center w-full h-full sm:h-screen bg-gray-200 ">
        <UserAI code={ai2} onCodeChange={setAI2} />
        <Board error={error}>
          {game.map((piece, i) => (
            <Square
              error={error}
              key={i}
              position={i}
              value={piece}
              onClick={() => nextMove(i)}
            />
          ))}
        </Board>
        <Controls
          paused={paused}
          winners={winners}
          setPaused={setPaused}
          setWinner={setWinner}
          resetGame={resetGame}
          setAI2={setAI2}
        />
      </div>
    </div>
  );
}

export default Create;
