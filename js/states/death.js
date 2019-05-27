var deathState = {

	create : function ( )
	{
		var music = playState.musicbattle;
		music.stop ( );

		game.stage.backgroundColor = 0xFF0000;
		game.world.setBounds ( 0, 0, 1920, 1080 );

		//	Play again button
		this.create_button ( "Play Again?", game.world.centerX -160, game.world.centerY + 164, 300, 100, function ( ) { 
			game.state.start ( 'select' );
		});

		//	Exit button
		this.create_button ( "Leave", game.world.centerX+ 160, game.world.centerY + 164, 300, 100, function ( ) { 
			game.state.start ( 'menu' );
		});

		//	Title text of pre game added to screen
		titlescreen2 = game.add.sprite ( game.world.centerX, game.world.centerY - 192, "gameOver" );
		titlescreen2.anchor.setTo ( 0.5,0.5 );
		titlescreen2.scale.setTo ( 0.7, 0.7 );
		titlescreen2.alpha = 0;

		//	Tween to fade in text
		game.add.tween ( titlescreen2 ).to ( { alpha : 1 }, 6000, "Linear", true );

		//	Start game audio 'main' and loop
		this.musicDeath = game.add.audio ( 'game_over' );
		this.musicDeath.play ( );

	},
	update : function ( )
	{    
	},
	render : function ( )
	{
	},
	create_button : function ( string, x, y, w, h, callback ) 
	{
		//Button created with x,y coordiantes included
		var button = game.add.button ( x, y, "button", callback, this );

		//Anchor, width and height of button set
		button.anchor.setTo ( 0.5, 0.5 );
		button.width = w;
		button.height = h;

		//Text of button adjusted
		var txt = game.add.text ( button.x, button.y, string, { font : "14px Arial", fill : "#fff", align : "centre" } );

		txt.anchor.setTo ( 0.5, 0.5 );
	},
};
