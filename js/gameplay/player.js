class Player 
{
	constructor ( position )
	{
		this.sprite = game.add.isoSprite ( position.x, position.y, 0, "charMove", 0 );

		this.sprite.tint = 0x86bfda;
		this.sprite.anchor.set ( 0.5, 0.5 );

		this.sprite.animations.add('S', [79,88,89,97,98,99,106,107,108,109,115,116,117,118,119], 6,true);
		this.sprite.animations.add('N', [19,28,29,37,38,39,46,47,48,49,55,56,57,58,59], 6,true);
		this.sprite.animations.add('W', [65,66,74,75,83,84,92,93,94,101,102,103,110,111,112],6,true);
		this.sprite.animations.add('E', [30,31,32,33,34,40,41,42,43,44,50,51,52,53,54],6,true);
		this.sprite.animations.add('NE', [5,6,7,8,9,15,16,17,18,25,26,27,35,36,45], 6, true);
        	this.sprite.animations.add('SE', [0,1,2,3,4,10,11,12,13,14,20,21,22,23,24], 6, true);
        	this.sprite.animations.add('SW', [67,68,69,76,77,78,85,86,87,95,96,104,105,113,114], 6, true);
        	this.sprite.animations.add('NW', [60,61,62,63,64,70,71,72,73,80,81,82,90,91,100], 6, true);
        

		game.physics.isoArcade.enable ( this.sprite );
		this.sprite.body.collideWorldBounds = true;
	}

	get position ( )
	{
		return new Vector2 ( this.sprite.isoX, this.sprite.isoY );
	}
}
