import React from 'react';

function ResetButton({ onClick }) {
  return (
    <button onClick={onClick} onKeyPress={onClick} type="button" className="bg-red-600 hover:bg-red-500 w-20 h-10 rounded shadow m-3">
      Reset
    </button>
  );
}

export default ResetButton;
