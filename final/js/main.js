var canvas;
var context;
var CanvasWidth = 0;
var CanvasHeight = 0;
var FPS = 60;
var x = 0;
var y = 0;
var background;
var critter = [];
var critter2 = [];
var critter3 = [];
var selection;

window.onload = init;
function init () {
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	CanvasWidth = canvas.width;
	CanvasHeight = canvas.height;

	var gradient = context.createLinearGradient(0, 0, 0, CanvasHeight);
	gradient.addColorStop(0.0, "#C0F5E7");
	gradient.addColorStop(0.8, "#3F43E7");
	gradient.addColorStop(0.81, "#AF8553");
	gradient.addColorStop(1.0, "#E6CBAB");
	context.fillStyle = gradient;
	context.fillRect(0, 0, CanvasWidth, CanvasHeight);

	setInterval(loop, 1000/FPS);

	background = new Background();

	 for(var i = 0; i < 8; i++) {
		 critter[i] = new Critter();
	 }

	 for(var i = 0; i < 8; i++) {
		 critter2[i] = new Critter2();
	 }

	 for(var i = 0; i < 8; i++) {
		 critter3[i] = new Critter3();
	 }

	U.addEvent(canvas, "click", doCritterClick);
	CanvasOffsetX = canvas.offsetLeft;
	CanvasOffsetY = canvas.offsetTop;

	canvas.setAttribute('tabindex', '1');
	canvas.focus();
	U.addEvent(canvas, "keydown", doKeyPress);
}

function doCritterClick(e) {
	var x = e.pageX - CanvasOffsetX;
	var y = e.pageY - CanvasOffsetY;

	for(var i = 0; i < critter.length - 1; i++) {
		var myCritter = critter[i];
		if(y > myCritter.y && y < myCritter.y + myCritter.sizeY && x > myCritter.x && x < myCritter.x + myCritter.sizeX) {
			selection = myCritter;
		}
	}

	for(var i = 0; i < critter2.length - 1; i++) {
		var myCritter2 = critter2[i];
		if(y > myCritter2.y && y < myCritter2.y + myCritter2.sizeY && x > myCritter2.x && x < myCritter2.x + myCritter2.sizeX) {
			selection = myCritter2;
		}
	}

	for(var i = 0; i < critter3.length - 1; i++) {
		var myCritter3 = critter3[i];
		if(y > myCritter3.y && y < myCritter3.y + myCritter3.sizeY && x > myCritter3.x && x < myCritter3.x + myCritter3.sizeX) {
			selection = myCritter3;
		}
	}

	selection.vx = 2 * Math.random() - 1;
	selection.vy = 2 * Math.random() - 1;
}

function doKeyPress(e) {
	if(selection != null) {
		var charCode = (typeof e.which == 'number') ? e.which : e.keyCode;
		if(String.fromCharCode(charCode) =="F") {
			if(Math.abs(selection.vx) < 3 && Math.abs(selection.vy) < 3) {
				selection.vx = selection.vx * 2;
				selection.vy = selection.vy * 2;
			}
		}
		if(String.fromCharCode(charCode) == "S") {
			if(Math.abs(selection.vx) > .1 && Math.abs(selection.vy) > .1) {
				selection.vx = selection.vx / 2;
				selection.vy = selection.vy / 2;
			}
		}
	}
}

function loop () {
	update();
	draw();
}

function draw () {
	context.clearRect(0, 0, CanvasWidth, CanvasHeight);
	background.draw();

	for(var i = 0; i < critter.length - 1; i++) {
		critter[i].draw();
	}

	for(var i = 0; i < critter2.length - 1; i++) {
		critter2[i].draw();
	}

	for(var i = 0; i < critter3.length - 1; i++) {
		critter3[i].draw();
	}
}

function update () {
	x++;
	y++;

	for(var i = 0; i < critter.length - 1; i++) {
		critter[i].update();
	}

	for(var i = 0; i < critter2.length - 1; i++) {
		critter2[i].update();
	}

	for(var i = 0; i < critter3.length - 1; i++) {
		critter3[i].update();
	}
}

