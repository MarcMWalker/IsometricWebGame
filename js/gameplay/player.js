class Player 
{
	constructor ( position )
	{
		this.sprite = game.add.isoSprite ( position.x, position.y, 0, "charMove", 0, isoGroup2 );

		this.sprite.tint = 0x86bfda;
		this.sprite.anchor.set ( 0.5, 0.5 );

		this.sprite.animations.add('S', [79,88,89,97,98,99,106,107,108,109,115,116,117,118,119], 6,true);
		this.sprite.animations.add('N', [19,28,29,37,38,39,46,47,48,49,55,56,57,58,59], 6,true);
		this.sprite.animations.add('W', [65,66,74,75,83,84,92,93,94,101,102,103,110,111,112],6,true);
		this.sprite.animations.add('E', [30,31,32,33,34,40,41,42,43,44,50,51,52,53,54],6,true);
		this.sprite.animations.add('NE',5,6,7,8,9,15,16,17,18,25,26,27,35,36,45);

		game.physics.isoArcade.enable ( this.sprite );
		this.sprite.body.collideWorldBounds = true;
	}
}
