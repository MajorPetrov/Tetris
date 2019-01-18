function affichername() { 		//cette partie de la fonction sert � r�cup�rer le nom entr� par l'utilisateur et l'�crire ensuite dans le html
	name = document.getElementById("name").value;
	if (name == "") { name = "JOUEUR 1" }
	nameSpan = document.getElementById("nameresult");
	nameSpan.innerHTML = name.toString();

	document.getElementById('tout').style.display = 'block';		//cette partie sert � afficher tout le html qui compose le jeu et � effacer ce qui sert � la saisie du nom
	document.getElementById('pname').style.display = 'none';
	document.getElementById('difficulte').style.display = 'none';
	document.getElementById('content').style.display = 'none';
	document.getElementById('boutonStart').style.display = 'none';
	document.getElementById('titre').style.display = 'none';

	var themeTetris = new Audio("Tetris Theme.mp3");		//la musique d�marre une fois que le nom est inscrit et que le jeu appara�t
	themeTetris.play();


	var element = document.difficult.dif;
	for (var i = 0; i < element.length; i++) {
		if (element[i].checked) {
			laDifficulte = element[i].value;
			break;
		}
	}
	if (laDifficulte == "facile") {
		intervalle = 500;
		N = 1;
		niv2 = 1000;
		niv3 = 1000;
		niv4 = 1000;
		niv5 = 1000;
	}

	if (laDifficulte == "intermediaire") {
		intervalle = 500;
		N = 1;
		niv2 = 15;
		niv3 = 30;
		niv4 = 45;
		niv5 = 60;
	}

	if (laDifficulte == "difficile") {
		intervalle = 400;
		N = 2;
		niv2 = 10;
		niv3 = 10;
		niv4 = 20;
		niv5 = 30;
	}

	if (laDifficulte == "expert") {
		intervalle = 200;
		N = 4;
		niv2 = 15;
		niv3 = 15;
		niv4 = 15;
		niv5 = 15;
	}

	onReady(); 	//appel de la fonction qui charge les �l�ments de la page pour d�marrer le jeu 

}

var boutonStart = document.getElementById("boutonStart");		//bouton pour lancer la partie
boutonStart.addEventListener("click", affichername);

function touches() {
	alert("D�placer � gauche : Q \n D�placer � droite : D \n D�placer vers le bas : S \n Rotation : Z \n Activer le bonus : Barre Espace  ");
}

//pr�d�finition par avance des variables
var ROWS = 20; // pr�d�finition nombre de colonnes et de lignes pour la grille
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
var Bonus = 3;
canvas2 = document.getElementById("pieceCanvas");
ctx2 = canvas2.getContext("2d");
var bouton;
var textTetris = "TETRIS";

function pause() {
	alert('Le jeu est en pause, fermez la fen�tre pour reprendre'); //le bouton pause, il suspent juste l'action en cours de la page 
	themeTetris.src = "";
}

var fonctionBonus = function () { //fonction bonus, � l'appui de la touche elle g�n�re une nvlle pi�ce et la dessine dans le canvas

	nextPiece = getRandomPiece();
	ctx2.clearRect(0, 0, 160, 160);
	drawNextPiece(nextPiece);
	Bonus--;		// il reste un bonus en moins au joueur, la ligne en desssous l'affiche
	bonusSpan.innerHTML = Bonus.toString();

}

var functionTetris = function () {			//fonction Tetris, appel�e si 4 lignes sont compl�t�es d'un coup,
	var sonTetris = new Audio("Tetris4.mp3");   		//elle affiche un texte pendant 4 sec,
	sonTetris.play();								//joue un son
	curLines = curLines + 6;							//donne 10 pts au lieu de 4 
	lineSpan.innerHTML = curLines.toString();
	Bonus++;										//donne un bonus en +
	bonusSpan.innerHTML = Bonus.toString();
	TetriisSpan.innerHTML = textTetris.toString();
	setTimeout(function () { 						//partie servant � l'affichage du texte durant 4 seconde � l'aide du "setTimeout
		TetriisSpan.innerHTML = "";
	}, 4000);

}


document.body.addEventListener("touchstart", function (e) //on attribue les contr�les � la pi�ce
{
	e.preventDefault();

	touchX = e.touches[0].pageX;
	touchY = e.touches[0].pageY;
	touchId = e.touches[0].identifier;

});

