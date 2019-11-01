
function getSecs(){
    var d = new Date();
	var t = d.getTime();
	return t
}
lastSec = getSecs()
function callsPerSecond(){ //My guess of how to calculate FPS
	fps = 1
	currMilis = (getSecs()-lastSec)
	newInter = false
	secCalls++
	if(currMilis <= 1000){
		fps = currMilis/secCalls
	}
	else{
		newInter = true
		lastSec = getSecs()
		fps = 1000/secCalls
		secCalls = 0
	}
	fps = parseFloat(fps.toFixed(2))
	if (fps>maxFPS && fps < 70)
		maxFPS = fps 
	// console.log("maxFPS: ", maxFPS, "FPS: ", fps,"currMilis: ", currMilis, "SecCalls: ", secCalls, "NewInter: ", newInter)
	// console.log("maxFPS: ", maxFPS, "FPS: ", fps)
	//Paint FPS On top corner
	topLeftX = canvas.width-65
	topLeftY = 20
	colorRect(topLeftX, topLeftY, 40, 20, '#4f4f4f')
	ctx.font = "15px Console";
	ctx.fillStyle = "lightgreen";
	ctx.textAlign = "left";
	ctx.fillText(fps,topLeftX , topLeftY+15);
	return fps
}
function drawCordenates(x, y){
	colorRect(x, y, 40, 20, '#4f4f4f')
	ctx.font = "15px Console";
	ctx.fillStyle = "lightgreen";
	ctx.textAlign = "left";
	ctx.fillText(x + ', ' + y , x, y+15);
}
function paintMap(tiles){
	for (var i = 0; i < tiles.length; i++) {
		// console.log("Tile ", i, tiles[i])
		y = canvas.height - tiles[i].y
		ctx.drawImage(tiles_img, tiles_imgs[tiles[i].tileType].x, 
	 				 tiles_imgs[tiles[i].tileType].y,
	 				 tiles_imgs[tiles[i].tileType].w,
	 				 tiles_imgs[tiles[i].tileType].h, 
	 				 tiles[i].x,
	 				 y,
	 				 tiles_imgs[tiles[i].tileType].w,
	 				 tiles_imgs[tiles[i].tileType].h,)
		drawCordenates(tiles[i].x, y)
	}
}

function paintPlayers(players){
	colorRect(0, 0, canvas.width, canvas.height, '#3CAEA3')// clear scr
	for (var p in players){
		// console.log(players[p])
		// console.log('PAINTING Player '+ players[p]['number'] + 'x: '+players[p]['x']+'y:'+players[p]['y'] )
		// console.log('colorCircle('+players[p]['x']+','+players[p]['y']+',30,'+players[p]['id']+')')
		// colorCircle(players[p]['x'], players[p]['y'], 30, 'blue', players[p].number)
		// ctx.drawImage(img,90,130,50,60,10,10,50,60)
		walk(players[p].number, players[p]['x'], players[p]['y'], players[p]['rotate'])
		// drawSprite(imgsJson.meta.image, 0,0,67,92, players[p]['x'], players[p]['y'],71,95)
		drawCordenates(players[p]['x'], players[p]['y']) // draw player cordenates
	}
	/*
	for (var j in json.frames){
		json.frames[j]
		drawSprite(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
	}*/
	callsPerSecond()

}
function ranColor(){
	var o = Math.round, r = Math.random, s = 255;
	return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function colorRect(topLeftX, topLeftY, boxWidth,boxHeight, fillColor){
	ctx.fillStyle = fillColor
	ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight)
}
function colorCircle(X, Y, radius, fillColor, text){
	ctx.fillStyle = fillColor
	ctx.beginPath()
	ctx.arc(X, Y, radius, 0, Math.PI * 2, true)
	ctx.fill()
	ctx.font = "30px Comic Sans MS"
	ctx.textAlign = "center";
	ctx.fillStyle = "red";
	ctx.fillText(text, X, Y+10);
}
function walk(animId, px, py, rotate=false) {
	if(animStat <= 10){
		instance = animStat
		drawSprite(imgsJson[animId].meta.image, 
			imgsJson[animId][instance].frame.x,
			imgsJson[animId][instance].frame.y,
			imgsJson[animId][instance].frame.w,
			imgsJson[animId][instance].frame.h, 
			px, py,
			imgsJson[animId][instance].sourceSize.w,
			imgsJson[animId][instance].sourceSize.h, 
			rotate)
		animStat +=1
	}else{
		animStat = 0
	}
}
var TO_RADIANS = Math.PI/180; 
function drawRotatedImage(image, x, y, angle) { 
 
	// save the current co-ordinate system 
	// before we screw with it
	context.save(); 
 
	// move to the middle of where we want to draw our image
	context.translate(x, y);
 
	// rotate around that point, converting our 
	// angle from degrees to radians 
	context.rotate(angle * TO_RADIANS);
 
	// draw it up and to the left by half the width
	// and height of the image 
	// context.drawImage(image, -(image.width/2), -(image.height/2)); //drawing being x,y the center of the img
	context.drawImage(image, image.width, image.height);
 
	// and restore the co-ords to how they were when we began
	context.restore(); 
}
function drawSprite(image, sx, sy, sWidth, sHeight, dx, dy, dWidth=0, dHeight=0,rotate=true) {
	// var imgg = new Image(image)
	// ctx.fill()
	dx -= (sWidth/2) 
	dy -= (sHeight/2) 
	var img = new Image();
	img.onload = function () {
		ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
	}
	img.src = image;
	
}