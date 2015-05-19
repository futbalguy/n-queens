/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

  */

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

window.findNRooksSolution = function(n) {
  var empty = makeEmptyMatrix(n);

  var addPiece = function(matrix, rowIndex) {
    var row = matrix[rowIndex];

    if (rowIndex === n) {
      return matrix;
    }

    for (var i = 0; i < row.length; i++) {
      row[i] = 1;
      var board = new Board(matrix);
      if (!board.hasAnyRooksConflicts()) {
        return addPiece(matrix,rowIndex + 1);
      } else {
        row[i] = 0;
      }
    }
  }

  var solution = addPiece(empty,0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0;
  var matrix = [];
  var empty = makeEmptyMatrix(n);

  var iterateRow = function(matrix,rowIndex) {

    if (rowIndex === n) {
      solutionCount++;
    } else {
      var row = matrix[rowIndex];
      for (var colIndex = 0; colIndex < row.length; colIndex++) {
        // var row = matrix[rowIndex];

        row[colIndex] = 1;
        var board = new Board(matrix);
        if (!board.hasAnyRooksConflicts()) {
          iterateRow(matrix,rowIndex + 1,0);
        }
        row[colIndex] = 0;
      }
    }
  }

  var solution = iterateRow(empty,0,0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutionCount = 0;
  var matrix = [];
  var empty = makeEmptyMatrix(n);

  var countQueens = function(currMatrix) {
    var QueenCount = 0;
    var n = currMatrix.length;
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        if (currMatrix[row][col] === 1) {
          QueenCount++;
        }
      }
    }
    return QueenCount;
  }

  var iterateRow = function(matrix,rowIndex) {
    if (rowIndex === n) {
      if (countQueens(matrix) === n) {
        solutionCount++;
        return matrix;
      }
    } else {
      var row = matrix[rowIndex];
      for (var colIndex = 0; colIndex < row.length; colIndex++) {
        row[colIndex] = 1;
        var board = new Board(matrix);
        if (!board.hasAnyQueensConflicts()) {
          if (iterateRow(matrix,rowIndex + 1,0)) {
            return matrix;
          }
        }
        row[colIndex] = 0;
      }
    }
  }

  var tempSolution = iterateRow(empty,0);

  var solution = tempSolution ? tempSolution : makeEmptyMatrix(n);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0;
  var emptyBoard = new Board({n:n});

  var countQueens = function(board) {
    var QueenCount = 0;
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        if (board.get(row)[col] === 1) {
          QueenCount++;
        }
      }
    }
    return QueenCount;
  }

  var iterateRow = function(board,rowIndex) {
    if (rowIndex === n) {
      if (countQueens(board) === n) {
        solutionCount++;
      }
    } else {
      var row = board.get(rowIndex);
      for (var colIndex = 0; colIndex < row.length; colIndex++) {
        row[colIndex] = 1;
        if (!board.hasAnyQueensConflicts()) {
          iterateRow(board,rowIndex + 1,0);
        }
        row[colIndex] = 0;
      }
    }
  }

  var solution = iterateRow(emptyBoard,0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
