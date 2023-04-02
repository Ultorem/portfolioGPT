document.addEventListener("DOMContentLoaded", () => {
  const boardSize = 8;
  const mineCount = 10;
  const gameBoard = document.querySelector(".game-board");
  const minesRemaining = document.querySelector(".mines-remaining");

  let board;
  let flagsLeft;

  function initGame() {
    board = createBoard(boardSize, mineCount);
    flagsLeft = mineCount;
    minesRemaining.textContent = `Mines remaining: ${flagsLeft}`;
    renderBoard(gameBoard, board);
  }

  function createBoard(size, mines) {
    const board = new Array(size).fill(0).map(() => new Array(size).fill(0));

    for (let i = 0; i < mines; i++) {
      let row, col;
      do {
        row = Math.floor(Math.random() * size);
        col = Math.floor(Math.random() * size);
      } while (board[row][col] === "M");
      board[row][col] = "M";
    }

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] !== "M") {
          let mineCount = 0;
          for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
              if (
                r >= 0 &&
                c >= 0 &&
                r < size &&
                c < size &&
                board[r][c] === "M"
              ) {
                mineCount++;
              }
            }
          }
          board[row][col] = mineCount;
        }
      }
    }

    return board;
  }

  function renderBoard(container, board) {
    container.innerHTML = "";
    board.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", (e) =>
          cellClicked(e, rowIndex, colIndex)
        );
        cell.addEventListener("contextmenu", (e) =>
          cellRightClicked(e, rowIndex, colIndex)
        );
        container.appendChild(cell);
      });
    });
  }

  function cellClicked(e, row, col) {
    if (board[row][col] === "M") {
      e.target.style.backgroundColor = "red";
      alert("Game Over");
      initGame();
      return;
    }

    openCell(row, col);
  }

  function openCell(row, col) {
    const cell = getCell(row, col);

    if (cell.classList.contains("open") || cell.classList.contains("flagged")) {
      return;
    }

    cell.classList.add("open");
    cell.textContent = board[row][col] || "";

    if (board[row][col] === 0) {
      for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
          if (r >= 0 && c >= 0 && r < boardSize && c < boardSize) {
            openCell(r, c);
          }
        }
      }
    }
  }

  function cellRightClicked(e, row, col) {
    e.preventDefault();
    const cell = getCell(row, col);

    if (cell.classList.contains("open")) {
      return;
    }

    if (cell.classList.contains("flagged")) {
      cell.classList.remove("flagged");
      flagsLeft++;
    } else {
      if (flagsLeft > 0) {
        cell.classList.add("flagged");
        flagsLeft--;

        if (flagsLeft === 0) {
          if (checkWin(board)) {
            setTimeout(() => {
              alert("Congratulations! You won!");
              initGame();
            }, 100);
          }
        }
      }
    }

    minesRemaining.textContent = `Mines remaining: ${flagsLeft}`;
  }

  function getCell(row, col) {
    const index = row * boardSize + col;
    return gameBoard.children[index];
  }

  function checkWin(board) {
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const cell = getCell(row, col);

        if (board[row][col] === "M" && !cell.classList.contains("flagged")) {
          return false;
        }
      }
    }

    return true;
  }

  initGame();
});

