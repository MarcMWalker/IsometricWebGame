var deathState = {

	create : function ( )
	{
        var music = playState.musicbattle;
        music.stop ( );

		game.stage.backgroundColor = 0xFF0000;
		game.world.setBounds ( 0, 0, 1920, 1080 );
		//console.log("Death state working");
		//	Button function initliased to create button within coordinates, if clicked start 'menu' state
		this.createButton ( "Play Again?", game.world.centerX -160, game.world.centerY + 164, 300, 100, function ( ) { 
			game.state.start ( 'select' );
		});

		this.createButton ( "Leave", game.world.centerX+ 160, game.world.centerY + 164, 300, 100, function ( ) { 
			game.state.start ( 'menu' );
		});

		//	Title text of pre game added to screen, faded in by using tween
		titlescreen2 = game.add.sprite ( game.world.centerX, game.world.centerY - 192, "gameOver" );
		titlescreen2.anchor.setTo ( 0.5,0.5 );
		titlescreen2.scale.setTo ( 0.7, 0.7 );
		titlescreen2.alpha = 0;
		game.add.tween ( titlescreen2 ).to ( { alpha : 1 }, 6000, "Linear", true );

		// Start game audio 'main' and loop
		this.musicDeath = game.add.audio ( 'game_over' );
		this.musicDeath.play ( );

	},
	update : function ( )
	{    
	},
	render : function ( )
	{
	},
	createButton : function ( string, x, y, w, h, callback ) 
	{
		//Button created with x,y coordiantes included
		var button1 = game.add.button ( x, y, "button", callback, this );

		//Anchor, width and height of button set
		button1.anchor.setTo ( 0.5, 0.5 );
		button1.width = w;
		button1.height = h;

		//Text of button adjusted
		var txt = game.add.text ( button1.x, button1.y, string, { font : "14px Arial", fill : "#fff", align : "centre" } );

		txt.anchor.setTo ( 0.5, 0.5 );
	},
};
