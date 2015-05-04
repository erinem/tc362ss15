
var canvas;
var context;

var CanvasWidth= 0;
var CanvasHeight= 0;

var FPS= 60;

window.onload= init;

var x= 0;
var y= 0;

var background;

var critter= [];

var selection;

var clownfish= [];

var turtle= [];


function init()
{
	canvas= document.getElementById("myCanvas");
	context= canvas.getContext("2d");
	CanvasWidth= canvas.width;
	CanvasHeight= canvas.height;


	var gradient= context.createLinearGradient(0, 0, 0, CanvasHeight);
	gradient.addColorStop(0, "#C0F5E7");
	gradient.addColorStop(0.8, "#3F43E7");
	gradient.addColorStop(0.81, "#AF8553");
	gradient.addColorStop(1.0, "#E6CBAB");
	context.fillStyle= gradient;
	context.fillRect(0, 0, CanvasWidth, CanvasHeight);

	setInterval(loop, 1000/FPS);

	background= new Background();

	canvas.setAttribute('tabindex', '1');
	canvas.focus();
	U.addEvent(canvas, "keydown", doKeyPress);

	//criter[0]= new Critter();

	for (var i= 0; i < 7; i++)
		{
			critter[i]= new Critter();

		}
	for (var i= 0; i < 4; i++)
		{
			clownfish[i]= new ClownFish();
		}

	for (var i= 0; i < 5; i++)
		{
			turtle[i]= new Turtle();
		}

	U.addEvent(canvas, "click", doCritterClick);

	CanvasOffsetX= canvas.offsetLeft;
	CanvasOffsetY= canvas.offsetTop;


}
function doCritterClick(e)
{
	console.log("clicked the canvas");
	var x= e.pageX - CanvasOffsetX;
	var y= e.pageY - CanvasOffsetY;
	console.log (x + "" + y);

	var myCritter= critter[0];
	for (var i= 1; i < 7; i++)
	{
	myCritter= critter[i];
	if (y > myCritter.y && y < myCritter.y + myCritter.sizeY && x >
		myCritter.x && x < myCritter.x + myCritter.sizeX) {
		selection= myCritter;
		}
	}


	var myClownFish= clownfish[0];
	for (var i= 1; i < 4; i++)
	{
	myClownFish= clownfish[i];
	if (y > myClownFish.y && y < myClownFish.y + myClownFish.sizeY && x >
		myClownFish.x && x < myClownFish.x + myClownFish.sizeX){
		selection= myClownFish;
		}
	}

	var myTurtle= turtle[0];
	for (var i= 1; i < 5; i++)
	{
	myTurtle= turtle[i];
	if (y > myTurtle.y && y < myTurtle.y + myTurtle.sizeY && x >
		myTurtle.x && x < myTurtle.x + myTurtle.sizeX){
		selection= myTurtle;
		}
	}
	selection.vx= 2 * Math.random() -1;
	selection.vy= 2 * Math.random() -1;
}




function loop()
{
	update();
	draw();

}

function draw()
{
	context.clearRect(0, 0, CanvasWidth, CanvasHeight);
	background.draw();
	for (var i= 0; i < critter.length-1; i++)
	{
		critter[i].draw();
	}
	for (var i= 0; i < clownfish.length-1; i++)
	{
		clownfish[i].draw();
	}

	for (var i= 0; i < turtle.length-1; i++)
	{
		turtle[i].draw();
	}

}

function update()
{
	x++;
	y++;
	for (var i= 0; i < critter.length-1; i++)
	{
		critter[i].update();
	}
	for (var i= 0; i < clownfish.length-1; i++)
	{
		clownfish[i].update();
	}
	for (var i= 0; i < turtle.length-1; i++)
	{
		turtle[i].update();
	}
}

function Background()
{
	var obj= {};
	obj.draw= function(){
	context.clearRect(0, 0, CanvasWidth, CanvasHeight);

	var gradient= context.createLinearGradient(0, 0, 0, CanvasHeight);
	gradient.addColorStop(0, "#C0F5E7");
	gradient.addColorStop(0.8, "#3F43E7");
	gradient.addColorStop(0.81, "#AF8553");
	gradient.addColorStop(1.0, "#E6CBAB");
	context.fillStyle= gradient;
	context.fillRect(0, 0, CanvasWidth, CanvasHeight);


	};
	return obj;
}

