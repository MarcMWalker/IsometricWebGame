var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

/*
 * 	TODO: After enemy array length has reached zero, increase wave number and spawn another set of enemies.
 * */

//Woking on splitting up isogroups to provide more adequate game structure
var mapGroup;
var wallGroup, wall;
var isoGroup2, player;
var enemyGroup;

var enemies = [ ];

BasicGame.Boot = {
	intKeyMask : 0,
	preload: function () {
		game.load.image('cube', 'assets/images/cube3.png');
		game.load.image('cube1', 'assets/images/cube2.png');
		game.load.image('cube2', 'assets/images/cube4.png');
		game.load.image('cube3', 'assets/images/cube1.png');
        game.load.spritesheet('knight', 'assets/images/spritesheet-min.png', 360,308);
        

		game.time.advancedTiming = true;

		// Add and enable the plug-in.
		game.plugins.add(new Phaser.Plugin.Isometric(game) );

		game.world.setBounds ( 0, 0, 5150, 5150 );

		game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

		game.physics.isoArcade.setBoundsToWorld();

		// This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
		// this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
		game.iso.anchor.setTo(0.5, 0.5);
	},
	create: function () {
		// Create a group for our tiles, so we can use Group.sort
		mapGroup = game.add.group();
		isoGroup2 = game.add.group();
		enemyGroup = game.add.group();

		game.physics.isoArcade.gravity.setTo(0,0,-500);

		// Let's make a load of cubes on a grid, but do it back-to-front so they get added out of order.
		var map;
		for (var xx = 0; xx < 27; ++xx ) {
			for (var yy = 0; yy < 27; ++yy ) {
				// Create a cube using the new game.add.isoSprite factory method at the specified position.
				// The last parameter is the group you want to add it to (just like game.add.sprite)
				map = game.add.isoSprite(xx * 103, yy * 103, 0, 'cube', 0, mapGroup);
				map.anchor.set(0.5, 0.5);

				//Adding wall around arena
				/*
		if(xx == 0 || yy == 26 || xx == 26 || yy == 0)
		    {
			wall = game.add.isoSprite(xx * 103, yy * 103,0, 'cube2', 0, wallGroup);
			wall.anchor.set(0.5,0.5,0.0);
		    }
		    */

				// Add a slightly different tween to each cube so we can see the depth sorting working more easily.
				//game.add.tween(cube).to({ isoZ: 10 }, 100 * ((xx + yy) % 10), Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);
			}
		}

		//	Generate First Wave Of Enemies
		for ( var i = 0; i < 5; ++i )
		{
			var enemy = new Enemy ( new Vector2 ( ( 64 * i ) << 1, ( 64 * i ) << 1 ) );
			enemy.sprite.anchor.set ( 0.5 );
			game.physics.isoArcade.enable ( enemy.sprite );
			enemy.sprite.body.collideWorldBounds = true;

			enemies.push ( enemy );
		}

		player = new Player ( new Vector2 ( 0, 0 ) );

		game.camera.follow ( player.sprite );

		this.cursors = game.input.keyboard.createCursorKeys();

		//	Get Keys When Pressed
		this.game.input.keyboard.addCallbacks ( this.callbackContext, this.handle_keys, this.reset_keys );
	},
	update: function () {
		var speed = 400;

		player.sprite.body.velocity.x = 0;
		player.sprite.body.velocity.y = 0;

		switch ( this.intKeyMask )
		{
			//	Idle
			case 0:
				player.sprite.animations.stop ( );
				break;

			//	Straights
			case 1:
				player.sprite.body.velocity.x = -speed;
				player.sprite.animations.play ( 'W' );
				break;
			case 2:
				player.sprite.body.velocity.y = -speed;
				player.sprite.animations.play ( 'N' );
				break;
			case 4:
				player.sprite.body.velocity.x = speed;
				player.sprite.animations.play ( 'E' );
				break;
			case 8:
				player.sprite.body.velocity.y = speed;
				player.sprite.animations.play ( 'S' );
				break;

			//	Diagonals
			case 6:
				player.sprite.body.velocity.x = speed * 0.5;
				player.sprite.body.velocity.y = -speed * 0.5;
				player.sprite.animations.play ( 'NE' );
				break;
			case 3:
				player.sprite.body.velocity.x = -speed * 0.5;
				player.sprite.body.velocity.y = -speed * 0.5;
				player.sprite.animations.play ( 'NW' );
				break;
			case 12:
				player.sprite.body.velocity.x = speed * 0.5;
				player.sprite.body.velocity.y = speed * 0.5;
				player.sprite.animations.play ( 'SE' );
				break;
			case 9:
				player.sprite.body.velocity.x = -speed * 0.5;
				player.sprite.body.velocity.y = speed * 0.5;
				player.sprite.animations.play ( 'SW' );
				break;				
		}

		game.physics.isoArcade.collide(isoGroup2);
		game.iso.topologicalSort(isoGroup2);

		//Adding feature to destroy enemies here just by touching them at the moment
		/*
	    game.physics.isoArcade.overlap(enemy, player.sprite,function(e) {
		e.destroy();
		console.log("Enemy Destroyed");
	    });
	    */

		/*for ( var i = 0; i < enemies.length; ++i )
		{
			enemies [ i ].update ( );
		}*/
	},
	render: function () 
	{
	},
	handle_keys: function ( event )
	{
		switch ( event.keyCode )
		{
			case 37:
				BasicGame.Boot.intKeyMask |= 0x1;
				break;
			case 38:
				BasicGame.Boot.intKeyMask |= 0x2;
				break;
			case 39:
				BasicGame.Boot.intKeyMask |= 0x4;
				break;
			case 40:
				BasicGame.Boot.intKeyMask |= 0x8;
				break;
		}
	},
	reset_keys : function ( )
	{
		BasicGame.Boot.intKeyMask = 0;
	}
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');
