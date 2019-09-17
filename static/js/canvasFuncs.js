var ballX=75, ballY=20, ballSize=10, up = true, front= true
var xSpeed = 0
var ySpeed = 0
// canvas = document.getElementById('gameCanvas')
// ctx/ = canvas.getContext('2d')
window.onload = function(){
	var framesPerSec = 60
	// setInterval(updateAll, 1000/framesPerSec) // means 30 time per second 
}
function updateAll(){
	colorRect(0, 0, canvas.width, canvas.height, 'cyan')// clear scr
	
	colorCircle(ballX, ballY, ballSize, 'blue')
				
	ballX += xSpeed
	ballY += ySpeed
	if(ballX >= canvas.width || ballX < 0){
		xSpeed *= -1
	}			
	if(ballY >= canvas.height || ballY < 0){
		ySpeed *= -1
	}
}
function colorRect(topLeftX, topLeftY, boxWidth,boxHeight, fillColor){
	canvContext.fillStyle = fillColor
	canvContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight)
}
function colorCircle(centX, centY, radius, fillColor){
	canvContext.fillStyle = fillColor
	canvContext.beginPath()
	canvContext.arc(ballX, ballY, ballSize, 0, Math.PI * 2, true)
	canvContext.fill()
}