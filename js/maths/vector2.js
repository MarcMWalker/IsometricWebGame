class Vector2 
{
	constructor ( x, y )
	{
		this.x = x;
		this.y = y;
	}

	//	Add another vector to this
	add ( rhand )
	{
		return new Vector2 ( this.x + rhand.x, this.y + rhand.y );
	}

	//	Subtract another vector from this
	sub ( rhand )
	{
		return new Vector2 ( this.x - rhand.x, this.y - rhand.y );
	}

	//	Dot product between this and another Vector2
	dot ( rhand )
	{
		return this.x * rhand.x + this.y * rhand.y;
	}

	//	Norm of this vector
	magnitude ( )
	{
		return Math.sqrt ( x * x + y * y );
	}
}
