/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import Square from '../components/Square';
import Controls from '../components/Controls';
import useInterval from '../hooks/interval';

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

function Battle({ ai }) {
  /**
   * Code for fetching AI's
   */

  const [ais, setAIs] = useState(undefined);
  const [playerOne, setPlayerOne] = useState(undefined);
  const [playerTwo, setPlayerTwo] = useState(undefined);
  const [started, setStarted] = useState(false);
  const [locked, setLocked] = useState(false);

  async function fetchAIs() {
    if (ai) {
      const results = await ai.find().asArray();
      console.log({ results });
      setAIs(results);
    }
  }

  useEffect(() => { fetchAIs(); }, [ai]);

  /**
   * Code for game logic
   */
  const [initPlayer, setInitPlayer] = useState(-1);
  const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [player, setPlayer] = useState(initPlayer);
  const [playerOneWins, setPlayerOneWins] = useState(0);
  const [playerTwoWins, setPlayerTwoWins] = useState(0);
  const [winner, setWinner] = useState(0);
  const [turns, setNumberOfTurns] = useState(0);
  const [draw, setDraw] = useState(false);
  const reset = () => {
    setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setWinner(0); setNumberOfTurns(0);
    setPlayer(initPlayer * -1);
    setInitPlayer(initPlayer * -1);
  };

  const ai1 = ais && playerOne && (game => eval(ais.find(el => el.name === playerOne).code));
  const ai2 = ais && playerTwo && (game => eval(ais.find(el => el.name === playerTwo).code));

  useEffect(() => {
    if (checkWin(winConditions, board)) {
      const currentWinner = board[checkWin(winConditions, board)[0]];
      if (currentWinner === -1) {
        console.log('setting Player One Wins');
        setPlayerOneWins(playerOneWins + 1);
      } else if (currentWinner === 1) {
        console.log('setting Player Two Wins');
        setPlayerTwoWins(playerTwoWins + 1);
      }
      console.log({ currentWinner, playerOneWins, playerTwoWins });
    }
  }, [board]);

  function nextMove(position) {
    setBoard(board.map((piece, i) => {
      if (i === position) {
        return player;
      }
      return piece;
    }));
    setPlayer(player * -1);
  }

  function run() {
    setNumberOfTurns(turns + 1);
    if (!checkWin(winConditions, board) && turns < 9) {
      console.log(turns);
      if (player === -1) {
        nextMove(ai1(board));
      }

      if (player === 1) {
        nextMove(ai2(board));
      }
    } else {
      reset();
    }
  }
  // eslint-disable-next-line consistent-return
  function start() {
    if (playerOne && playerTwo && !locked) {
      return setLocked(true);
    }
    if (playerOne && playerTwo && locked && !started) {
      setStarted(true);
    }
  }
  const id = useInterval(() => {
    if (started && (playerOneWins + playerTwoWins) <= 19) {
      run();
    } else if ((playerOneWins + playerTwoWins) >= 20) {
      if (playerOneWins > 10) {
        setWinner(playerOne);
      }
      if (playerTwoWins > 10) {
        setWinner(playerTwo);
      }
      if (playerOneWins === playerTwoWins) {
        setDraw(true);
      }
      clearInterval(id);
    }
  }, 100);
  const reload = () => window.location.reload();
  return (
    <div className="flex justify-around items-center h-screen">
      <Controls
        locked={locked}
        value={playerOne}
        setPlayer={setPlayerOne}
        ais={ais}
        playerSelected={playerOne}
        wins={playerOneWins}
        winner={winner}
      />
      <div className="flex flex-col items-center">
        <button
          disabled={(!playerOne && !playerTwo) || (started && !draw)}
          onClick={!draw ? start : reload}
          className=" m-5  text-sm border-4 text-white py-1 px-2 rounded mr-3"
          type="button"
        >
          {draw ? 'Oh No! It\'s a draw. Lets Try Again' : (!playerOne || !playerTwo) ? 'Select your players' : !locked ? 'Lock The Players' : !started ? 'Start' : !winner ? 'Running' : `${winner} is the Winner`}
        </button>
        <Board error={false}>
          {board.map((piece, i) => (
            <Square
              error={false}
              key={i}
              position={i}
              value={piece}
            />
          ))}
        </Board>
      </div>
      <Controls
        locked={locked}
        value={playerTwo}
        setPlayer={setPlayerTwo}
        ais={ais}
        playerSelected={playerTwo}
        wins={playerTwoWins}
        winner={winner}
      />
    </div>
  );
}

export default Battle;
