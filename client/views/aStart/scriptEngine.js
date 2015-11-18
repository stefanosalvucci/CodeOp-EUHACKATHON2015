var initScriptEngine = function(){

	//can you take a ladder?
	window.atLadder=false;

	//are you at the canyon
	window.atCanyon=false;

	//have you got the ladder
	window.hasLadder=false;

	//can you cross the canyon (because you put the ladder on it)
	window.canyonTraversable=false;

	//where the ladder is
	window.ladderLocation=-3;

	//where the canyon is
	window.canyonLocation=11;

	//where the hero is
	window.heroLocation=0;

	//the code generated
	var plan='';

	//flag for syntax checking during code generation
	var inCondition=false;
	var justClosedWhile=false;

	//current execution step
	var currentStep=1;

	//list of actions for the B panel
	var planList=new Array();

	//call trace to move the viewPort
	var callTrace= new Array();

	//maximum execution steps allowed to prevent infinite loops
	var maxSteps=50;

	//victory flag, to fix final check
	gameOver=false;

	//container for current instruction
	var scriptedAction=$('<div>');

	//add visible element to script list
	$('#scriptContainer').append(scriptedAction);

	//printable actions map
	var stringActions=new Array();
	stringActions['takeLadder']= 'take the ladder';
	stringActions['dropLadder']= 'drop the ladder';
	stringActions['walkRight']= 'walk right';
	stringActions['walkLeft']= 'walk left';
	stringActions['AtLadder']= 'at the ladder, ';
	stringActions['AtCanyon']= 'at the canyon, ';
	stringActions['HasLadder']= 'have the ladder, ';
	stringActions['while']= 'while ';
	stringActions['if']= 'if ';
	stringActions['not']= 'not ';

	//reset everything
	function resetGame(){
		atLadder=false;
		atCanyon=false;
		hasLadder=false;
		canyonTraversable=false;
		ladderLocation=-3;
		canyonLocation=11;
		heroLocation=0;
		plan='';
		inCondition=false;
		justClosedWhile=false;
		currentStep=1;
		maxSteps=50;
		gameOver=false;
		scriptedAction=$('<div>');
		$('#scriptContainer').append(scriptedAction);
		delete planList;
		planList= new Array();
		delete callTrace;
		callTrace= new Array();
		resetCollections();
	}

	//terminates the game
	function loseGame(){
		message='after some time, the avalanche buries you: you lost';
		gameLog(message);
		gameOver=true;

		//add to list function calls for the viewport (filter actions that have no graphical relevance)
		callTrace.push('loseGame');
	}

	//checks whether the player won
	function checkGameOutcome(){
		//if you are past the canyon, announce victory
		if((heroLocation - 2) > canyonLocation){
			message='you got past the canyon: you won';
			gameLog(message);
			gameOver=true;

			//add to list function calls for the viewport (filter actions that have no graphical relevance)
			callTrace.push('winGame');
		}

		//if you reached maximum number of steps, terminate
		if(currentStep >= maxSteps){
			loseGame();
		}
	}

	//increments game step, checks if maximum has been reached and takes action;
	function incrementStepAndCheckExecutionTime(){
		//increment step and check if maximum;
		currentStep+=1;

		//checks victory
		checkGameOutcome();
	}

	//populate the output log
	function gameLog(message){
		//add to list of game events to be sent to B
		planList.push(message);

		//debug in panel A
		console.log(message);
	}

	//check if you have a ladder
	function HasLadder(){
		if(hasLadder) gameLog('you got the ladder');
		else gameLog('you have no ladder');

		return hasLadder;
	}


	//check if you are not at the ladder
	function AtLadder(){
		if(atLadder) gameLog('you are at the ladder');
		else gameLog('you are not yet at the ladder');

		return atLadder;
	}

	//check if you are not at the canyon
	function AtCanyon(){
		if(atCanyon) gameLog('you are at the canyon');
		else gameLog('you are not yet at the canyon');

		return atCanyon;
	}

	//check if the player can reach ladder and canyon
	function updateSurroundingStatus(){
		atCanyon=heroLocation == canyonLocation;
		atLadder=heroLocation == ladderLocation;
	}

	//move right
	function walkRight(){
		//count time
		incrementStepAndCheckExecutionTime();

		//check whether you can move past the canyon
		if (atCanyon){
			if(canyonTraversable){
				//move past
				heroLocation+=1;

				//add to list function calls for the viewport
				callTrace.push(arguments.callee.name);

				//update log
				gameLog('you walk over the canyon');

				//winning status, perform check
				checkGameOutcome();
			}else{
				//deny the action
				gameLog('can\'t walk: there is a canyon');
			}
		}else{
			//move right
			heroLocation+=1;

			//add to list function calls for the viewport
			callTrace.push(arguments.callee.name);

			//output log
			gameLog('you walk right');
		}

		//if you have the ladder, the ladder moves with you
		if(hasLadder){
			//update ladder location
			ladderLocation=heroLocation;
		}

		//check what you have at reach
		updateSurroundingStatus();
	}

	//move left
	function walkLeft(){
		//count time
		incrementStepAndCheckExecutionTime();

		//move left
		heroLocation-=1;

		//add to list function calls for the viewport
		callTrace.push(arguments.callee.name);

		//if you have the ladder, the ladder moves with you
		if(hasLadder){
			//update ladder location
			ladderLocation=heroLocation;
		}

		//output log
		gameLog('you walk left');

		//check what you have at reach
		updateSurroundingStatus();
	}

	//take ladder, if you can
	function takeLadder(){
		//count time
		incrementStepAndCheckExecutionTime();

		//output log
		gameLog('you try to take the ladder');

		//check whether you can take the ladder
		if(atLadder){
			//take it
			hasLadder=true;

			//add to list function calls for the viewport
			callTrace.push(arguments.callee.name);

			//output log
			gameLog('you got the ladder');
		}else{
			//deny the action
			gameLog('there is no ladder to take');
		}
	}

	//drop ladder, if you have it
	function dropLadder(){
		//count time
		incrementStepAndCheckExecutionTime();

		//check if you have it
		if(hasLadder){
			//drop it
			hasLadder=false;

			//add to list function calls for the viewport (filter actions that have no graphical relevance)
			callTrace.push(arguments.callee.name);

			//update ladder location
			ladderLocation=heroLocation;

		//special case: dropping it on the canyon makes it traversable
			if(atCanyon){
				//update world status
				canyonTraversable=true;

				//output special log
				gameLog('you drop the ladder over the canyon');
			}else{
				//output log
				gameLog('you drop the ladder');
			}
		}else{
			//deny action
			gameLog('you didn\' have any ladder to drop');
		}

		//check what you have at reach
		updateSurroundingStatus();
	}

	//execute script
	$('#play').on('click',function(){

		//if the flag is still raised, the player left a while without subject action; stop
		if(justClosedWhile){
			alert('you need to select an action after a while');
			return;
		}

		//execute generated code
		eval(plan);
		console.log(plan);

		//if plan was not sufficient to carry out goal, kill the player
		if(!gameOver) loseGame();
		console.log(planList);
		console.log(callTrace);

		// send trace to Meteor server
		Meteor.call('pushCalltraceToClientB', callTrace, function(error, result){
			if (result){
				lg(result);
			} else { // error
				lg (error);
			}
		});

		//send plan to panel B
		Meteor.call('pushActionsToClientB', planList, function(error, result){
			if (result){
				lg(result);
			} else { // error
				lg (error);
			}
		});
	});

	//reset game
	$('#reset').on('click',function(){
		//clear plan
		$('#scriptContainer').html('');

		//reset game status
		resetGame();
	});

	//wheneven the player clicks on an action
	$('#actionsContainer').on('click','.line',function(){
		//get action name
		var instruction=$(this).attr("id");


		//while has a strict syntax; if while is selected
		if(('while'==instruction || 'if'==instruction) && !inCondition){

			//take note and demand a condition afterwards
			inCondition=true;

			//select right behaviour for conditional instructions
			switch(instruction) {
				case 'while':
					//generate code for open while (with infinite loop avoidance condition)
						plan=plan.concat('while(currentStep<'+maxSteps+' && ');

					//generate output in the current container
					scriptedAction.append($('<span>').text(stringActions[instruction]));
					break;
				case 'if':
					//generate code for open if
					plan=plan.concat('if( ');

					//generate output in the current container
					scriptedAction.append($('<span>').text(stringActions[instruction]));
					break;
			}
		}else{
			//if it's another action
			//if in while, demand a condition
			if(inCondition){
				//if not a condition
				if(!$(this).hasClass('condition')){

					//demand it
					alert('you need a condition');

					//and refuse to add the action
					return;
				}else{

					//if it's a negation
					if('not'==instruction){

						//generate code for not
						plan=plan.concat('!');

						//generate output in the current container
						scriptedAction.append($('<span>').text(stringActions[instruction]));

					}else{
						//add the condition with closing while parenthese
						plan=plan.concat(instruction+'()) ');

						//generate output in the current container
						scriptedAction.append($('<span>').text(stringActions[instruction]));

						//close the while after action is added
						inCondition=false;

						//raise flag for syntax check of while termination block
						justClosedWhile=true;
					}
				}
			}else{

				//prevent putting a boolean or negation without being in the need of it
				switch(instruction) {
					case 'not':
					case 'AtCanyon':
					case 'AtLadder':
					case 'HasLadder':
						//demand it
						alert('you need to be in an if or a while to put a condition or a negation');

						//and refuse to add the action
						return;
				}
				//add the action
				plan=plan.concat(instruction+'(); ');

				//generate output in the current container
				scriptedAction.append($('<span>').text(stringActions[instruction]));

				//create a new visible element container
				scriptedAction=$('<div>');

				//add visible element to script list
				$('#scriptContainer').append(scriptedAction);

				//switch off the flag so we know the syntax is good
				if(justClosedWhile) justClosedWhile=false;
			}
		}

	});
};

window.initScriptEngine = initScriptEngine
