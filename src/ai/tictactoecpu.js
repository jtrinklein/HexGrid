define(['constants'],function(constants){
  function TicTacToeCpu(){
    var markers = constants.markers;
    var myMarker = markers.p2;
    var rank = {
      win: 0,
      strategic: 1,
      random: 2,
      impossible: 4
    };

    function isWinMove(board, index) {
      function isRowWin() {
        var column = index % 3;
        var row = Math.floor(index / 3);
        var check1 = board[(column + 1) % 3 + row * 3];
        var check2 = board[(column + 2) % 3 + row * 3];

        return check1 === myMarker && check2 === myMarker;
      }

      function isColumnWin() {
        var column = index % 3;
        var row = Math.floor(index / 3);
        var check1 = board[column + ((row + 1) % 3) * 3];
        var check2 = board[column + ((row + 2) % 3) * 3];
        return check1 === myMarker && check2 === myMarker;
      }
      /*
        0 | ~ | 2
        ----------
        ~ | 4 | ~
        ----------
        6 | ~ | 8
        */
        //*
      function isDiagonalWin() {
        function checkTopLeftToBottomRightDiag() {
          return board[(index + 4) % 12] === myMarker 
            && board[(index + 8) % 12] === myMarker;
        }
        function checkTopRightToBottomLeftDiag() {
          var column = index % 3;
          var row = Math.floor(index / 3);
          // (col + 4) % 3 === (col - 1) % 3 --- except js has a bug with (-x) % y
          // (col + 5) % 3 === (col - 2) % 3 --- except js has a bug with (-x) % y
          return board[((column + 5) % 3 + ((row + 1) % 3) * 3) % 9] === myMarker 
            && board[((column + 4) % 3 + ((row + 2) % 3) * 3) % 9] === myMarker;
        }
        var isWin = false;
        if(index % 2 !== 0){
          return isWin;
        }

        if([0,4,8].indexOf(index) >= 0) {
          isWin |= checkTopLeftToBottomRightDiag();
        }
        if([2,4,6].indexOf(index) >= 0){
          isWin |= checkTopRightToBottomLeftDiag();
        }
        return isWin;
      }
      
      return isRowWin() || isColumnWin() || isDiagonalWin();
    }

    function createsWinMove(board, index) {
      function createsRowWin() {
        var column = index % 3;
        var row = Math.floor(index / 3);
        var space1 = board[(column + 1) % 3 + row * 3];
        var space2 = board[(column + 2) % 3 + row * 3];

        return (space1 === markers.empty && space2 === myMarker)
          || (space2 === markers.empty && space1 === myMarker);
      }

      function createsColumnWin() {
        var column = index % 3;
        var row = Math.floor(index / 3);
        var space1 = board[column + ((row + 1) % 3) * 3];
        var space2 = board[column + ((row + 2) % 3) * 3];

        return (space1 === markers.empty && space2 === myMarker)
          || (space2 === markers.empty && space1 === myMarker);
      }

      function createsDiagonalWin() {
        function checkTopLeftToBottomRightDiag() {
          var space1 = board[(index + 4) % 12];
          var space2 = board[(index + 8) % 12];
          
          return (space1 === markers.empty && space2 === myMarker)
            || (space2 === markers.empty && space1 === myMarker);
        }
        function checkTopRightToBottomLeftDiag() {
          var column = index % 3;
          var row = Math.floor(index / 3);
          // (col + 5) % 3 === (col - 1) % 3 --- except js has a bug with (-x) % y
          // (col + 4) % 3 === (col - 2) % 3 --- except js has a bug with (-x) % y
          var space1 = board[((column + 5) % 3 + ((row + 1) % 3) * 3) % 9];
          var space2 = board[((column + 4) % 3 + ((row + 2) % 3) * 3) % 9];
          
          return (space1 === markers.empty && space2 === myMarker)
            || (space2 === markers.empty && space1 === myMarker);
        }
        var createWin = false;
        if(index % 2 !== 0){
          return createWin;
        }

        if([0,4,8].indexOf(index) >= 0) {
          createWin |= checkTopLeftToBottomRightDiag();
        }
        if([2,4,6].indexOf(index) >= 0){
          createWin |= checkTopRightToBottomLeftDiag();
        }
        return createWin;
      }
      
      return createsRowWin(index) || createsColumnWin(index) || createsDiagonalWin();
    }
    function rankMoves(board) {
      var moves = new Array(9);
      for(var i = 0; i < 9; ++i){
        var spaceMarker = board[i];
        if(spaceMarker != markers.empty) {
          moves[i] = rank.impossible;
        }

        else if(isWinMove(board, i)){
          moves[i] = rank.win;
        }
        
        else if(createsWinMove(board, i)) {
          moves[i] = rank.strategic;
        }

        else { 
          moves[i] = rank.random;
        }
      }
      return moves;
    }

    this.move = function(board, doNotTakeRandomMove){
      var moves = rankMoves(board);
      var move = moves.indexOf(rank.win);
      if(move > -1) {
        board[move] = myMarker;
        return move;
      }

      move = moves.indexOf(rank.strategic);
      if(move > -1) {
        board[move] = myMarker;
        return move;
      }

      // do not make a random move if flag set
      // this is only used to allow tests to fail consistently
      if(doNotTakeRandomMove) {
        return -1;
      }

      // make random move
      // collect all random indexes
      var rands = [];
      for(var i = 0; i < moves.length; ++i) {
        if(moves[i] === rank.random) {
          rands.push(i);
        }
      }
      // if any indexes are collected
      if(rands.length > 0) {
        // pick one randomly
        move = rands[Math.floor(Math.random()*(rands.length-1))];
        board[move] = myMarker;
        return move;
      }

      return -1;
    }
  }

  return TicTacToeCpu;
})