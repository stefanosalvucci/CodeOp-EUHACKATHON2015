var initViewPortEngine = function(){

  var gameFunctions = {};

  gameFunctions.moveSpriteRight = function(){
    $('#sprite-image').attr("src", "images/mario_move.gif");
    move('#sprite')
      .add('margin-left', 30)
      .end(function(){
        $('#sprite-image').attr("src", "images/mario_stop.png");
      });
  };

  gameFunctions.flipRight = function(){
    move("#sprite-image")
    .add('-moz-transform: scaleX(-1);')
    .add('-o-transform: scaleX(-1);')
    .add('-webkit-transform: scaleX(-1);')
    .add('transform: scaleX(-1);')
    .add('filter: FlipH;')
    .add('-ms-filter: "FlipH";')
  };

  window.gameFunctions = gameFunctions;

};

window.initViewPortEngine = initViewPortEngine;