document.body.addEventListener("touchmove", function (e) //l'effet de gravit�, la pi�ce est int�gr�e au coordonn�es X du canvas, et le Y va �tre incr�ment� pour que la pi�ce descende
{
	e.preventDefault();

	var difY = e.touches[0].pageY - touchY;

	if (difY > 60) {
		if (checkMove(curPiece.gridx, curPiece.gridy + 1, curPiece.curState))
			curPiece.gridy++;
	}

});

document.body.addEventListener("touchend", function (e) {
	e.preventDefault();
	var touchEndX;
	var touchEndY;

	var touch = e.changedTouches.item(0);

	try {
		touchEndX = touch.pageX;
		touchEndY = touch.pageY;
	}
	catch (err) {
		alert(err);
		return;
	}

	var difX = Math.abs(touchEndX - touchX);
	var difY = Math.abs(touchEndY - touchY);

	if (difX < 10 && difY < 10) {
		var newState = curPiece.curState - 1;
		if (newState < 0)
			newState = curPiece.states.length - 1;

		if (checkMove(curPiece.gridx, curPiece.gridy, newState))
			curPiece.curState = newState;
	}
	else
		if (difX > difY) {
			if (touchEndX < touchX) {
				if (checkMove(curPiece.gridx - 1, curPiece.gridy, curPiece.curState))
					curPiece.gridx--;
			}
			else {
				if (checkMove(curPiece.gridx + 1, curPiece.gridy, curPiece.curState))
					curPiece.gridx++;
			}
		}

});

function onReady() //la fonction qui permet de charger les �l�ments dans la page
{
	imgLoader = new BulkImageLoader();
	imgLoader.addImage("blocks.png", "blocks");
	imgLoader.addImage("bg.png", "bg");					//notamment les images
	imgLoader.addImage("over.png", "gameover");
	imgLoader.onReadyCallback = onImagesLoaded;
	imgLoader.loadImages();

	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");							//le canvas du jeu
	lineSpan = document.getElementById("lines");			//les balises <span> o� seront �crits les lignes compl�t�es, les bonus et le texte de Tetris
	bonusSpan = document.getElementById("Bonus");
	TetriisSpan = document.getElementById("Tetriis");

	prevTime = curTime = 0;						//le temps vaut 0 au d�but de la partie

	document.onkeydown = getInput;
}

function getInput(e) {
	if (!e) { var e = window.event; }

	e.preventDefault();

	if (isGameOver != true) //c'est lors de l'affiche du Game Over, il s'agit de bloquer toutes les actions possibles du joueur
	{
		switch (e.keyCode) 			//on fait correspondre ici les touches aux commandes gr�ce � leurs keyCode
		{
			case 37:
				{
					if (checkMove(curPiece.gridx - 1, curPiece.gridy, curPiece.curState)) 		//touche directionnelle gauche pour d�placer la pi�ce � gauche
						curPiece.gridx--;
				}
				break;

			case 27:
				{
					pause();				//touche Echap correspond � pause
				}
				break;

			case 39:
				{
					if (checkMove(curPiece.gridx + 1, curPiece.gridy, curPiece.curState))	//touche directionnelle droite, d�placer � droite
						curPiece.gridx++;
				}
				break;

			case 38:
				{
					var newState = curPiece.curState - 1;
					if (newState < 0)
						newState = curPiece.states.length - 1;		//touche directionnelle du haut, permet de faire tourner la pi�ce

					if (checkMove(curPiece.gridx, curPiece.gridy, newState))
						curPiece.curState = newState;
				}
				break;

			case 40:
				{
					if (checkMove(curPiece.gridx, curPiece.gridy + 1, curPiece.curState))	//touche du bas, permet de descendre plus vite
						curPiece.gridy++;
				}
				break;

			case 96:
				{
					if (Bonus > 0) 			//touche qui active le bonus si il en reste au moins 1
						fonctionBonus();

				}
				break;
		}
	}
	else {
		alert(" Bravo " + name + " ! \n  Votre score est de " + curLines);
		sauvegarderScore(curLines);
		initGame(); // pour red�marrer le jeu
	}
}

function onImagesLoaded(e) {
	blockImg = imgLoader.getImageAtIndex(0);
	bgImg = imgLoader.getImageAtIndex(1);
	gameOverImg = imgLoader.getImageAtIndex(2);
	initGame();
}

