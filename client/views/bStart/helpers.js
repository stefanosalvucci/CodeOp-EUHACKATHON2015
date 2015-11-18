Template.bStart.helpers({
	"actions": function(){
		return Actions.find();
	},
	"functions": function(){
		// pass data (and detect it) between clients 'hack' (we execute code in the helper)
		var calltraceObjArray = CallTrace.find().fetch(),
		calltraceStrArray = new Array();

		/*var calltraceStrMap  = function(value,key,map){
			calltraceStrArray.push();
			};
			Map(...) // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
			*/

			calltraceObjArray.forEach(function (element, index){
				calltraceStrArray.push(element.function_name);
			});

			if ((calltraceStrArray.indexOf("loseGame") != -1) || (calltraceStrArray.indexOf("winGame") != -1)){

				lg('animation play');
				lg(calltraceStrArray);
				viewportFunctions.playAnimation(calltraceStrArray);
				return "";
			}
	},
    "infoMessage": function(){
        return Session.get('infoMessage');
    }
});
