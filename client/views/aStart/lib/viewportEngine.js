var gameFunctions = {};

var initViewportEngine = function(){

  gameFunctions.moveSpriteRight = function(callbacks){
    gameFunctions.flip(1);
    $('#sprite-image').attr("src", "images/mario_move.gif");
    if (parseInt($('#sprite').css("margin-left")) < 600) {
      move('#sprite')
        .add('margin-left', 30)
        .end(function(){
          $('#sprite-image').attr("src", "images/mario_stop.png");
          if (callbacks.length > 0) {
            console.log(callbacks);
            var functionToCall = callbacks.shift();
            eval(functionToCall + '([' + callbacks.map(function(o){return '"' + o + '"'}) + '])');
          }
        });
    } else {
      setTimeout(function(){
        $('#sprite-image').attr("src", "images/mario_stop.png");
        if (callbacks.length > 0) {
          console.log(callbacks);
          var functionToCall = callbacks.shift();
          eval(functionToCall + '([' + callbacks.map(function(o){return '"' + o + '"'}) + '])');
        }
      }, 800);
    };
  };

  gameFunctions.moveSpriteLeft = function(callbacks){
    gameFunctions.flip(-1);
    $('#sprite-image').attr("src", "images/mario_move.gif");
    if (parseInt($('#sprite').css("margin-left")) > 70) {
      move('#sprite')
        .sub('margin-left', 30)
        .end(function(){
          $('#sprite-image').attr("src", "images/mario_stop.png");
          if (callbacks.length > 0) {
            console.log(callbacks);
            var functionToCall = callbacks.shift();
            eval(functionToCall + '([' + callbacks.map(function(o){return '"' + o + '"'}) + '])');
          }
        });
    } else {
      setTimeout(function(){
        $('#sprite-image').attr("src", "images/mario_stop.png");
        if (callbacks.length > 0) {
          console.log(callbacks);
          var functionToCall = callbacks.shift();
          eval(functionToCall + '([' + callbacks.map(function(o){return '"' + o + '"'}) + '])');
        }
      }, 800);
    }
  };



  gameFunctions.flip = function(direction){
    move("#sprite-image")
      .set('-moz-transform', 'scaleX(' + direction + ')')
      .set('-o-transform', 'scaleX(' + direction + ')')
      .set('-webkit-transform', 'scaleX(' + direction + ')')
      .set('transform', 'scaleX(' + direction + ')')
      .end()
  }

  window.gameFunctions = gameFunctions;


  // initial move to put mario right enough
  setTimeout(function(){
    gameFunctions.moveSpriteRight(["gameFunctions.moveSpriteRight", "gameFunctions.moveSpriteRight", "gameFunctions.moveSpriteRight"]);
  }, 400);

};

window.initViewportEngine = initViewportEngine;
