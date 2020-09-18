// main component
import React from 'react';
import Square from './square.jsx';
import {$,jQuery} from 'jquery';

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
      <Square x={row} y={col} value={this.state.board[row][col]} player={this.state.player}/>
    );
  }

  // create button to drop piece
  handleDrop(col) {
    // map through rows from bottom-up and set value on next available spot
    if (!this.state.gameOver) {
      const update_board = this.state.board;
      var spaces_left = this.state.spaces;
      for (let row = 5; row >= 0; row--) {
        var value = update_board[row][col];
        if (value === '') {
          update_board[row][col] = this.state.player;
          spaces_left -= 1;
          // initialize a var x for the row of the placed piece to pass into handleWin
          var x = row;
          break;
        }
      }
      // check game status
      this.handleWin(spaces_left, x, col, update_board);
    }
  }

  // switch between players
  nextPlayer(player) {
    if (player === 'R') {
      return 'B';
    }
    return 'R';
  }

  // check for wins
  handleWin(space_left, row, col, update_board) {
    // if invalid row, return
    if (row === undefined) {
      return;
    }
    // if no spaces left, return tied and update state
    if (space_left === 0) {
      this.gameStatus('TIED');
      this.setState({
        gameOver: true
      });
      return;
    }
    // if win, update state and text
    if (this.checkRows(row, col) || this.checkCols(row, col) || this.checkDiag(row, col)) {
      console.log('here')
      this.gameStatus('WINNER');
      this.setState({
        gameOver: true
      });
      return;
    }
    // keep playing if not over
    this.gameStatus('continue');
    this.setState({
      board: update_board,
      player: this.nextPlayer(this.state.player),
      spaces: space_left
    });
    return;
  }

  checkRows(row, col) {
    // counter var for each player
    var count = 0;
    var player = this.state.player;
    // create arr of available spaces to check horizontally
    var spaces = [];
    for (let i = -3; i <= 3; i++) {
      if (col + i >= 0 && col + i < 7) {
        spaces.push(col + i);
      }
    }
    // check each left/right space to see if theres a win
    for (let i = 0; i < spaces.length; i++) {
      if (this.state.board[row][spaces[i]] === player) {
        count += 1;
        if (count === 4) {
          return true;
        }
      } else {
        // reset count if not consecutive 4
        count = 0;
      }
    }
    return false;
  }

  checkCols(row, col) {
    // counter var for each player
    var count = 0;
    var player = this.state.player;
    // create arr of available spaces to check horizontally
    var spaces = [];
    for (let i = -3; i <= 3; i++) {
      if (row + i >= 0 && row + i < 6) {
        spaces.push(row + i);
      }
    }
    // check each left/right space to see if theres a win
    for (let i = 0; i < spaces.length; i++) {
      if (this.state.board[spaces[i]][col] === player) {
        count += 1;
        if (count === 4) {
          return true;
        }
      } else {
        // reset count if not consecutive 4
        count = 0;
      }
    }
    return false;
  }

  checkDiag(row, col) {
    var result = false;
    var board = this.state.board;
    if (board[row][col] != '') {
      // top right diagonal
      if (row - 3 > -1 && col + 3 < 7) {
        // check manually lol
        result = board[row][col] == board[row - 1][col + 1] && board[row][col] == board[row - 2][col + 2] && board[row][col] == board[row - 3][col + 3];
      }
      // bottom right
      if (row + 3 < 6 && col + 3 < 7) {
        result = board[row][col] == board[row + 1][col + 1] && board[row][col] == board[row + 2][col + 2] && board[row][col] == board[row + 3][col + 3];
      }
      // bottom left
      if (row + 3 < 6 && col - 3 > -1) {
        result = board[row][col] == board[row + 1][col - 1] && board[row][col] == board[row + 2][col - 2] && board[row][col] == board[row + 3][col - 3];
      }
      // top left
      if (row - 3 > -1 && col - 3 > -1) {
        result = board[row][col] == board[row - 1][col - 1] && board[row][col] == board[row - 2][col - 2] && board[row][col] == board[row - 3][col - 3];
      }
    }
    console.log(result);
    return result;
  }

  // render ingame text on html
  gameStatus(status) {
    if (status === 'TIED' || status === 'WINNER') {
      document.getElementById('gamestatus').innerHTML = status;
    } else {
      if (this.state.player === 'R') {
        document.getElementById('gamestatus').innerHTML = "Black's Turn!";
      } else {
        document.getElementById('gamestatus').innerHTML = "Red's Turn!";
      }
    }
  }


  render() {
    return (
      <div className="board">
        <h1 id="gamestatus">Start A Game!</h1>
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