class Enemy 
{
	//	TODO:	Add a line for the enemy to follow, to imitate patrolling
	//	TODO:	When player is close to enemy, enemy will attack the player

	/*
	 *	Construct enemy at position
	 * */
	constructor ( position )
	{
		this.sprite = game.add.isoSprite ( position.x, position.y, 0, "cube2", 0, isoGroup2 );
	}

	get position ( )
	{
		return new Vector2 ( this.sprite.isoX, this.sprite.isoY );
	}

	lerp ( start, end, alpha )
	{
		return ( 1.0 - alpha ) * start + alpha * end;
	}

	update ( )
	{
		//	Get Player position
		var distance = player.position.sub ( this.position );

		//	Get Distance Squared
		var distSqr = distance.dot ( distance );

		if ( distSqr < 100000 )
		{
			this.sprite.isoX = this.lerp ( this.position.x, player.position.x, 0.001 );
			this.sprite.isoY = this.lerp ( this.position.y, player.position.y, 0.001 );
		}

		//	Attack When Close
	}
}
