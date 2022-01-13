const container = document.querySelector(".container");
const grids = document.querySelectorAll(".grid");
const messageBox = document.querySelector(".messageBox");
const message = document.querySelector(".message");
const restartButton = document.querySelector(".reset");

let gameOver = false;
let gameArray = [null, null, null, null, null, null, null, null, null];
const winArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// who is the first player
function Player(sign, currentPlayer, winner) {
  return {
    sign,
    currentPlayer,
    winner,
  };
}
const playerX = Player("x", true, false);
const playerO = Player("o", false, false);

container.addEventListener("click", gameLogic);

function gameLogic(e) {
  if (e.target.classList.contains("grid") === false) return; // stop container
  if (gameArray[e.target.dataset.index] !== null) return;

  displaySign(e);

  checkWinningPlayer();
  if (gameOver === false) switchCurrentPlayer();
}
// do 2 things, return result to gameArray,  change HTML sign
function displaySign(e) {
  const currentPlayer = getCurrentPlayer();
  e.target.textContent = currentPlayer.sign;
  gameArray[e.target.dataset.index] = currentPlayer.sign;
}

function getCurrentPlayer() {
  if (playerX.currentPlayer === true) {
    return playerX; // return result to gameArray
  } else {
    return playerO; // return result to gameArray
  }
}

function switchCurrentPlayer() {
  if (playerX.currentPlayer === true) {
    playerO.currentPlayer = true;
    playerX.currentPlayer = false;
  } else {
    playerO.currentPlayer = false;
    playerX.currentPlayer = true;
  }
}

function checkWinningPlayer() {
  let winCheckX = false;
  let winCheckO = false;
  winArray.forEach(function (win) {
    winCheckX = win.every((index) => gameArray[index] === "x");
    winCheckO = win.every((index) => gameArray[index] === "o");
    if (winCheckX === true) {
      playerX.winner = true;
      gameOver = true;
    } else if (winCheckO === true) {
      playerO.winner = true;
      DisplayResult("Player O");
      gameOver = true;
    }
  });

  if (gameOver) {
    DisplayResult();
  }

  if (gameArray.every((sign) => sign !== null)) {
    gameOver = true;
    DisplayResult();
  }
}

function DisplayResult(player) {
  messageBox.style.display = "block";

  if (playerX.winner === true) message.textContent = "Congrats Player X wins!";
  else if (playerO.winner === true)
    message.textContent = "Congrats player O wins!";
  else message.textContent = "Wow, It's Draw!";
}

function restart() {
  resetPlayerData();
  gameArray = [null, null, null, null, null, null, null, null, null];
  gameOver = false;
  message.textContent = "";
  messageBox.style.display = "none";
  grids.forEach((div) => {
    div.textContent = "";
  });
}

function resetPlayerData() {
  playerX.winner = false;
  playerO.winner = false;
  playerX.currentPlayer = true;
  playerO.currentPlayer = false;
}

restartButton.addEventListener("click", restart);
