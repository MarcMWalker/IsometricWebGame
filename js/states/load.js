var loadState = {
    
    //load the game assets before the game starts
    preload: function ()
    {
        //load images from file
        game.load.image('cube', 'assets/images/cube3.png');
		game.load.image('raindrop', 'assets/images/rain.png');
		game.load.spritesheet('knight', 'assets/images/spritesheet-min.png', 360,308);
        game.load.spritesheet('portal','assets/images/portal.png', 142 , 193);
        game.load.spritesheet('rino','assets/images/rino.png', 170 , 147);
        //game.load.image('titlescreen','assets/images/titlescreen.png');
        game.load.image('titlescreen','assets/images/title_screen.png');
        game.load.image('button','assets/images/button.png'); 
        game.load.image('title', 'assets/images/title.png');
        game.load.image('subTitle', 'assets/images/subTitle.png');
        
        game.load.image('leaf', 'assets/images/leaf.png');
        game.load.image('leaf2', 'assets/images/leaf2.png');
        game.load.image('leaf3', 'assets/images/leaf3.png');
        
        game.load.audio('main', 'assets/sound/birthofahero.mp3')
        
        //console.log ( "Preload Load State" );
    },
    
    create: function(){
        //Start game state 'menu'
        game.state.start('quote');
    }
    
};