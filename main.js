// We start by initializing Phaser
// Parameters: width of the game, height of the game, how to render the game, the HTML div that will contain the game
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'game_div');

// And now we define our first and only state, I'll call it 'main'. A state is a specific scene of a game like a menu, a game over screen, etc.
var main_state = {

    preload: function() {
        // Everything in this function will be executed at the beginning. That’s where we usually load the game’s assets (images, sounds, etc.)
		
		// load our hero -- chegg icon
		this.game.load.image('chicken', 'assets/chicken.png');
		
		// load background color
		// this.game.stage.backgroundColor = '#AEC816';
		this.game.load.image('sky', 'assets/sky.png');
    },

    create: function() { 
        // This function will be called after the preload function. Here we set up the game, display sprites, add labels, etc.
		// background image
		this.game.add.sprite(0, 0, 'sky');
		
		// chicken
		this.chicken = this.game.add.sprite(100, 150, 'chicken');
		
		// game.physics.arcade.enable(chicken);
		
		this.chicken.anchor.setTo(1, 0);	
		
		// add keys to the game
		this.cursors = this.game.input.keyboard.createCursorKeys();
		score = 0;
		var style = { font: "30px Arial", fill: "#ffffff" };
		this.label_score = this.game.add.text(20, 20, "0", style);
    },

    update: function() {
        // This is where we will spend the most of our time. This function is called 60 times per second to update the game.
		this.chicken.angle += 1;
		this.chicken.body.velocity.x = 0;
		if (this.cursors.left.isDown) {
			this.chicken.body.velocity.x = -150;
			score += 100;
		} else if (this.cursors.right.isDown) {
			this.chicken.body.velocity.x = 150;
			score -= 100;

		}
		this.label_score.content = score;
    },
	
	// moveUp: function() {
	// 	alert('move up');
	// 	this.hero_sprite.body.position(100, 150);
	// },
	// 
	// moveDown: function() {
	// 	alert('move down');
	// 	this.hero_sprite.body.position(400, 150);
	// }
}

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', main_state);  
game.state.start('main');  