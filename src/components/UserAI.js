import React from 'react';

function UserAI({ code, onCodeChange }) {
  return (
    <div className="flex flex-col">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ai2">
  AI 2 Code
        <textarea value={code} onChange={e => onCodeChange(e.target.value)} rows="20" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ai2" type="text" placeholder="game.indexOf(0)" />
      </label>
    </div>
  );
}

export default UserAI;
