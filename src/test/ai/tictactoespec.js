define(['ai/tictactoecpu','constants'], function(AI, constants){
  describe('AI: Tic Tac Toe', function() {
    var board = new Array(9);
    var ai = new AI();
    var markers = constants.markers;

    // logging stuff
    var counter = 0;
    function printBoard() {
      var b = board;
      console.log(board[0] + '|' + board[1] + '|' + board[2]);
      console.log('-----');
      console.log(board[3] + '|' + board[4] + '|' + board[5]);
      console.log('-----');
      console.log(board[6] + '|' + board[7] + '|' + board[8]);
      console.log('');
      console.log('');
    }

    describe('Taking the winning move', function(){
    beforeEach(function(){for(var i = 0; i < 9; ++i) {board[i] = markers.empty;}});
      it('will take a winning move over a random move', function(){
        for(var i = 0; i < 9; ++i) {
          board[i] = markers.p1;
        }
        board[0] = board[1] = markers.p2;
        board[2] = markers.empty;
        board[8] = markers.empty;

        ai.move(board,true);

        expect(board[2]).toBe(markers.p2);
        expect(board[8]).toBe(markers.empty);
      });
      it('will take the winning move', function(){
        board[0] = markers.p2;
        board[1] = markers.p2;
        
        ai.move(board,true);

        expect(board[2]).toBe(markers.p2);
      });

      it('will take P2 winning move', function() {
        board[0] = markers.p1;
        board[1] = markers.p1;
        board[3] = markers.p2;
        board[4] = markers.p2;

        ai.move(board,true);

        expect(board[2]).toBe(markers.empty);
        expect(board[5]).toBe(markers.p2);
      });

      describe('taking a column winning move', function(){
        
        beforeEach(function(){for(var i = 0; i < 9; ++i) {board[i] = markers.empty;}});
        
        it('will take first column last row', function(){
          board[0] = markers.p2;
          board[3] = markers.p2;

          ai.move(board,true);

          expect(board[6]).toBe(markers.p2);
        });
        it('will take first column middle row', function(){
          board[0] = markers.p2;
          board[6] = markers.p2;

          ai.move(board,true);

          expect(board[3]).toBe(markers.p2);
        });
        it('will take first column top row', function(){
          board[6] = markers.p2;
          board[3] = markers.p2;

          ai.move(board,true);

          expect(board[0]).toBe(markers.p2);
        });
        it('will take second column last row', function(){
          board[1] = markers.p2;
          board[4] = markers.p2;

          ai.move(board,true);

          expect(board[7]).toBe(markers.p2);
        });
        it('will take second column middle row', function(){
          board[1] = markers.p2;
          board[7] = markers.p2;

          ai.move(board,true);

          expect(board[4]).toBe(markers.p2);
        });
        it('will take second column top row', function(){
          board[7] = markers.p2;
          board[4] = markers.p2;

          ai.move(board,true);

          expect(board[1]).toBe(markers.p2);
        });
        it('will take third column last row', function(){
          board[2] = markers.p2;
          board[5] = markers.p2;

          ai.move(board,true);

          expect(board[8]).toBe(markers.p2);
        });
        it('will take third column middle row', function(){
          board[2] = markers.p2;
          board[8] = markers.p2;

          ai.move(board,true);

          expect(board[5]).toBe(markers.p2);
        });
        it('will take third column top row', function(){
          board[8] = markers.p2;
          board[5] = markers.p2;

          ai.move(board,true);

          expect(board[2]).toBe(markers.p2);
        });
      });

      describe('taking a row winning move', function(){
        beforeEach(function(){for(var i = 0; i < 9; ++i) {board[i] = markers.empty;}});
        
        it('will take first column last row', function(){
          board[7] = markers.p2;
          board[8] = markers.p2;

          ai.move(board,true);

          expect(board[6]).toBe(markers.p2);
        });
        it('will take first column middle row', function(){
          board[4] = markers.p2;
          board[5] = markers.p2;

          ai.move(board,true);

          expect(board[3]).toBe(markers.p2);
        });
        it('will take first column top row', function(){
          board[1] = markers.p2;
          board[2] = markers.p2;

          ai.move(board,true);

          expect(board[0]).toBe(markers.p2);
        });
        it('will take second column last row', function(){
          board[6] = markers.p2;
          board[8] = markers.p2;

          ai.move(board,true);

          expect(board[7]).toBe(markers.p2);
        });
        it('will take second column middle row', function(){
          board[3] = markers.p2;
          board[5] = markers.p2;

          ai.move(board,true);

          expect(board[4]).toBe(markers.p2);
        });
        it('will take second column top row', function(){
          board[2] = markers.p2;
          board[0] = markers.p2;

          ai.move(board,true);

          expect(board[1]).toBe(markers.p2);
        });
        it('will take third column last row', function(){
          board[6] = markers.p2;
          board[7] = markers.p2;

          ai.move(board,true);

          expect(board[8]).toBe(markers.p2);
        });
        it('will take third column middle row', function(){
          board[3] = markers.p2;
          board[4] = markers.p2;

          ai.move(board,true);

          expect(board[5]).toBe(markers.p2);
        });
        it('will take third column top row', function(){
          board[0] = markers.p2;
          board[1] = markers.p2;

          ai.move(board,true);

          expect(board[2]).toBe(markers.p2);
        });
      });
      describe('taking diagonal winning move',function(){
        beforeEach(function(){for(var i = 0; i < 9; ++i) {board[i] = markers.empty;}});
        
        it('will take first column top row',function(){
          board[4] = markers.p2;
          board[8] = markers.p2;

          ai.move(board,true);

          expect(board[0]).toBe(markers.p2);
        });
        it('will take third column top row',function(){
          board[4] = markers.p2;
          board[6] = markers.p2;

          ai.move(board,true);

          expect(board[2]).toBe(markers.p2);
        });
        it('will take first column bottom row',function(){
          board[4] = markers.p2;
          board[2] = markers.p2;

          ai.move(board,true);

          expect(board[6]).toBe(markers.p2);
        });
        it('will take third column bottom row',function(){
          board[4] = markers.p2;
          board[0] = markers.p2;

          ai.move(board,true);

          expect(board[8]).toBe(markers.p2);
        });
        it('will take center on top left to bottom right',function(){
          board[0] = markers.p2;
          board[8] = markers.p2;

          ai.move(board,true);

          expect(board[4]).toBe(markers.p2);
        });
        it('will take first column bottom row',function(){
          board[6] = markers.p2;
          board[2] = markers.p2;

          ai.move(board,true);

          expect(board[4]).toBe(markers.p2);
        });
      });
    });

    describe('Taking a strategic move', function(){

      describe('taking a diagonal move', function(){
        
        beforeEach(function(){for(var i = 0; i < 9; ++i) {board[i] = markers.p1;}});

        it('will take strategic diagonal move on top left to bottom right diagonal with top left marked' , function(){
          board[0] = markers.p2;
          board[4] = board[8] = board[2] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[4] === markers.p2 || board[8] === markers.p2) && board[2] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take strategic diagonal move on top left to bottom right diagonal with middle marked' , function(){
          board[4] = markers.p2;
          board[0] = board[8] = board[2] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[0] === markers.p2 || board[8] === markers.p2) && board[2] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take strategic diagonal move on top left to bottom right diagonal with bottom right marked' , function(){
          board[8] = markers.p2;
          board[4] = board[0] = board[2] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[4] === markers.p2 || board[0] === markers.p2) && board[2] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take strategic diagonal move on top right to bottom left diagonal with top right marked' , function(){
          board[2] = markers.p2;
          board[4] = board[6] = board[0] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[4] === markers.p2 || board[6] === markers.p2) && board[0] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take strategic diagonal move on top right to bottom left diagonal with middle marked' , function(){
          board[4] = markers.p2;
          board[2] = board[6] = board[0] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[2] === markers.p2 || board[6] === markers.p2) && board[0] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take strategic diagonal move on top right to bottom left diagonal with bottom left marked' , function(){
          board[6] = markers.p2;
          board[4] = board[2] = board[0] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[4] === markers.p2 || board[2] === markers.p2) && board[0] === markers.empty;

          expect(strategicMove).toBe(true);
        });
      });
      describe('taking a row move', function(){

        beforeEach(function(){for(var i = 0; i < 9; ++i) {board[i] = markers.p1;}});

        it('will take a strategic move on first row with first column marked',function(){
          board[0] = markers.p2;
          board[1] = board[2] = board[3] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[1] === markers.p2 || board[2] === markers.p2) && board[3] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on first row with second column marked',function(){
          board[1] = markers.p2;
          board[0] = board[2] = board[3] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[0] === markers.p2 || board[2] === markers.p2) && board[3] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on first row with third column marked',function(){
          board[2] = markers.p2;
          board[1] = board[0] = board[3] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[0] === markers.p2 || board[1] === markers.p2) && board[3] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on second row with first column marked',function(){
          board[3] = markers.p2;
          board[4] = board[5] = board[6] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[4] === markers.p2 || board[5] === markers.p2) && board[6] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on second row with second column marked',function(){
          board[4] = markers.p2;
          board[3] = board[5] = board[6] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[3] === markers.p2 || board[5] === markers.p2) && board[6] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on second row with third column marked',function(){
          board[5] = markers.p2;
          board[4] = board[3] = board[6] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[3] === markers.p2 || board[4] === markers.p2) && board[6] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on third row with first column marked',function(){
          board[8] = markers.p2;
          board[6] = board[7] = board[3] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[6] === markers.p2 || board[7] === markers.p2) && board[3] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on third row with second column marked',function(){
          board[6] = markers.p2;
          board[8] = board[7] = board[3] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[7] === markers.p2 || board[8] === markers.p2) && board[3] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on third row with third column marked',function(){
          board[7] = markers.p2;
          board[6] = board[8] = board[3] = markers.empty;

          ai.move(board,true);

          var strategicMove = (board[6] === markers.p2 || board[8] === markers.p2) && board[3] === markers.empty;

          expect(strategicMove).toBe(true);
        });
      });
      
      describe('taking a column move', function(){

        beforeEach(function(){for(var i = 0; i < 9; ++i) {board[i] = markers.p1;}});

        it('will take a strategic move on first column with first row marked',function(){
          board[0] = markers.p2;
          board[3] = board[6] = board[1] = markers.empty;

          ai.move(board,true);
          var strategicMove = (board[3] === markers.p2 || board[6] === markers.p2) && board[1] === markers.empty;
          
          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on first column with second row marked',function(){
          board[3] = markers.p2;
          board[0] = board[6] = board[1] = markers.empty;

          ai.move(board,true);
          var strategicMove = (board[0] === markers.p2 || board[6] === markers.p2) && board[1] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on first column with third row marked',function(){
          board[6] = markers.p2;
          board[3] = board[0] = board[1] = markers.empty;

          ai.move(board,true);
          var strategicMove = (board[0] === markers.p2 || board[3] === markers.p2) && board[1] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on second column with first row marked',function(){
          board[1] = markers.p2;
          board[4] = board[7] = board[0] = markers.empty;

          ai.move(board,true);
          var strategicMove = (board[4] === markers.p2 || board[7] === markers.p2) && board[0] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on second column with second row marked',function(){
          board[4] = markers.p2;
          board[1] = board[7] = board[0] = markers.empty;

          ai.move(board,true);
          var strategicMove = (board[1] === markers.p2 || board[7] === markers.p2) && board[0] === markers.empty;
          
          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on second column with third row marked',function(){
          board[7] = markers.p2;
          board[4] = board[1] = board[0] = markers.empty;

          ai.move(board,true);
          var strategicMove = (board[1] === markers.p2 || board[4] === markers.p2) && board[0] === markers.empty;
          
          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on third column with first row marked',function(){
          board[2] = markers.p2;
          board[5] = board[8] = board[1] = markers.empty;

          ai.move(board,true);
          var strategicMove = (board[5] === markers.p2 || board[8] === markers.p2) && board[1] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on third column with second row marked',function(){
          board[5] = markers.p2;
          board[2] = board[8] = board[1] = markers.empty;

          ai.move(board,true);
          var strategicMove = (board[2] === markers.p2 || board[8] === markers.p2) && board[1] === markers.empty;

          expect(strategicMove).toBe(true);
        });
        it('will take a strategic move on third column with third row marked',function(){
          board[8] = markers.p2;
          board[5] = board[2] = board[1] = markers.empty;

          ai.move(board,true);
          var strategicMove = (board[2] === markers.p2 || board[5] === markers.p2) && board[1] === markers.empty;

          expect(strategicMove).toBe(true);
        });
      });
    });

    describe('Taking a random move', function() {
      beforeEach(function(){for(var i = 0; i < 9; ++i) {board[i] = markers.p1;}});
      it('will take a random move',function(){
        board[4] = markers.empty;

        ai.move(board);

        expect(board[4]).toBe(markers.p2);
      });

      it('will take only one random move',function(){
        board[5] = board[3] = markers.empty;

        ai.move(board);

        onlyOneSpace = board[3] !== board[5] && (board[3] === markers.p2 || board[5] === markers.p2);

        expect(onlyOneSpace).toBe(true);
      });
    });
  });
});