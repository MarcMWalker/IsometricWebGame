/*
 * 	TODO: After enemy array length has reached zero, increase wave number and spawn another set of enemies.
 * */

//	TODO: Working on splitting up isogroups to provide more adequate game structure

//Variables for isoGroups
var mapGroup;
var wallGroup, wall;
var isoGroup2, player;
var enemyGroup;
var portalGroup;

//Enemies array variable, portal and portal
var enemies = [ ];

var portal;
var portalSpeed;

//Variables for leaf animation
var max = 0;
var front_emitter;
var mid_emitter;
var secondMid_emitter;
var back_emitter;
var update_interval = 240;
var l = 0;

var playState = {
	intKeyMask : 0,
	intPrevMask : 0,
	preload: function ( )
	{

		game.time.advancedTiming = true;

		// Add and enable the plug-in.
		game.plugins.add ( new Phaser.Plugin.Isometric ( game ) );

		//	Setup world boundary
		game.world.setBounds ( 0, 0, 5150, 5150 );

		//	Start the plugin physics system
		game.physics.startSystem ( Phaser.Plugin.Isometric.ISOARCADE );

		game.physics.isoArcade.setBoundsToWorld ( );

		// This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
		// this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
		game.iso.anchor.setTo ( 0.5, 0.5 );
	},
	create: function ( )
	{
		// Create a isoGroups for game, code influenced by: http://rotates.org/phaser/iso/examples/depth_sorting.htm
		mapGroup = game.add.group ( );
		isoGroup2 = game.add.group ( );
		enemyGroup = game.add.group ( );
		portalGroup = game.add.group();

		game.physics.isoArcade.gravity.setTo ( 0,0,-500 );

		//Cubes added to map, code influenced by: http://rotates.org/phaser/iso/examples/depth_sorting.htm
		var map;

		for ( var x = 0; x < 2048; x += 100 )
		{
			for ( var y = 0; y < 2048; y += 100 )
			{
				map = game.add.isoSprite ( x, y, 0, 'cube', 0, mapGroup );
				map.anchor.set ( 0.5, 0.0 );
			}
		}

		//	Generate First Wave Of Enemies
		for ( var i = 0; i < 5; ++i )
		{
			var enemy = new Enemy ( new Vector2 ( ( 64 * i + 64 ) << 1, ( 64 * i + 64 ) << 1 ) );
			enemy.sprite.anchor.set ( 0.5 );
			game.physics.isoArcade.enable ( enemy.sprite );
			enemy.sprite.body.collideWorldBounds = true;

			enemies.push ( enemy );
		}

		player = new Player ( new Vector2 ( 0, 0 ) );

		game.camera.follow ( player.sprite );

		this.cursors = game.input.keyboard.createCursorKeys ( );

		//	Get Keys When Pressed
		this.game.input.keyboard.addCallbacks ( this.callbackContext, this.handle_keys, this.reset_keys );

		//Rain emitter created and set around entire screen, influenced by: https://phaser.io/examples/v2/particles/rain
		var emitter = game.add.emitter(game.world.centerX, 1920, 1080);

		emitter.width = game.world.width;
		emitter.makeParticles('raindrop');
		emitter.minParticleScale = 0.1;
		emitter.maxParticleScale = 0.6;
		emitter.setYSpeed(600, 600);
		emitter.setXSpeed(-5, 5);
		emitter.minRotation = 0;
		emitter.maxRotation = 0;
		emitter.start(false, 16600, 0, 0);


		//Leaf particle effect/animation from: https://phaser.io/examples/v2/particles/snow
		back_emitter = game.add.emitter(this.game.world.centerX, this.game.world.centerY - 550);
		back_emitter.width = game.world.width;
		back_emitter.makeParticles('leaf');
		back_emitter.maxParticleScale = 0.06;
		back_emitter.minParticleScale = 0.02;
		back_emitter.setYSpeed(20, 100);
		back_emitter.gravity = 1;
		back_emitter.width = game.world.width * 2.5;
		back_emitter.minRotation = 0;
		back_emitter.maxRotation = 40;

		//Leaf particle effect/animation from: https://phaser.io/examples/v2/particles/snow
		mid_emitter = game.add.emitter(this.game.world.centerX, this.game.world.centerY - 550);
		mid_emitter.width = game.world.width;
		mid_emitter.makeParticles('leaf2');
		mid_emitter.maxParticleScale = 0.06;
		mid_emitter.minParticleScale = 0.008;
		mid_emitter.setYSpeed(50, 150);
		mid_emitter.gravity = 1;
		mid_emitter.width = game.world.width * 2.5;
		mid_emitter.minRotation = 0;
		mid_emitter.maxRotation = 40;

		//Leaf particle effect/animation from: https://phaser.io/examples/v2/particles/snow
		secondMid_emitter = game.add.emitter(this.game.world.centerX, this.game.world.centerY - 550);
		secondMid_emitter.width = game.world.width;
		secondMid_emitter.makeParticles('leaf2');
		secondMid_emitter.maxParticleScale = 0.06;
		secondMid_emitter.minParticleScale = 0.008;
		secondMid_emitter.setYSpeed(50, 150);
		secondMid_emitter.gravity = 1;
		secondMid_emitter.width = game.world.width * 2.5;
		secondMid_emitter.minRotation = 0;
		secondMid_emitter.maxRotation = 40;

		//Leaf particle effect/animation from: https://phaser.io/examples/v2/particles/snow
		front_emitter = game.add.emitter(this.game.world.centerX, this.game.world.centerY - 550);
		front_emitter.width = game.world.width;
		front_emitter.makeParticles('leaf3');
		front_emitter.maxParticleScale = 0.09;
		front_emitter.minParticleScale = 0.06;
		front_emitter.setYSpeed(50, 150);
		front_emitter.gravity = 2;
		front_emitter.width = game.world.width * 2.5;
		front_emitter.minRotation = 0;
		front_emitter.maxRotation = 40;

		//Function influenced by: https://phaser.io/examples/v2/particles/snow
		this.changeWindDirection();

		//Influenced by: https://phaser.io/examples/v2/particles/snow
		back_emitter.start(false, 22000, 10);
		mid_emitter.start(false, 10000, 30);
		secondMid_emitter.start(false, 10000, 30);
		front_emitter.start(false, 20000, 10);

		portal = new Portal ( new Vector2 (1000,1000));
	},
	update: function ( )
	{
		var speed = 400;

		player.sprite.body.velocity.x = 0;
		player.sprite.body.velocity.y = 0;

		player.animate ( this.intKeyMask );

		if ( this.intKeyMask > 0 )
			this.intPrevMask = this.intKeyMask;

		if ( game.input.mousePointer.leftButton.isDown )
		{
			player.handle_attack ( this.intPrevMask );
			this.intKeyMask = -1;
		}

		for ( var i = 0; i < enemies.length; ++i )
		{
			enemies [ i ].update ( );
		}

		//	Game physics applied to enemyGroup and sorting of layers in isometric format
		game.physics.isoArcade.collide ( enemyGroup );
		game.iso.topologicalSort ( enemyGroup );

		l++;

		if ( l === update_interval )
		{
			this.changeWindDirection ( );
			update_interval = Math.floor ( Math.random() * 20) * 60; // 0 - 20sec @ 60fps
			l = 0;
		}

		//***TODO: Portal activation when all enemies dead
		var activated = false
		if(activated = false){
			portal.sprite.animations.play ( 'activate' );
			activated = true;
		}else{
			portal.sprite.animations.play ( 'repeat' );
		}

		/*if (enemies.length <= 4)
	    {
		portal.sprite.animations.play ( 'activate' );
	    }*/
		//portalSpeed++;
	},
	render: function ( ) 
	{
	},
	handle_keys: function ( event )
	{
		//	Reset After Attack
		if ( playState.intKeyMask === -1 )
			playState.intKeyMask = 0;

		switch ( event.keyCode )
		{
			case 37:
				playState.intKeyMask |= 0x1;
				break;
			case 38:
				playState.intKeyMask |= 0x2;
				break;
			case 39:
				playState.intKeyMask |= 0x4;
				break;
			case 40:
				playState.intKeyMask |= 0x8;
				break;
		}
	},
	reset_keys : function ( event )
	{
		switch ( event.keyCode )
		{
			case 37:
				playState.intKeyMask ^= 0x1;
				break;
			case 38:
				playState.intKeyMask ^= 0x2;
				break;
			case 39:
				playState.intKeyMask ^= 0x4;
				break;
			case 40:
				playState.intKeyMask ^= 0x8;
				break;
		}
	},

	//Function for the wind direction of leaves, influenced by: https://phaser.io/examples/v2/particles/snow
	changeWindDirection : function () {

		var multi = Math.floor((max + 200) / 4),
			frag = (Math.floor(Math.random() * 100) - multi);
		max = max + frag;

		if (max > 200) max = 150;
		if (max < -200) max = -150;

		this.setXSpeed(back_emitter, max);
		this.setXSpeed(mid_emitter, max);
		this.setXSpeed(secondMid_emitter, max);
		this.setXSpeed(front_emitter, max);

	},

	//Influenced by: https://phaser.io/examples/v2/particles/snow
	setXSpeed : function (emitter, max) {

		emitter.setXSpeed(max - 2, max);
		emitter.forEachAlive(this.setParticleXSpeed, this, max);

	},

	//Influenced by: https://phaser.io/examples/v2/particles/snow
	setParticleXSpeed : function (particle, max) {

		particle.body.velocity.x = max - Math.floor(Math.random() * 300);
	}
};
