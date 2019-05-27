import React from 'react';

function Board({ children }) {
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
    </div>
  );
}

export default Board;
