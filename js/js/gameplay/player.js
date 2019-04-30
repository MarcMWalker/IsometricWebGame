class Player 
{
	constructor ( position )
	{
		this.sprite = game.add.isoSprite (position.x, position.y, 0, "knight", 0 );


		this.sprite.tint = 0x86bfda;
		this.sprite.anchor.set ( 0.5, 0.5 );

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
        
            game.load.audio('slash',[ 'assets/sound/slash.wav']);
            game.load.audio('Spell_01',[ 'assets/sound/spell_01.mp3']);
            game.load.audio('Spell_02',[ 'assets/sound/spell_02.wav']);
            game.load.audio('walking',[ 'assets/sound/walking.wav']);

		game.physics.isoArcade.enable ( this.sprite );
		this.sprite.body.collideWorldBounds = true;
	}

	get position ( )
	{
		return new Vector2 ( this.sprite.isoX, this.sprite.isoY );
	}

	animate ( )
	{
		//	TODO: Move Player Animation Code here
	}

	handle_attack ( prevMask )
	{
		switch ( prevMask )
		{
				//	Straights
			case 1:
				this.sprite.animations.play ( 'AW' );
				break;
			case 2:
				this.sprite.animations.play ( 'AN' );
				break;
			case 4:
				this.sprite.animations.play ( 'AE' );
				break;
			case 8:
				this.sprite.animations.play ( 'AS' );
				break;

				//	Diagonals
			case 6:
				this.sprite.animations.play ( 'ANE' );
				break;
			case 3:
				this.sprite.animations.play ( 'ANW' );
				break;
			case 12:
				this.sprite.animations.play ( 'ASE' );
				break;
			case 9:
				this.sprite.animations.play ( 'ASW' );
				break;				
		}
	}
}