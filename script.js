function play(cell) {
  if (cell.innerHTML === "") {
    if (isPlayer1Turn()) {
      cell.innerHTML = "X";
    } else {
      cell.innerHTML = "O";
    }
    togglePlayer();
    checkWinner();
  }
}

function isPlayer1Turn() {
  return document.getElementById("player").innerHTML === "Player 1";
}

function togglePlayer() {
  var playerElement = document.getElementById("player");
  if (playerElement.innerHTML === "Player 1") {
    playerElement.innerHTML = "Player 2";
  } else {
    playerElement.innerHTML = "Player 1";
  }
}

function checkWinner() {
  var cells = document.getElementsByTagName("td");
  var patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (var i = 0; i < patterns.length; i++) {
    var [a, b, c] = patterns[i];
    if (cells[a].innerHTML !== "" && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
      announceWinner(cells[a].innerHTML);
      return;
    }
  }

  var isDraw = true;
  for (var j = 0; j < cells.length; j++) {
    if (cells[j].innerHTML === "") {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    announceDraw();
  }
}

function announceWinner(symbol) {
  var winnerElement = document.getElementById("winner");
  winnerElement.innerHTML = "Player " + (symbol === "X" ? "1" : "2") + " wins!";
  disableCells();
}

function announceDraw() {
  var winnerElement = document.getElementById("winner");
  winnerElement.innerHTML = "It's a draw!";
  disableCells();
}

function disableCells() {
  var cells = document.getElementsByTagName("td");
  for (var k = 0; k < cells.length; k++) {
    cells[k].onclick = null;
  }
}

function resetGame() {
  var cells = document.getElementsByTagName("td");
  for (var k = 0; k < cells.length; k++) {
    cells[k].innerHTML = "";
    cells[k].onclick = function () {
      play(this);
    };
  }
  document.getElementById("player").innerHTML = "Player 1";
  document.getElementById("winner").innerHTML = "";
}
