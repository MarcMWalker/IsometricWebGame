var selectState = {
    
    create : function(game)
    {
        var music = menuState.music
        this.createButton ( "Choose Tuscan Knight", game.world.centerX - 464,game.world.centerY + 164, 300, 100, function() { 
            game.music.stop();
            this.game.state.start('play');
        });
        
        this.createButton ( "Choose Green Knight", game.world.centerX ,game.world.centerY + 164, 300, 100, function() { 
            game.music.stop();
            this.game.state.start('play');
        });
        
        this.createButton ( "Choose Black Knight", game.world.centerX + 464,game.world.centerY + 164, 300, 100, function() { 
            game.music.stop();
            this.game.state.start('play');
        });
        
        banner1 = game.add.sprite(game.world.centerX - 464,game.world.centerY - 180, "banner");
        banner1.anchor.setTo(0.5,0.5);
        knight1 = game.add.sprite(game.world.centerX - 445,game.world.centerY - 240, "tuscanPic");
        knight1.anchor.setTo(0.5,0.5);
        knight1.scale.setTo(0.5, 0.5);
        tuscanKnightText = game.add.sprite(game.world.centerX - 464,game.world.centerY - 392, "tuscanText");
        tuscanKnightText.anchor.setTo(0.5,0.5);
        tuscanKnightText.scale.setTo(0.18, 0.18);
        attack1Text = game.add.sprite(game.world.centerX - 540,game.world.centerY + 30, "attackText");
        attack1Text.anchor.setTo(0.5,0.5);
        attack1Text.scale.setTo(0.10, 0.10);
        recover1Text = game.add.sprite(game.world.centerX - 530,game.world.centerY + 80, "recoverText");
        recover1Text.anchor.setTo(0.5,0.5);
        recover1Text.scale.setTo(0.10, 0.10);
        shortSword1 = game.add.sprite(game.world.centerX - 460,game.world.centerY - 10, "shortsword");
        shortSword1b = game.add.sprite(game.world.centerX - 500,game.world.centerY - 10, "shortsword");
        hp1 = game.add.sprite(game.world.centerX - 760,game.world.centerY - 195, "hpPickup");
        hp1b = game.add.sprite(game.world.centerX - 790,game.world.centerY - 195, "hpPickup");
        
        banner2 = game.add.sprite(game.world.centerX,game.world.centerY - 180, "banner");
        banner2.anchor.setTo(0.5,0.5);
        knight2 = game.add.sprite(game.world.centerX,game.world.centerY - 180, "greenPic");
        knight2.anchor.setTo(0.5,0.5);
        knight2.scale.setTo(0.5, 0.5);
        greenKnightText = game.add.sprite(game.world.centerX,game.world.centerY - 392, "greenText");
        greenKnightText.anchor.setTo(0.5,0.5);
        greenKnightText.scale.setTo(0.18, 0.18);
        attack2Text = game.add.sprite(game.world.centerX - 80,game.world.centerY + 30, "attackText");
        attack2Text.anchor.setTo(0.5,0.5);
        attack2Text.scale.setTo(0.10, 0.10);
        recover2Text = game.add.sprite(game.world.centerX - 70,game.world.centerY + 80, "recoverText");
        recover2Text.anchor.setTo(0.5,0.5);
        recover2Text.scale.setTo(0.10, 0.10);
        shortSword2 = game.add.sprite(game.world.centerX - 40,game.world.centerY - 10, "shortsword");
        hp2 = game.add.sprite(game.world.centerX - 260, game.world.centerY - 195, "hpPickup");
        hp2b = game.add.sprite(game.world.centerX - 290, game.world.centerY - 195, "hpPickup");
        hp2c = game.add.sprite(game.world.centerX - 320, game.world.centerY - 195, "hpPickup");
        
        banner3 = game.add.sprite(game.world.centerX + 464,game.world.centerY - 180, "banner");
        banner3.anchor.setTo(0.5,0.5);
        knight3 = game.add.sprite(game.world.centerX + 460,game.world.centerY - 230, "blackPic");
        knight3.anchor.setTo(0.5,0.5);
        knight3.scale.setTo(0.5, 0.5);
        blackKnightText = game.add.sprite(game.world.centerX + 464,game.world.centerY - 392, "blackText");
        blackKnightText.anchor.setTo(0.5,0.5);
        blackKnightText.scale.setTo(0.18, 0.18);
        attack3Text = game.add.sprite(game.world.centerX + 390,game.world.centerY + 30, "attackText");
        attack3Text.anchor.setTo(0.5,0.5);
        attack3Text.scale.setTo(0.10, 0.10);
        recover3Text = game.add.sprite(game.world.centerX + 400,game.world.centerY + 80, "recoverText");
        recover3Text.anchor.setTo(0.5,0.5);
        recover3Text.scale.setTo(0.10, 0.10);
        shortSword3 = game.add.sprite(game.world.centerX + 444,game.world.centerY - 10, "shortsword");
        shortSword3b = game.add.sprite(game.world.centerX + 484,game.world.centerY - 10, "shortsword");
        shortSword3c = game.add.sprite(game.world.centerX + 524,game.world.centerY - 10, "shortsword");
        
        hp3 = game.add.sprite(game.world.centerX + 145, game.world.centerY - 195, "hpPickup");
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