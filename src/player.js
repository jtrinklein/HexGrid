define(function(){
  function Player(game, marker, color) {
    
    function move(hex) {
        var idx = game.getIndexFromHex(hex);

        game.board[idx] = marker;
        hex.color = color;
    }

    return {
      move: move
    };
  }
  return Player;
});