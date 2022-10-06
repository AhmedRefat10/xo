const board = document.querySelector('.board'),
  cells = document.querySelectorAll('[data-cell]'),
  winningDiv = document.querySelector('.winning'),
  winningMsg = document.querySelector('[data-winning-msg]'),
  turnMsg = document.querySelector('.turn-msg'),
  restartBtn = document.querySelector('button');

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

let xTurn = 'X',
  oTurn = 'O',
  circleTurn,
  curTurn;

function starting() {
  circleTurn = false;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove(xTurn);
    cell.classList.remove(oTurn);
    cell.style.cursor = 'pointer';
    whoTurn('X');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });

  winningDiv.style.opacity = '0';
  winningDiv.style.zIndex = '-1';
}

starting();
function handleClick(e) {
  const cell = e.target;
  curTurn = circleTurn ? oTurn : xTurn;
  // who's turn msg
  whoTurn(circleTurn ? xTurn : oTurn);
  // place mark
  cell.textContent = curTurn;
  cell.style.cursor = 'not-allowed';
  cell.classList.add(curTurn);

  // check for win
  if (checkWin(curTurn)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    // swap turn
    swapTurn();
  }
}

function swapTurn() {
  circleTurn = !circleTurn;
}
function whoTurn(curTurn) {
  turnMsg.textContent = `${curTurn}'s turn`;
}

function checkWin(curTurn) {
  return winningCombinations.some(combination => {
    return combination.every(i => {
      return cells[i].classList.contains(curTurn);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(xTurn) || cell.classList.contains(oTurn);
  });
}

function endGame(draw) {
  winningDiv.style.opacity = '1';
  winningDiv.style.zIndex = '1';
  if (draw) {
    winningMsg.textContent = `Draw`;
  } else {
    winningMsg.textContent = `${curTurn}'s wins`;
  }
}

restartBtn.addEventListener('click', starting);
