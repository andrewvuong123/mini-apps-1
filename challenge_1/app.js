console.log('Connected');

// toggles block by id when clicked
function toggle(block) {
  console.log(block);
  document.getElementById(block).innerHTML = "X";
}