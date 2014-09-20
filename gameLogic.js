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
	console.log(canvas.height);

}
	
function loadCanvas() {
	//draw the start game screen

	var startImage = new Image();

	var grd = context.createRadialGradient(midX,midY,0,360,200,800);
	
	grd.addColorStop(0,"gray");
	grd.addColorStop(1,"green");

	context.beginPath();
	context.fillStyle = grd;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.stroke();

	context.beginPath();
	context.fillStyle = "black"
	context.fillRect(midX-185,midY-98,370,104);
	context.stroke();

	context.beginPath();
	context.fillStyle = "white"
	context.fillRect(midX-175,midY-88,350,84);
	context.stroke();

	context.beginPath();
	context.fillStyle = "black";
	context.fillRect(midX-165,midY-78,330,64);
	context.stroke();

	context.beginPath();
	context.font = "70px Papyrus bold";
	context.fillStyle = "blue";
	context.textAlign="center";
	context.fillText("Start Game", midX, midY-20);
	context.closePath();

	startImage.src = "./src/startVeg.png";
	startImage.onload = function() {context.drawImage(startImage,midX-100,midY+40,200,180);};
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

	//Function for displaying the score
}

function updateScore(score) {

	//Fuction for updating score
}

function gameOver() {

	context.clearRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "black";
	context.textAlign="center";
	context.font = "80px Papyrus bold underline";
	context.fillText("GAME OVER", midX, midY - 100);

	context.beginPath();
	context.fillStyle = "black"
	context.fillRect(midX-50,midY-54,100,64);
	context.stroke();

	context.fillStyle = "blue";
	context.font = "70px Papyrus";
	context.fillText(score, midX, midY);

	context.fillStyle = "black";
	context.font = "40px Papyrus"
	context.fillText("Click to play again!", midX, midY + 80);
}


