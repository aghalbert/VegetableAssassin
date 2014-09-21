// Global Variables:
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
var veggies = new Array();


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
	homeGrd.addColorStop(1,"#336600");

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

function Vegetable(type, path, x, y, width, height) {
	this.type = type; 
	this.path = path; 
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.image = new Image(); 
	this.image.src = path;
	this.hit = false;
}

function start() {
	// Click on the start button that will be in the middle canvas.
	// this method should also be use to restart a new game after finishing an old one.
	context.clearRect(0, 0, canvas.width, canvas.height);
	canvas.removeEventListener("mousedown", start);

	var intervalId = window.setInterval(update, 10);
	flyingVeggies(); //just sends off one vegetable
	//eventually we'll need something like this:
	//window.setInterval(flyingVeggies, Math.random()*1000); 

	window.setTimeout( function () {
		clearInterval(intervalId);
		gameOver();
	}, 10000); //Change this back to 30000 
}

function update() {
	canvas.addEventListener("mousedown", collisionCheck, false);
}

function collisionCheck(evt) {
	var x = evt.offsetX; 
	var y = evt.offsetY; 
	
	var slash = new Image();
	slash.src = "./src/slash.png";
	context.drawImage(slash, x-slash.width/2, y-slash.height/2, slash.width, slash.height);	

	var i = 0;

	while(i < veggies.length) {
		console.log(veggies[i].x + " " + veggies[i].y + " " + x + " " + y);
		if(x > veggies[i].x && x < veggies[i].x + veggies[i].width && y > veggies[i].y && y < veggies[i].y + veggies[i].height){
			veggieDestruction(veggies[i]);
			veggies[i].hit = true;
			veggies.splice(i, 1);
			console.log("IM HIT");
		} else {
			i++;
			console.log("ALL GOOD");
		}	
	}

}

function flyingVeggies() {
	// May need to break this up into more methods
	// If will display the fruit flying from one side of the screen to the other
	// using projectile motion.

	var veg = new Vegetable("eggplant", "./src/eggplant.png", 0, canvas.height/2, 50, 50)
	veggies.push(veg);

	// initial position
	var x0 = 0;
	var y0 = canvas.height/2;

	//the angle of initial velocity
	var theta = (Math.PI/6);

	//maybe someday we'll randomize these...
	var vx = 175; // inital velocity in the x direction
	var vy = -50; // initial velocity in the y direction

	var startTime = new Date().getTime(); 
	var currentTime = 0; 

	var id = window.setInterval(function() { 
		if(!veg.hit) {
			context.clearRect(veg.x, veg.y, veg.width, veg.height);
			currentTime = (new Date().getTime() - startTime)/1000;
			veg.x = getXPosition(x0, vx, currentTime, theta);
			veg.y = getYPosition(y0, vy, currentTime, theta);
			//console.log("x=" + veg.x + "; y=" + veg.y + "; vx=" + vx + "; vy=" + vy + "; time=" + currentTime);
			context.drawImage(veg.image, veg.x, veg.y, veg.width, veg.height);
		}
	}, 50);

	window.setTimeout(function() {clearInterval(id);}, 6500);
}

function getXPosition(x0, vx0, time, theta) {
		// rx(time) = [Vx0*Cos(theta)*t]
	return ( x0+(vx0*Math.cos(theta)*time) );
}

function getVx(vx0, time, theta){
	return ( (vx0*Math.cos(theta)) );
}

function getYPosition(y0, vy0, time, theta) {
		// ry(time)= [height] + [(V0*Sin(theta))time] + [(1/2)*g*t^2]
	return ( y0-( vy0*Math.sin(theta)*time )+( 0.5*(9.81)*(time*time) ) ); 
}

function getVy(vy0, time, theta) {
		// Vy(time)= [V0*Sin(theta)] + [-g*t]
	return ( -(vy0*Math.sin(theta))+((9.81)*time) );
}

function veggieDestruction(veg) {

	// will display the flying veggies when being chopped and splatting on the screen.
	// this will likely also update the score or will call that method.
	context.clearRect(veg.x, veg.y, veg.width, veg.height);
	updateScore(veg.type)
	console.log("VEGGIE DESTRUCTION");
}

function bomHit() {

	stk(); // this will update 
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

function updateScore(vegg) {
	
	if (vegg == "tomato"){
		score = score + 10;
	} else if (vegg == "eggplant"){
		score = score + 5;
	} else if (vegg == "pumpken"){
		score = score + 15;
	} else {
		
	}
}

function stk(stkNum){ // cant use strike it resevered for some reason

	stkNum = (typeof stkNum == null) ? (strikeNum+1) : stkNum; // if there is no stkNum provided defalt to stickNum + 1  (the new global number the strikes)

	scoreContext.beginPath();
	scoreContext.fillStyle = "black"
	scoreContext.fillRect(145,5,208,65);
	scoreContext.closePath();

	var count

	for (i=0; i < stkNum; i++){

		scoreContext.drawImage(x_mark,160+(i*60)+((i-1)*5),8,60,60);
	}

	strikeNum++;
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
	
	canvas.addEventListener("mousedown", start);

	stk(3);
}


