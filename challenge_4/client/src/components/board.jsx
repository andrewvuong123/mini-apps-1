// main component
import React from 'react';
import Square from './square.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // intiialze a 6x7 empty board
      board: [['', '' , '' , '', '', '', ''], ['', '' , '' , '', '', '', ''], ['', '' , '' , '', '', '', ''], ['', '' , '' , '', '', '', ''], ['', '' , '' , '', '', '', ''], ['', '' , '' , '', '', '', '']],
      player: 'R',
      gameOver: false,
      spaces: 42
    };
    this.handleDrop = this.handleDrop.bind(this);
  }

  // create square given row/col
  renderSquare(row, col) {
    return (
      // square component has x/y coordinates and the board
      <Square x={row} y={col} value={this.state.board[row][col]}/>
    );
  }

  // create button to drop piece
  handleDrop(col) {
    // map through rows from bottom-up and set value on next available spot
    const update_board = this.state.board;
    for (let row = 5; row >= 0; row--) {
      var value = update_board[row][col];
      console.log('value', value);
      if (value === '') {
        update_board[row][col] = this.state.player;
        break;
      }
    }
    this.setState({
      board: update_board,
      player: this.nextPlayer(this.state.player),
      spaces: this.state.spaces - 1
    })
  }

  // switch between players
  nextPlayer(player) {
    if (player === 'R') {
      return 'B';
    }
    return 'R';
  }

  // check for wins
  handleWin() {
    // when a piece is dropped at row/col, need to check up, down, right, left, diag 3s and see if any have same player
    // if no spaces left, return tied

  }

  render() {
    return (
      <div className="board">
        <div className="drop-btn">
        <button className="btn" onClick={() => this.handleDrop(0)}>Drop</button>
        <button className="btn" onClick={() => this.handleDrop(1)}>Drop</button>
        <button className="btn" onClick={() => this.handleDrop(2)}>Drop</button>
        <button className="btn" onClick={() => this.handleDrop(3)}>Drop</button>
        <button className="btn" onClick={() => this.handleDrop(4)}>Drop</button>
        <button className="btn" onClick={() => this.handleDrop(5)}>Drop</button>
        <button className="btn" onClick={() => this.handleDrop(6)}>Drop</button>
        </div>
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
          {this.renderSquare(0, 3)}
          {this.renderSquare(0, 4)}
          {this.renderSquare(0, 5)}
          {this.renderSquare(0, 6)}
        </div>
        <div className="board-row">
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
          {this.renderSquare(1, 3)}
          {this.renderSquare(1, 4)}
          {this.renderSquare(1, 5)}
          {this.renderSquare(1, 6)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
          {this.renderSquare(2, 3)}
          {this.renderSquare(2, 4)}
          {this.renderSquare(2, 5)}
          {this.renderSquare(2, 6)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, 0)}
          {this.renderSquare(3, 1)}
          {this.renderSquare(3, 2)}
          {this.renderSquare(3, 3)}
          {this.renderSquare(3, 4)}
          {this.renderSquare(3, 5)}
          {this.renderSquare(3, 6)}
        </div>
        <div className="board-row">
          {this.renderSquare(4, 0)}
          {this.renderSquare(4, 1)}
          {this.renderSquare(4, 2)}
          {this.renderSquare(4, 3)}
          {this.renderSquare(4, 4)}
          {this.renderSquare(4, 5)}
          {this.renderSquare(4, 6)}
        </div>
        <div className="board-row">
          {this.renderSquare(5, 0)}
          {this.renderSquare(5, 1)}
          {this.renderSquare(5, 2)}
          {this.renderSquare(5, 3)}
          {this.renderSquare(5, 4)}
          {this.renderSquare(5, 5)}
          {this.renderSquare(5, 6)}
        </div>
      </div>
    );
  }
}

export default Board;