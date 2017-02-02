	
function affichernames() 
{ 
	 name = document.getElementById("name").value;
	
	if (name == "") { name = "JOUEUR 1"}
		nameSpan = document.getElementById("nameresult"); 
		nameSpan.innerHTML = name.toString();

	 name2 = document.getElementById("name2").value;
	
	if (name2 == "") { name2 = "JOUEUR 2"}
	nameSpan2 = document.getElementById("nameresult2"); 
	nameSpan2.innerHTML = name2.toString();

	document.getElementById('tout').style.display='block';
	document.getElementById('pname').style.display='none';
	document.getElementById('pname2').style.display='none';
	document.getElementById('boutonStart').style.display='none';
	document.getElementById('titre').style.display='none';

	var themeTetris = new Audio("Tetris Theme.mp3");
		themeTetris.play();
		
	onReady();
}

var boutonStart = document.getElementById("boutonStart");
boutonStart.addEventListener("click",affichernames);

function touches1()
{
	alert("Déplacer à gauche : Q \n Déplacer à droite : D \n Déplacer vers le bas : S \n Rotation : Z \n Activer le bonus : Barre Espace  ");
}

function touches2()
{
	alert("Déplacer à gauche :  Flèche directionnelle gauche \n Déplacer à droite : Flèche directionnelle droite \n Déplacer vers le bas : Flèche directionnelle bas \n Rotation : Flèche directionnelle haut \n Activer le bonus : Pav Num 0  ");
}

var ROWS = 20;
var COLS = 10;
var SIZE = 32;
var canvas;
var ctx;
var blockImg;
var bgImg;
var gameOverImg;
var curPiece;
var gameData;
var imgLoader;
var prevTime;
var curTime;
var isGameOver;
var lineSpan;
var curLines;
var touchX;
var touchY;
var touchId;
var intervalle = 500;
var textTetris = "TETRIS";
var Bonus1 = 3;
var Bonus2 = 3;

	lineSpan = document.getElementById("lines");
	bonusSpan1 = document.getElementById("Bonus1");
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");
		
	canvas2 = document.getElementById("pieceCanvas");
	ctx2 = canvas2.getContext("2d");
	
	lineSpan2 = document.getElementById("lines2");
	bonusSpan2 = document.getElementById("Bonus2");
	canvas3 = document.getElementById("gameCanvas2");
	ctx3 = canvas3.getContext("2d");
	
	canvas4 = document.getElementById("pieceCanvas2");
	ctx4 = canvas4.getContext("2d");
	



var pause = function() 
{
	alert('Le jeu est en pause, fermez la fenêtre pour reprendre');
}




var fonctionBonus1 = function () 
{
	nextPiece = getRandomPiece();  
	ctx2.clearRect(0, 0, 160, 160);
	drawNextPiece(nextPiece);
	Bonus1--;
	bonusSpan1.innerHTML = Bonus1.toString();		
}

var functionTetris = function() 
{
	TetriisSpan.innerHTML = textTetris.toString();
	setTimeout(function() { 
	TetriisSpan.innerHTML = ""; },4000);
}
	
var fonctionBonus2 = function () 
{
	nextPiece2 = getRandomPiece();  //coup de génie d'Arno, l'affichage de la pièce suivante
	ctx4.clearRect(0, 0, 160, 160);
	drawNextPiece2(nextPiece2);
	Bonus2--;
	bonusSpan2.innerHTML = Bonus2.toString();		
}
	






document.body.addEventListener("touchmove", function(e)
{
	e.preventDefault();
	
	var difY = e.touches[0].pageY - touchY;
	
	if(difY > 60)
	{
		if( checkMove(curPiece.gridx, curPiece.gridy + 1, curPiece.curState) )
			curPiece.gridy++;
	}
	
} );

document.body.addEventListener("touchend", function(e) 
{
	e.preventDefault();
	var touchEndX;
	var touchEndY;
	
	var touch = e.changedTouches.item(0);
	
	try
	{
		touchEndX = touch.pageX;
		touchEndY = touch.pageY;
	}
	catch(err)
	{
		alert(err);
		return;
	}
	
	var difX = Math.abs(touchEndX - touchX);
	var difY = Math.abs(touchEndY - touchY);
	
	if(difX < 10 && difY < 10)
	{
		var newState = curPiece.curState - 1;
		if(newState < 0)
			newState = curPiece.states.length - 1;
			
		if( checkMove(curPiece.gridx, curPiece.gridy, newState) )
			curPiece.curState = newState;
	}
	else
	if(difX > difY)
	{
		if(touchEndX < touchX)
		{
			if( checkMove(curPiece.gridx - 1, curPiece.gridy, curPiece.curState) )
				curPiece.gridx--;
		}	
		else
		{
			if( checkMove(curPiece.gridx + 1, curPiece.gridy, curPiece.curState) )
				curPiece.gridx++;
		}
	}
	
});

