/* eslint-disable react/prop-types */
import React from 'react';
import X from 'react-feather/dist/icons/x';
import O from 'react-feather/dist/icons/circle';

function Square({
  value, position, error,
}) {
  const isEmpty = () => value === 0;

  return (
    <button
      type="button"
      title={`Square ${position}`}
      // onClick={() => isEmpty() && onClick()}
      // onKeyPress={handleKeyPress}
      className={`bg-gray-600 ${error ? 'border-red-400 border-4' : ''} text-gray-100 hover:bg-gray-500 w-20 h-20 m-1 rounded shadow-inner-xl flex justify-center items-center`}
    >
      {!isEmpty() && (value === 1 ? (
        <X size={64} strokeWidth={2} />
      ) : (
        <O size={64} strokeWidth={2} />
      ))}
    </button>
  );
}

export default Square;
