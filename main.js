// We start by initializing Phaser
// Parameters: width of the game, height of the game, how to render the game, the HTML div that will contain the game
var game = new Phaser.Game(480, 320, Phaser.AUTO, 'game_div');

// And now we define our first and only state, I'll call it 'main'. A state is a specific scene of a game like a menu, a game over screen, etc.
var main_state = {

    preload: function() {
        // Everything in this function will be executed at the beginning. That’s where we usually load the game’s assets (images, sounds, etc.)
		
		// load our hero -- chegg icon
		this.game.load.image('chicken', 'assets/chicken.png');
		
		// load background image
		// this.game.stage.backgroundColor = '#AEC816';
		this.game.load.image('sky', 'assets/sky.png');
		
		// load blocks
		this.game.load.image('block', 'assets/pipe.png');
    },

    create: function() { 
        // This function will be called after the preload function. Here we set up the game, display sprites, add labels, etc.
		// background image
		this.game.add.sprite(0, 0, 'sky');
		
		// add block group
		this.blocks = this.game.add.group();
		this.blocks.createMultiple(20, 'block');
		
		this.timer = this.game.time.events.loop(1500, this.add_column_of_blocks, this);
		
		// chicken
		this.chicken = this.game.add.sprite(100, 150, 'chicken');
		
		// make anchor to middle of sprite
		this.chicken.anchor.setTo(0.5, 0.5);
		
		// this.game.physics.arcade.enable(chicken);
		
		// add keys to the game
		this.cursors = this.game.input.keyboard.createCursorKeys();
		score = 0;
		var style = { font: "30px Arial", fill: "#ffffff" };
		this.label_score = this.game.add.text(20, 20, "0", style);
    },

    update: function() {
        // This is where we will spend the most of our time. This function is called 60 times per second to update the game.
		this.chicken.angle += 1;
		this.chicken.body.velocity.y = 0;
		
		this.game.physics.overlap(this.chicken, this.blocks, this.hit_block, null, this);
		
		if (this.cursors.left.isDown) {
			this.chicken.body.velocity.y = -150;
			// score += 100;
		} else if (this.cursors.right.isDown) {
			this.chicken.body.velocity.y = 150;
			// score -= 100;

		}
		this.label_score.content = score;
    },
	
	hit_block: function() {
		// if the chicken hits a block, we have nothing to do 
		if (this.chicken.alive == false) {
			return;
		}
		
		// set the alive property of the chicken to false
		this.chicken.alive = false;
		
		// prevent new blocks from appearing
		this.game.time.events.remove(this.timer);
		
		// go through all the blocks, and stop their movement
		this.blocks.forEachAlive(function(b) {
			b.body.velocity.x = 0;
		}, this);
	},
	
	add_one_block: function(x, y) {
		var block = this.blocks.getFirstDead();
		
		block.reset(x, y);
		
		block.body.velocity.x = -200;
		
		block.outOfBoundsKill = true;
	},
	
	add_column_of_blocks: function() {
		var hole = Math.floor( Math.random() * 5 ) + 1;
		
		for (var i = 0; i < 8; i++) {
			if (i != hole && i != hole + 1) {
				this.add_one_block(400, i * 60 + 10);
			}
		}
		score += 100;
		this.label_score.content = score;
	}
	
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