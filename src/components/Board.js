import React from 'react';

function Board({ children, error }) {
  return (
    <div>
      <button className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded mr-3" type="button">
        Test
      </button>
      <div className="flex flex-col">
        <div className="flex justify-around">
          {children.slice(0, 3)}
        </div>
        <div className="flex justify-around">
          {children.slice(3, 6)}
        </div>
        <div className="flex justify-around">
          {children.slice(6, 9)}
        </div>
        <p className="text-red-400 font-bold">{error}</p>
      </div>
    </div>
  );
}

export default Board;
