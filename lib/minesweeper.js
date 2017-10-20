'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numRows, numCols, numBombs) {
    _classCallCheck(this, Game);

    this._board = new Board(numRows, numCols, numBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, colIndex) {
      this._board.flipTile(rowIndex, colIndex);

      if (this._board.playerBoard[rowIndex][colIndex] === 'B') {
        console.log('Game Over.');
        this._board.print(this._board.playerBoard);
      } else if (!this._board.hasSafeTiles()) {
        console.log('You Won!');
      } else {
        console.log('Current Board: ');
        this._board.print(this._board.playerBoard);
      }
    }
  }]);

  return Game;
}();

var Board = function () {
  function Board(numRows, numCols, numBombs) {
    _classCallCheck(this, Board);

    this._numBombs = numBombs;
    this._numTiles = numRows * numBombs;
    this._playerBoard = Board.generatePlayerBoard(numRows, numCols);
    this._bombBoard = Board.generateBombBoard(numRows, numCols, numBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, colIndex) {
      if (this._playerBoard[rowIndex][colIndex] !== ' ') {
        console.log('This tile has already been flipped.');
      } else if (this._bombBoard[rowIndex][colIndex] === 'B') {
        this._playerBoard[rowIndex][colIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][colIndex] = this.getNumberOfNeighborBombs(rowIndex, colIndex);
      }
      this._numTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, colIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      this._numRows = this._bombBoard.length;
      this._numCols = this._bombBoard[0].length;
      this._numBombs = 0;

      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColIndex = colIndex + offset[1];

        if (neighborRowIndex >= 0 && neighborRowIndex <= _this._numRows && neighborColIndex >= 0 && neighborColIndex <= _this._numCols) {
          if (_this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
            _this._numBombs++;
          }
        }
      });

      return this._numBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numTiles !== this._numBombs;
    }
  }, {
    key: 'print',
    value: function print(board) {
      console.log(board.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numRows, numCols) {
      var board = [];

      for (var i = 0; i < numRows; i++) {
        var row = [];

        for (var j = 0; j < numCols; j++) {
          row.push(' ');
        }

        board.push(row);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numRows, numCols, numBombs) {
      var board = [];

      for (var i = 0; i < numRows; i++) {
        var row = [];

        for (var j = 0; j < numCols; j++) {
          row.push(null);
        }

        board.push(row);
      }

      var numBombsPlaced = 0;

      while (numBombsPlaced < numBombs) {
        var randomRowIndex = Math.floor(Math.random() * numRows);
        var randomColIndex = Math.floor(Math.random() * numCols);

        if (board[randomRowIndex][randomColIndex] !== 'B') {
          board[randomRowIndex][randomColIndex] = 'B';
          numBombsPlaced++;
        }
      }

      return board;
    }
  }]);

  return Board;
}();

var g = new Game(3, 3, 3);
g.playMove(0, 0);