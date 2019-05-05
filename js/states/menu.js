var menuState = {
    
    create : function(game)
    {
        game.music = this.add.audio('main')
        game.music.play();
        
        //console.log ( "MenuState Create" );
        
        this.createButton ( "Choose your Knight", game.world.centerX,game.world.centerY + 32, 300, 100, function() { 
            this.state.start('select');
            //console.log("clicked");
        });
        
        this.createButton ( "Learn How To Play",game.world.centerX,game.world.centerY + 192, 300, 100, function(){
            this.state.start('About');
        });
        
        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY - 192, "titlescreen");
        titlescreen.anchor.setTo(0.5,0.5);
        titlescreen.alpha = 0;
        game.add.tween(titlescreen).to({alpha: 1}, 6000, "Linear", true);
        
        game.stage.backgroundColor = 0xFF0000;
    },
    update : function(game)
    {    
    },
    render : function (game)
    {},
    createButton : function(string,x,y,w,h,callback) 
    {
        var button1 = game.add.button(x,y,"button",callback,this);
        
        button1.anchor.setTo(0.5,0.5);
        button1.width = w;
        button1.height = h;
        
        var txt = game.add.text(button1.x,button1.y, string, {font:"14px Arial", fill :"#fff", align:"centre"});
        
        txt.anchor.setTo(0.5,0.5);
        
    },

 };