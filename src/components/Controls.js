import React from 'react';

function Controls({
  ais, setPlayer, value, locked, playerSelected, wins, winner,
}) {
  return (
    <div className="flex flex-col">
      {!locked ? (
        <select value={value} className="rounded-lg border-4 border-teal-500 hover:border-teal-600 bg-teal-500 hover:bg-teal-600 text-white font-bold leading-loose shadow-md" name="playerOne" onChange={e => setPlayer(e.target.value)}>
          <option disabled selected value> -- select an option -- </option>
          {ais && ais.map(el => <option key={el.name}>{el.name}</option>)}
        </select>
      )
        : (
          <div className={` ${winner === playerSelected ? 'border-green-600' : ''} bg-gray-200 border-gray-200 shadow rounded-lg border-8 flex flex-col items-center`}>
            <h1 className="text-xl font-bold">{playerSelected}</h1>
            <p>
              {`Wins: ${wins}`}
            </p>
          </div>
        )
      }
    </div>
  );
}

export default Controls;
