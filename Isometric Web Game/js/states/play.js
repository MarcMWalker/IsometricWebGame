var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, player;

BasicGame.Boot.prototype =
{
    preload: function () {
        game.load.image('cube', 'assets/images/cube3.png');

        //game.time.advancedTiming = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));
        
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        
        game.world.setBounds(0,0,2255,2255);

        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.3, 0.0);

                
    },
    create: function () {
        // Create a group for our tiles, so we can use Group.sort
        isoGroup = game.add.group();
        
        //game.physics.isoarcade.gravity.setTo(0,0,-500);

        // Let's make a load of cubes on a grid, but do it back-to-front so they get added out of order.
        var map;
        for (var xx = 0; xx < 2255; xx += 102) {
            for (var yy = 0; yy < 2255; yy +=102) {
                // Create a cube using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
                map = game.add.isoSprite(xx, yy, 0, 'cube', 0, isoGroup);
                map.anchor.set(0.5)

                // Add a slightly different tween to each cube so we can see the depth sorting working more easily.
                //game.add.tween(cube).to({ isoZ: 10 }, 100 * ((xx + yy) % 10), Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);
            }
        }
        
        player = game.add.isoSprite(128,128,0,'cube',0,isoGroup);
        player.tint = 0x86bfda;
        player.anchor.set(0.5);
        //game.physics.isoArcade.enable(player);
        //player.body.collideWorldBounds = true;
        
        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            
        space.onDown.add(function() {
            player.body.velocity.z = 300;                 
        }, this);
        
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
        var speed = 100;
        
        if(this.cursors.up.isDown){
            player.body.velocity.y = -speed;
        }
        else if (this.cursors.down.isDown){
            player.body.velocity.y = speed;
        }
        else {
            //player.body.velocity.y = 0;
        }
    },
    render: function () {
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');