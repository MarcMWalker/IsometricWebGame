var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'test', null, true, false);

game.state.add('load', loadState);
game.state.add('quote', quoteState);
game.state.add('menu', menuState);
game.state.add('controls', controlState);
game.state.add('select', selectState);
game.state.add('play', playState);
game.state.add('death', deathState);

game.state.start('load');
