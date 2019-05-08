var loadState = {
    
    //Load game assets before the game starts
    preload: function ()
    {
        //Load spritesheet files
        game.load.spritesheet('knight', 'assets/images/spritesheet-min.png', 360,308);
        game.load.spritesheet('portal','assets/images/portal.png', 142 , 193);
        
        //Load image files
        /*Taken from:
         *https://opengameart.org/content/tuscan-knight-bleeds-game-art-hd
         *https://www.deviantart.com/adventuresmg64gaming/art/Super-Mario-World-Super-Leaf-Sprite-666943428
         *https://phaser.io/examples/v2/particles/rain
         *https://devilsworkshop.itch.io/big-pixel-isometric-block-pack-free-2d-sprites
         *https://www.pinterest.co.uk/pin/170503535864945845/?lp=true
         *Font 'HamletOrNot' taken from: https://fontmeme.com/calligraphy-fonts/
         *http://dapinographics.com/projects/vintage-scroll-frame-with-banner/
         *https://opengameart.org/content/short-sword-64x64
         *https://opengameart.org/content/health-pickup
         */
        
        game.load.image('cube', 'assets/images/cube3.png');
		game.load.image('raindrop', 'assets/images/rain.png');
        game.load.image('leaf', 'assets/images/leaf.png');
        game.load.image('leaf2', 'assets/images/leaf2.png');
        game.load.image('leaf3', 'assets/images/leaf3.png');
        game.load.image('titlescreen','assets/images/title_screen.png');
        game.load.image('button','assets/images/button.png'); 
        game.load.image('title', 'assets/images/title.png');
        game.load.image('subTitle', 'assets/images/subTitle.png');
        game.load.image('banner', 'assets/images/banner.png');
        game.load.image('tuscanText', 'assets/images/tuscanTitle.png');
        game.load.image('blackText', 'assets/images/blackTitle.png');
        game.load.image('greenText', 'assets/images/greenTitle.png');
        game.load.image('tuscanPic', 'assets/images/tuscan.png');
        game.load.image('greenPic', 'assets/images/green.png');
        game.load.image('blackPic', 'assets/images/black.png');
        game.load.image('attackText', 'assets/images/attackText.png');
        game.load.image('recoverText', 'assets/images/recoveryText.png');
        game.load.image('shortsword', 'assets/images/shortsword.png');
        game.load.image('hpPickup', 'assets/images/+.png');
        
        //Load audio files, music taken from: https://www.bensound.com/royalty-free-music/track/birth-of-a-hero
        game.load.audio('main', 'assets/sound/birthofahero.mp3')
    },
    
    create: function(){
        //Start game state 'quote'
        game.state.start('quote');
    }
    
};