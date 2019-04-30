class Enemy 
{
	//	TODO:	When player is close to enemy, enemy will attack the player

	/*
	 *	Construct enemy at position
	 * */
	constructor ( position )
	{
		this.sprite = game.add.isoSprite ( position.x, position.y, 0, "knight", 0, enemyGroup );

		this.sprite.tint = 0xFF0000;

		this.sprite.animations.add('S', [21,43,65,87,109,131,153,175,197,219,241,43], 15,true);
		this.sprite.animations.add('N', [484,485,486,487,488,489,490,491,492,493,494,495,496,497], 15,true);
		this.sprite.animations.add('W', [514,515,516,517,518,519,520,521,522,523,524,525,526,528,529], 15,true);
		this.sprite.animations.add('E', [451,452,453,454,455,456,457,458,459,462,463,464,465], 15,true);
		this.sprite.animations.add('NE', [467,468,469,470,471,472,473,474,475,476,477,478,479,480,481], 15, true);
		this.sprite.animations.add('SE', [435,436,437,438,441,442,443,445,446,447,448,449,450], 15, true);
		this.sprite.animations.add('SW', [530,531,532,533,534,535,536,537,538,539,540,541,542,543,544], 15, true);
		this.sprite.animations.add('NW', [498,499,500,501,502,503,504,506,507,508,509,510,511,512,513], 15, true);

		this.intAnimationMask = 0;
	}

	/*
	 * 	Get Enemy Position
	 * */
	get position ( )
	{
		return new Vector2 ( this.sprite.isoX, this.sprite.isoY );
	}

	lerp ( start, end, alpha )
	{
		return ( 1.0 - alpha ) * start + alpha * end;
	}

	/*
	 *	Check animation mask and set sprite
	 * */
	animate ( )
	{
		switch ( this.intAnimationMask )
		{
				//	Idle
			case 0:
				this.sprite.animations.stop ( );
				break;

				//	Straights
			case 1:
				this.sprite.animations.play ( 'W' );
				this.sprite.body.velocity.x = -250;
				break;
			case 2:
				this.sprite.animations.play ( 'N' );
				this.sprite.body.velocity.y = -250;
				break;
			case 4:
				this.sprite.animations.play ( 'E' );
				this.sprite.body.velocity.x = 250;
				break;
			case 8:
				this.sprite.animations.play ( 'S' );
				this.sprite.body.velocity.y = 250;
				break;

				//	Diagonals
			case 6:
				this.sprite.animations.play ( 'NE' );
				this.sprite.body.velocity.x = 250;
				this.sprite.body.velocity.y = -250;
				break;
			case 3:
				this.sprite.animations.play ( 'NW' );
				this.sprite.body.velocity.x = -250;
				this.sprite.body.velocity.y = -250;
				break;
			case 12:
				this.sprite.animations.play ( 'SE' );
				this.sprite.body.velocity.x = 250;
				this.sprite.body.velocity.y = 250;
				break;
			case 9:
				this.sprite.animations.play ( 'SW' );
				this.sprite.body.velocity.x = -250;
				this.sprite.body.velocity.y = 250;
				break;				
		}

		this.intAnimationMask = 0;
	}

	/*
	 * 	Update game logic
	 * */
	update ( )
	{
		this.sprite.body.velocity.x = 0;
		this.sprite.body.velocity.y = 0;

		//	Get Player position
		var distance = player.position.sub ( this.position );

		//	Get Distance Squared
		var distSqr = distance.dot ( distance );

		if ( distSqr < 100000 && distSqr > 5000 )
		{
			if ( distance.x < -6 || distance.x > 6 )
				this.intAnimationMask |= ( ( distance.x > 0 ) ? 0x4 : 0x1 );

			if ( distance.y < -6 || distance.y > 6 )
				this.intAnimationMask |= ( ( distance.y > 0 ) ? 0x8 : 0x2 );

			console.log ( "MASK : " + this.intAnimationMask + " Dist : X - " + distance.x + " Y - " + distance.y );
		}

		this.animate ( );
	}
}
