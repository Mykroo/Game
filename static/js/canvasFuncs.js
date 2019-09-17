//controller section
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var KeyboardHelper = { left: 37, up: 38, right: 39, down: 40 };

function keyDownHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = true;
    }
    else if(event.keyCode == 37) {
        leftPressed = true;
    }
    if(event.keyCode == 40) {
    	downPressed = true;
    }
    else if(event.keyCode == 38) {
    	upPressed = true;
    }
}

//END controller 


// Measuring FPS
const times = [];
let fps;
function refreshLoop() {
  window.requestAnimationFrame(() => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    refreshLoop();
  });
}
refreshLoop();
// END FPS

function paintPlayers(players){
	console.log('fps: '+fps)
	colorRect(0, 0, canvas.width, canvas.height, 'cyan')// clear scr
	for (var p in players){
		if (!PLAYER_COLORS[players[p]['id']])
			PLAYER_COLORS[players[p]['id']] = ranColor();
		console.log(players[p])
		console.log('PAINTING Player '+ players[p]['number'] + 'x: '+players[p]['x']+'y:'+players[p]['y'] )
		// console.log('colorCircle('+players[p]['x']+','+players[p]['y']+',30,'+players[p]['id']+')')
		colorCircle(players[p]['x'], players[p]['y'], 30, PLAYER_COLORS[players[p]['id']])

	}
}
function ranColor(){
	var o = Math.round, r = Math.random, s = 255;
	return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function colorRect(topLeftX, topLeftY, boxWidth,boxHeight, fillColor){
	ctx.fillStyle = fillColor
	ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight)
}
function colorCircle(X, Y, radius, fillColor){
	ctx.fillStyle = fillColor
	ctx.beginPath()
	ctx.arc(X, Y, radius, 0, Math.PI * 2, true)
	ctx.fill()
}