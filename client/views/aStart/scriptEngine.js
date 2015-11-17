var initScriptEngine = function(){

		//can you take a ladder?
		var atLadder=false;

		//are you at the canyon
		var atCanyon=false;

		//have you got the ladder
		var hasLadder=false;

		//can you cross the canyon (because you put the ladder on it)
		var canyonTraversable=false;

		//where the ladder is
		var ladderLocation=-3;

		//where the canyon is
		var canyonLocation=3;

		//where the hero is
		var heroLocation=0;

		//the code generated
		var plan='';

		//flag for syntax checking during code generation
		var inWhile=false;
		var justClosedWhile=false;

		//current execution step
		var currentStep=1;

		//maximum execution steps allowed to prevent infinite loops
		var maxSteps=50;
		
		//victory flag, to fix final check
		gameOver=false;

		//reset everything
		function resetGame(){
		atLadder=false;
		atCanyon=false;
		hasLadder=false;
		canyonTraversable=false;
		ladderLocation=-3;
		canyonLocation=3;
		heroLocation=0;
		plan='';
		inWhile=false;
		justClosedWhile=false;
		currentStep=1;
		maxSteps=50;
		gameOver=false;
		}

		//terminates the game
		function loseGame(){
				message='after some time, the avalanche buries you: you lost';
				gameLog(message);
				alert(message);
				gameOver=true;
		}

		//checks whether the player won
		function checkGameOutcome(){
			//if you are past the canyon, announce victory
			if(heroLocation > canyonLocation){
				message='you got past the canyon: you won';
				gameLog(message);
				alert(message);
				gameOver=true;
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
		$('#executionContainer').append($('<div>').text(message));
		}

		//check if you are not at the ladder
		function NatLadder(){
		if(atLadder) gameLog('you are at the ladder');
		else  gameLog('you are not yet at the ladder');
		return !atLadder;
		}

		//check if you are not at the canyon
		function NatCanyon(){
		if(atCanyon) gameLog('you are at the canyon');
		else  gameLog('you are not yet at the canyon');
		return !atCanyon;
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

				//output log
				gameLog('you walk right');
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
		}

		//wheneven the player clicks on an action
		$('#actionsContainer').on('click','.line',function(){
				//get action name
				var action=$(this).attr("id");

				//create visible element
				var scriptedAction=$('<div>').text(action);

				//while has a strict syntax; if while is selected
				if(action=='repeat'){

				//take note and demand a condition afterwards
				inWhile=true;

				//generate code for open while
				plan=plan.concat('while(currentStep<'+maxSteps+' && ');
					}else{
					//if it's another action
					//if in while, demand a condition
					if(inWhile){
					//if not a condition
					if(!$(this).hasClass('condition')){

					//demand it
					alert('you need a condition');

					//and refuse to add the action	
					return;
					}else{
					//add the condition with closing while parenthese
					plan=plan.concat(action+'()) ');

				//close the while after action is added
				inWhile=false;

				//raise flag for syntax check of while termination block
				justClosedWhile=true;
					}
					}else{
						//add the action
						plan=plan.concat(action+'(); ');

						//switch off the flag so we know the syntax is good
						if(justClosedWhile) justClosedWhile=false;
					}
					}

				//add visible element to script list
				$('#scriptContainer').append(scriptedAction);
		})

		//execute script
		$('#play').on('click',function(){

				//if the flag is still raised, the player left a while without subject action; stop
				if(justClosedWhile){
				alert('you need to select an action after a repeat');
				return;
				}

				//execute generated code
				eval(plan);
				console.log(plan);

				//if plan was not sufficient to carry out goal, kill the player
				if(!gameOver) loseGame();
				})

		//reset game
		$('#reset').on('click',function(){
				//clear plan
				$('#scriptContainer').html('');

				//clear log
				$('#executionContainer').html('');

				//reset game status
				resetGame();
				})
};

window.initScriptEngine = initScriptEngine
