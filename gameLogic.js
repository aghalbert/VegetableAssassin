// Globel Variables:
var score;
var strikeNum;
var canvas;
var context;
var midX;
var midY;
var homeGrd
var startImage;
var knife;
var knife2;
var x_mark; 


// Start of Script:
function setCanvasVars() {
	
	score = 0;

	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
	canvas.addEventListener("mousedown", start);
	console.log(canvas.height);

	scoreCanvas = document.getElementById("scoreCanvas");
	scoreContext = scoreCanvas.getContext("2d");
	
	midX = canvas.width/2;
	midY = canvas.height/2;

	homeGrd = context.createRadialGradient(midX,midY,0,360,200,800);

	startImage = new Image();
	startImage.src = "./src/startVeg.png";
	
	knife = new Image();
	knife.src= "./src/knife.png";
	
	knife2 = new Image();
	knife2.src = "./src/knife2.png";

	x_mark = new Image();
	x_mark.src = "./src/x-mark.png";

}
	
function loadCanvas() {

	//draw the start game screen on the game canvas
	homeGrd.addColorStop(0,"gray");
	homeGrd.addColorStop(1,"green");

	context.beginPath();
	context.fillStyle = homeGrd;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.stroke();

	context.beginPath(); //outer most rect
	context.fillStyle = "black"
	context.fillRect(midX-185,midY-118,370,104);
	context.stroke();

	context.beginPath(); // middle rect
	context.fillStyle = "white"
	context.fillRect(midX-175,midY-108,350,84);
	context.stroke();

	context.beginPath(); // inner most rect
	context.fillStyle = "black";
	context.fillRect(midX-165,midY-98,330,64);
	context.stroke();

	context.beginPath(); // Text
	context.font = "70px Papyrus bold";
	context.fillStyle = "blue";
	context.textAlign="center";
	context.fillText("Start Game", midX, midY-40);
	context.closePath();

	knife.onload = function () {
		context.drawImage(knife2, midX-300, midY+60,200,140); //left knife
	}
	startImage.onload = function () {
		context.drawImage(startImage,midX-100,midY+40,220,180); // center fruit
	}
	knife2.onload = function () {
		context.drawImage(knife, midX+100, midY+60,200,140); // right knife
	}

	//draws the strat up screen on the score convas
	scoreContext.beginPath();
	scoreContext.fillStyle = homeGrd;
	scoreContext.fillRect(0,0,scoreCanvas.width,scoreCanvas.height);
	scoreContext.stroke();

	scoreContext.beginPath();
	scoreContext.moveTo((scoreCanvas.width/2),0);
	scoreContext.lineTo((scoreCanvas.width/2),scoreCanvas.height);
	scoreContext.lineWidth = 6;
	scoreContext.stroke();

	scoreContext.beginPath(); // Text
	scoreContext.font = "45px Papyrus bold";
	scoreContext.fillStyle = "black";
	scoreContext.textAlign="left";
	scoreContext.fillText("Strikes:",5,(scoreCanvas.height/2)+15);
	scoreContext.font = "50px Papyrus bold";
	scoreContext.fillText("Score:",(scoreCanvas.width/2)+8,(scoreCanvas.height/2)+15);
	scoreContext.closePath();

	displayScore();
	stk(0);
}

function start() {
	// Click on the start button that will be in the middle canvas.
	// this method should also be use to restart a new game after finishing an old one.
	context.clearRect(0, 0, canvas.width, canvas.height);
	window.setTimeout(gameOver, 10000); //Change this back to 30000 
	flyingVeggies(); //just sends off one vegetable
	//eventually we'll need something like this:
	//window.setInterval(flyingVeggies, Math.random()*1000); 
}

function flyingVeggies() {
	// May need to break this up into more methods
	// If will display the fruit flying from one side of the screen to the other
	// using projectile motion.
	var veg = new Image();
	veg.src = "./src/eggplant.png"

	var vegX = 0;
	var vegY = canvas.height + 30;
	//maybe someday we'll randomize these...
	var vx = 40; // inital velocity in the x direction
	var vy = 10; // initial velocity in the y direction

	var startTime = new Date().getTime(); 
	var currentTime = 0; 

	var id = window.setInterval(function() { 
		context.clearRect(vegX, vegY, 35, 35);
		currentTime = (new Date().getTime() - startTime)/1000;
		vegX = getXPosition(vx, currentTime);
		vegY = canvas.height - getYPosition(vy, currentTime);
		vy = getVy(vy, currentTime);
		console.log(vegX + " " + vegY );
		context.drawImage(veg, vegX, vegY, 30, 30);
	}, 50);

	window.setTimeout(function() {clearInterval(id);}, 5000);
}

function getXPosition(v0, t) {
	return v0*t; 
}

function getYPosition(v0, t) {
	return v0*t + 0.5*2*t*t; 
}

function getVy(v0, t) {
	return v0 + 2*t;
}

function veggieDestruction() {

	// will display the flying veggies when being chopped and splatting on the screen.
	// this will likely also update the score or will call that method.
}

function bomHit() {

	
}

function chopTrail() {

	// this will display the trail that follows the mouse when it is "chopping"
	// accross the screen. we may need to do this in differnt method or place.
}

function displayScore() {
	//Function for displaying/updateing the score
	scoreContext.beginPath();
	scoreContext.fillStyle = "black"
	scoreContext.fillRect((scoreCanvas.width/2)+140,5,215,65);
	scoreContext.closePath();

	scoreContext.beginPath();
	scoreContext.font = "50px Papyrus bold";
	scoreContext.fillStyle = "blue";
	scoreContext.textAlign="center";
	scoreContext.fillText(score,(scoreCanvas.width/2)+248,(scoreCanvas.height/2)+17);
}

function stk(stkNum){ // cant use strike it resevered for some reason

	stkNum = (typeof stkNum == null) ? (stickNum+1) : stkNum;

	scoreContext.beginPath();
	scoreContext.fillStyle = "black"
	scoreContext.fillRect(145,5,208,65);
	scoreContext.closePath();

	var count

	for (i=0; i < stkNum; i++){

		scoreContext.drawImage(x_mark,160+(i*60)+((i-1)*5),8,60,60);
	}
}

function gameOver() {

	context.beginPath();
	context.fillStyle = homeGrd;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.stroke();

	context.fillStyle = "black";
	context.textAlign="center";
	context.font = "80px Papyrus bold underline";
	context.fillText("GAME OVER", midX, midY - 100);

	context.beginPath();
	context.fillStyle = "black"
	context.fillRect(midX-80,midY-54,160,65);
	context.stroke();

	context.fillStyle = "blue";
	context.font = "70px Papyrus";
	context.fillText(score, midX, midY);

	context.fillStyle = "black";
	context.font = "40px Papyrus"
	context.fillText("Click to play again!", midX, midY + 80);
}


