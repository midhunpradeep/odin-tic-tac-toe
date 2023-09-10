"use strict";

const createPlayer = function (name, marker) {
  return { name, marker };
};

const gameState = (function () {
  const _players = [
    createPlayer("Player 1", "X"),
    createPlayer("Player 2", "O"),
  ];
  let _currentPlayer = 0;

  function nextPlayer() {
    _currentPlayer = (_currentPlayer + 1) % _players.length;
  }

  function getCurrentPlayer() {
    return _players[_currentPlayer];
  }

  return { nextPlayer, getCurrentPlayer };
})();

const gameBoard = (function () {
  const _array = [];
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      row.push(null);
    }
    _array.push(row);
  }

  const htmlElementWrapper = (function () {
    const htmlElement = document.createElement("div");
    htmlElement.classList.add("game-board");
    for (let i = 0; i < _array.length; i++) {
      for (let j = 0; j < _array[i].length; j++) {
        const cell = document.createElement("div");
        htmlElement.appendChild(cell);
        cell.classList.add("board-cell");
        cell.dataset.x = j.toString();
        cell.dataset.y = i.toString();

        const cellMarker = document.createElement("p");
        cell.appendChild(cellMarker);

        cell.addEventListener("click", () => {
          const isValid = _markCell(gameState.getCurrentPlayer(), j, i);
          if (isValid) {
            gameState.nextPlayer();
          }
        });
      }
    }

    function updateCellDisplay() {
      for (let i = 0; i < _array.length; i++) {
        for (let j = 0; j < _array[i].length; j++) {
          const cell = htmlElement.querySelector(
            `.board-cell[data-x="${j}"][data-y="${i}"]`,
          );
          cell.firstChild.textContent = _array[i][j];
        }
      }
    }

    return { htmlElement, updateCellDisplay };
  })();

  function _getWinner() {
    for (const row of _array) {
      if (row[0] === null) continue;
      if (row[0] === row[1] && row[1] === row[2]) return row[0];
    }

    for (let x = 0; x < _array.length; x++) {
      if (_array[0][x] === null) continue;
      if (_array[0][x] === _array[1][x] && _array[1][x] === _array[2][x])
        return _array[0][x];
    }

    if (
      (_array[0][0] === _array[1][1] && _array[1][1] === _array[2][2]) ||
      (_array[0][2] === _array[1][1] && _array[1][1] === _array[2][0])
    ) {
      if (_array[1][1] !== null) return _array[1][1];
    }

    return null;
  }

  function _isGameOver() {
    if (_getWinner() !== null) return true;

    for (const row of _array) {
      for (const cell of row) {
        if (cell === null) return false;
      }
    }
    return true;
  }

  function _markCell(player, x, y) {
    if (_array[y][x] !== null) return false;
    if (_isGameOver()) return false;

    _array[y][x] = player.marker;
    htmlElementWrapper.updateCellDisplay();
    return true;
  }

  return { htmlElementWrapper };
})();

const main = (function () {
  document.body.appendChild(gameBoard.htmlElementWrapper.htmlElement);

  return {};
})();
