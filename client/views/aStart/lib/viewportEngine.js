var viewportFunctions = {};

var initViewportEngine = function(){

  viewportFunctions.walkRight = function(callbacks){
    viewportFunctions.flip(1);
    $('#sprite-image').attr("src", "images/mario_move.gif");
    if (parseInt($('#sprite').css("margin-left")) < 600) {
      move('#sprite')
        .duration(1000)
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



  viewportFunctions.walkLeft = function(callbacks){
    viewportFunctions.flip(-1);
    $('#sprite-image').attr("src", "images/mario_move.gif");
    if (parseInt($('#sprite').css("margin-left")) > 70) {
      move('#sprite')
        .duration(1000)
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
    var functionsStack = callTrace.map(function(o){return "viewportFunctions." + o})
    var functionToCall = functionsStack.shift()
    eval(functionToCall + '([' + functionsStack.map(function(o){return '"' + o + '"'}) + '])');
  }

  viewportFunctions.loseGame = function(callTrace){
    alert("after some time, the avalanche buries you: you lost");
  }

  viewportFunctions.winGame = function(callTrace){
    alert("congrats, you did it!");
  }

  window.viewportFunctions = viewportFunctions;


  // initial move to put mario right enough
  setTimeout(function(){
    viewportFunctions.walkRight(["viewportFunctions.walkRight", "viewportFunctions.walkRight", "viewportFunctions.walkRight"]);
  }, 400);

};

window.initViewportEngine = initViewportEngine;