function onReady()
{
	imgLoader = new BulkImageLoader();
	imgLoader.addImage("blocks.png", "blocks");
	imgLoader.addImage("bg.png", "bg");
	imgLoader.addImage("over.png", "gameover");
	imgLoader.onReadyCallback = onImagesLoaded;
	imgLoader.loadImages();
	TetriisSpan = document.getElementById("Tetriis");
	
	
	
	
	prevTime = curTime = 0;
	
	document.onkeydown = getInput;
}

function getInput(e)
{
	if(!e) { var e = window.event; }
	
	e.preventDefault();
	
	if(isGameOver != true)
	{
		switch(e.keyCode)
		{
			case 37:
			{
				if( checkMove2(curPiece2.gridx - 1, curPiece2.gridy, curPiece2.curState) )
					curPiece2.gridx--;
			}
			break;
			
			case 39:
			{
				if( checkMove2(curPiece2.gridx + 1, curPiece2.gridy, curPiece2.curState) )
					curPiece2.gridx++;
			}
			break;
			
			case 38:
			{
				var newState = curPiece2.curState - 1;
				if(newState < 0)
					newState = curPiece2.states.length - 1;
					
				if( checkMove2(curPiece2.gridx, curPiece2.gridy, newState) )
					curPiece2.curState = newState;
			}
			break;
			
			case 40:
			{
				if( checkMove2(curPiece2.gridx, curPiece2.gridy + 1, curPiece2.curState) )
					curPiece2.gridy++;
			}
			break;
			
			case 96:
			{
				if( Bonus2 >0) 
				fonctionBonus2();
			
			}
			break;
		}
		
		
		
		switch(e.keyCode)
		{
			case 81:
			{
				if( checkMove(curPiece.gridx - 1, curPiece.gridy, curPiece.curState) )
					curPiece.gridx--;
			}
			break;
			
			case 68:
			{
				if( checkMove(curPiece.gridx + 1, curPiece.gridy, curPiece.curState) )
					curPiece.gridx++;
			}
			break;
			
			case 90:
			{
				var newState = curPiece.curState - 1;
				if(newState < 0)
					newState = curPiece.states.length - 1;
					
				if( checkMove(curPiece.gridx, curPiece.gridy, newState) )
					curPiece.curState = newState;
			}
			break;
			
			case 83:
			{
				if( checkMove(curPiece.gridx, curPiece.gridy + 1, curPiece.curState) )
					curPiece.gridy++;
			}
			break;
			
			case 32:
			{
				if( Bonus1 >0) 
				fonctionBonus1();
			
			}
			break;
			
			case 27:
			{
			pause();
			}
			break;
			
		}
	}
	else
	{
		initGame();
	}
}

function onImagesLoaded(e)
{
	blockImg = imgLoader.getImageAtIndex(0);
	bgImg = imgLoader.getImageAtIndex(1);
	gameOverImg = imgLoader.getImageAtIndex(2);
	initGame();
}

function initGame()
{
	var r, c;
	curLines = 0;
	curLines2 = 0;
	isGameOver = false;
	delete (isGameOver2);
	
	ctx2.clearRect(0, 0, 160, 160);
	ctx4.clearRect(0, 0, 160, 160);
	
	var Bonus1 = 3;
	var Bonus2 = 3;
	
	
	
	if(gameData == undefined)
	{
		gameData = new Array();
		gameData2 = new Array();
		
		for(r = 0; r < ROWS; r++)
		{
			gameData[r] = new Array();
			gameData2[r] = new Array();
			for(c = 0; c < COLS; c++)
			{
				gameData[r].push(0);
				gameData2[r].push(0);
			}
		}		
	}
	else
	{
		for(r = 0; r < ROWS; r++)
		{
			for(c = 0; c < COLS; c++)
			{
				gameData[r][c] = 0;
				gameData2[r][c] = 0;
			}
		}
	}
	
	curPiece = getRandomPiece();
	nextPiece = getRandomPiece()  //test test test
	drawNextPiece(nextPiece);
	
	curPiece2 = getRandomPiece();
	nextPiece2 = getRandomPiece()  //test test test
	drawNextPiece2(nextPiece2);
	
	lineSpan.innerHTML = curLines.toString();
	lineSpan2.innerHTML = curLines2.toString();
	
	bonusSpan1.innerHTML = Bonus1.toString();
	bonusSpan2.innerHTML = Bonus2.toString();
	
	var requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
							
	window.requestAnimationFrame = requestAnimFrame;
	
	requestAnimationFrame(update);
}