function initGame() //lancement du jeu
{
	var r, c;
	curLines = 0;
	isGameOver = false;
	ctx2.clearRect(0, 0, 160, 160);

	if (gameData == undefined) //juste au cas o� la grille n'aurait pas �t� d�finie
	{
		gameData = new Array();

		for (r = 0; r < ROWS; r++) {
			gameData[r] = new Array();
			for (c = 0; c < COLS; c++) {
				gameData[r].push(0);
			}
		}
	}
	else {
		for (r = 0; r < ROWS; r++) {
			for (c = 0; c < COLS; c++) {
				gameData[r][c] = 0;
			}
		}
	}

	curPiece = getRandomPiece();
	nextPiece = getRandomPiece()  //coup de g�nie d'Arno, l'affichage de la pi�ce suivante
	drawNextPiece(nextPiece);

	lineSpan.innerHTML = curLines.toString();
	bonusSpan.innerHTML = Bonus.toString();

	if (laDifficulte != "facile") {
		niveau = "Niveau " + N;
		TetriisSpan.innerHTML = niveau.toString();
		setTimeout(function () { 						//partie servant � l'affichage du texte durant 4 seconde � l'aide du "setTimeout
			TetriisSpan.innerHTML = "";
		}, 2000);
	}

	var requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	window.requestAnimationFrame = requestAnimFrame;

	requestAnimationFrame(update);

} //appel de toutes les fonctions de bases permettant l'animation, c'est pas n�cessaire mais �a fluidifie le jeu 

function update() //tr�s important, c'est le rafraichissment
{
	curTime = new Date().getTime();



	if (curTime - prevTime > intervalle) {

		if (checkMove(curPiece.gridx, curPiece.gridy + 1, curPiece.curState)) {
			curPiece.gridy += 1;

		}
		else {

			// Si j'ai bien compris, Arno �tablit la pi�ce suivante � afficher dans le second canvas � chaque fois qu'une pi�ce ne peut plus descendre
			copyData(curPiece);
			curPiece = nextPiece;  	//pour que la pi�ce qui appara�t dans le canvas du jeu soit celle qui �tait dans le petit canvas en haut � droite

			nextPiece = getRandomPiece()
			ctx2.clearRect(0, 0, 160, 160);		//g�n�ration de la nouvelle pi�ce � venir et dessin de celle ci dans le canvas appropri�
			drawNextPiece(nextPiece);

		}

		prevTime = curTime;
	}


	ctx.clearRect(0, 0, 320, 640);
	drawBoard();
	drawPiece(curPiece);

	if (isGameOver == false) {
		requestAnimationFrame(update); //appel de la fonction update tant que le jeu n'est pas fini
	}
	else {
		ctx.drawImage(gameOverImg, 0, 0, 320, 640, 0, 0, 320, 640); //affichage du game over

	}
}

function copyData(p) //
{
	var xpos = p.gridx;
	var ypos = p.gridy;
	var state = p.curState;

	for (var r = 0, len = p.states[state].length; r < len; r++) {
		for (var c = 0, len2 = p.states[state][r].length; c < len2; c++) {
			if (p.states[state][r][c] == 1 && ypos >= 0) {
				gameData[ypos][xpos] = (p.color + 1);
			}

			xpos += 1;
		}

		xpos = p.gridx;
		ypos += 1;
	}

	checkLines();

	if (p.gridy < 0) {
		isGameOver = true;
	}
}

function checkLines() //c'est pour le score, il s'agit de v�rifier si une ligne a �t� compl�t�e
{
	var lineFound = false;
	var fullRow = true;
	var r = ROWS - 1;
	var c = COLS - 1;
	var nextLines = 0;


	while (r >= 0) {
		while (c >= 0) {
			if (gameData[r][c] == 0) {
				fullRow = false;
				c = -1;
			}
			c--;
		}

		if (fullRow == true) {
			zeroRow(r);
			r++;
			lineFound = true;
			curLines++;
			nextLines++;
		}

		fullRow = true;
		c = COLS - 1;
		r--;
	}


	if (lineFound && nextLines < 4) {
		lineSpan.innerHTML = curLines.toString();
		var sonLigne = new Audio("lignes.mp3");			//son qui est jou� si une ligne est compl�t�e 
		sonLigne.play();
	}

	if (nextLines == 4) {
		functionTetris();		//appel de la fonction tetris quand 4 lignes sont compl�t�es
	}

	if (curLines >= niv2 && N == 1) {
		N = 2;
		intervalle = 400;

		niveau = "Niveau 2";
		TetriisSpan.innerHTML = niveau.toString();
		setTimeout(function () { 						//partie servant � l'affichage du texte durant 4 seconde � l'aide du "setTimeout
			TetriisSpan.innerHTML = "";
		}, 1000);//le jeu s'acc�l�re � certains scores atteints
	}

	if (curLines >= niv3 && N == 2) {
		N = 3;
		intervalle = 300;

		niveau = "Niveau 3";
		TetriisSpan.innerHTML = niveau.toString();
		setTimeout(function () { 						//partie servant � l'affichage du texte durant 4 seconde � l'aide du "setTimeout
			TetriisSpan.innerHTML = "";
		}, 1000);//le jeu s'acc�l�re � certains scores atteints
	}

	if (curLines >= niv4 && N == 3) {
		N = 4;
		intervalle = 200;

		niveau = "Niveau 4";
		TetriisSpan.innerHTML = niveau.toString();
		setTimeout(function () { 						//partie servant � l'affichage du texte durant 4 seconde � l'aide du "setTimeout
			TetriisSpan.innerHTML = "";
		}, 1000);//le jeu s'acc�l�re � certains scores atteints
	}

	if (curLines >= niv5 && N == 4) {
		N = 5;
		intervalle = 100;

		niveau = "Niveau 5";
		TetriisSpan.innerHTML = niveau.toString();
		setTimeout(function () { 						//partie servant � l'affichage du texte durant 4 seconde � l'aide du "setTimeout
			TetriisSpan.innerHTML = "";
		}, 1000);//le jeu s'acc�l�re � certains scores atteints
	}
}

