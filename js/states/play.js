//	Variables for leaf animation
var max = 0;
var l = 0;

var playState = {
	intKeyMask : 0,
	intPrevMask : 12,
	intPlayerColour : 0x86bfda,
	intEnemyCounter : 0,
	intSpawnEnemies : 1,
	intUpdateInterval : 240,
	emitFront : null,
	emitMid : null,
	emitTop : null,
	emitBack : null,
	grpMap : null,
	grpEnemies : null,
	player : null,
	portal : null,
	healthBar : null,
	arrEnemies : [],

	preload : function ( )
	{
		game.time.advancedTiming = true;

		// 	Add and enable the plug-in.
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
	create : function ( )
	{

		//	Start playing music once game starts
		this.musicbattle = game.add.audio ( 'battle' );
		this.musicbattle.play ( );
		this.musicbattle.loopFull ( 0.5 );

		//	Create a isoGroups for game, code influenced by: http://rotates.org/phaser/iso/examples/depth_sorting.htm
		this.grpMap = game.add.group ( );
		this.grpEnemies = game.add.group ( );
		grpHUD = game.add.group ( );

		game.physics.isoArcade.gravity.setTo ( 0,0,-500 );

		//	Cubes added to map, code influenced by: http://rotates.org/phaser/iso/examples/depth_sorting.htm
		var map;

		for ( var x = 0; x < 4096; x += 100 )
		{
			for ( var y = 0; y < 4096; y += 100 )
			{
				map = game.add.isoSprite ( x, y, 0, 'cube', 0, this.grpMap );
				map.anchor.set ( 0.5, 0.0 );
			}
		}

		//	Generate First Wave Of Enemies
		for ( var i = 0; i < this.intSpawnEnemies; ++i )
		{
			var enemy = new Enemy ( new Vector2 ( ( 64 * i + 64 ) << 1, ( 64 * i + 64 ) << 1 ) );
			enemy.sprite.anchor.set ( 0.5 );
			game.physics.isoArcade.enable ( enemy.sprite );
			enemy.sprite.body.collideWorldBounds = true;

			this.intEnemyCounter++;
			this.arrEnemies.push ( enemy );
		}

		this.player = new Player ( new Vector2 ( 0, 0 ), this.intPlayerColour );

		//	Health bar structure
		var hpBarStructure = game.add.bitmapData ( 200,40 );
		hpBarStructure.ctx.beginPath ( );
		hpBarStructure.ctx.rect ( 0, 0, 180, 30 );
		hpBarStructure.ctx.fillStyle = '#ffffff';
		hpBarStructure.ctx.fill ( );

		//	Health bar location in game world
		this.healthBar = game.add.sprite ( 50, 50, hpBarStructure );
		this.healthBar.fixedToCamera = true;

		game.camera.follow ( this.player.sprite );

		this.cursors = game.input.keyboard.createCursorKeys ( );

		//	Get Keys When Pressed
		this.game.input.keyboard.addCallbacks ( this.callbackContext, this.handle_keys, this.reset_keys );

		//	Rain emitter created and set around entire screen, influenced by: https://phaser.io/examples/v2/particles/rain
		var emitter = game.add.emitter ( game.world.centerX, 1920, 1080 );

		emitter.width = game.world.width;
		emitter.makeParticles ( 'raindrop' );
		emitter.minParticleScale = 0.1;
		emitter.maxParticleScale = 0.6;
		emitter.setYSpeed ( 600, 600 );
		emitter.setXSpeed ( -5, 5 );
		emitter.minRotation = 0;
		emitter.maxRotation = 0;
		emitter.start ( false, 16600, 0, 0 );


		//	Leaf particle effect/animation from: https://phaser.io/examples/v2/particles/snow
		this.emitBack = game.add.emitter ( this.game.world.centerX, this.game.world.centerY - 550 );
		this.emitBack.width = game.world.width;
		this.emitBack.makeParticles ( 'leaf' );
		this.emitBack.maxParticleScale = 0.06;
		this.emitBack.minParticleScale = 0.02;
		this.emitBack.setYSpeed ( 20, 100 );
		this.emitBack.gravity = 1;
		this.emitBack.width = game.world.width * 2.5;
		this.emitBack.minRotation = 0;
		this.emitBack.maxRotation = 40;

		//	Leaf particle effect/animation from: https://phaser.io/examples/v2/particles/snow
		this.emitMid = game.add.emitter ( this.game.world.centerX, this.game.world.centerY - 550 );
		this.emitMid.width = game.world.width;
		this.emitMid.makeParticles ( 'leaf2' );
		this.emitMid.maxParticleScale = 0.06;
		this.emitMid.minParticleScale = 0.008;
		this.emitMid.setYSpeed ( 50, 150 );
		this.emitMid.gravity = 1;
		this.emitMid.width = game.world.width * 2.5;
		this.emitMid.minRotation = 0;
		this.emitMid.maxRotation = 40;

		//	Leaf particle effect/animation from: https://phaser.io/examples/v2/particles/snow
		this.emitTop = game.add.emitter ( this.game.world.centerX, this.game.world.centerY - 550 );
		this.emitTop.width = game.world.width;
		this.emitTop.makeParticles ( 'leaf2' );
		this.emitTop.maxParticleScale = 0.06;
		this.emitTop.minParticleScale = 0.008;
		this.emitTop.setYSpeed ( 50, 150 );
		this.emitTop.gravity = 1;
		this.emitTop.width = game.world.width * 2.5;
		this.emitTop.minRotation = 0;
		this.emitTop.maxRotation = 40;

		//	Leaf particle effect/animation from: https://phaser.io/examples/v2/particles/snow
		this.emitFront = game.add.emitter ( this.game.world.centerX, this.game.world.centerY - 550 );
		this.emitFront.width = game.world.width;
		this.emitFront.makeParticles ( 'leaf3' );
		this.emitFront.maxParticleScale = 0.09;
		this.emitFront.minParticleScale = 0.06;
		this.emitFront.setYSpeed ( 50, 150 );
		this.emitFront.gravity = 2;
		this.emitFront.width = game.world.width * 2.5;
		this.emitFront.minRotation = 0;
		this.emitFront.maxRotation = 40;

		//	Function influenced by: https://phaser.io/examples/v2/particles/snow
		this.change_wind_direction ( );

		//	Influenced by: https://phaser.io/examples/v2/particles/snow
		this.emitBack.start ( false, 22000, 10 );
		this.emitMid.start ( false, 10000, 30 );
		this.emitTop.start ( false, 10000, 30 );
		this.emitFront.start ( false, 20000, 10 );

		this.portal = new Portal ( new Vector2 ( 1000, 1000 ) );
	},
	update : function ( )
	{
		if ( this.intEnemyCounter == 0 )
		{
			if ( this.portal.sprite.visible == false )
				this.portal.reset ( );		

			this.portal.animate ( );

			var dist = this.player.position.sub ( this.portal.position );
			var distSqr = dist.dot ( dist );

			if ( distSqr < 10000 )
			{
				this.intSpawnEnemies++;
				game.state.start ( 'play' );
			}
		}

		this.player.sprite.body.velocity.x = 0;
		this.player.sprite.body.velocity.y = 0;

		this.player.animate ( this.intKeyMask );

		if ( this.intKeyMask > 0 )
			this.intPrevMask = this.intKeyMask;

		if ( game.input.mousePointer.leftButton.isDown )
		{
			this.player.handle_attack ( this.intPrevMask, this.arrEnemies );
		}

		for ( var i = 0; i < this.arrEnemies.length; ++i )
		{
			this.arrEnemies [ i ].update ( );
		}

		//	Game physics applied to Enemies and sorting of layers in isometric format
		game.physics.isoArcade.collide ( this.grpEnemies );
		game.iso.topologicalSort ( this.grpEnemies );

		l++;

		if ( l === this.intUpdateInterval )
		{
			this.change_wind_direction ( );
			this.intUpdateInterval = Math.floor ( Math.random ( ) * 20 ) * 60; // 0 - 20sec @ 60fps
			l = 0;
		}

		//	Change health bar colour and size depending on players hp
		if ( this.player.intHealth > 0 )
		{
			this.healthBar.width = this.player.intHealth;

			if ( this.player.intHealth <= 150 && this.player.intHealth > 100 )
			{
				this.healthBar.tint = 0xffff00;
			}
			else if ( this.player.intHealth <= 100 && this.player.intHealth > 50 )
			{
				this.healthBar.tint = 0xffa500;
			}
			else if ( this.player.intHealth <= 50 && this.player.intHealth > 0 )
			{
				this.healthBar.tint = 0xff0009;
			}
			else
			{
				this.healthBar.tint = 0x008000; 
			}
		} 
		else 
		{
			this.arrEnemies = [];	//	Empty enemies array
			game.state.start ( 'death' );
		}
	},
	render : function ( ) 
	{
	},
	handle_keys : function ( event )
	{
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

	//	Function for the wind direction of leaves, influenced by: https://phaser.io/examples/v2/particles/snow
	change_wind_direction : function ( ) 
	{
		var multi = Math.floor ( ( max + 200 ) / 4 ),
			frag = ( Math.floor ( Math.random ( ) * 100 ) - multi );
		max = max + frag;

		if ( max > 200 ) max = 150;
		if ( max < -200 ) max = -150;

		this.set_x_speed ( this.emitBack, max );
		this.set_x_speed ( this.emitMid, max );
		this.set_x_speed ( this.emitTop, max );
		this.set_x_speed ( this.emitFront, max );

	},

	//	Influenced by: https://phaser.io/examples/v2/particles/snow
	set_x_speed : function ( emitter, max ) 
	{
		emitter.setXSpeed ( max - 2, max );
		emitter.forEachAlive ( this.set_particle_x_speed, this, max );
	},

	//	Influenced by: https://phaser.io/examples/v2/particles/snow
	set_particle_x_speed : function ( particle, max ) 
	{
		particle.body.velocity.x = max - Math.floor ( Math.random ( ) * 300 );
	}
};
