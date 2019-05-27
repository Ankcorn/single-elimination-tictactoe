import React from 'react';

function Badge({ color, player, won }) {
  return (
    <div className={`flex bg-${color}-600 w-auto h-10 rounded items-center shadow p-3 m-3`}>
      {`Player ${player} has won ${won} times!`}
    </div>
  );
}

export default Badge;
