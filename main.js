const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status-text');
let player1 = document.querySelector('#player1');
let player2 = document.querySelector('#player2');
const FirstScore = document.querySelector('.first-score');
const secondScore = document.querySelector('.second-score');
let scoreNum1 = document.querySelector('.score-num1');
let scoreNum2 = document.querySelector('.score-num2');
scoreNum1.textContent = 0;
scoreNum2.textContent = 0;
let players1 = player1.value;
let players2 = player2.value;
// const startBtn = document.querySelector('.start');
const restartBtn = document.querySelector('.restart');
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;
initializeGame();
function initializeGame() {
  cells.forEach((cell) => {
    cell.addEventListener('click', cellClicked);
  });
  restartBtn.addEventListener('click', restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}
function cellClicked() {
  const cellIndex = this.getAttribute('cellIndex');
  if (options[cellIndex] != '' || !running) {
    return;
  }
  updateCell(this, cellIndex);
  // changePlayer();
  checkWinner();
}
function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer() {
  currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
  statusText.textContent = `${currentPlayer}'s turn`;
  let players1 = player1.value;
  let players2 = player2.value;

  if (currentPlayer == 'X') {
    statusText.textContent = `${players1}'s turn`;
    if (player1.value == '' || player2.value == '') {
      player1.value = 'Player1';
      player2.value = 'Player2';
    }
  } else if (currentPlayer == 'O') {
    statusText.textContent = `${players2}'s turn`;
    if (player1.value == '' || player2.value == '') {
      player1.value = 'Player1';
      player2.value = 'Player2';
    }
  }
}
function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
    if (cellA == '' || cellB == '' || cellC == '') {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }

    // running = true;
  }
  if (roundWon) {
    let players1 = player1.value;
    let players2 = player2.value;
    if (currentPlayer == 'X') {
      statusText.textContent = `${players1} wins`;
      running = false;
      return scoreNum1.textContent++;
    } else if (currentPlayer == 'O') {
      statusText.textContent = `${players2} wins`;
      running = false;
      return scoreNum2.textContent++;
    }
    // console.log('mou');
    running = false;
  } else if (!options.includes('')) {
    statusText.textContent = 'Draw';
    running = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
  player1.value = '';
  player2.value = '';
  // scoreNum1.textContent = 0;
  // scoreNum2.textContent = 0;
  options = ['', '', '', '', '', '', '', '', ''];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ''));
  running = true;
}