function update()
{
	curTime = new Date().getTime();
	
	
	if(curTime - prevTime > intervalle)
	{

		if( checkMove(curPiece.gridx, curPiece.gridy + 1, curPiece.curState) )
		{
			curPiece.gridy += 1;
			
		}
		else
		{
		
	
			copyData(curPiece);
			curPiece = nextPiece; // test test test
			
			nextPiece = getRandomPiece()  //test test test
			ctx2.clearRect(0, 0, 160, 160);
			drawNextPiece(nextPiece);

		}
		
		if( checkMove2(curPiece2.gridx, curPiece2.gridy + 1, curPiece2.curState) )
		{
			curPiece2.gridy += 1;
			
		}
		else
		{
		
	
			copyData2(curPiece2);
			curPiece2 = nextPiece2; // test test test
			
			nextPiece2 = getRandomPiece()  //test test test
			ctx4.clearRect(0, 0, 160, 160);
			drawNextPiece2(nextPiece2);

		}
		
		prevTime = curTime;
	}
	
	
	
	
	
	ctx.clearRect(0, 0, 320, 640);
	drawBoard();
	drawPiece(curPiece);
	
	ctx3.clearRect(0, 0, 320, 640);
	drawBoard2();
	drawPiece2(curPiece2);
	
	if(isGameOver == true)
	{
		
		ctx.drawImage(gameOverImg, 0, 0, 320, 640, 0, 0, 320, 640);
		alert('          Bravo ' + name2 + ' !  Votre score est de ' + curLines2 +' \n Appuyez sur une touche pour recommencer une partie');
		initGame();
		
	}
	else
		requestAnimationFrame(update);
		
	if(isGameOver2 == true)
	{
		
		ctx3.drawImage(gameOverImg, 0, 0, 320, 640, 0, 0, 320, 640);
		alert('          Bravo ' + name +'  !  Votre score est de ' + curLines + '\n Appuyez sur une touche pour recommencer une partie');
		initGame();
		
	}
	else
		requestAnimationFrame(update);
}

function copyData(p)
{
	var xpos = p.gridx;
	var ypos = p.gridy;
	var state = p.curState;
	
	for(var r = 0, len = p.states[state].length; r < len; r++)
	{
		for(var c = 0, len2 = p.states[state][r].length; c < len2; c++)
		{
			if(p.states[state][r][c] == 1 && ypos >= 0)
			{
				gameData[ypos][xpos] = (p.color + 1);
			}
			
			xpos += 1;
		}
		
		xpos = p.gridx;
		ypos += 1;
	}
	
	checkLines();
	
	if(p.gridy < 0)
	{
		isGameOver = true;
	}
}

function checkLines()
{
	var lineFound = false;
	var fullRow = true;
	var r = ROWS - 1;
	var c = COLS - 1;
	var nextLines = 0;
	
	while(r >= 0)
	{
		while(c >= 0)
		{
			if(gameData[r][c] == 0)
			{
				fullRow = false;
				c = -1;
			}
			c--;
		}
		
		if(fullRow == true)
		{
			zeroRow(r);
			r++;
			lineFound = true;
			curLines++;
			nextLines++;
			if(nextLines>1)
			{
				supLine(r);
			}
		}
		
		fullRow = true;
		c = COLS - 1;
		r--;
	}
	
	if(lineFound && nextLines<4)
	{
		lineSpan.innerHTML = curLines.toString();
		var sonLigne = new Audio("lignes.mp3");
		sonLigne.play();
	}
	
	if(nextLines >=4) {
		var sonTetris = new Audio("Tetris4.mp3");
		sonTetris.play();
		curLines= curLines + 6;
		lineSpan.innerHTML = curLines.toString();
		Bonus1++;
		bonusSpan1.innerHTML = Bonus1.toString();
		functionTetris();
		}
		
	if(curLines >= 73) {
			isGameOver2 = true;
	}
}

