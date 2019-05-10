class Portal 
{
	constructor ( position )
	{
		//Portal sprite added to game as isoSprite, given portal animation and added to isoGroup = portalGroup
		this.sprite = game.add.isoSprite (position.x, position.y, 0, 'portal', portalGroup );
		this.sprite.anchor.set ( 0.5, 0.5 );

		//Portal animations for activation and repeating once active
		this.sprite.animations.add('activate', [1,2,3,4,5,7,8,9,10,11,12,14,15,16,17,18,19,21,22,23,24,25,26, 6,13,20,27,28,29], 15, true );
		this.sprite.animations.add('repeat', [6,13,20,27,28,29], 13, true );
	}

	//X, Y location for portal sprite
	get position ( )
	{
		return new Vector2 ( this.sprite.isoX, this.sprite.isoY );
	}

	animate ( )
	{
		//	Switch statement to change between animation types
		switch ( this.intAnimationMask )
		{
			case 1:
				this.sprite.animations.play ( 'activate' );
				break;
			case 2:
				this.sprite.animations.play ( 'repeat' );
				break;		
		}
	}
}
