// functional component for each square on the board
import React from 'react';
import {$,jQuery} from 'jquery';

function Square(props) {
  if (props.value === 'R') {
    return (
      <div className={`square row-${props.x} col-${props.y}`}>
        <span className='red-dot'></span>
      </div>
    );
  } else if (props.value === 'B') {
    return (
      <div className={`square row-${props.x} col-${props.y}`}>
        <span className='black-dot'></span>
      </div>
    );
  } else {
    return (
      <div className={`square row-${props.x} col-${props.y}`}>
      </div>
    );
  }
}

export default Square;