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

  return { getCurrentPlayer };
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
      }
    }

    return { htmlElement };
  })();

  return { htmlElementWrapper };
})();

const main = (function () {
  document.body.appendChild(gameBoard.htmlElementWrapper.htmlElement);

  return {};
})();