function Critter()
{
	var obj= {};
	obj.x= (CanvasWidth * (2*Math.random() - 1)/2 ) + CanvasWidth/2;
	obj.y= (CanvasHeight * (2*Math.random() - 1)/2) + CanvasHeight/2;
	obj.vx= Math.random() * 2 - 1;
	obj.vy= Math.random() * 2 - 1;
	obj.sizeX= 200;
	obj.sizeY= 200;

	obj.image= new Image();
	obj.image.src= "images/fish.png";




	obj.update= function()
	{
		obj.x += obj.vx;
		obj.y += obj.vy;
		obj.bounds();
	};
	obj.draw= function()
	{

		if (obj.vx < 0)
		{
			context.save();
			context.scale(-1, 1);
			context.drawImage(obj.image, -obj.x, obj.y);
			context.restore();
		}
		else
			context.drawImage(obj.image, obj.x, obj.y);
	};


	obj.bounds= function()

	{

		if (obj.x > canvas.width)
		{
			obj.vx= obj.vx * -1;
		}
		if (obj.y > canvas.height)
		{
			obj.vy= obj.vy * -1;
		}
		if (obj.x < 0)
		{

			obj.vx= obj.vx * -1;
		}
		if (obj.y < 0)
		{
			obj.vy= obj.vy * -1;
		}
	};
	return obj;

}

function doKeyPress(evt)
{

  evt = evt || window.event;
  var keyCode = evt.keyCode;

  // Check for left arrow key

  if (keyCode == 37) {
    selection.vy= 0;
    //selction.vx= Math.random() * 2 - 1;

    if (selection.vx > 0){
    	selection.vx= selection.vx * -1;
    }
  }


  if (keyCode == 39) {
    selection.vy= 0;
    //selction.vx= Math.random() * 2 - 1;

    if (selection.vx < 0){
    	selection.vx= selection.vx * -1;
    }
  }


   if (keyCode == 38) {
   selection.vx= 0;
   //selction.vy= Math.random() * 2 - 1;
   if (selection.vy > 0){
    	selection.vy= selection.vy * -1;
    }
  }



  if (keyCode == 40) {
   selection.vx= 0;
   //selction.vy= Math.random() * 2 - 1;
   if (selection.vy < 0){
    	selection.vy= selection.vy * -1;
    }
  }
}

function ClownFish()
{
	var obj= {};
	obj.x= (CanvasWidth * (2*Math.random() - 1)/2 ) + CanvasWidth/2;
	obj.y= (CanvasHeight * (2*Math.random() - 1)/2) + CanvasHeight/2;
	obj.vx= Math.random() * 2 - 1;
	obj.vy= Math.random() * 2 - 1;
	obj.sizeX= 130;
	obj.sizeY= 130;

	obj.image= new Image();
	obj.image.src= "images/fish02.png";




	obj.update= function()
	{
		obj.x += obj.vx;
		obj.y += obj.vy;
		obj.bounds();
	};
	obj.draw= function()
	{

		if (obj.vx < 0)
		{
			context.save();
			context.scale(-1, 1);
			context.drawImage(obj.image, -obj.x, obj.y);
			context.restore();
		}
		else
			context.drawImage(obj.image, obj.x, obj.y);
	};


	obj.bounds= function()

	{

		if (obj.x > canvas.width)
		{
			obj.vx= obj.vx * -1;
		}
		if (obj.y > canvas.height)
		{
			obj.vy= obj.vy * -1;
		}
		if (obj.x < 0)
		{

			obj.vx= obj.vx * -1;
		}
		if (obj.y < 0)
		{
			obj.vy= obj.vy * -1;
		}
	};
	return obj;

}

function Turtle()
{
	var obj= {};
	obj.x= (CanvasWidth * (2*Math.random() - 1)/2 ) + CanvasWidth/2;
	obj.y= (CanvasHeight * (2*Math.random() - 1)/2) + CanvasHeight/2;
	obj.vx= Math.random() * 2 - 1;
	obj.vy= Math.random() * 2 - 1;
	obj.sizeX= 160;
	obj.sizeY= 160;

	obj.image= new Image();
	obj.image.src= "images/fish03.png";




	obj.update= function()
	{
		obj.x += obj.vx;
		obj.y += obj.vy;
		obj.bounds();
	};
	obj.draw= function()
	{

		if (obj.vx < 0)
		{
			context.save();
			context.scale(-1, 1);
			context.drawImage(obj.image, -obj.x, obj.y);
			context.restore();
		}
		else
			context.drawImage(obj.image, obj.x, obj.y);
	};


	obj.bounds= function()

	{

		if (obj.x > canvas.width)
		{
			obj.vx= obj.vx * -1;
		}
		if (obj.y > canvas.height)
		{
			obj.vy= obj.vy * -1;
		}
		if (obj.x < 0)
		{

			obj.vx= obj.vx * -1;
		}
		if (obj.y < 0)
		{
			obj.vy= obj.vy * -1;
		}
	};
	return obj;

}
