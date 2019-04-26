class Player 
{
	constructor ( position )
	{
		this.sprite = game.add.isoSprite (position.x, position.y, 0, "knight", 0 );


		this.sprite.tint = 0x86bfda;
		this.sprite.anchor.set ( 0.5, 0.5 );

		/*this.sprite.animations.add('S', [79,88,89,97,98,99,106,107,108,109,115,116,117,118,119], 15,true);
		this.sprite.animations.add('N', [19,28,29,37,38,39,46,47,48,49,55,56,57,58,59], 15,true);
		this.sprite.animations.add('W', [65,66,74,75,83,84,92,93,94,101,102,103,110,111,112],15,true);
		this.sprite.animations.add('E', [30,31,32,33,34,40,41,42,43,44,50,51,52,53,54], 15,true);
		this.sprite.animations.add('NE', [5,6,7,8,9,15,16,17,18,25,26,27,35,36,45], 15, true);
        	this.sprite.animations.add('SE', [0,1,2,3,4,10,11,12,13,14,20,21,22,23,24], 15, true);
        	this.sprite.animations.add('SW', [67,68,69,76,77,78,85,86,87,95,96,104,105,113,114], 15, true);
        	this.sprite.animations.add('NW', [60,61,62,63,64,70,71,72,73,80,81,82,90,91,100], 15, true);*/
        
		//Movement animations
		this.sprite.animations.add('S', [21,43,65,87,109,131,153,175,197,219,241,43], 15,true);
		this.sprite.animations.add('N', [484,485,486,487,488,489,490,491,492,493,494,495,496,497], 15,true);
		this.sprite.animations.add('W', [514,515,516,517,518,519,520,521,522,523,524,525,526,528,529], 15,true);
		this.sprite.animations.add('E', [451,452,453,454,455,456,457,458,459,462,463,464,465], 15,true);
		this.sprite.animations.add('NE', [467,468,469,470,471,472,473,474,475,476,477,478,479,480,481], 15, true);
		this.sprite.animations.add('SE', [435,436,437,438,441,442,443,445,446,447,448,449,450], 15, true);
		this.sprite.animations.add('SW', [530,531,532,533,534,535,536,537,538,539,540,541,542,543,544], 15, true);
		this.sprite.animations.add('NW', [498,499,500,501,502,503,504,506,507,508,509,510,511,512,513], 15, true);

		//Attack animations
		//this.sprite.animations.add('AS', [132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149], 6,true);
		//this.sprite.animations.add('AN', [37,38,39,40,41,42,44,45,46,47,48,49,50,51,52,53,54,55], 6,true);
		//this.sprite.animations.add('AW', [94,95,96,97,98,99,100,101,102,103,104,105,106,107,110,111],6,true);
		//this.sprite.animations.add('AE', [18,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],6,true);
		//this.sprite.animations.add('ANE', [18,19,20,22,23,24,25,26,27,28,29,30,31,31,32,33,34,35,36], 6, true);
		//this.sprite.animations.add('ASE', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], 6, true);
		//this.sprite.animations.add('ASW', [113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130],6,true);
		//this.sprite.animations.add('ANW', [75,76,77,78,79,80,81,82,83,84,85,86,88,89,90,91,92], 6, true);

		game.physics.isoArcade.enable ( this.sprite );
		this.sprite.body.collideWorldBounds = true;
	}

	get position ( )
	{
		return new Vector2 ( this.sprite.isoX, this.sprite.isoY );
	}
}
