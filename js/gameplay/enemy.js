class Enemy 
{
	/*
	 *	Construct enemy at position
	 * */
	constructor ( position )
	{
		this.sprite = game.add.isoSprite ( position.x, position.y, 0, "cube2" );
	}
}
