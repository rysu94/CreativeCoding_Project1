
/*
Project 1
By: Ryan Su

The adjective I wanted to convey is lost. The scene that I have working right now, is
a star ship lost in space. You can use the arrow keys to move the ship back and forth.
The plan is to transition this into a little game.

*/

var starIndex = 0;
var stars = [];
var exhaustIndex = 0;
var exhaust = [];

var planet;

var spaceShipX = 300;

var playerHealth = 150;

var bullets = [];

function setup() 
{ 
  createCanvas(600, 600);
  
  //Make an array of stars
	while(stars.length < 300)
	{
		stars[starIndex] = new Star();
		starIndex++;
	}
  //Make an array of exhaust
  while(exhaust.length < 3)
  {
  	exhaust[exhaustIndex] = new Exhaust();
    exhaustIndex++;
  }
  exhaust[1].y = 550;
  exhaust[2].y = 575;
  exhaust[1].size = 20;
  exhaust[2].size = 10;
  
  //Create a new planet object
  planet = new Planet();
  
	pixelDensity(1);
  
  
} 

function draw() 
{ 
  background(0);
  
  //Creates a 2d texture field, currently disabled since it makes the sketch SLOW, By all means turn it on but be warned!
  //CreateNebula();
  
	//Moves the stars
	for(var i = 0; i < stars.length; i++)
	{
		stars[i].move();
		
		if(stars[i].y > 600)
		{
			stars[i].y = random(0,100);
		}
		stars[i].display();
	}
	
  //Move the exhaust
  for(var j = 0; j < exhaust.length; j++)
  {
  	exhaust[j].move();
    exhaust[j].display();
    //exhaust[j].x = spaceShipX;
    
  }
  
  //Move the planet
  planet.move();
  if(planet.y >= 850)
  {
  	planet.x = random(0,600);
    planet.y = -100;
  }
  planet.display();
  
  //Move any bullets
  for(var k = 0; k < bullets.length; k++)
  {
  	bullets[k].move();
    bullets[k].display();
  }
  
  
	//Checks to see if the spaceship is moving
	if(keyIsDown(LEFT_ARROW) && spaceShipX >= 0) 
	{			
		spaceShipX -= 2;
	}
	else if(keyIsDown(RIGHT_ARROW) && spaceShipX <= 600)
	{
		spaceShipX += 2;
	}
  
  
	
	DrawSpaceship(spaceShipX, 500);
	
	DrawHealth();

}


//Draws the spaceship, takes and x and a y to center the ship
function DrawSpaceship(x,y)
{
	rectMode(CENTER);
	fill(225);
	rect(x,y + 20, 25, 50);
	rect(x, y - 25, 20, 40);
	rect(x, y + 40, 20, 20);
	fill(225);
	triangle(x - 40, y + 45, x, y - 10, x , y + 45);
	triangle(x + 40, y + 45, x, y - 10, x , y + 45);
  fill(200);
	rect(x, y + 30, 10, 30);
	fill(255,0,0);
	triangle(x - 10, y - 45, x + 10, y - 45, x, y - 65);
	fill(0,100,255);
	ellipse(x, y - 30, 15, 25);
}


//Star Class
function Star()
{
	this.x = random(0, 600);
	this.y = random(0, 600);
	
	this.move = function()
	{
		this.y += 1;
	}
	
	this.display = function()
	{
		noStroke();
		fill(255);
		ellipse(this.x,this.y,5,5);
	}
}

//Exhaust Class
function Exhaust()
{
	this.x = spaceShipX;
	this.y = 525;
	this.size = 30;
	
	this.move = function()
	{
		this.y += 3;
		this.size -= .9;
    
    if(this.size <= 0)
    {
    	this.y = 525;
      this.size = 30;
      this.x = spaceShipX;
    }
	}
	
	this.display = function()
	{
		fill(255,165,0);
		ellipse(this.x,this.y, this.size,this.size);
    fill(255,1100,0);
    ellipse(this.x, this.y-3, this.size/1.5,this.size/1.5);
	}
	
}

//Planet Class
function Planet()
{
	this.x = random(0, 600);
	this.y = -250;
	
	this.move = function()
	{
		this.y += .5;
	}
	
  //Plan: Make planet generate randomly. Random color, perlin noise to texture it.
	this.display = function()
	{
		noStroke();
		fill(0,100,255);
		ellipse(this.x,this.y,250,250);
	}
}

//Bullet Class
function Bullet()
{
	this.x = spaceShipX;
  this.y = 450;
  this.index = 0;
  
  this.move = function()
  {
  	this.y -= 3; 
  }
  
  this.display = function()
  {
  	noStroke();
    fill(255,200,0);
    rectMode(CENTER);
    rect(this.x,this.y, 10,10);
  }
}

//Shoot bullets from the spaceship
function mouseReleased()
{
   var numBullets = bullets.length;
   if(numBullets === 0)
   {
  	 bullets[0] = new Bullet(); 
   }
   else
   {
   	 bullets[numBullets] = new Bullet();
     bullets[numBullets].index = numBullets;
   }
}


function Meteor()
{
  this.x = random(0,600);
  this.y = 0;
  this.velocityX = random(-1,1);
  
  this.move = function()
  {
  	this.x += this.velocityX;
    this.y += 1;
  }
  
}

//Creates a nebula by manipulating the pixels array which will change as the 
//player moves around. Currently it makes the sketch SUPER SLOW.
function CreateNebula()
{
  loadPixels();
  var yoff = 0;
  //Loop though the pixels, I only need to adjust the alpha
  for(var i = 0; i < width; i++)
  {
    var xoff = 0;
  	for(var j = 0; j < height; j++)
    {
    	var index = (i + j * width) * 4;
      var noiseNum = noise(xoff, yoff) * 255
    	pixels[index] = noiseNum;
      pixels[index+1] = noiseNum;
      pixels[index+2] = noiseNum;
      pixels[index+3] = 255;
      xoff += 0.01;
    }
    yoff += 0.01
  }
  
  updatePixels();
}

function DrawHealth()
{
	//Create the player's health bar
	textSize(18);
  fill(255);
  text("Health", 25, 545);
  rectMode(CORNER);
  fill(255,0,0);
  rect(25,550, playerHealth, 15);
}
