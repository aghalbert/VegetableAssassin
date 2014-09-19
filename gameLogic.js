// Globel Variables:
var score = 0;  
var canvas;
var context;
var midX;
var midY;


// Start of Script:
function setCanvasVars() {
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
	midX = canvas.width/2;
	midY = canvas.height/2;
	canvas.addEventListener("mousedown", start);

}
	
function loadCanvas() {
	//draw the start game screen

	var startImage = new Image();

	var grd = context.createRadialGradient(midX,midY,70,90,80,300);
	
	grd.addColorStop(0,"gray");
	grd.addColorStop(1,"green");

	context.beginPath();
	context.fillStyle = grd;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.stroke();

	context.beginPath();
	context.fillStyle = "black"
	context.fillRect(midX-70,midY-45,140,37);
	context.stroke();

	context.beginPath();
	context.fillStyle = "white"
	context.fillRect(midX-65,midY-40,130,27);
	context.stroke();

	context.beginPath();
	context.fillStyle = "black";
	context.fillRect(midX-60,midY-37,120,20);
	context.stroke();

	context.beginPath();
	context.font = "20px Papyrus bold";
	context.fillStyle = "blue";
	context.textAlign="center";
	context.fillText("Start Game", midX, midY-20);
	context.closePath();

	startImage.src = "./src/startVeg.png";
	startImage.onload = function() {context.drawImage(startImage,midX-40,midY-5,80,70);};
}

function start() {
	// Click on the start button that will be in the middle canvas.
	// this method should also be use to restart a new game after finishing an old one.
	context.clearRect(0, 0, canvas.width, canvas.height);
	window.setTimeout(gameOver, 1000); //Change this back to 30000  
}

function flyingVeggies() {

	// May need to break this up into more methods
	// If will display the fruit flying from one side of the screen to the other
	// using projectile motion.
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

	//Function for displaying the score
}

function updateScore(score) {

	//Fuction for updating score
}

function gameOver() {

	context.clearRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "black";
	context.textAlign="center";
	context.font = "30px Papyrus bold underline";
	context.fillText("GAME OVER", midX, midY - 30);

	context.beginPath();
	context.fillStyle = "black"
	context.fillRect(midX-23,midY-17,46,19);
	context.stroke();

	context.fillStyle = "blue";
	context.font = "20px Papyrus";
	context.fillText(score, midX, midY);

	context.fillStyle = "black";
	context.font = "15px Papyrus"
	context.fillText("Click to play again!", midX, midY + 25);
}


