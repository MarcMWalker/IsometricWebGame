var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, sorted;

BasicGame.Boot.prototype =
{
    preload: function () {
        game.load.image('cube', 'assets/images/cube3.png');

        game.time.advancedTiming = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.0, 0.0);

                
    },
    create: function () {
        // Create a group for our tiles, so we can use Group.sort
        isoGroup = game.add.group();

        // Let's make a load of cubes on a grid, but do it back-to-front so they get added out of order.
        var cube;
        for (var xx = 2255; xx > 0; xx -= 102) {
            for (var yy = 2255; yy > 0; yy -=102) {
                // Create a cube using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
                cube = game.add.isoSprite(xx, yy, 0, 'cube', 0, isoGroup);
                cube.anchor.set(0.5, 0.5)

                // Store the old messed up ordering so we can compare the two later.
                //cube.oldZ = cube.z;

                // Add a slightly different tween to each cube so we can see the depth sorting working more easily.
                //game.add.tween(cube).to({ isoZ: 10 }, 100 * ((xx + yy) % 10), Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);
            }
        }

        // Just a var so we can tell if the group is sorted or not.
        sorted = false;

        // Toggle sorting on click/tap.
        game.input.onDown.add(function () {
            sorted = !sorted;
            if (sorted) {
                game.iso.simpleSort(isoGroup);
            }
            else {
                isoGroup.sort('oldZ');
            }
        }, this);
                
    },
    update: function () {

    },
    render: function () {
        game.debug.text("Click to toggle! Sorting enabled: " + sorted, 2, 36, "#ffffff");
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');