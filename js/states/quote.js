var quoteState = {

	create : function ( )
	{
		//	Button function initliased to create button within coordinates, if clicked start 'menu' state
		this.createButton ( "Click to Continue", game.world.centerX, game.world.centerY + 164, 300, 100, function ( ) { 
			game.state.start ( 'menu' );
		});

		//	Title text of pre game added to screen, faded in by using tween
		titlescreen = game.add.sprite ( game.world.centerX, game.world.centerY - 192, "title" );
		titlescreen.anchor.setTo ( 0.5,0.5 );
		titlescreen.scale.setTo ( 0.5, 0.5 );
		titlescreen.alpha = 0;
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
