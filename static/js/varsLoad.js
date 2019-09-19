var preimg = new Image();
var animStat = 0 
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