var viewportFunctions = {};

var initViewportEngine = function(){

  viewportFunctions.moveSpriteRight = function(callbacks){
    viewportFunctions.flip(1);
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

  viewportFunctions.moveSpriteLeft = function(callbacks){
    viewportFunctions.flip(-1);
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

  viewportFunctions.takeLadder = function(callbacks){
    if (atLadder) {
      $('#viewport').css("background-image", "url('images/mario_bg.jpg')");
    }
    if (callbacks.length > 0) {
      console.log(callbacks);
      var functionToCall = callbacks.shift();
      eval(functionToCall + '([' + callbacks.map(function(o){return '"' + o + '"'}) + '])');
    }
  }

  viewportFunctions.dropLadder = function(callbacks){
    if (hasLadder && atCanyon) {
      $('#viewport').css("background-image", "url('images/mario_with_canyon_traversable.jpg')");
    }
    if (callbacks.length > 0) {
      console.log(callbacks);
      var functionToCall = callbacks.shift();
      eval(functionToCall + '([' + callbacks.map(function(o){return '"' + o + '"'}) + '])');
    }
  }

  viewportFunctions.flip = function(direction){
    move("#sprite-image")
      .set('-moz-transform', 'scaleX(' + direction + ')')
      .set('-o-transform', 'scaleX(' + direction + ')')
      .set('-webkit-transform', 'scaleX(' + direction + ')')
      .set('transform', 'scaleX(' + direction + ')')
      .end()
  }

  viewportFunctions.playAnimation = function(callTrace){

  }

  window.viewportFunctions = viewportFunctions;


  // initial move to put mario right enough
  setTimeout(function(){
    viewportFunctions.moveSpriteRight(["viewportFunctions.moveSpriteRight", "viewportFunctions.moveSpriteRight", "viewportFunctions.moveSpriteRight"]);
  }, 400);

};

window.initViewportEngine = initViewportEngine;
