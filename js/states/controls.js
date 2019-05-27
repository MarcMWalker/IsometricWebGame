var controlState = {

	create : function ( )
	{
		//	Music from menuState carried over to selectState
		var music = menuState.musicMain;

		//	Initilaising function to create buttons for character selection
		this.create_button ( "Back", game.world.centerX, game.world.centerY + 324, 300, 100, function ( ) { 
			music.stop ( );
			game.state.start ( 'menu' );
		});

		//	Add keyboard control display
		keyboard = game.add.sprite ( game.world.centerX - 464, game.world.centerY + 120, "keyboard" );
		keyboard.anchor.setTo ( 0.5, 0.5 );
		keyboard.scale.setTo ( 0.25, 0.25 );
		keyboard.angle -= 90;

		keyboard2 = game.add.sprite ( game.world.centerX - 744, game.world.centerY + 120, "keyboard" );
		keyboard2.anchor.setTo ( 0.5, 0.5 );
		keyboard2.scale.setTo ( -0.25, 0.25 );
		keyboard2.angle += 90;

		keyboard3 = game.add.sprite ( game.world.centerX - 604, game.world.centerY -20, "keyboard" );
		keyboard3.anchor.setTo ( 0.5, 0.5 );
		keyboard3.scale.setTo ( -0.25, 0.25 );
		keyboard3.angle += 180;

		keyboard3 = game.add.sprite ( game.world.centerX - 604, game.world.centerY + 120, "keyboard" );
		keyboard3.anchor.setTo ( 0.5, 0.5 );
		keyboard3.scale.setTo ( -0.25, -0.25 );
		keyboard3.angle += 180;

		//	Add mouse controls
		moveText = game.add.sprite ( game.world.centerX - 600, game.world.centerY + 240, "moveText" );
		moveText.anchor.setTo ( 0.5, 0.5 );
		moveText.scale.setTo ( 0.5, 0.5 );

		mousePic = game.add.sprite ( game.world.centerX + 630, game.world.centerY + 40, "mouse" );
		mousePic.anchor.setTo ( 0.5, 0.5 );
		mousePic.scale.setTo ( 0.5, 0.5 );

		atkText = game.add.sprite ( game.world.centerX + 600, game.world.centerY + 240, "attackText2" );
		atkText.anchor.setTo ( 0.5,0.5 );
		atkText.scale.setTo ( 0.5,0.5 );
	},
	update : function ( )
	{    
	},
	render : function ( )
	{
	},
	create_button : function ( string, x, y, w, h, callback ) 
	{
		//	Button created
		var button = game.add.button ( x, y, "button", callback, this );

		//	Button width, height and anchor set
		button.anchor.setTo ( 0.5, 0.5 );
		button.width = w;
		button.height = h;

		//	Text and anchor for button created
		var txt = game.add.text ( button.x, button.y, string, { font : "14px Arial", fill : "#fff", align : "centre" } );

		txt.anchor.setTo ( 0.5, 0.5 );
	},
};
