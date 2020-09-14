console.log('Connected');

var player = "X";
// toggles block by id when clicked
function toggle(block) {
  var space = document.getElementById(block).innerHTML;
  // only toggle if its a blank space
  if (space === "") {
    console.log(block);
    document.getElementById(block).innerHTML = player;
    // change player
    player = nextPlayer(player);
  }
}

// alternate players
function nextPlayer(str) {
  if (str === "X") {
    return "O";
  }
  return "X";
}