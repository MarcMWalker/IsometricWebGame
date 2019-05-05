/*
 * 	TODO: After enemy array length has reached zero, increase wave number and spawn another set of enemies.
 * */

//Woking on splitting up isogroups to provide more adequate game structure
var mapGroup;
var wallGroup, wall;
var isoGroup2, player;
var enemyGroup;
var portalGroup;

var enemies = [ ];
var portal;
var portalSpeed;

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
			// Create a group for our tiles, so we can use Group.sort
			mapGroup = game.add.group ( );
			isoGroup2 = game.add.group ( );
			enemyGroup = game.add.group ( );
            portalGroup = game.add.group();

			game.physics.isoArcade.gravity.setTo ( 0,0,-500 );

			// Let's make a load of cubes on a grid, but do it back-to-front so they get added out of order.
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

			var emitter = game.add.emitter(game.world.centerX, 1920, 1080);

			emitter.width = game.world.width;
			//emitter.angle = 20; // uncomment to set an angle for the rain.

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

			this.changeWindDirection();

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
					player.sprite.body.velocity.x = speed;
					player.sprite.body.velocity.y = -speed;
					player.sprite.animations.play ( 'NE' );
					break;
				case 3:
					player.sprite.body.velocity.x = -speed;
					player.sprite.body.velocity.y = -speed;
					player.sprite.animations.play ( 'NW' );
					break;
				case 12:
					player.sprite.body.velocity.x = speed;
					player.sprite.body.velocity.y = speed;
					player.sprite.animations.play ( 'SE' );
					break;
				case 9:
					player.sprite.body.velocity.x = -speed;
					player.sprite.body.velocity.y = speed;
					player.sprite.animations.play ( 'SW' );
					break;				
			}

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

			game.physics.isoArcade.collide ( enemyGroup );
			game.iso.topologicalSort ( enemyGroup );

			l++;

			if (l === update_interval)
			{
				this.changeWindDirection();
				update_interval = Math.floor ( Math.random() * 20) * 60; // 0 - 20sec @ 60fps
				l = 0;
			}
            
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

		setXSpeed : function (emitter, max) {

			emitter.setXSpeed(max - 2, max);
			emitter.forEachAlive(this.setParticleXSpeed, this, max);

		},

		setParticleXSpeed : function (particle, max) {

			particle.body.velocity.x = max - Math.floor(Math.random() * 300);

		}
	};