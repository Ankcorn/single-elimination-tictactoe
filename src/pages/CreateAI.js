/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */
import React, { useState } from 'react';
import UserAI from '../components/UserAI';
import logic from '../ai/logic';
import TicTocToe from '../components/TicTacToe';


function Create({ ai }) {
  const [playerAI, setPlayerAI] = useState('game.indexOf(0)');

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex flex-col sm:flex-row justify-around items-center w-full h-full sm:h-screen ">
        <UserAI ai={ai} code={playerAI} onCodeChange={setPlayerAI} />
        <TicTocToe ai1={game => eval(playerAI)} ai2={logic} />
      </div>
    </div>
  );
}

export default Create;
