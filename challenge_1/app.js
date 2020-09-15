console.log('Connected');

// class Obj to hold a game state
class Game {
  // initialize with starting player
  constructor(player) {
    this.board = [[ '', '', ''], [ '', '', ''], [ '', '', '']];
    this.gameOver = false;
    this.player = player;
    this.spaces = 9;
    this.map = {
      0: [0, 0],
      1: [1, 0],
      2: [2, 0],
      3: [0, 1],
      4: [1, 1],
      5: [2, 1],
      6: [0, 2],
      7: [1, 2],
      8: [2, 2]
    }
  }

  // toggle fcn to place block on board
  toggle(block) {
    // get block in matrix from div id
    var space = this.map[block];
    // place value on block
    this.board[space[0]][space[1]] = this.player;
    // decrement space left
    this.spaces -= 1;
  }

  // alternate players after each turn
  nextPlayer(str) {
    if (str === "X") {
      this.player = "O";
    } else {
      this.player = "X";
    }
  };

  // helper fcn to implement rules and check if a game is won
  checkWin(classNames) {
    // convert to an array of classes
    var classes = classNames.split(' ').slice(1);
    for (let i = 0; i < classes.length; i++) {
      // get blocks corresponding to the class
      var blocks = document.getElementsByClassName(classes[i]);
      // set var to keep track of x/o
      var x_count = 0;
      var o_count = 0;
      // iterate each div block and increment counts
      for (let j = 0; j < blocks.length; j++) {
        // get block id
        let block = blocks[j].id;
        let space = this.map[block];
        let value = this.board[space[0]][space[1]];
        if (value === 'X') {
          x_count += 1;
        } else if (value === 'O') {
          o_count += 1;
        }
      }
      // if count === 3 -> win
      if (x_count === 3 || o_count === 3) {
        return true;
      }
    }
    return false;
  };
};

// initialize new game;
myGame = new Game('X');

// when a block on board is clicked in html
function clickHandler(block, classNames) {
  var space = myGame.map[block];
  // only run if game is still going
  if (myGame.board[space[0]][space[1]] === '' && !myGame.gameOver) {
    // toggle piece onto game board
    myGame.toggle(block);
    // update view on index.html
    updateView();
    // update game status
    updateStatus(classNames);
    myGame.nextPlayer(myGame.player);
  }
}

// update view in index.html according to matrix
function updateView() {
  for (let i = 0; i < 9; i++) {
    var block = myGame.map[i];
    document.getElementById(i).innerHTML = myGame.board[block[0]][block[1]];
  }
}

// update game status after a players turn
function updateStatus(classNames) {
  // check game status
  if (myGame.checkWin(classNames)) {
    // update status of game and set gameover
    gameStatus(myGame.player, 'win');
    myGame.gameOver = true;
    return;
  } else if (myGame.spaces === 0) {
    // update status of game and set gameover
    gameStatus(myGame.player, 'tie');
    myGame.gameOver= true;
    return;
  } else {
     // update html text
    gameStatus(myGame.player)
  }
}

// update html text on page according to the status of the game
function gameStatus(player, status) {
  if (status === 'win') {
    document.getElementById("status").innerHTML = `${player} Wins!`;
    document.getElementById("reset-btn").innerHTML = "Play Again?";
    // increment score on html
    scores(player);
  } else if (status === 'tie') {
    document.getElementById("status").innerHTML = 'Tied Game!';
    document.getElementById("reset-btn").innerHTML = "Play Again?";
    scores('tied');
  } else {
    if (player === "O") {
      document.getElementById("status").innerHTML = "Player X's Turn!";
    } else if (player === "X") {
      document.getElementById("status").innerHTML = "Player O's Turn!";
    }
  }
};

// update scores
function scores(player) {
  var score = document.getElementById(player);
  console.log(score);
  var number = score.innerHTML;
  number++;
  score.innerHTML = number;
}

// resets game when button is pressed
function reset() {
  // make a new game object
  myGame = new Game('X');
  // update the view
  updateView();
  document.getElementById("status").innerHTML = "Start Game!";
  document.getElementById("reset-btn").innerHTML = "Reset Game";
};
