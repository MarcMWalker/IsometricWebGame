var loadState = {
    
    //load the game assets before the game starts
    preload: function ()
    {
        //load images from file
        game.load.image('cube', 'assets/images/cube3.png');
		game.load.image('cube1', 'assets/images/cube2.png');
		game.load.image('cube2', 'assets/images/cube4.png');
		game.load.image('cube3', 'assets/images/cube1.png');
		game.load.image('raindrop', 'assets/images/rain.png');
		game.load.spritesheet('knight', 'assets/images/spritesheet-min.png', 360,308);
        
        game.load.image('titlescreen','assets/images/titlescreen.png');
        game.load.image('button','assets/images/button.png'); 
        
        game.load.image('leaf', 'assets/images/leaf.png');
        game.load.image('leaf2', 'assets/images/leaf2.png');
        game.load.image('leaf3', 'assets/images/leaf3.png');
        
        console.log ( "Preload Load State" );
    },
    
    create: function(){
        //Start game state 'menu'
        game.state.start('menu');
    }
    
};