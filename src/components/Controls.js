import React from 'react';
import Badge from './Badge';
import Button from './Button';

function Controls({
  winners, paused, setPaused, setWinner, resetGame, setAI2,
}) {
  return (
    <div className="flex flex-col">
      <Badge color="green" player={1} won={winners.p1} />
      <Badge color="blue" player={2} won={winners.p2} />
      <Button
        onClick={() => {
          setPaused(!paused);
          setWinner({ p1: 0, p2: 0 });
          resetGame();
        }}
        text={paused ? 'Start' : 'Stop'}
      />
      <Button
        onClick={() => {
          setWinner({ p1: 0, p2: 0 });
          resetGame();
          setAI2('game.indexOf(0)');
        }}
        text="Reset"
      />
    </div>
  );
}

export default Controls;
