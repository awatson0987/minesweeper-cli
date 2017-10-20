
class Game {
  constructor(numRows, numCols, numBombs) {
    this._board = new Board(numRows,numCols,numBombs);
  }

  playMove(rowIndex, colIndex) {
    this._board.flipTile(rowIndex,colIndex);

    if(this._board.playerBoard[rowIndex][colIndex] === 'B') {
      console.log('Game Over.');
      this._board.print(this._board.playerBoard);
    } else if(!this._board.hasSafeTiles()) {
      console.log('You Won!');
    } else {
      console.log('Current Board: ');
      this._board.print(this._board.playerBoard);
    }
  }
}


class Board {
  constructor(numRows, numCols, numBombs) {
    this._numBombs = numBombs;
    this._numTiles = numRows * numBombs;
    this._playerBoard = Board.generatePlayerBoard(numRows, numCols);
    this._bombBoard = Board.generateBombBoard(numRows, numCols, numBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, colIndex) {
    if (this._playerBoard[rowIndex][colIndex] !== ' ') {
      console.log('This tile has already been flipped.');
    } else if (this._bombBoard[rowIndex][colIndex] === 'B') {
      this._playerBoard[rowIndex][colIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][colIndex] = this.getNumberOfNeighborBombs(rowIndex, colIndex);
    }
    this._numTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, colIndex) {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    this._numRows = this._bombBoard.length;
    this._numCols = this._bombBoard[0].length;
    this._numBombs = 0;

    neighborOffsets.forEach((offset) => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColIndex = colIndex + offset[1];

      if (neighborRowIndex >= 0 && neighborRowIndex <= this._numRows && neighborColIndex >= 0 && neighborColIndex <= this._numCols) {
        if (this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
          this._numBombs++;
        }
      }
    });

    return this._numBombs;
  }

  hasSafeTiles() {
    return this._numTiles !== this._numBombs;
  }

  print(board) {
    console.log(board.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numRows, numCols) {
    let board = [];

    for (let i = 0; i < numRows; i++) {
      let row = [];

      for (let j = 0; j < numCols; j++) {
        row.push(' ');
      }

      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numRows, numCols, numBombs) {
    let board = [];

    for (let i = 0; i < numRows; i++) {
      let row = [];

      for (let j = 0; j < numCols; j++) {
        row.push(null);
      }

      board.push(row);
    }

    let numBombsPlaced = 0;

    while(numBombsPlaced < numBombs) {
      let randomRowIndex = Math.floor(Math.random() * numRows);
      let randomColIndex = Math.floor(Math.random() * numCols);

      if(board[randomRowIndex][randomColIndex] !== 'B') {
        board[randomRowIndex][randomColIndex] = 'B';
        numBombsPlaced++;
      }
    }

    return board;
  };
}

const g = new Game(3,3,3);
g.playMove(0,0);