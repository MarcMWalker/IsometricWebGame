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

	position ( )
	{
		return new Vector2 ( this.sprite.x, this.sprite.y );
	}

	update ( )
	{
		//	Get Player position
		var distance = this.position ( ).sub ( player.position ( ) );

		//	Calculate distance to player
	}
}
