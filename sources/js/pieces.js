function LPiece()
{
	this.state1 = [ [1, 0],
					[1, 0],
					[1, 1] ];
					
	this.state2 = [ [0, 0, 1],
					[1, 1, 1] ];
					
	this.state3 = [ [1, 1],
					[0, 1],
					[0, 1] ];
	
	this.state4 = [ [1, 1, 1],
					[1, 0, 0] ];
					
	this.states = [ this.state1, this.state2, this.state3, this.state4 ];
	this.curState = 0;
	
	this.color = 0;
	this.gridx = 4;
	this.gridy = -3;
}

function ReverseLPiece()
{
	this.state1 = [ [0, 1],
					[0, 1],
					[1, 1] ];
					
	this.state2 = [ [1, 1, 1],
					[0, 0, 1] ];
					
	this.state3 = [ [1, 1],
					[1, 0],
					[1, 0] ];
	
	this.state4 = [ [1, 0, 0],
					[1, 1, 1] ];
					
	this.states = [ this.state1, this.state2, this.state3, this.state4 ];
	this.curState = 0;
	
	this.color = 0;
	this.gridx = 4;
	this.gridy = -3;
}

function BlockPiece()
{
	this.state1 = [ [1, 1],
					[1, 1] ];
					
	this.states = [ this.state1 ];
	this.curState = 0;
	
	this.color = 0;
	this.gridx = 4;
	this.gridy = -2;
}

function LinePiece()
{
	this.state1 = [ [1],
					[1],
					[1],
					[1] ];
					
	this.state2 = [ [1,1,1,1] ];
					
	this.states = [ this.state1, this.state2 ];
	this.curState = 0;
	
	this.color = 0;
	this.gridx = 5;
	this.gridy = -4;
}

function TPiece()
{
	this.state1 = [ [1, 1, 1],
					[0, 1, 0] ];
					
	this.state2 = [ [1, 0],
					[1, 1],
					[1, 0] ];
	
	this.state3 = [ [0, 1, 0],
					[1, 1, 1] ];
					
	this.state4 = [ [0, 1],
					[1, 1],
					[0, 1] ];
					
	this.states = [ this.state1, this.state2, this.state3, this.state4 ];
	this.curState = 0;
	
	this.color = 0;
	this.gridx = 4;
	this.gridy = -2;
}

function ZPiece()
{
	this.state1 = [ [1, 1, 0],
					[0, 1, 1] ];
					
	this.state2 = [ [0, 1],
					[1, 1],
					[1, 0] ];
					
	this.states = [ this.state1, this.state2 ];
	this.curState = 0;
	
	this.color = 0;
	this.gridx = 4;
	this.gridy = -2;
}

function ReverseZPiece()
{
	this.state1 = [ [0, 1, 1],
					[1, 1, 0] ];
					
	this.state2 = [ [1, 0],
					[1, 1],
					[0, 1] ];
					
	this.states = [ this.state1, this.state2 ];
	this.curState = 0;
	
	this.color = 0;
	this.gridx = 4;
	this.gridy = -2;
}

function getRandomPiece()
{
	var result = Math.floor( Math.random() * 13 );
	var piece;
	
	switch(result)
	{
		case 0: piece = new LPiece();			break;
		case 1: piece = new BlockPiece();		break;
		case 2: piece = new ZPiece();			break;
		case 3: piece = new TPiece();			break;
		case 4: piece = new ReverseLPiece();	break;
		case 5: piece = new ReverseZPiece();	break;
		case 6: piece = new LinePiece();		break;
		case 7: piece = new LPiece();			break;
		case 8: piece = new BlockPiece();		break;
		case 9: piece = new ZPiece();			break;
		case 10: piece = new TPiece();			break;
		case 11: piece = new ReverseLPiece();	break;
		case 12: piece = new ReverseZPiece();	break;
	}	
	
	piece.color = Math.floor(Math.random() * 8);
	return piece;
}