function zeroRow(row) //fonction qui permet de faire descendre les blocs lorsqu'une ligne est compl�t�e
{
	var r = row;
	var c = 0;

	while (r >= 0) {
		while (c < COLS) {
			if (r > 0)
				gameData[r][c] = gameData[r - 1][c];
			else
				gameData[r][c] = 0;

			c++;
		}

		c = 0;
		r--;
	}
}

function drawBoard() //on arrange les coordonn�es sur canvas pour qu'elles correspondent � la grille du background
{
	ctx.drawImage(bgImg, 0, 0, 320, 640, 0, 0, 320, 640);

	for (var r = 0; r < ROWS; r++) {
		for (var c = 0; c < COLS; c++) {
			if (gameData[r][c] != 0) {
				ctx.drawImage(blockImg, (gameData[r][c] - 1) * SIZE, 0, SIZE, SIZE, c * SIZE, r * SIZE, SIZE, SIZE);
			}
		}
	}
}

function drawPiece(p) //pareil mais pour la pi�ce
{
	var drawX = p.gridx;
	var drawY = p.gridy;
	var state = p.curState;

	for (var r = 0, len = p.states[state].length; r < len; r++) {
		for (var c = 0, len2 = p.states[state][r].length; c < len2; c++) {
			if (p.states[state][r][c] == 1 && drawY >= 0) {
				ctx.drawImage(blockImg, p.color * SIZE, 0, SIZE, SIZE, drawX * SIZE, drawY * SIZE, SIZE, SIZE);
			}

			drawX += 1;
		}

		drawX = p.gridx;
		drawY += 1;
	}
}


function drawNextPiece(p) //toujours pareil mais pour la pi�ce suivante
{
	var drawX = 1;
	var drawY = 1;
	var state = p.curState;


	for (var r = 0, len = p.states[state].length; r < len; r++) {
		for (var c = 0, len2 = p.states[state][r].length; c < len2; c++) {
			if (p.states[state][r][c] == 1 && drawY >= 0) {
				ctx2.drawImage(blockImg, p.color * SIZE, 0, SIZE, SIZE, drawX * SIZE, drawY * SIZE, SIZE, SIZE);
			}

			drawX += 1;
		}
		drawX = 1;
		drawY += 1;

	}
}

function checkMove(xpos, ypos, newState) //pr�d�finition du mouvement de la pi�ce et concordance avec les commandes
{
	var result = true;
	var newx = xpos;
	var newy = ypos;

	for (var r = 0, len = curPiece.states[newState].length; r < len; r++) {
		for (var c = 0, len2 = curPiece.states[newState][r].length; c < len2; c++) {
			if (newx < 0 || newx >= COLS) {
				result = false; // rendu solide des bordures pour pas que la pi�ce ne s'en aille
				c = len2;
				r = len;
			}

			if (gameData[newy] != undefined && gameData[newy][newx] != 0
				&& curPiece.states[newState][r] != undefined && curPiece.states[newState][r][c] != 0) {
				result = false;
				c = len2;
				r = len;
			}

			newx += 1;
		}

		newx = xpos;
		newy += 1;

		if (newy > ROWS) {
			r = len;
			result = false; // emp�che la pi�ce de traverser le bord et la fixer au sol
		}
	}

	return result;
}