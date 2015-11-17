var gameFunctions = {};

var initViewportEngine = function(){

  gameFunctions.moveSpriteRight = function(){
    gameFunctions.flip(1);
    $('#sprite-image').attr("src", "images/mario_move.gif");
    move('#sprite')
      .add('margin-left', 30)
      .end(function(){
        $('#sprite-image').attr("src", "images/mario_stop.png");
      });
  };

  gameFunctions.moveSpriteLeft = function(){
    gameFunctions.flip(-1);
    $('#sprite-image').attr("src", "images/mario_move.gif");
    move('#sprite')
      .sub('margin-left', 30)
      .end(function(){
        $('#sprite-image').attr("src", "images/mario_stop.png");
      });
  }

  gameFunctions.flip = function(direction){
    move("#sprite-image")
      .set('-moz-transform', 'scaleX(' + direction + ')')
      .set('-o-transform', 'scaleX(' + direction + ')')
      .set('-webkit-transform', 'scaleX(' + direction + ')')
      .set('transform', 'scaleX(' + direction + ')')
      .end()
  }

  window.gameFunctions = gameFunctions;

};

window.initViewportEngine = initViewportEngine;
