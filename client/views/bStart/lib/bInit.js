Meteor.startup(function() {
    window.initClientB = function () {
      // load move.js (deferred <-- public)
      $('body').append('<script type="text/javascript" src="lib/move.min.js">');

      // init script engine
      initScriptEngine();

    };

    initClientB();
});