function Background () {
	var obj = {};
	obj.draw = function () {
		context.clearRect(0, 0, CanvasWidth, CanvasHeight);
		var gradient = context.createLinearGradient(0, 0, 0, CanvasHeight);
		gradient.addColorStop(0.0, "#C0F5E7");
		gradient.addColorStop(0.8, "#3F43E7");
		gradient.addColorStop(0.81, "#AF8553");
		gradient.addColorStop(1.0, "#E6CBAB");
		context.fillStyle = gradient;
		context.fillRect(0, 0, CanvasWidth, CanvasHeight);
	};
	return obj;
}

function Critter () {
	var obj = {};
	obj.x = CanvasWidth/2 * (Math.random() * 2 - 1) + CanvasWidth/2;
	obj.y = CanvasHeight/2 * (Math.random() * 2 - 1) + CanvasHeight/2;
	obj.vx = Math.random() * 2 - 1;
	obj.vy = Math.random() * 2 - 1;
	obj.sizeX = 100;
	obj.sizeY = 100;
	obj.image = new Image();
	obj.image.src = "images/fish.png";
	obj.update = function () {
		obj.x += obj.vx;
		obj.y += obj.vy;
		obj.bounds();
	};
	obj.draw = function() {
		if(obj.vx < 0) {
			context.save();
			context.scale(-1, 1);
			context.drawImage(obj.image, -obj.x, obj.y);
			context.restore();
		} else {
			context.drawImage(obj.image, obj.x, obj.y);
		}
	};
	obj.bounds = function() {
		if(obj.x > CanvasWidth) {
			obj.vx = obj.vx * -1;
		}
		if (obj.x < 0) {
			obj.vx = obj.vx * -1;
		}
		if (obj.y > CanvasHeight) {
			obj.vy = obj.vy * -1;
		}
		if (obj.y < 0) {
			obj.vy = obj.vy * -1;
		}
	};
	return obj;
}

function Critter2 () {
	var obj = {};
	obj.x = CanvasWidth/2 * (Math.random() * 2 - 1) + CanvasWidth/2;
	obj.y = CanvasHeight/2 * (Math.random() * 2 - 1) + CanvasHeight/2;
	obj.vx = Math.random() * 2 - 1;
	obj.vy = Math.random() * 2 - 1;
	obj.sizeX = 100;
	obj.sizeY = 100;
	obj.image = new Image();
	obj.image.src = "images/fish2.png";
	obj.update = function () {
		obj.x += obj.vx;
		obj.y += obj.vy;
		obj.bounds();
	};
	obj.draw = function() {
		if(obj.vx < 0) {
			context.save();
			context.scale(-1, 1);
			context.drawImage(obj.image, -obj.x, obj.y);
			context.restore();
		} else {
			context.drawImage(obj.image, obj.x, obj.y);
		}
	};
	obj.bounds = function() {
		if(obj.x > CanvasWidth) {
			obj.vx = obj.vx * -1;
		}
		if (obj.x < 0) {
			obj.vx = obj.vx * -1;
		}
		if (obj.y > CanvasHeight) {
			obj.vy = obj.vy * -1;
		}
		if (obj.y < 0) {
			obj.vy = obj.vy * -1;
		}
	};
	return obj;
}

function Critter3 () {
	var obj = {};
	obj.x = CanvasWidth/2 * (Math.random() * 2 - 1) + CanvasWidth/2;
	obj.y = CanvasHeight/2 * (Math.random() * 2 - 1) + CanvasHeight/2;
	obj.vx = Math.random() * 2 - 1;
	obj.vy = Math.random() * 2 - 1;
	obj.sizeX = 100;
	obj.sizeY = 100;
	obj.image = new Image();
	obj.image.src = "images/fish3.png";
	obj.update = function () {
		obj.x += obj.vx;
		obj.y += obj.vy;
		obj.bounds();
	};
	obj.draw = function() {
		if(obj.vx < 0) {
			context.save();
			context.scale(-1, 1);
			context.drawImage(obj.image, -obj.x, obj.y);
			context.restore();
		} else {
			context.drawImage(obj.image, obj.x, obj.y);
		}
	};
	obj.bounds = function() {
		if(obj.x > CanvasWidth) {
			obj.vx = obj.vx * -1;
		}
		if (obj.x < 0) {
			obj.vx = obj.vx * -1;
		}
		if (obj.y > CanvasHeight) {
			obj.vy = obj.vy * -1;
		}
		if (obj.y < 0) {
			obj.vy = obj.vy * -1;
		}
	};
	return obj;
}
