class Portal 
{
	/*
	 *	Construct portal at position
	 * */
	constructor ( position )
	{
		this.sprite = game.add.isoSprite ( position.x, position.y, 0, 'portal' );
		this.sprite.visible = false;
		this.sprite.anchor.set ( 0.5, 0.5 );

		//	Portal animations when opening and remaining in the world
		this.sprite.animations.add ( 'activate', [1,2,3,4,5,7,8,9,10,11,12,14,15,16,17,18,19,21,22,23,24,25,26, 6,13,20,27,28,29], 15 );
		this.sprite.animations.add ( 'repeat', [6,13,20,27,28,29], 6, true );

		this.bolActive = false;
		this.activateSound = game.add.audio ( 'portalSound' );
	}

	/*
	 *	Return portal position
	 * */
	get position ( )
	{
		return new Vector2 ( this.sprite.isoX, this.sprite.isoY );
	}

	/*
	 *	Animate the portal
	 * */
	animate ( )
	{
		//	Check if the open animation is finished
		if ( this.sprite.animations.currentAnim.isFinished )
		{
			this.bolActive = true;

		}

		//	Determine animation to play
		if ( this.bolActive )
		{
			this.sprite.animations.play ( 'repeat' );
		}
		else 
		{
			this.sprite.animations.play ( 'activate' );
			this.activateSound.play ( );
		}
	}

	/*
	 *	Reset the portal's state
	 * */
	reset ( )
	{
		this.bolActive = false;
		this.sprite.visible = true;
	}
}
