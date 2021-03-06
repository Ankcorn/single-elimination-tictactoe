/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Board from './Board';
import Square from './Square';

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWin(winningCombinations, gameState) {
  const isWin = winningCombinations.find(
    el => gameState[el[0]] === gameState[el[1]]
    && gameState[el[1]] === gameState[el[2]]
    && gameState[el[0]] !== 0
    && gameState[el[1]] !== 0
    && gameState[el[3]] !== 0,
  );
  return isWin;
}

function TicTacToe({ ai1, ai2 }) {
  const [toggle, togglePlayer] = useState(false);
  const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [player, setPlayer] = useState(-1);
  const [winner, setWinner] = useState(0);
  const [turns, setnumberOfTurns] = useState(0);
  const [error, setError] = useState(undefined);

  const reset = () => {
    setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setWinner(0);
    setnumberOfTurns(0);
    setPlayer(-1);
    togglePlayer(false);
  };

  useEffect(() => {
    if (checkWin(winConditions, board)) {
      setWinner(board[checkWin(winConditions, board)[0]]);
    }
  }, [board]);

  function nextMove(position) {
    if (board[position] !== 0) {
      setError('No Cheating! Your AI Went in a space that was already taken.');
      reset();
    } else {
      setError(undefined);
      setBoard(board.map((piece, i) => {
        if (i === position) {
          return player;
        }
        return piece;
      }));
      setPlayer(player * -1);
    }
  }

  function run() {
    setnumberOfTurns(turns + 1);
    if (!checkWin(winConditions, board)) {
      if (player === -1) {
        console.log('player 1');
        nextMove(ai1(board));
      }

      if (player === 1) {
        console.log('player 2');
        nextMove(ai2(board));
      }
    }
  }

  function changePlayer() {
    console.log('clicked');
    togglePlayer(!toggle);
    if (toggle === false) {
      setPlayer(1);
    } else {
      setPlayer(-1);
    }
  }

  return (
    <div className="flex flex-col items-center">
      {turns === 0 && (
      <button onClick={changePlayer} className={`flex ${winner ? winner === 1 ? 'bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700' : 'bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700' : 'bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700'}  m-5  text-sm border-4 text-white py-1 px-2 rounded mr-3`} type="button">
        {!toggle ? 'You are first - Click to change' : 'The AI is first - Click to change'}
      </button>
      )}

      <button onClick={winner === 0 ? run : reset} className={`flex ${winner ? winner === 1 ? 'bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700' : 'bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700' : 'bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700'}  m-5  text-sm border-4 text-white py-1 px-2 rounded mr-3`} type="button">
        {winner === 0 ? turns > 0 ? 'Next Turn' : 'Test your AI' : `The Winner is ${winner === 1 ? 'Computer' : 'You'} click to RESET`}
      </button>
      <Board error={error}>
        {board.map((piece, i) => (
          <Square
            error={error}
            key={i}
            position={i}
            value={piece}
          />
        ))}
      </Board>
    </div>
  );
}

export default TicTacToe;
