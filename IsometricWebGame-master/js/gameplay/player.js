class Player 
{
	constructor ( position, colour )
	{
		//Create player
		this.sprite = game.add.isoSprite (position.x, position.y, 0, "knight", 0 );

		//Colour+anchor of Tuscan, Green and Black Knights
		this.sprite.tint = colour;
		this.sprite.anchor.set ( 0.5, 0.5 );

		//Attack animations
		this.sprite.animations.add('AS', [132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149], 20 );
		this.sprite.animations.add('AN', [37,38,39,40,41,42,44,45,46,47,48,49,50,51,52,53,54,55], 20 );
		this.sprite.animations.add('AW', [94,95,96,97,98,99,100,101,102,103,104,105,106,107,110,111], 20 );
		this.sprite.animations.add('AE', [18,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36], 20 );
		this.sprite.animations.add('ANE', [37,38,39,40,41,42,44,45,46,47,48,49,50,51,52,53], 20 );
		this.sprite.animations.add('ASE', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], 20 );
		this.sprite.animations.add('ASW', [113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130], 20 );
		this.sprite.animations.add('ANW', [75,76,77,78,79,80,81,82,83,84,85,86,88,89,90,91,92], 20 );

		//Movement animations
		this.sprite.animations.add('S', [21,43,65,87,109,131,153,175,197,219,241,43], 15,true);
		this.sprite.animations.add('N', [484,485,486,487,488,489,490,491,492,493,494,495,496,497], 15,true);
		this.sprite.animations.add('W', [514,515,516,517,518,519,520,521,522,523,524,525,526,528,529], 15,true);
		this.sprite.animations.add('E', [451,452,453,454,455,456,457,458,459,462,463,464,465], 15,true);
		this.sprite.animations.add('NE', [467,468,469,470,471,472,473,474,475,476,477,478,479,480,481], 15, true);
		this.sprite.animations.add('SE', [435,436,437,438,441,442,443,445,446,447,448,449,450], 15, true);
		this.sprite.animations.add('SW', [530,531,532,533,534,535,536,537,538,539,540,541,542,543,544], 15, true);
		this.sprite.animations.add('NW', [498,499,500,501,502,503,504,506,507,508,509,510,511,512,513], 15, true);

		//	Physics, collision and attack distance applied to player
		game.physics.isoArcade.enable ( this.sprite );
		this.sprite.body.collideWorldBounds = true;

		this.intAttackRange = 110;
		this.intSpeed = 400;
		this.bolAttacking = false;

		this.intHealth = 200;
	}

	//	Return position of player in x,y location
	get position ( )
	{
		return new Vector2 ( this.sprite.isoX, this.sprite.isoY );
	}

	animate ( intKeyMask )
	{
		if ( !this.bolAttacking )
		{
			switch ( intKeyMask )
			{
					//	Idle
				case 0:
					player.sprite.animations.stop ( );
					break;

					//	Straights
				case 1:
					player.sprite.body.velocity.x = -this.intSpeed;
					player.sprite.animations.play ( 'W' );
					break;
				case 2:
					player.sprite.body.velocity.y = -this.intSpeed;
					player.sprite.animations.play ( 'N' );
					break;
				case 4:
					player.sprite.body.velocity.x = this.intSpeed;
					player.sprite.animations.play ( 'E' );
					break;
				case 8:
					player.sprite.body.velocity.y = this.intSpeed;
					player.sprite.animations.play ( 'S' );
					break;

					//	Diagonals
				case 6:
					player.sprite.body.velocity.x = this.intSpeed;
					player.sprite.body.velocity.y = -this.intSpeed;
					player.sprite.animations.play ( 'NE' );
					break;
				case 3:
					player.sprite.body.velocity.x = -this.intSpeed;
					player.sprite.body.velocity.y = -this.intSpeed;
					player.sprite.animations.play ( 'NW' );
					break;
				case 12:
					player.sprite.body.velocity.x = this.intSpeed;
					player.sprite.body.velocity.y = this.intSpeed;
					player.sprite.animations.play ( 'SE' );
					break;
				case 9:
					player.sprite.body.velocity.x = -this.intSpeed;
					player.sprite.body.velocity.y = this.intSpeed;
					player.sprite.animations.play ( 'SW' );
					break;				
			}
		}

		if ( this.bolAttacking && this.sprite.animations.currentAnim.isFinished )
		{
			this.bolAttacking = false;
		}
	}

	handle_attack ( prevMask, enemies )
	{
		if ( !this.bolAttacking )
		{
			this.bolAttacking = true;
            this.swordSwing = game.add.audio ( 'swordSwing' );
		    this.swordSwing.play ( );

			//	Attack direction
			var attackDirection = new Vector2 ( 0, 0 );

			/*
			 * 	Controls direction of attack and which animation 
			 * 	to use in both straight and diagonal directions for player
			 */
			switch ( prevMask )
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

			//	For each enemy AI record how far away they are from player
			enemies.forEach ( function ( enemy ) { 
				var dist = enemy.position.sub ( player.position );
				var dot = attackDirection.dot ( dist );
				var distSqr = dist.dot ( dist );

				//	If dot and distSqr parameters met, player is within range of attack and so enemy loses health
				if ( dot > 0 && distSqr < player.intAttackRange * player.intAttackRange )
				{
					//Lose health and change colour tint of attacked enemy
					enemy.intHealth -= 10;
                    //this.hitEnemy = game.add.audio ( 'hitEnemy' );
		            //this.hitEnemy.play ( );
				}
			} );
		}
	}
}
