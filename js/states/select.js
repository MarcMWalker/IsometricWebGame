var selectState = {
    
    create : function(game)
    {
        this.createButton ( "Click to Continue", game.world.centerX,game.world.centerY + 164, 300, 100, function() { 
            this.state.start('menu');
        });
        
        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY - 192, "title");
        titlescreen.anchor.setTo(0.5,0.5);
        titlescreen.scale.setTo(0.5, 0.5);
        titlescreen.alpha = 0;
        game.add.tween(titlescreen).to({alpha: 1}, 6000, "Linear", true);
        
        subTitle = game.add.sprite(game.world.centerX - 650,game.world.centerY - 90, "subTitle");
        subTitle.anchor.setTo(0.5,0.5);
        subTitle.alpha = 0;
        game.add.tween(subTitle).to({alpha: 1}, 12000, "Linear", true);
        
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