function supLine(row)
{
	var r = 0;
	var c = 0;
	
	while(r <row)
	{
		while(c < COLS)
		{
			if(r < row-1)
			{
			
				if(r>0)
				{
					gameData2[r][c] =  gameData2[r+1][c];
					
				}
			}
			else
			{
				gameData2[r][c] = 0;
			}
			c++;	
		}
		
		c = 0;
		r++;
	}
	var color = Math.floor(Math.random() * 7)+1;
	while(c < COLS)
	{
		gameData2[row-1][c] = color;
		c++;
	}
	c = 0;
	gameData2[row-1][Math.floor(Math.random() * 9)+1] = 0;
	gameData2[row-1][Math.floor(Math.random() * 9)+1] = 0;
}

function zeroRow(row)
{
	var r = row;
	var c = 0;
	
	while(r >= 0)
	{
		while(c < COLS)
		{
			if(r > 0)
				gameData[r][c] = gameData[r-1][c];
			else
				gameData[r][c] = 0;
				
			c++;
		}
		
		c = 0;
		r--;
	}
}

function drawBoard()
{
	ctx.drawImage(bgImg, 0, 0, 320, 640, 0, 0, 320, 640);
	
	for(var r = 0; r < ROWS; r++)
	{
		for(var c = 0; c < COLS; c++)
		{
			if(gameData[r][c] != 0)
			{
				ctx.drawImage(blockImg, (gameData[r][c] - 1) * SIZE, 0, SIZE, SIZE, c * SIZE, r * SIZE, SIZE, SIZE);
			}
		}
	}
}

function drawPiece(p)
{
	var drawX = p.gridx;
	var drawY = p.gridy;
	var state = p.curState;
	
	for(var r = 0, len = p.states[state].length; r < len; r++)
	{
		for(var c = 0, len2 = p.states[state][r].length; c < len2; c++)
		{
			if(p.states[state][r][c] == 1 && drawY >= 0)
			{
				ctx.drawImage(blockImg, p.color * SIZE, 0, SIZE, SIZE, drawX * SIZE, drawY * SIZE, SIZE, SIZE);
			}
			
			drawX += 1;
		}
		
		drawX = p.gridx;
		drawY += 1;
	}
}

function drawNextPiece(p)
{
	var drawX =1;
	var drawY = 1;
	var state = p.curState;
	
	
	for(var r = 0, len = p.states[state].length; r < len; r++)
	{
		for(var c = 0, len2 = p.states[state][r].length; c < len2; c++)
		{
			if(p.states[state][r][c] == 1 && drawY >= 0)
			{
				ctx2.drawImage(blockImg, p.color * SIZE, 0, SIZE, SIZE, drawX * SIZE, drawY * SIZE, SIZE, SIZE);
			}
			
			drawX += 1;
		}
		drawX =1;
		drawY += 1;
		
	}
}

function checkMove(xpos, ypos, newState)
{
	var result = true;
	var newx = xpos;
	var newy = ypos;
	
	for(var r = 0, len = curPiece.states[newState].length; r < len; r++)
	{
		for(var c = 0, len2 = curPiece.states[newState][r].length; c < len2; c++)
		{
			if(newx < 0 || newx >= COLS)
			{
				result = false;
				c = len2;
				r = len;
			}
			
			if(gameData[newy] != undefined && gameData[newy][newx] != 0
				&& curPiece.states[newState][r] != undefined && curPiece.states[newState][r][c] != 0)
			{
				result = false;
				c = len2;
				r = len;
			}
			
			newx += 1;
		}
		
		newx = xpos;
		newy += 1;
		
		if(newy > ROWS)
		{
			r = len;
			result = false;
		}
	}
	
	return result;
}

function copyData2(p)
{
	var xpos = p.gridx;
	var ypos = p.gridy;
	var state = p.curState;
	
	for(var r = 0, len = p.states[state].length; r < len; r++)
	{
		for(var c = 0, len2 = p.states[state][r].length; c < len2; c++)
		{
			if(p.states[state][r][c] == 1 && ypos >= 0)
			{
				gameData2[ypos][xpos] = (p.color + 1);
			}
			
			xpos += 1;
		}
		
		xpos = p.gridx;
		ypos += 1;
	}
	
	checkLines2();
	
	if(p.gridy < 0)
	{
		isGameOver2 = true;
	}
}



