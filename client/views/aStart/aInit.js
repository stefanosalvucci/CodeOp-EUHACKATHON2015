Meteor.startup(function() { // wait for app's environment to be loaded
	var initKiwiEngine = function () {
		lg ("init Kiwi engine start");

		var myGame = new Kiwi.Game();

		var myState = new Kiwi.State("myState"); // it's the main level

		var loadingState = new Kiwi.State("loadingState");

		var preloader = new Kiwi.State("preloader");


		myState.preload = function () {

			Kiwi.State.prototype.preload.call(this);

		};


		myState.create = function () { // level design (init background, character aspect and position, animations, ...)

			this.background = new Kiwi.GameObjects.StaticImage(
				this, this.textures["defaultBackground"], 0, 0, true);

			this.character = new Kiwi.GameObjects.Sprite(
				this, this.textures["characterSprite"], 350, 330, true);

			Kiwi.State.prototype.create.call(this);

			this.hasLadder = false;
			this.ladderOnHole = false;

			this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
			this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);
			this.downKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S);
			this.takeKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.T);
			this.leaveKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.L);


			this.character.animation.add(
				"idleright", [0], 0.1, false);
			this.character.animation.add(
				"crouchright", [1], 0.1, false);
			this.character.animation.add(
				"moveright", [2, 3, 4, 5, 6, 7], 0.01, true);
			this.character.animation.add(
				"idleleft", [8], 0.1, false);
			this.character.animation.add(
				"crouchleft", [9], 0.1, false);
			this.character.animation.add(
				"moveleft", [15, 14, 13, 12, 11, 10], 0.01, true);

			this.facing = "left";
			this.character.animation.play("idleleft");

			this.addChild(this.background);
			this.addChild(this.character);
		};


		myState.update = function () {  // Game logic (key press [switch in if..else form]--> do something, conditions based on character position, ... )

			Kiwi.State.prototype.update.call(this);

			if (!this.ladderOnHole && this.rightKey.isDown) {
				if (this.character.transform.x > 400) {
					this.character.transform.x -= 3;
				}
			}

			if (this.takeKey.isDown && !this.hasLadder && this.character.transform.x < 3) {
				this.hasLadder = true;
				this.background = new Kiwi.GameObjects.StaticImage(
					this, this.textures["withoutLadder"], 0, 0, true);
				this.addChild(this.background);
				this.addChild(this.character);
			}

			if (this.leaveKey.isDown && this.hasLadder && this.character.transform.x > 390) {
				this.hasLadder = false;
				this.ladderOnHole = true;
				this.background = new Kiwi.GameObjects.StaticImage(
					this, this.textures["ladderOnHole"], 0, 0, true);
				this.addChild(this.background);
				this.addChild(this.character);
			}

			if (this.downKey.isDown) {
				if (this.character.animation.currentAnimation.name !==
					( "crouch" + this.facing )) {
					this.character.animation.play("crouch" + this.facing);
				}

			} else if (this.leftKey.isDown) {
				this.facing = "left";

				if (this.character.transform.x > 3) {
					this.character.transform.x -= 3;
				}

				if (this.character.animation.currentAnimation.name !==
					"moveleft") {
					this.character.animation.play("moveleft");
				}

			} else if (this.rightKey.isDown) {
				this.facing = "right";

				if (this.character.transform.x < 640) {
					this.character.transform.x += 3;
				}

				if (this.character.animation.currentAnimation.name !==
					"moveright") {
					this.character.animation.play("moveright");
				}

			} else if (this.character.animation.currentAnimation.name !==
				"idle" + this.facing) {
				this.character.animation.play("idle" + this.facing);
			}
		};


		// Loading assets
		preloader.preload = function () {

			Kiwi.State.prototype.preload.call(this);

			this.addImage("loadingImage", "/images/loadingImage.png", true); // from "public folder" = <root url>/
		};


		preloader.create = function () {

			Kiwi.State.prototype.create.call(this);

			this.game.states.switchState("loadingState");
		};


		loadingState.preload = function () {

			Kiwi.State.prototype.preload.call(this);

			this.game.states.rebuildLibraries();

			this.game.stage.color = "#E0EDF1";

			this.logo = new Kiwi.GameObjects.StaticImage(
				this, this.textures["loadingImage"], 150, 50);

			this.addChild(this.logo);

			this.logo.alpha = 0;

			this.tweenIn = this.game.tweens.create(this.logo);

			this.tweenIn.to(
				{alpha: 1}, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false);

			this.tweenIn.start();

			// Assets to load
			this.addSpriteSheet("characterSprite", "/images/character.png", 150, 117);
			this.addImage("defaultBackground", "/images/loadingBackground.png");
			this.addImage("withoutLadder", "/images/without_ladder.png");
			this.addImage("ladderOnHole", "/images/ladder_on_hole.png");
		};


		loadingState.update = function () {

			Kiwi.State.prototype.update.call(this);

		};


		loadingState.create = function () {

			Kiwi.State.prototype.create.call(this);

			console.log("inside create of loadingState");

			this.tweenOut = this.game.tweens.create(this.logo);

			this.tweenOut.to(
				{alpha: 0}, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false);

			this.tweenOut.onComplete(this.switchToMain, this);

			this.tweenOut.start();

			// here it goes loadingState.switchToMain
		};


		loadingState.switchToMain = function () {
			this.game.states.switchState("myState");
		};

		// init game config
		myGame.states.addState(myState);
		myGame.states.addState(loadingState);
		myGame.states.addState(preloader);

		// go to preloader (initial status)
		myGame.states.switchState("preloader");
	};

	window.initClientA = function () {
		// load kiwi from cdn
		// Meteor.Loader.loadJs("//cdnjs.cloudflare.com/ajax/libs/kiwi/0.2.1/kiwi.min.js",function(){
			// init kiwi engine
			initKiwiEngine();
		// });


	};
});