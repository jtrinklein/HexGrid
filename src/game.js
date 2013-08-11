define(['hexgrid', 'constants', 'ai/tictactoecpu', 'render/texture/animation', 'player'],function(HexGrid, constants, AI, Animation, Player){

  function TicTacHex(canvas){
    var self = this;
    this.hexGrid = new HexGrid(canvas);
    this.gameOver = false;
    this.board = [0,0,0,0,0,0,0,0,0];
    this.ai = new AI();
    this.markers = constants.markers;
    this.win = [-1,-1,-1];
    this.player = new Player(self, constants.markers.p1, [0,0,1,1]);

    function checkWin(board) {
      function checkRowWin() {
        var winner = self.markers.empty;
        for(var row = 0; row < 3 && winner === self.markers.empty; ++row){
          var space0 = board[0 + row * 3];
          var space1 = board[1 + row * 3];
          var space2 = board[2 + row * 3];
          if(space0 === space1 && space1 === space2) {
            self.win = [0+row*3,1+row*3,2+row*3];
            winner = space0;
          }
        }
        return winner;
      }

      function checkColumnWin() {
        var winner = self.markers.empty;
        for(var col = 0; col < 3 && winner === self.markers.empty; ++col){
          var space0 = board[col]
          var space1 = board[col + 3];
          var space2 = board[col + 6];
          if(space0 === space1 && space1 === space2) {
            self.win = [col, col+3, col+6];
            winner = space0;
          }
        }
        return winner;
      }
      
      function checkDiagonalWin() {
        var player = self.markers.empty;
        if(board[0] === board[4] && board[4] === board[8]) {
          self.win = [0,4,8];
          return board[4];
        }

        if(board[2] === board[4] && board[4] === board[6]) {
          self.win=[2,4,6];
          return board[4];
        }
        return self.markers.empty;
      }

      var winner = checkRowWin();
      if(winner !== self.markers.empty) {
        return winner;
      }

      winner = checkColumnWin();
      if(winner !== self.markers.empty) {
        return winner;
      }

      winner = checkDiagonalWin();
      if(winner !== self.markers.empty) {
        return winner;
      }
      
      return self.markers.empty;
    }

    function gameWon(winner) {
      self.gameOver = true;
      var animation = null;
      if(winner === self.markers.p1) {
        animation = 'water';
      }
      else if (winner === self.markers.p2) {
        animation = 'lava';
      }
      if(animation) {
        for(var i = 0; i < self.win.length; ++i) {
          var hex = self.getHexFromIndex(self.win[i]);
          if(hex) {
            hex.animation = new Animation.TextureAnimation(animation);
          }
        }
      }
    }

    this.getHexFromIndex = function(index){
      if(index < 0) {
        return null;
      }
      var column = index % 3;
      var row = Math.floor(index / 3);

      return self.hexGrid.find(column,row);
    }

    this.getIndexFromHex = function(hex) {
      return hex.q + hex.r*3;
    }

    this.loop = function(){
      self.hexGrid.update();
      self.hexGrid.renderOneFrame();
      requestAnimationFrame(self.loop);
    }

    canvas.onmousedown = function(e) {
      var hex = self.hexGrid.findByPixel(e.offsetX, e.offsetY);
      var idx = self.getIndexFromHex(hex);
      if(hex && !self.gameOver && self.board[idx] === self.markers.empty) {

        self.player.move(hex);
        if(checkWin(self.board) === self.markers.p1) {
          gameWon(self.markers.p1);
          return;
        }

        var move = self.ai.move(self.board);
        var hex = self.getHexFromIndex(move);
        if(hex) {
          hex.color = [1,0,0,1];
        }

        if(checkWin(self.board) === self.markers.p2){
        
          gameWon(self.markers.p2)

        }
      }
    }

    canvas.onmousewheel = function(e) {

      var cam = self.hexGrid.getCamera();
      e.cancelBubble = true;
      e.preventDefault();
      var yDelta = e.wheelDeltaY;
      cam.moveZ(-yDelta/50);
    }

    document.onkeydown = function(e) {
      var event = window.event ? window.event : e;
      var cam = self.hexGrid.getCamera();
      //if(event.keyCode == 39) {
      //}
      //console.log(cam.getPos());
    }

    var renderBoard = [{"x":0,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":2,"z":0},
                       {"x":1,"y":0,"z":0},{"x":1,"y":1,"z":0},{"x":1,"y":2,"z":0},
                        {"x":2,"y":0,"z":0},{"x":2,"y":1,"z":0},{"x":2,"y":2,"z":0}];
    self.hexGrid.loadMap(renderBoard);

    requestAnimationFrame(self.loop);
  }

  return TicTacHex;
});