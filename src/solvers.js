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

window.findNRooksSolution = function(n) {

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

  var empty = makeEmptyMatrix(n);

  var addPiece = function(matrix,rowIndex) {

    if (rowIndex === n) {
      return matrix;
    }

    var row = matrix[rowIndex];
    for (var i = 0; i < row.length; i++) {
      row[i] = 1;
      var board = new Board(matrix);
      if (!board.hasAnyQueensConflicts()) {
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

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

  var zeroOutArray = function(targetMatrix, rowIndex) {
    for (var currRow = rowIndex; currRow < n; currRow++) {
      var zeroArray = [];
      for (var i = 0; i < targetMatrix[currRow].length; i++) {
        zeroArray.push(0);
      }
      targetMatrix[currRow] = zeroArray;
    }
    return targetMatrix;
  }

  // var test = [[1,1,1],[2,2,2],[3,3,3]]
  // console.log(JSON.stringify(zeroOutArray(test, 1)));

  var empty = makeEmptyMatrix(n);

  var iterateRow = function(matrix,rowIndex) {

    if (rowIndex === n && !(new Board(matrix)).hasAnyQueensConflicts()) {
      solutionCount++;
      //debugger;

      var priorRow = rowIndex - 1;
      zeroOutArray(matrix, priorRow);
      // var zeroArray = [];
      // //for (var rowCount = priorRow; rowCount < n; rowCount++) {
      //             var rowCount = priorRow;

      //   for (var i = 0; i < matrix[rowCount].length; i++) {
      //     zeroArray.push(0);
      //   }
      //   matrix[rowCount] = zeroArray;
      //}
      //debugger;
    } else {

      var row = matrix[rowIndex];
      for (var colIndex = 0; colIndex < row.length; colIndex++) {
        zeroOutArray(matrix, rowIndex);
        // var zeroArray = [];
        // //for (var rowCount = rowIndex; rowCount < n; rowCount++) {
        //   var rowCount = rowIndex;
        //   for (var i = 0; i < matrix[rowCount].length; i++) {
        //     zeroArray.push(0);
        //   }
        //   matrix[rowCount] = zeroArray;
        // //}
        var row = matrix[rowIndex];

        row[colIndex] = 1;
        var board = new Board(matrix);
        if (!board.hasAnyQueensConflicts()) {
          iterateRow(matrix,rowIndex + 1,0);
        } else {
          row[colIndex] = 0;
        }
      }
    }
  }

  var solution = iterateRow(empty,0,0);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

    var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

  var empty = makeEmptyMatrix(n);

  var addPiece = function(matrix,rowIndex) {

    if (rowIndex === n) {
      return matrix;
    }

    var row = matrix[rowIndex];
    for (var i = 0; i < row.length; i++) {
      row[i] = 1;
      var board = new Board(matrix);
      if (!board.hasAnyQueensConflicts()) {
        return addPiece(matrix,rowIndex + 1);
      } else {
        row[i] = 0;
      }
    }
  }

  var solution = addPiece(empty,0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0;
  var matrix = [];

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

  var zeroOutArray = function(targetMatrix, rowIndex) {
    for (var currRow = rowIndex; currRow < n; currRow++) {
      var zeroArray = [];
      for (var i = 0; i < targetMatrix[currRow].length; i++) {
        zeroArray.push(0);
      }
      targetMatrix[currRow] = zeroArray;
    }
    return targetMatrix;
  }

  // var test = [[1,1,1],[2,2,2],[3,3,3]]
  // console.log(JSON.stringify(zeroOutArray(test, 1)));

  var empty = makeEmptyMatrix(n);

  var iterateRow = function(matrix,rowIndex) {

    if (rowIndex === n && !(new Board(matrix)).hasAnyQueensConflicts()) {
      solutionCount++;
      //debugger;

      var priorRow = rowIndex - 1;
      zeroOutArray(matrix, priorRow);
      // var zeroArray = [];
      // //for (var rowCount = priorRow; rowCount < n; rowCount++) {
      //             var rowCount = priorRow;

      //   for (var i = 0; i < matrix[rowCount].length; i++) {
      //     zeroArray.push(0);
      //   }
      //   matrix[rowCount] = zeroArray;
      //}
      //debugger;
    } else {

      var row = matrix[rowIndex];
      for (var colIndex = 0; colIndex < row.length; colIndex++) {
        zeroOutArray(matrix, rowIndex);
        // var zeroArray = [];
        // //for (var rowCount = rowIndex; rowCount < n; rowCount++) {
        //   var rowCount = rowIndex;
        //   for (var i = 0; i < matrix[rowCount].length; i++) {
        //     zeroArray.push(0);
        //   }
        //   matrix[rowCount] = zeroArray;
        // //}
        var row = matrix[rowIndex];

        row[colIndex] = 1;
        var board = new Board(matrix);
        if (!board.hasAnyQueensConflicts()) {
          iterateRow(matrix,rowIndex + 1,0);
        } else {
          row[colIndex] = 0;
        }
      }
    }
  }

  var solution = iterateRow(empty,0,0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
