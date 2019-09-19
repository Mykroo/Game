
// // Measuring FPS
// const times = [];
// let fps;
// function refreshLoop() {
//   window.requestAnimationFrame(() => {
//     const now = performance.now();
//     while (times.length > 0 && times[0] <= now - 1000) {
//       times.shift();
//     }
//     times.push(now);
//     fps = times.length;
//     refreshLoop();
//   });
// }
// refreshLoop();
// END FPS
function getSecs(){
    var d = new Date();
	var t = d.getTime();
	return t
}
var secCalls = 0
var lastSec = getSecs()
var maxFPS = 0

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

function paintPlayers(players){
	colorRect(0, 0, canvas.width, canvas.height, '#3CAEA3')// clear scr
	for (var p in players){
		// console.log(players[p])
		// console.log('PAINTING Player '+ players[p]['number'] + 'x: '+players[p]['x']+'y:'+players[p]['y'] )
		// console.log('colorCircle('+players[p]['x']+','+players[p]['y']+',30,'+players[p]['id']+')')
		colorCircle(players[p]['x'], players[p]['y'], 30, 'blue', players[p].number)
	callsPerSecond()

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