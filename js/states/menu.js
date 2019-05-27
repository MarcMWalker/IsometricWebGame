var menuState = {
	musicMain : null,
	create : function ( )
	{
		//	Start game audio 'main' and loop
		this.musicMain = game.add.audio ( 'main' );
		this.musicMain.play ( );
		this.musicMain.loopFull ( 0.5 );

		//	Create button function with x,y coordiantes, if clicked enter 'select' state
		this.create_button ( "Choose your Knight", game.world.centerX,game.world.centerY + 32, 300, 100, function ( ) { 
			game.state.start ( 'select' );
		});

		//	Create button with x,y coordiantes, if clicked enter 'About' state
		this.create_button ( "Learn How To Play",game.world.centerX,game.world.centerY + 192, 300, 100, function ( ) {
			game.state.start ( 'controls' );
		});

		//	"Battle Arena" title
		titlescreen = game.add.sprite ( game.world.centerX, game.world.centerY - 192, "titlescreen" );
		titlescreen.anchor.setTo ( 0.5, 0.5 );
		titlescreen.alpha = 0;

		//	Tween to fade in the title
		game.add.tween ( titlescreen ).to ( { alpha : 1 }, 6000, "Linear", true );

		//	Background colour set to black
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
		//	Create button
		var button = game.add.button ( x, y, "button", callback, this );

		//	Set anchor with width and height attributes
		button.anchor.setTo ( 0.5,0.5 );
		button.width = w;
		button.height = h;

		//	Text creation + style
		var txt = game.add.text	( button.x, button.y, string, { font : "14px Arial", fill : "#fff", align : "centre" } );
		txt.anchor.setTo ( 0.5, 0.5 );
	},
};
