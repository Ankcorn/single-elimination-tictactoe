import React, { useState } from 'react';
// import { injectMocks } from 'data-mocks-temp';
import Board from '../components/Board';
import Square from '../components/Square';
import UserAI from '../components/UserAI';
import Controls from '../components/Controls';
import useTicTacToe from '../hooks/tictactoe';
import useInterval from '../hooks/interval';
import logic from '../ai/logic';


function Create() {
  const game = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let player = 1;
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  const [board, setBoard] = useState(game);
  const [playerAI, setPlayerAI] = useState('game.indexOf(0)');
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(undefined);

  function checkWin() {
    const isWin = winConditions.find(
      el => game[el[0]] === game[el[1]]
      && game[el[1]] === game[el[2]]
      && game[el[0]] !== 0
      && game[el[1]] !== 0
      && game[el[3]] !== 0,
    );
    return isWin;
  }
  function nextMove(position) {
    game[position] = player;
    console.log(game);
  }
  const id = useInterval(() => {
    if (checkWin()) {
      setPaused(true);
      console.log('winner is', player);
      clearInterval(id);
    }
    if (paused === false) {
      setError(undefined);
      try {
        if (player === 1) {
          nextMove(logic(game));
          player *= -1;
          setBoard(game);
        } else {
          // eslint-disable-next-line no-eval
          nextMove(eval(playerAI));
          setBoard(game);
        }
      } catch (e) {
        console.log(e.message);
        setError(e.message);
        setPaused(true);
        // setWinner({ p1: 0, p2: 0 });
        // resetGame();
      }
    }
  }, 1000);

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex flex-col sm:flex-row justify-around items-center w-full h-full sm:h-screen bg-gray-200 ">
        <UserAI code={playerAI} onCodeChange={setPlayerAI} />
        <Board error={error}>
          {board.map((piece, i) => (
            <Square
              error={error}
              key={i}
              position={i}
              value={piece}
              onClick={() => nextMove(i)}
            />
          ))}
        </Board>
        {/* <Controls
          paused={paused}
          winners={winners}
          setPaused={setPaused}
          setWinner={setWinner}
          resetGame={() => { game = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; }}
          setAI2={setAI2}
        /> */}
      </div>
    </div>
  );
}

export default Create;
