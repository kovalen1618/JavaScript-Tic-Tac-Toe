// Allos us to constantly use these classes without having to duplicate them
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

// An array for all the winning combinations
const WINNING_COMBINATIONS = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal
  [0, 4, 8],
  [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text');
const restartButton = document.getElementById('restartButton');

let circleTurn; // If this variable is true, it is circle's turn, if false, then x's

startGame();

restartButton.addEventListener('click', startGame);

// Causes the hover to appear without needing to place down an element
function startGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    // These three statements are used to reset the board
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);

    cell.addEventListener('click', handleClick, {once: true}) // once: true means to fire eventListener only once
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
};

function handleClick(e) {
  const cell = e.target; // "target" is whichever cell we clicked on
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // Checks who's turn it is and returns the true or false

  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  };

  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Draw!';
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`;
    };
    winningMessageElement.classList.add('show');
  }
};

function isDraw() {
  return [...cellElements].every(cell => {  // Since cellElements does not have a .every method, we destructure it into                                             an array like so [...]. #TODO: Look up destructuring
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
};

// place an element within a cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
};

// Switching turns
function swapTurns() {
  circleTurn = !circleTurn;
};

// Apply hover states
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  };
};

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {  // Will loop over all the combinations
    return combination.every(index => { // Checks each of the indexes within a combination
      return cellElements[index].classList.contains(currentClass);  // Checks if current class (X, or Circle) is within                                                                 all indexes of the combination, then it will declare                                                                a winner
    });
  });
};