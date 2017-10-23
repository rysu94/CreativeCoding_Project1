
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
  

} 

function draw() 
{ 
  background(0);
	
	

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
  
	//Checks to see if the spaceship is moving
	if(keyIsDown(LEFT_ARROW) && spaceShipX >= 0) 
	{			
		spaceShipX -= 2;
		print(spaceShipX);
	}
	else if(keyIsDown(RIGHT_ARROW) && spaceShipX <= 600)
	{
		spaceShipX += 2;
		print(spaceShipX);
	}
	
	
	DrawSpaceship(spaceShipX, 500);
	
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