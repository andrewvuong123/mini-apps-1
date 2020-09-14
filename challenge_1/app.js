console.log('Connected');

// global var for curr player, spaces left on board, game status
var player = "X";
var spaces = 9;
var gameOver = false;

// toggles block by id when clicked
function toggle(block, classNames) {
  var space = document.getElementById(block).innerHTML;
  // only toggle a value if the block has a blank space and game is not over
  if (space === "" && !gameOver) {
    // place value on block
    document.getElementById(block).innerHTML = player;
    // decrement space left
    spaces -= 1;
    // check game status
    if (checkWin(classNames)) {
      // update status of game and set gameover
      gameStatus(player, 'win');
      console.log('true');
      gameOver = true;
      return;
    } else if (spaces === 0) { // if no more spaces -> tie
      // update status of game and set gameover
      gameStatus(player, 'tie');
      console.log('tie');
      gameOver= true;
      return;
    }
    // change player
    player = nextPlayer(player);
    // update game text for next player
    gameStatus(player);
  }
};

// alternate players
function nextPlayer(str) {
  if (str === "X") {
    return "O";
  }
  return "X";
};

// rules implementation
function checkWin(classNames) {
  // convert to an array of classes
  var classes = classNames.split(' ').slice(1);
  for (let i = 0; i < classes.length; i++) {
    // get blocks corresponding to the class
    var blocks = document.getElementsByClassName(classes[i]);
    // set var to keep track of x/o
    var x_count = 0;
    var o_count = 0;
    // iterate each block and increment counts
    for (let j = 0; j < blocks.length; j++) {
      let value = blocks[j].innerHTML
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

// update text to interchange players/win/tie
function gameStatus(player, status) {
  if (status === 'win') {
    console.log('winner');
    document.getElementById("status").innerHTML = `${player} Wins!`;
  } else if (status === 'tie') {
    document.getElementById("status").innerHTML = 'Tied Game!';
  } else {
    if (player === "X") {
      document.getElementById("status").innerHTML = "Player X's Turn!";
    } else if (player === "O") {
      document.getElementById("status").innerHTML = "Player O's Turn!";
    }
  }
}