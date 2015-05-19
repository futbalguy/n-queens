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

window.findNPiecesSolution = function(n, pieceType) {
  var solutionCount = 0;
  var emptyBoard = new Board({n:n});

  if (pieceType === "rook") {
    conflictCheck = function(board) {
      return board.hasAnyRooksConflicts();
    }
  } else if (pieceType === "queen") {
    conflictCheck = function(board) {
      return board.hasAnyQueensConflicts();
    }
  }

  var boardToMatrix = function(board) {
    var resultMatrix = [];
    for (var i = 0; i < n; i++) {
      resultMatrix.push(board.get(i));
    }
    return resultMatrix;
  }

  var countPieces = function(board) {
    var pieceCount = 0;
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        if (board.get(row)[col] === 1) {
          pieceCount++;
        }
      }
    }
    return pieceCount;
  }
  var iterateRow = function(board,rowIndex) {
    if (rowIndex === n) {
      if (countPieces(board) === n) {
        solutionCount++;
        return boardToMatrix(board);
      }
    } else {
      var row = board.get(rowIndex);
      for (var colIndex = 0; colIndex < row.length; colIndex++) {
        row[colIndex] = 1;
        if (!conflictCheck(board) && countPieces(board) <= n) {
          if (iterateRow(board,rowIndex + 1,0)) {
            return boardToMatrix(board);
          }
        }
        row[colIndex] = 0;
      }
    }
  }

  var tempSolution = iterateRow(emptyBoard,0);
  var solution = tempSolution ? tempSolution : boardToMatrix(new Board({n:n}));

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
}

//generalized countN solution
window.countNPiecesSolutions = function(n, pieceType) {
  var solutionCount = 0;
  var emptyBoard = new Board({n:n});
  var conflictCheck;

  if (pieceType === "rook") {
    conflictCheck = function(board) {
      return board.hasAnyRooksConflicts();
    }
  } else if (pieceType === "queen") {
    conflictCheck = function(board) {
      return board.hasAnyQueensConflicts();
    }
  }

  var countPieces = function(board) {
    var pieceCount = 0;
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        if (board.get(row)[col] === 1) {
          pieceCount++;
        }
      }
    }
    return pieceCount;
  }

  var iterateRow = function(board,rowIndex) {
    if (rowIndex === n) {
      if (countPieces(board) === n) {
        solutionCount++;
      }
    } else {
      var row = board.get(rowIndex);
      for (var colIndex = 0; colIndex < row.length; colIndex++) {
        row[colIndex] = 1;
        if (!conflictCheck(board) && countPieces(board) <= n) {
          iterateRow(board,rowIndex + 1);
        }
        row[colIndex] = 0;
      }
    }
  }

  var solution = iterateRow(emptyBoard,0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNRooksSolution = function(n) {
  return window.findNPiecesSolution(n, "rook");
}

window.findNQueensSolution = function(n) {
  return window.findNPiecesSolution(n, "queen");
}

window.countNRooksSolutions = function(n) {
  return window.countNPiecesSolutions(n, "rook");
}

window.countNQueensSolutions = function(n) {
  return window.countNPiecesSolutions(n, "queen");
}
