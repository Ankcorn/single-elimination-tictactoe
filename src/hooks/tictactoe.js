import { useState } from 'react';


function useTicTacToe() {
  const initialState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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

  return [game, player, nextMove, resetGame, winConditions];
}

export default useTicTacToe;