function checkLines2()
{
	var lineFound = false;
	var fullRow = true;
	var r = ROWS - 1;
	var c = COLS - 1;
	var nextLines2 = 0;
	
	while(r >= 0)
	{
		while(c >= 0)
		{
			if(gameData2[r][c] == 0)
			{
				fullRow = false;
				c = -1;
			}
			c--;
		}
		
		if(fullRow == true)
		{
			zeroRow2(r);
			r++;
			lineFound = true;
			curLines2++;
			nextLines2++;
			if(nextLines2>1)
			{
				supLine2(r);
			}
		}
		
		fullRow = true;
		c = COLS - 1;
		r--;
	}
	
	if(lineFound && nextLines2<4)
	{
		var sonLigne = new Audio("lignes.mp3");
		sonLigne.play();
		lineSpan2.innerHTML = curLines2.toString();
	}
	
	if(nextLines2 >=4) {
		var sonTetris = new Audio("Tetris4.mp3");
		sonTetris.play();
		curLines2= curLines2 + 6;
		lineSpan2.innerHTML = curLines2.toString();
		Bonus2++;
		bonusSpan2.innerHTML = Bonus2.toString();
		functionTetris();
		}
		
	if(curLines2 >= 73) {
			isGameOver = true;
	}
	
}

function supLine2(row)
{
	var r = 0;
	var c = 0;
	
	while(r <row)
	{
		while(c < COLS)
		{
			if(r < row-1)
			{
			
				if(r>0)
				{
					gameData[r][c] =  gameData[r+1][c];
					
				}
			}
			else
			{
				gameData[r][c] = 0;
			}
			c++;	
		}
		
		c = 0;
		r++;
	}
	var color = Math.floor(Math.random() * 7)+1;
	while(c < COLS)
	{
		gameData[row-1][c] = color;
		c++;
	}
	c = 0;
	gameData[row-1][Math.floor(Math.random() * 9)+1] = 0;
	gameData[row-1][Math.floor(Math.random() * 9)+1] = 0;
}

function zeroRow2(row)
{
	var r = row;
	var c = 0;
	
	while(r >= 0)
	{
		while(c < COLS)
		{
			if(r > 0)
				gameData2[r][c] = gameData2[r-1][c];
			else
				gameData2[r][c] = 0;
				
			c++;
		}
		
		c = 0;
		r--;
	}
}



function drawBoard2()
{
	ctx3.drawImage(bgImg, 0, 0, 320, 640, 0, 0, 320, 640);
	
	for(var r = 0; r < ROWS; r++)
	{
		for(var c = 0; c < COLS; c++)
		{
			if(gameData2[r][c] != 0)
			{
				ctx3.drawImage(blockImg, (gameData2[r][c] - 1) * SIZE, 0, SIZE, SIZE, c * SIZE, r * SIZE, SIZE, SIZE);
			}
		}
	}
}



function drawPiece2(p)
{
	var drawX = p.gridx;
	var drawY = p.gridy;
	var state = p.curState;
	
	for(var r = 0, len = p.states[state].length; r < len; r++)
	{
		for(var c = 0, len2 = p.states[state][r].length; c < len2; c++)
		{
			if(p.states[state][r][c] == 1 && drawY >= 0)
			{
				ctx3.drawImage(blockImg, p.color * SIZE, 0, SIZE, SIZE, drawX * SIZE, drawY * SIZE, SIZE, SIZE);
			}
			
			drawX += 1;
		}
		
		drawX = p.gridx;
		drawY += 1;
	}
}

function drawNextPiece2(p)
{
	var drawX =1;
	var drawY = 1;
	var state = p.curState;
	
	
	for(var r = 0, len = p.states[state].length; r < len; r++)
	{
		for(var c = 0, len2 = p.states[state][r].length; c < len2; c++)
		{
			if(p.states[state][r][c] == 1 && drawY >= 0)
			{
				ctx4.drawImage(blockImg, p.color * SIZE, 0, SIZE, SIZE, drawX * SIZE, drawY * SIZE, SIZE, SIZE);
			}
			
			drawX += 1;
		}
		drawX =1;
		drawY += 1;
		
	}
}

function checkMove2(xpos, ypos, newState)
{
	var result = true;
	var newx = xpos;
	var newy = ypos;
	
	for(var r = 0, len = curPiece2.states[newState].length; r < len; r++)
	{
		for(var c = 0, len2 = curPiece2.states[newState][r].length; c < len2; c++)
		{
			if(newx < 0 || newx >= COLS)
			{
				result = false;
				c = len2;
				r = len;
			}
			
			if(gameData2[newy] != undefined && gameData2[newy][newx] != 0
				&& curPiece2.states[newState][r] != undefined && curPiece2.states[newState][r][c] != 0)
			{
				result = false;
				c = len2;
				r = len;
			}
			
			newx += 1;
		}
		
		newx = xpos;
		newy += 1;
		
		if(newy > ROWS)
		{
			r = len;
			result = false;
		}
	}
	
	return result;
}