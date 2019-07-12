import React, { useState, useEffect } from 'react';
import TicTacToe from '../components/TicTacToe';

function Battle({ ai }) {
  const [ais, setAIs] = useState([]);
  const [playerOne, setPlayerOne] = useState(undefined);
  const [playerTwo, setPlayerTwo] = useState(undefined);

  async function fetchAIs() {
    if (ai) {
      const results = await ai.find().asArray();
      console.log({ results });
      setAIs(results);
    }
  }

  useEffect(() => { fetchAIs(); }, [ai]);

  console.log({ playerOne, playerTwo });
  return (
    <div className="flex justify-around items-center h-screen">
      <select value={playerOne} className="rounded-lg border-4 border-teal-500 hover:border-teal-600 bg-teal-500 hover:bg-teal-600 text-white font-bold leading-loose shadow-md" name="playerOne" onChange={e => setPlayerOne(e.target.value)}>
        {ais && ais.map(el => <option>{el.name}</option>)}
      </select>
      <TicTacToe ai1={game => eval(ais.find(el => el.name === playerOne).code)} ai2={game => eval(ais.find(el => el.name === playerTwo).code)} />
      <select value={playerTwo} className="rounded-lg border-4 border-teal-500 hover:border-teal-600 bg-teal-500 hover:bg-teal-600 text-white font-bold leading-loose shadow-md" name="playerTwo" onChange={e => setPlayerTwo(e.target.value)}>
        {ais && ais.map(el => <option>{el.name}</option>)}
      </select>
    </div>
  );
}

export default Battle;
