// functional component for each square on the board
import React from 'react';

function Square(props) {
  return (
    <div className={`square row-${props.x} col-${props.y}`}>
      {props.value}
    </div>
  );
}

export default Square;