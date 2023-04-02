// DOM Elements
const easyBtn = document.getElementById('easy');
const mediumBtn = document.getElementById('medium');
const hardBtn = document.getElementById('hard');
const cells = document.querySelectorAll('.sudoku__cell');

// Sudoku Boards (continued)
const easyBoard = [
  [1, 0, 0, 0, 0, 7, 0, 9, 0],
  [0, 3, 0, 0, 2, 0, 0, 0, 8],
  [0, 0, 9, 6, 0, 0, 5, 0, 0],
  [0, 0, 5, 3, 0, 0, 9, 0, 0],
  [0, 1, 0, 0, 8, 0, 0, 0, 2],
  [6, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 4, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 7, 0, 0, 0, 0, 0, 0],
];

const mediumBoard = [
  [0, 0, 0, 0, 0, 0, 0, 8, 0],
  [0, 0, 0, 7, 0, 0, 9, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [6, 5, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 3, 0, 5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 4],
];

// Sudoku Boards (continued)
const hardBoard = [
  [0, 0, 7, 5, 0, 0, 0, 0, 9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 6, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 8, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 4],
];

// Check if Sudoku board is valid
function isValidSudoku(board) {
  // Check rows
  for (let i = 0; i < 9; i++) {
    const row = new Set();
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== 0 && row.has(board[i][j])) {
        return false;
      }
      row.add(board[i][j]);
    }
  }

  // Check columns
  for (let i = 0; i < 9; i++) {
    const col = new Set();
    for (let j = 0; j < 9; j++) {
      if (board[j][i] !== 0 && col.has(board[j][i])) {
        return false;
      }
      col.add(board[j][i]);
    }
  }

  // Check squares
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const square = new Set();
      for (let k = i; k < i + 3; k++) {
        for (let l = j; l < j + 3; l++) {
          if (board[k][l] !== 0 && square.has(board[k][l])) {
            return false;
          }
          square.add(board[k][l]);
        }
      }
    }
  }
  return true;
}

// Display Sudoku board
function displayBoard(board) {
  const container = document.querySelector(".sudoku-container");
  container.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement("div");
      cell.classList.add("sudoku-cell");
      if (board[i][j] !== 0) {
        cell.textContent = board[i][j];
      }
      container.appendChild(cell);
    }
  }
}

// Generate Sudoku board
function generateBoard(difficulty) {
  let board;
  switch (difficulty) {
    case "easy":
      board = easyBoard;
      break;
    case "medium":
      board = mediumBoard;
      break;
    case "hard":
      board = hardBoard;
      break;
    default:
      board = easyBoard;
      break;
  }

  // Shuffle board
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const randomIndex1 = Math.floor(Math.random() * board.length);
      const randomIndex2 = Math.floor(Math.random() * board[i].length);
      const temp = board[i][j];
      board[i][j] = board[randomIndex1][randomIndex2];
      board[randomIndex1][randomIndex2] = temp;
    }
  }

// Remove cells from the board based on the selected difficulty
function removeCells(difficulty) {
  let cellsToRemove = 0;

  // determine the number of cells to remove based on difficulty
  if (difficulty === "easy") {
    cellsToRemove = 40;
  } else if (difficulty === "medium") {
    cellsToRemove = 45;
  } else if (difficulty === "hard") {
    cellsToRemove = 50;
  }

  // remove cells randomly from the board
  for (let i = 0; i < cellsToRemove; i++) {
    let cellToRemoveIndex = Math.floor(Math.random() * 81);
    if (board[cellToRemoveIndex] !== null) {
      board[cellToRemoveIndex] = null;
    } else {
      i--;
    }
  }
}



 // create a 9x9 grid
const gridContainer = document.querySelector(".grid-container");

for (let i = 0; i < 81; i++) {
  const gridItem = document.createElement("div");
  gridItem.classList.add("grid-item");

  // add borders to create a 3x3 grid
  if ((i + 1) % 3 === 0 && (i + 1) % 9 !== 0) {
    gridItem.classList.add("border-right");
  }

  if ((i + 1) % 9 === 0 && (i + 1) % 27 !== 0) {
    gridItem.classList.add("border-bottom");
  }

  if ((i + 1) % 27 === 0 && (i + 1) % 81 !== 0) {
    gridItem.classList.add("border-right", "border-bottom");
  }

  gridContainer.appendChild(gridItem);
}

// add values to the grid
const gridItems = document.querySelectorAll(".grid-item");
const easyButton = document.querySelector("#easy");
const mediumButton = document.querySelector("#medium");
const hardButton = document.querySelector("#hard");

// add event listeners to buttons
easyButton.addEventListener("click", () => {
  addValuesToGrid(easyBoard);
});

mediumButton.addEventListener("click", () => {
  addValuesToGrid(mediumBoard);
});

hardButton.addEventListener("click", () => {
  addValuesToGrid(hardBoard);
});

function addValuesToGrid(board) {
  // clear existing values
  gridItems.forEach((item) => (item.textContent = ""));

  // add values from the selected board
  board.forEach((value, index) => {
    if (value !== null) {
      gridItems[index].textContent = value;
    }
  });
}   // end of addValuesToGrid function

// add event listeners to grid items
gridItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("selected");
  });
});

