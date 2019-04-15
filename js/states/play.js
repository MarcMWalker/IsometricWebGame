var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

//Woking on splitting up isogroups to provide more adequate game structure
var mapGroup;
var wallGroup, wall;
var isoGroup2, player;
var enemyGroup, enemy;

var Ndown = false,
    Sdown = false,
    Edown = false,
    Wdown = false,
    SEdown = false,
    NEdown = false,
    SWdown = false,
    NWdown = false;

BasicGame.Boot.prototype = {
    preload: function () {
        game.load.image('cube', 'assets/images/cube3.png');
        game.load.image('cube1', 'assets/images/cube2.png');
        game.load.image('cube2', 'assets/images/cube4.png');
        game.load.image('cube3', 'assets/images/cube1.png');
        //game.load.image('charIdle', 'assets/images/Tuscan Knight_iso/_iso/Idle/Tuscan_Idle_00000.png');
        game.load.spritesheet('charMove', 'assets/images/_iso/Walk/Tuscan_Spritesheet/Tuscan_Walk_00000.png', 358,306);

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

	var enemyTest = new Enemy ( new Vector2 ( 256, 256 ) );
        
        var mobs;
        mobs = game.add.isoSprite(128,128,0,'cube3',0,isoGroup2);
        mobs.anchor.set(0.5);
    
        game.physics.isoArcade.enable(mobs);
        mobs.body.collideWorldBounds = true;
        mobs.body.drag.set(600,600,0);
        
        player = game.add.isoSprite(0,0,0,'charMove',0,isoGroup2);
        player.tint = 0x86bfda;
        player.anchor.set ( 0.5, 0.5 );
        
        player.animations.add('S', [79,88,89,97,98,99,106,107,108,109,115,116,117,118,119], 6,true);
        player.animations.add('N', [19,28,29,37,38,39,46,47,48,49,55,56,57,58,59], 6,true);
        player.animations.add('W', [65,66,74,75,83,84,92,93,94,101,102,103,110,111,112],6,true);
        player.animations.add('E', [30,31,32,33,34,40,41,42,43,44,50,51,52,53,54],6,true);
        player.animations.add('NE',5,6,7,8,9,15,16,17,18,25,26,27,35,36,45);
        
        game.physics.isoArcade.enable(player);
        player.body.collideWorldBounds = true;
        
        game.camera.follow(player);
        
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR
        ])
    },
    update: function () {
        var speed = 400;
        
        if(this.cursors.up.isDown){
            player.body.velocity.y = -speed;
            player.animations.play('N');
            
        }
        else if (this.cursors.down.isDown){
            player.body.velocity.y = speed;
            player.animations.play('S');
        }
        else if(this.cursors.left.isDown){
            player.body.velocity.x = -speed;
            player.animations.play('W');
        }
        else if(this.cursors.right.isDown){
            player.body.velocity.x = speed;
            player.animations.play('E');
        }
        else {
            player.body.velocity.y = 0;
            player.body.velocity.x = 0;
            player.animations.stop();
        }
        
    	game.physics.isoArcade.collide(isoGroup2);
        game.iso.topologicalSort(isoGroup2);
        
        //Adding feature to destroy enemies here just by touching them at the moment
        /*
            game.physics.isoArcade.overlap(enemy, player,function(e) {
                e.destroy();
                console.log("Enemy Destroyed");
            });
            */
        
    },
    render: function () {
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');
