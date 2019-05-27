var quoteState = {

	create : function ( )
	{
		//	Add continue button
		this.create_button ( "Click to Continue", game.world.centerX, game.world.centerY + 164, 300, 100, function ( ) { 
			game.state.start ( 'menu' );
		});

		//	Title text of pre game added to screen
		titlescreen = game.add.sprite ( game.world.centerX, game.world.centerY - 192, "title" );
		titlescreen.anchor.setTo ( 0.5,0.5 );
		titlescreen.scale.setTo ( 0.5, 0.5 );
		titlescreen.alpha = 0;

		//	Tween to fade in title
		game.add.tween ( titlescreen ).to ( { alpha : 1 }, 6000, "Linear", true );

		//	Sub title text of pre game added to screen, faded in by using tween
		subTitle = game.add.sprite ( game.world.centerX - 650, game.world.centerY - 90, "subTitle" );
		subTitle.anchor.setTo ( 0.5, 0.5 );
		subTitle.alpha = 0;
		game.add.tween ( subTitle ).to ( { alpha : 1 }, 12000, "Linear", true );

		game.stage.backgroundColor = 0xFF0000;
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
