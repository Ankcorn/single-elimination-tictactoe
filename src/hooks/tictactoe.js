import { useState, useEffect } from 'react';


function useTicTacToe() {
  const initialState = Array(9).fill(0);
  const initialPlayer = 1;
  const [lastPlayer, setLastPlayer] = useState(initialPlayer);

  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  const [game, setGame] = useState(initialState);
  const [player, setPlayer] = useState(initialPlayer);

  function resetGame() {
    setGame(initialState);
    setPlayer(lastPlayer * -1);
    setLastPlayer(lastPlayer * -1);
  }
  function nextMove(position) {
    if (game[position] !== 0) throw new Error('That space is already taken');
    setPlayer(player * -1);
    setGame([...game].map((el, i) => (i === position ? player : el)));
  }

  function useWinner(callback, gameState) {
    useEffect(() => {
      const isWin = winConditions.find(
        el => gameState[el[0]] === gameState[el[1]]
        && gameState[el[1]] === gameState[el[2]]
        && gameState[el[0]] !== 0
        && gameState[el[1]] !== 0
        && gameState[el[3]] !== 0,
      );
      if (isWin || !gameState.includes(0)) {
        resetGame();
        callback(isWin ? player : '0');
      }
    }, [gameState, callback]);
  }
  return [game, player, nextMove, resetGame, useWinner];
}

export default useTicTacToe;
