Meteor.startup(function() { // wait for app's environment to be loaded

	window.initClientA = function () {
		// load move.js (deferred <-- public)
		$('body').append('<script type="text/javascript" src="lib/move.min.js">');

		// init script engine
		initScriptEngine();

	};
});