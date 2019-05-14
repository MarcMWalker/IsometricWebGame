class Enemy 
{
	/*
	 *	Construct enemy at position
	 * */
	constructor ( position )
	{
		this.sprite = game.add.isoSprite ( position.x, position.y, 0, "knight", 0, enemyGroup );

		this.sprite.tint = 0xFF0000;

		//Attack animations
		this.sprite.animations.add('AS', [132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149], 15 );
		this.sprite.animations.add('AN', [37,38,39,40,41,42,44,45,46,47,48,49,50,51,52,53,54,55], 15 );
		this.sprite.animations.add('AW', [94,95,96,97,98,99,100,101,102,103,104,105,106,107,110,111], 15 );
		this.sprite.animations.add('AE', [18,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36], 15 );
		this.sprite.animations.add('ANE', [37,38,39,40,41,42,44,45,46,47,48,49,50,51,52,53], 15 );
		this.sprite.animations.add('ASE', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], 15 );
		this.sprite.animations.add('ASW', [113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130], 15 );
		this.sprite.animations.add('ANW', [75,76,77,78,79,80,81,82,83,84,85,86,88,89,90,91,92], 15 );

		//Movement animations
		this.sprite.animations.add('S', [21,43,65,87,109,131,153,175,197,219,241,43], 15,true);
		this.sprite.animations.add('N', [484,485,486,487,488,489,490,491,492,493,494,495,496,497], 15,true);
		this.sprite.animations.add('W', [514,515,516,517,518,519,520,521,522,523,524,525,526,528,529], 15,true);
		this.sprite.animations.add('E', [451,452,453,454,455,456,457,458,459,462,463,464,465], 15,true);
		this.sprite.animations.add('NE', [467,468,469,470,471,472,473,474,475,476,477,478,479,480,481], 15, true);
		this.sprite.animations.add('SE', [435,436,437,438,441,442,443,445,446,447,448,449,450], 15, true);
		this.sprite.animations.add('SW', [530,531,532,533,534,535,536,537,538,539,540,541,542,543,544], 15, true);
		this.sprite.animations.add('NW', [498,499,500,501,502,503,504,506,507,508,509,510,511,512,513], 15, true);

		//Death animations
		this.sprite.animations.add('D', [301,302,303,304,305,306,308,309,310,311,312,313,314,315,316,317], 15, false);

		// TIMER
		var timer;
		timer = game.time.create( false );
		timer.loop ( 3000, this.Attack, this );
		timer.start ( );

		this.intAnimationMask = 0;
		this.intAttackMask = 0;
		this.vecForward = new Vector2 ( 0.0, 0.0 );
		this.intHealth = 50;
		this.intAttackRange = 110;
		this.bolDead = false;
		this.bolAttacking = false;
	}

	//Returns the postion of the enemy
	get position ( )
	{
		return new Vector2 ( this.sprite.isoX, this.sprite.isoY );
	}

	//check animation mask and set sprite
	animate ( )
	{
		if ( !this.bolDead && !this.bolAttacking )
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

					this.vecForward.x = -1;
					break;
				case 2:
					this.sprite.animations.play ( 'N' );
					this.sprite.body.velocity.y = -250;

					this.vecForward.y = -1;
					break;
				case 4:
					this.sprite.animations.play ( 'E' );
					this.sprite.body.velocity.x = 250;

					this.vecForward.x = 1;
					break;
				case 8:
					this.sprite.animations.play ( 'S' );
					this.sprite.body.velocity.y = 250;

					this.vecForward.y = 1;
					break;

					//	Diagonals
				case 6:
					this.sprite.animations.play ( 'NE' );
					this.sprite.body.velocity.x = 250;
					this.sprite.body.velocity.y = -250;

					this.vecForward.x = 1;
					this.vecForward.y = -1;
					break;
				case 3:
					this.sprite.animations.play ( 'NW' );
					this.sprite.body.velocity.x = -250;
					this.sprite.body.velocity.y = -250;

					this.vecForward.x = -1;
					this.vecForward.y = -1;
					break;
				case 12:
					this.sprite.animations.play ( 'SE' );
					this.sprite.body.velocity.x = 250;
					this.sprite.body.velocity.y = 250;

					this.vecForward.x = 1;
					this.vecForward.y = 1;
					break;
				case 9:
					this.sprite.animations.play ( 'SW' );
					this.sprite.body.velocity.x = -250;
					this.sprite.body.velocity.y = 250;

					this.vecForward.x = -1;
					this.vecForward.y = 1;
					break;				
			}

			if ( this.intAnimationMask != 0 )
				this.intAttackMask = this.intAnimationMask;

			this.intAnimationMask = 0;
		}
	}

	//Handles enemy attacks
	Attack ( )
	{
		var dist = player.position.sub ( this.position );
		var distSqr = dist.dot ( dist );

		if ( !this.bolDead && distSqr < this.intAttackRange * this.intAttackRange )
		{
			var attackDirection = new Vector2 ( 0, 0 );

			this.bolAttacking = true;

			switch ( this.intAttackMask )
			{
					//	Straights
				case 1:
					this.sprite.animations.play ( 'AW' );
					attackDirection.x = -1;
					break;
				case 2:
					this.sprite.animations.play ( 'AN' );
					attackDirection.y = -1;
					break;
				case 4:
					this.sprite.animations.play ( 'AE' );
					attackDirection.x = 1;
					break;
				case 8:
					this.sprite.animations.play ( 'AS' );
					attackDirection.y = 1;
					break;

					//	Diagonals
				case 6:
					this.sprite.animations.play ( 'ANE' );
					attackDirection.x = 1;
					attackDirection.y = -1;
					break;
				case 3:
					this.sprite.animations.play ( 'ANW' );
					attackDirection.x = -1;
					attackDirection.y = -1;
					break;
				case 12:
					this.sprite.animations.play ( 'ASE' );
					attackDirection.x = 1;
					attackDirection.y = 1;
					break;
				case 9:
					this.sprite.animations.play ( 'ASW' );
					attackDirection.x = -1;
					attackDirection.y = 1;
					break;							
			}

			var dot = attackDirection.dot ( dist );

			if ( dot > 0 )
			{
				player.intHealth -= 10;
                this.enemyHit = game.add.audio ( 'enemyHit' );
		        this.enemyHit.play ( );
                
			}
		}
	}

	//Moves the enemies towards the player
	SimpleAI ( )
	{
		//	Get Player position
		var distance = player.position.sub ( this.position );

		//	Get Distance Squared
		var distSqr = distance.dot ( distance );

		if ( distSqr < 100000 && distSqr > 10000 )
		{
			this.vecForward.zero ( );

			if ( distance.x < -6 || distance.x > 6 )
				this.intAnimationMask |= ( ( distance.x > 0 ) ? 0x4 : 0x1 );

			if ( distance.y < -6 || distance.y > 6 )
				this.intAnimationMask |= ( ( distance.y > 0 ) ? 0x8 : 0x2 );
		}
	}

	/*
	 * 	Update game logic
	 * */
	update ( )
	{
		//Checks if Enemy is dead
		if ( this.intHealth <= 0 && this.bolDead == false )
		{
			this.bolDead = true;
			this.sprite.animations.play ( 'D' );
            this.slashSound = game.add.audio ( 'slashSound' );
		    this.slashSound.play ( );
            playState.intEnemyCounter--;
		}

		this.sprite.body.velocity.x = 0;
		this.sprite.body.velocity.y = 0;

		this.SimpleAI ( );
		this.animate ( );

		if ( this.sprite.animations.currentAnim.isFinished && this.bolAttacking )
		{
			this.bolAttacking = false;
		}
	}
}
