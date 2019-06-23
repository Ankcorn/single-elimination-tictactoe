import React from 'react';

function Board({ children, error }) {
  return (
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
  );
}

export default Board;
