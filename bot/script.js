// Membuat papan permainan Tic Tac Toe
let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

// Simbol pemain dan bot
const player = "X";
const bot = "O";

// Fungsi untuk menampilkan papan permainan
function displayBoard() {
  const cells = document.querySelectorAll("td");
  cells.forEach((cell, index) => {
    cell.innerText = board[index];
  });
}

// Fungsi untuk memeriksa apakah permainan telah selesai
function isGameOver() {
  // Periksa baris
  for (let i = 0; i <= 6; i += 3) {
    if (board[i] === board[i + 1] && board[i + 1] === board[i + 2] && board[i] !== " ") {
      return true;
    }
  }

  // Periksa kolom
  for (let i = 0; i <= 2; i++) {
    if (board[i] === board[i + 3] && board[i + 3] === board[i + 6] && board[i] !== " ") {
      return true;
    }
  }

  // Periksa diagonal
  if ((board[0] === board[4] && board[4] === board[8] && board[0] !== " ") || (board[2] === board[4] && board[4] === board[6] && board[2] !== " ")) {
    return true;
  }

  // Periksa apakah ada kotak kosong
  if (board.includes(" ")) {
    return false;
  }

  // Permainan seri
  return true;
}

// Fungsi untuk mengambil langkah bot secara acak
function getBotMove() {
  const availableMoves = board.map((cell, index) => (cell === " " ? index : -1)).filter((index) => index !== -1);
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

// Fungsi untuk menjalankan permainan
function playGame() {
  let currentPlayer = player;

  displayBoard();

  // Fungsi untuk membuat langkah pemain
  window.makeMove = function (index) {
    if (!isGameOver() && board[index] === " ") {
      board[index] = currentPlayer;
      displayBoard();
      currentPlayer = bot;

      if (isGameOver()) {
        if (isWinner(player)) {
          document.getElementById("status").innerText = "Selamat! Anda menang!";
        } else if (isWinner(bot)) {
          document.getElementById("status").innerText = "Maaf, Anda kalah.";
        } else {
          document.getElementById("status").innerText = "Permainan seri.";
        }
      } else {
        setTimeout(() => {
          const botMove = getBotMove();
          board[botMove] = currentPlayer;
          currentPlayer = player;
          displayBoard();

          if (isGameOver()) {
            if (isWinner(player)) {
              document.getElementById("status").innerText = "Selamat! Anda menang!";
            } else if (isWinner(bot)) {
              document.getElementById("status").innerText = "Maaf, Anda kalah.";
            } else {
              document.getElementById("status").innerText = "Permainan seri.";
            }
          }
        }, 500);
      }
    }
  };
}

// Fungsi untuk mereset permainan
function resetGame() {
  board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  displayBoard();
  document.getElementById("status").innerText = "";
}

// Fungsi untuk memeriksa apakah ada pemenang
function isWinner(symbol) {
  // Periksa baris
  for (let i = 0; i <= 6; i += 3) {
    if (board[i] === symbol && board[i + 1] === symbol && board[i + 2] === symbol) {
      return true;
    }
  }

  // Periksa kolom
  for (let i = 0; i <= 2; i++) {
    if (board[i] === symbol && board[i + 3] === symbol && board[i + 6] === symbol) {
      return true;
    }
  }

  // Periksa diagonal
  if ((board[0] === symbol && board[4] === symbol && board[8] === symbol) || (board[2] === symbol && board[4] === symbol && board[6] === symbol)) {
    return true;
  }

  return false;
}

// Memulai permainan
playGame();
