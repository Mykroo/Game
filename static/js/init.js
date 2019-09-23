console.log('init...')
var secCalls = 0
var lastSec;
var maxFPS = 0

var PLAYER_COLORS = {};
var sid;
var p_num;
var canvas;
var ctx;
var ctx2;
var preimg = new Image();
var animStat = 0
var tiles_sprites = {}
var tiles_imgs = {}
var imgsJson =[{
	"0":
	{
		"frame": {"x":0,"y":0,"w":67,"h":92},
		"spriteSourceSize": {"x":4,"y":5,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"1":
	{
		"frame": {"x":67,"y":0,"w":66,"h":93},
		"spriteSourceSize": {"x":5,"y":4,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"2":
	{
		"frame": {"x":133,"y":0,"w":67,"h":92},
		"spriteSourceSize": {"x":5,"y":3,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"3":
	{
		"frame": {"x":0,"y":93,"w":67,"h":93},
		"spriteSourceSize": {"x":6,"y":1,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"4":
	{
		"frame": {"x":67,"y":93,"w":66,"h":93},
		"spriteSourceSize": {"x":7,"y":0,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"5":
	{
		"frame": {"x":133,"y":93,"w":71,"h":92},
		"spriteSourceSize": {"x":2,"y":0,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"6":
	{
		"frame": {"x":0,"y":186,"w":71,"h":93},
		"spriteSourceSize": {"x":2,"y":0,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"7":
	{
		"frame": {"x":71,"y":186,"w":71,"h":93},
		"spriteSourceSize": {"x":1,"y":2,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"8":
	{
		"frame": {"x":142,"y":186,"w":70,"h":93},
		"spriteSourceSize": {"x":1,"y":3,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"9":
	{
		"frame": {"x":0,"y":279,"w":71,"h":93},
		"spriteSourceSize": {"x":0,"y":4,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"10":
	{
		"frame": {"x":71,"y":279,"w":67,"h":92},
		"spriteSourceSize": {"x":4,"y":5,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"meta": {
		"app": "Adobe Flash CS6",
		"version": "12.0.2.529",
		"image": "static/Player/p1_walk/p1_walk.png",
		"format": "RGBA8888",
		"size": {"w":256,"h":512},
		"scale": "1"
	}
}
,
{	"0":
	{
		"frame": {"x":0,"y":0,"w":67,"h":92},
		"spriteSourceSize": {"x":2,"y":3,"w":71,"h":95},
		"sourceSize": {"w":71,"h":95}
	},
	"1":
	{
		"frame": {"x":67,"y":0,"w":66,"h":93},
		"spriteSourceSize": {"x":3,"y":2,"w":71,"h":95},
		"sourceSize": {"w":71,"h":95}
	},
	"2":
	{
		"frame": {"x":133,"y":0,"w":66,"h":91},
		"spriteSourceSize": {"x":4,"y":2,"w":71,"h":95},
		"sourceSize": {"w":71,"h":95}
	},
	"3":
	{
		"frame": {"x":0,"y":93,"w":67,"h":91},
		"spriteSourceSize": {"x":4,"y":1,"w":71,"h":95},
		"sourceSize": {"w":71,"h":95}
	},
	"4":
	{
		"frame": {"x":67,"y":93,"w":66,"h":91},
		"spriteSourceSize": {"x":5,"y":0,"w":71,"h":95},
		"sourceSize": {"w":71,"h":95}
	},
	"5":
	{
		"frame": {"x":133,"y":93,"w":69,"h":90},
		"spriteSourceSize": {"x":2,"y":0,"w":71,"h":95},
		"sourceSize": {"w":71,"h":95}
	},
	"6":
	{
		"frame": {"x":0,"y":184,"w":69,"h":91},
		"spriteSourceSize": {"x":2,"y":0,"w":71,"h":95},
		"sourceSize": {"w":71,"h":95}
	},
	"7":
	{
		"frame": {"x":69,"y":184,"w":69,"h":92},
		"spriteSourceSize": {"x":1,"y":1,"w":71,"h":95},
		"sourceSize": {"w":71,"h":95}
	},
	"8":
	{
		"frame": {"x":138,"y":184,"w":68,"h":92},
		"spriteSourceSize": {"x":1,"y":2,"w":71,"h":95},
		"sourceSize": {"w":71,"h":95}
	},
	"9":
	{
		"frame": {"x":0,"y":276,"w":69,"h":93},
		"spriteSourceSize": {"x":0,"y":2,"w":71,"h":95},
		"sourceSize": {"w":71,"h":95}
	},
	"10":
	{
		"frame": {"x":69,"y":276,"w":67,"h":92},
		"spriteSourceSize": {"x":2,"y":3,"w":71,"h":95},
		"sourceSize": {"w":71,"h":95}
	},
	"meta": {
		"app": "Adobe Flash CS6",
		"version": "12.0.2.529",
		"image": "static/Player/p2_walk/p2_walk.png",
		"format": "RGBA8888",
		"size": {"w":256,"h":512},
		"scale": "1"
	}
},
{
	"0":
	{
		"frame": {"x":0,"y":0,"w":66,"h":92},
		"spriteSourceSize": {"x":5,"y":5,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"1":
	{
		"frame": {"x":66,"y":0,"w":66,"h":93},
		"spriteSourceSize": {"x":5,"y":4,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"2":
	{
		"frame": {"x":132,"y":0,"w":66,"h":93},
		"spriteSourceSize": {"x":6,"y":2,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"3":
	{
		"frame": {"x":0,"y":93,"w":66,"h":93},
		"spriteSourceSize": {"x":6,"y":1,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"4":
	{
		"frame": {"x":66,"y":93,"w":66,"h":93},
		"spriteSourceSize": {"x":7,"y":0,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"5":
	{
		"frame": {"x":132,"y":93,"w":71,"h":92},
		"spriteSourceSize": {"x":2,"y":0,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"6":
	{
		"frame": {"x":0,"y":186,"w":71,"h":93},
		"spriteSourceSize": {"x":2,"y":0,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"7":
	{
		"frame": {"x":71,"y":186,"w":71,"h":93},
		"spriteSourceSize": {"x":1,"y":2,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"8":
	{
		"frame": {"x":142,"y":186,"w":70,"h":92},
		"spriteSourceSize": {"x":1,"y":4,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"9":
	{
		"frame": {"x":0,"y":279,"w":71,"h":93},
		"spriteSourceSize": {"x":0,"y":4,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"10":
	{
		"frame": {"x":71,"y":279,"w":66,"h":92},
		"spriteSourceSize": {"x":5,"y":5,"w":73,"h":97},
		"sourceSize": {"w":73,"h":97}
	},
	"meta": {
		"app": "Adobe Flash CS6",
		"version": "12.0.2.529",
		"image": "static/Player/p3_walk/p3_walk.png",
		"format": "RGBA8888",
		"size": {"w":256,"h":512},
		"scale": "1"
	}
}
]
var enemie_sprites = {
						"blockerBody": [{"x": 203, "y": 0, "w": 51, "h": 51},
										{"x": 136, "y": 66, "w": 51, "h": 51},
										{"x": 188, "y": 66, "w": 51, "h": 51}],
						"fishDead": [{"x": 0, "y": 69, "w": 66, "h": 42}],
						"fishSwim": [{"x": 76, "y": 0, "w": 66, "h": 42},
									{"x": 73, "y": 43, "w": 62, "h": 43}],
						"flyDead": [{"x": 143, "y": 0, "w": 59, "h": 33}],
						"flyFly": [{"x": 0, "y": 32, "w": 72, "h": 36},
							  		{"x": 0, "y": 0, "w": 75, "h": 31}],
						"poker": [{"x": 255, "y": 0, "w": 48, "h": 146},
							 		{"x": 304, "y": 0, "w": 48, "h": 146}],
						"slimeDead": [{"x": 0, "y": 112, "w": 59, "h": 12}],
						"slimeWalk": [{"x": 52, "y": 125, "w": 50, "h": 28},
										{"x": 0, "y": 125, "w": 51, "h": 26}],
						"snailShell": [{"x": 103, "y": 119, "w": 44, "h": 30}],
						"snailShell_upsidedown": [{"x": 148, "y": 118, "w": 44, "h": 30}],
						"snailWalk": [{"x": 143, "y": 34, "w": 54, "h": 31},
										{"x": 67, "y": 87, "w": 57, "h": 31}]
					}
var enemies_img = new Image()
enemies_img.src = "static/assets/Enemy/enemies_spritesheet.png"

for(var i = 0; i < imgsJson.length; i++){ // adding image to prevent flickering
	img = new Image(imgsJson[i].meta.image)
	console.log('Loading image ',imgsJson[i].meta.image, i)
	imgsJson[i].bufImage = img
	imgsJson[i].bufImage.src =imgsJson[i].meta.image 
}

function network(){
			canvas = $('#gameCanvas')[0]
			ctx = canvas.getContext('2d')
			var socket = io.connect(window.location.origin); // geting ip/ hostname'http://192.168.1.116:5000');

			// socket.on('connect', function(){
			// 	socket.send('User has been connected!!!');
			// });

			socket.on('message', function(msg){
				$("#messages").append("New : "+msg+'\n')
				console.log('Receiveeed  ', msg)
			});
			socket.on('connected', function(data){
				// $("#messages").append('<li>'+msg+'</li>')
				sid = data.id
				p_num = data.number
				console.log('Player: ' + sid +' '+ p_num)
				$('#playerData').html('Player: ' + sid.slice(0,6) +' Number: ' + p_num)
				console.log('Player data:', data)//.id, "Player Number:", data.number)
			});

			socket.on('newPos',function(data){
				// console.log(JSON.parse(data))
				paintPlayers(JSON.parse(data))
			});

			$('#sendBtn').on('click', function(){
				data = {"msg": $('#myMess').val(), "senderId": sid}
				console.log('Sending msg: ' + data.msg )
				socket.send(data.msg);
			});

			$('#TICKSBtn').on('click', function(){
				socket.send('TICKS');
			})

			document.onkeydown = function(event) {
			    if(event.keyCode == 39) {
			        socket.emit('keyPress',{"key": "right", "status": true})
			    }
			    else if(event.keyCode == 40) {
			        socket.emit('keyPress',{"key": "down", "status": true})
			    }
			    else if(event.keyCode == 37) {
			        socket.emit('keyPress',{"key": "left", "status": true})
			    }
			    else if(event.keyCode == 38) {
			        socket.emit('keyPress',{"key": "up", "status": true})
			    }
			    
			}
			document.onkeyup = function(event) {
			    if(event.keyCode == 39) {
			        socket.emit('keyPress',{"key": "right", "status": false})
			    }
			    else if(event.keyCode == 40) {
			        socket.emit('keyPress',{"key": "down", "status": false})
			    }
			    else if(event.keyCode == 37) {
			        socket.emit('keyPress',{"key": "left", "status": false})
			    }
			    else if(event.keyCode == 38) {
			        socket.emit('keyPress',{"key": "up", "status": false})
			    }
			}

			canvas.addEventListener("touchstart", function(event) {
				// document.getElementById("demo").innerHTML = "Hello World";
				// console.log("New touch : ", event)
		     	socket.emit('keyPress',{"key": "right", "status": true})
				// $("#messages").append("New touch : ",msg)
			});
			canvas.addEventListener("touchend", function(event) {
				// document.getElementById("demo").innerHTML = "Hello World";
				// console.log("New touch : ", event)
		     	socket.emit('keyPress',{"key": "right", "status": false})
				// $("#messages").append("New touch : ",msg)
			});


		}