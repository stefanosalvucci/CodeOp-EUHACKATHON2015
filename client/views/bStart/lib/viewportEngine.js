var viewportFunctions = {};

  window.viewportAtCanyon=false;
  window.viewportHasLadder=false;
  window.viewportCanyonTraversable=false;
  window.viewportLadderLocation=-3;
  window.viewportCanyonLocation=3;
  window.viewportHeroLocation=0;

var initViewportEngine = function(){

  viewportFunctions.walkRight = function(callbacks){
    viewportFunctions.flip(1);
    $('#sprite-image').attr("src", "images/mario_move.gif");
    if ((!viewportCanyonTraversable && parseInt($('#sprite').css("margin-left")) < 460) || (viewportCanyonTraversable && parseInt($('#sprite').css("margin-left")) < 550)){
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
    if (viewportFunctions.viewportAtLadder()) {
      $('#ladder-sprite').hide();
      viewportHasLadder = true;
    }
    if (callbacks.length > 0) {
      console.log(callbacks);
      var functionToCall = callbacks.shift();
      eval(functionToCall + '([' + callbacks.map(function(o){return '"' + o + '"'}) + '])');
    }
  }

  viewportFunctions.dropLadder = function(callbacks){
    if (viewportHasLadder) {
      viewportHasLadder = false;
      $('#ladder-sprite').css("padding-left", $("#sprite").css("margin-left"));
      $('#ladder-sprite').show();
      if (viewportFunctions.viewportAtCanyon()){
        move("#ladder-sprite-image").add("margin-left", 35).end();
        move("#ladder-sprite-image").rotate(90).end();
        move("#ladder-sprite-image").add("margin-top", 25).end();
        viewportCanyonTraversable = true;
      }
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
  };

  viewportFunctions.playAnimation = function(callTrace){
    var functionsStack = callTrace.map(function(o){return "viewportFunctions." + o})
    var functionToCall = functionsStack.shift()
    eval(functionToCall + '([' + functionsStack.map(function(o){return '"' + o + '"'}) + '])');
  }

  viewportFunctions.loseGame = function(callTrace){
    Session.set("infoMessage", "after some time, the Princess gets tired and goes away you: you lost");
  }

  viewportFunctions.winGame = function(callTrace){
    Session.set("infoMessage", "congrats, you did it!");
  }

  viewportFunctions.viewportAtLadder = function(){
    var marioPL = parseInt($('#sprite').css("margin-left"));
    var ladderPL = parseInt($('#ladder-sprite').css("padding-left"));
    return (Math.abs((marioPL - ladderPL)) < 16)
  }


  viewportFunctions.viewportAtCanyon = function(){
    var marioPL = parseInt($('#sprite').css("margin-left"));
    return (Math.abs((marioPL - 480)) < 25)
  }


  window.viewportFunctions = viewportFunctions;


  // initial move to put mario right enough
  setTimeout(function(){
    viewportFunctions.walkRight(["viewportFunctions.walkRight", "viewportFunctions.walkRight", "viewportFunctions.walkRight"]);
  }, 400);

};

window.initViewportEngine = initViewportEngine;
