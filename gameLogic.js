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
	context.font = "30px Arial";
	context.fillStyle = "black";
	context.fillText("Start Game", midX-20, midY);
}

function start() {
	// Click on the start button that will be in the middle canvas.
	// this method should also be use to restart a new game after finishing an old one.
	context.clearRect(0, 0, canvas.width, canvas.height);
	window.setTimeout(gameOver, 3000); //Change this back to 30000  
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
	context.font = "50px Arial";
	context.fillText("GAME OVER", midX-50, midY);
	context.font = "30px Arial";
	context.fillText(score, midX, midY + 60);
	context.fillText("Click to play again!", midX  - 30, midY + 120);
}


