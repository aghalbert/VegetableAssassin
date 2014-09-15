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
	}
	
function loadCanvas() {
	context.font = "30px Arial";
	context.fillStyle = "black";
	context.fillText("Start Game", midX-20, midY);
}

function start() {

	// Click on the start button that will be in the middle canvas.
	// this method should also be use to restart a new game after finishing an old one.
}

function flyingVeggies() {

	// May need to break this up into more methods
	// If will display the fruit flying from one side of the screen to the other
	// using projectile motion.
}

function veggieDestruction() {

	// will display the flying veggis when being chopped and splatting on the screen.
	// this will likely also update the score or will call that method.
}

function bomHit() {

	
}

function chopTrail() {

	// this will display the trail that fallows the mouse when it is "chopping"
	// accross the screen. we may need to do this in differnt method or place.
}

function displayScore(){

	//Function for displaying the score
}

function updateScore(score){

	//Fuction for updateing score
}


