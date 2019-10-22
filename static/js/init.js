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
var tiles_imgs = {
	"box": {"x":0, "y":864, "w":70, "h":70},
	"boxAlt": {"x":0, "y":792, "w":70, "h":70},
	"boxCoin": {"x":0, "y":720, "w":70, "h":70},
	"boxCoinAlt": {"x":0, "y":576, "w":70, "h":70},
	"boxCoinAlt_disabled": {"x":0, "y":504, "w":70, "h":70},
	"boxCoin_disabled": {"x":0, "y":648, "w":70, "h":70},
	"boxEmpty": {"x":0, "y":432, "w":70, "h":70},
	"boxExplosive": {"x":0, "y":360, "w":70, "h":70},
	"boxExplosiveAlt": {"x":0, "y":216, "w":70, "h":70},
	"boxExplosive_disabled": {"x":0, "y":288, "w":70, "h":70},
	"boxItem": {"x":0, "y":144, "w":70, "h":70},
	"boxItemAlt": {"x":0, "y":0, "w":70, "h":70},
	"boxItemAlt_disabled": {"x":432, "y":432, "w":70, "h":70},
	"boxItem_disabled": {"x":0, "y":72, "w":70, "h":70},
	"boxWarning": {"x":72, "y":648, "w":70, "h":70},
	"brickWall": {"x":216, "y":0, "w":70, "h":70},
	"bridge": {"x":216, "y":72, "w":70, "h":70},
	"bridgeLogs": {"x":288, "y":720, "w":70, "h":70},
	"castle": {"x":288, "y":792, "w":70, "h":70},
	"castleCenter": {"x":504, "y":288, "w":70, "h":70},
	"castleCenter_rounded": {"x":504, "y":720, "w":70, "h":70},
	"castleCliffLeft": {"x":504, "y":792, "w":70, "h":70},
	"castleCliffLeftAlt": {"x":648, "y":720, "w":70, "h":70},
	"castleCliffRight": {"x":648, "y":792, "w":70, "h":70},
	"castleCliffRightAlt": {"x":792, "y":288, "w":70, "h":70},
	"castleHalf": {"x":792, "y":360, "w":70, "h":70},
	"castleHalfLeft": {"x":432, "y":720, "w":70, "h":70},
	"castleHalfMid": {"x":648, "y":648, "w":70, "h":70},
	"castleHalfRight": {"x":792, "y":648, "w":70, "h":70},
	"castleHillLeft": {"x":648, "y":576, "w":70, "h":70},
	"castleHillLeft2": {"x":792, "y":576, "w":70, "h":70},
	"castleHillRight": {"x":792, "y":504, "w":70, "h":70},
	"castleHillRight2": {"x":792, "y":432, "w":70, "h":70},
	"castleLedgeLeft": {"x":856, "y":868, "w":5, "h":22},
	"castleLedgeRight": {"x":842, "y":868, "w":5, "h":22},
	"castleLeft": {"x":792, "y":216, "w":70, "h":70},
	"castleMid": {"x":792, "y":144, "w":70, "h":70},
	"castleRight": {"x":792, "y":72, "w":70, "h":70},
	"dirt": {"x":792, "y":0, "w":70, "h":70},
	"dirtCenter": {"x":720, "y":864, "w":70, "h":70},
	"dirtCenter_rounded": {"x":720, "y":792, "w":70, "h":70},
	"dirtCliffLeft": {"x":720, "y":720, "w":70, "h":70},
	"dirtCliffLeftAlt": {"x":720, "y":648, "w":70, "h":70},
	"dirtCliffRight": {"x":720, "y":576, "w":70, "h":70},
	"dirtCliffRightAlt": {"x":720, "y":504, "w":70, "h":70},
	"dirtHalf": {"x":720, "y":432, "w":70, "h":70},
	"dirtHalfLeft": {"x":720, "y":360, "w":70, "h":70},
	"dirtHalfMid": {"x":720, "y":288, "w":70, "h":70},
	"dirtHalfRight": {"x":720, "y":216, "w":70, "h":70},
	"dirtHillLeft": {"x":720, "y":144, "w":70, "h":70},
	"dirtHillLeft2": {"x":720, "y":72, "w":70, "h":70},
	"dirtHillRight": {"x":720, "y":0, "w":70, "h":70},
	"dirtHillRight2": {"x":648, "y":864, "w":70, "h":70},
	"dirtLedgeLeft": {"x":842, "y":892, "w":5, "h":18},
	"dirtLedgeRight": {"x":842, "y":912, "w":5, "h":18},
	"dirtLeft": {"x":504, "y":432, "w":70, "h":70},
	"dirtMid": {"x":504, "y":360, "w":70, "h":70},
	"dirtRight": {"x":648, "y":504, "w":70, "h":70},
	"door_closedMid": {"x":648, "y":432, "w":70, "h":70},
	"door_closedTop": {"x":648, "y":360, "w":70, "h":70},
	"door_openMid": {"x":648, "y":288, "w":70, "h":70},
	"door_openTop": {"x":648, "y":216, "w":70, "h":70},
	"fence": {"x":648, "y":144, "w":70, "h":70},
	"fenceBroken": {"x":648, "y":72, "w":70, "h":70},
	"grass": {"x":648, "y":0, "w":70, "h":70},
	"grassCenter": {"x":576, "y":864, "w":70, "h":70},
	"grassCenter_rounded": {"x":576, "y":792, "w":70, "h":70},
	"grassCliffLeft": {"x":576, "y":720, "w":70, "h":70},
	"grassCliffLeftAlt": {"x":576, "y":648, "w":70, "h":70},
	"grassCliffRight": {"x":576, "y":576, "w":70, "h":70},
	"grassCliffRightAlt": {"x":576, "y":504, "w":70, "h":70},
	"grassHalf": {"x":576, "y":432, "w":70, "h":70},
	"grassHalfLeft": {"x":576, "y":360, "w":70, "h":70},
	"grassHalfMid": {"x":576, "y":288, "w":70, "h":70},
	"grassHalfRight": {"x":576, "y":216, "w":70, "h":70},
	"grassHillLeft": {"x":576, "y":144, "w":70, "h":70},
	"grassHillLeft2": {"x":576, "y":72, "w":70, "h":70},
	"grassHillRight": {"x":576, "y":0, "w":70, "h":70},
	"grassHillRight2": {"x":504, "y":864, "w":70, "h":70},
	"grassLedgeLeft": {"x":849, "y":868, "w":5, "h":24},
	"grassLedgeRight": {"x":849, "y":894, "w":5, "h":24},
	"grassLeft": {"x":504, "y":648, "w":70, "h":70},
	"grassMid": {"x":504, "y":576, "w":70, "h":70},
	"grassRight": {"x":504, "y":504, "w":70, "h":70},
	"hill_large": {"x":842, "y":720, "w":48, "h":146},
	"hill_largeAlt": {"x":864, "y":0, "w":48, "h":146},
	"hill_small": {"x":792, "y":828, "w":48, "h":106},
	"hill_smallAlt": {"x":792, "y":720, "w":48, "h":106},
	"ladder_mid": {"x":504, "y":144, "w":70, "h":70},
	"ladder_top": {"x":504, "y":72, "w":70, "h":70},
	"liquidLava": {"x":504, "y":0, "w":70, "h":70},
	"liquidLavaTop": {"x":432, "y":864, "w":70, "h":70},
	"liquidLavaTop_mid": {"x":432, "y":792, "w":70, "h":70},
	"liquidWater": {"x":504, "y":216, "w":70, "h":70},
	"liquidWaterTop": {"x":432, "y":648, "w":70, "h":70},
	"liquidWaterTop_mid": {"x":432, "y":576, "w":70, "h":70},
	"lock_blue": {"x":432, "y":504, "w":70, "h":70},
	"lock_green": {"x":72, "y":576, "w":70, "h":70},
	"lock_red": {"x":432, "y":360, "w":70, "h":70},
	"lock_yellow": {"x":432, "y":288, "w":70, "h":70},
	"rockHillLeft": {"x":432, "y":216, "w":70, "h":70},
	"rockHillRight": {"x":432, "y":144, "w":70, "h":70},
	"ropeAttached": {"x":432, "y":72, "w":70, "h":70},
	"ropeHorizontal": {"x":432, "y":0, "w":70, "h":70},
	"ropeVertical": {"x":360, "y":864, "w":70, "h":70},
	"sand": {"x":360, "y":792, "w":70, "h":70},
	"sandCenter": {"x":576, "y":864, "w":70, "h":70},
	"sandCenter_rounded": {"x":576, "y":792, "w":70, "h":70},
	"sandCliffLeft": {"x":360, "y":720, "w":70, "h":70},
	"sandCliffLeftAlt": {"x":360, "y":648, "w":70, "h":70},
	"sandCliffRight": {"x":360, "y":576, "w":70, "h":70},
	"sandCliffRightAlt": {"x":360, "y":504, "w":70, "h":70},
	"sandHalf": {"x":360, "y":432, "w":70, "h":70},
	"sandHalfLeft": {"x":360, "y":360, "w":70, "h":70},
	"sandHalfMid": {"x":360, "y":288, "w":70, "h":70},
	"sandHalfRight": {"x":360, "y":216, "w":70, "h":70},
	"sandHillLeft": {"x":360, "y":144, "w":70, "h":70},
	"sandHillLeft2": {"x":360, "y":72, "w":70, "h":70},
	"sandHillRight": {"x":360, "y":0, "w":70, "h":70},
	"sandHillRight2": {"x":288, "y":864, "w":70, "h":70},
	"sandLedgeLeft": {"x":856, "y":892, "w":5, "h":18},
	"sandLedgeRight": {"x":856, "y":912, "w":5, "h":18},
	"sandLeft": {"x":288, "y":648, "w":70, "h":70},
	"sandMid": {"x":288, "y":576, "w":70, "h":70},
	"sandRight": {"x":288, "y":504, "w":70, "h":70},
	"sign": {"x":288, "y":432, "w":70, "h":70},
	"signExit": {"x":288, "y":360, "w":70, "h":70},
	"signLeft": {"x":288, "y":288, "w":70, "h":70},
	"signRight": {"x":288, "y":216, "w":70, "h":70},
	"snow": {"x":288, "y":144, "w":70, "h":70},
	"snowCenter": {"x":720, "y":864, "w":70, "h":70},
	"snowCenter_rounded": {"x":288, "y":72, "w":70, "h":70},
	"snowCliffLeft": {"x":288, "y":0, "w":70, "h":70},
	"snowCliffLeftAlt": {"x":216, "y":864, "w":70, "h":70},
	"snowCliffRight": {"x":216, "y":792, "w":70, "h":70},
	"snowCliffRightAlt": {"x":216, "y":720, "w":70, "h":70},
	"snowHalf": {"x":216, "y":648, "w":70, "h":70},
	"snowHalfLeft": {"x":216, "y":576, "w":70, "h":70},
	"snowHalfMid": {"x":216, "y":504, "w":70, "h":70},
	"snowHalfRight": {"x":216, "y":432, "w":70, "h":70},
	"snowHillLeft": {"x":216, "y":360, "w":70, "h":70},
	"snowHillLeft2": {"x":216, "y":288, "w":70, "h":70},
	"snowHillRight": {"x":216, "y":216, "w":70, "h":70},
	"snowHillRight2": {"x":216, "y":144, "w":70, "h":70},
	"snowLedgeLeft": {"x":863, "y":868, "w":5, "h":18},
	"snowLedgeRight": {"x":863, "y":888, "w":5, "h":18},
	"snowLeft": {"x":144, "y":864, "w":70, "h":70},
	"snowMid": {"x":144, "y":792, "w":70, "h":70},
	"snowRight": {"x":144, "y":720, "w":70, "h":70},
	"stone": {"x":144, "y":648, "w":70, "h":70},
	"stoneCenter": {"x":144, "y":576, "w":70, "h":70},
	"stoneCenter_rounded": {"x":144, "y":504, "w":70, "h":70},
	"stoneCliffLeft": {"x":144, "y":432, "w":70, "h":70},
	"stoneCliffLeftAlt": {"x":144, "y":360, "w":70, "h":70},
	"stoneCliffRight": {"x":144, "y":288, "w":70, "h":70},
	"stoneCliffRightAlt": {"x":144, "y":216, "w":70, "h":70},
	"stoneHalf": {"x":144, "y":144, "w":70, "h":70},
	"stoneHalfLeft": {"x":144, "y":72, "w":70, "h":70},
	"stoneHalfMid": {"x":144, "y":0, "w":70, "h":70},
	"stoneHalfRight": {"x":72, "y":864, "w":70, "h":70},
	"stoneHillLeft2": {"x":72, "y":792, "w":70, "h":70},
	"stoneHillRight2": {"x":72, "y":720, "w":70, "h":70},
	"stoneLedgeLeft": {"x":863, "y":908, "w":5, "h":24},
	"stoneLedgeRight": {"x":864, "y":148, "w":5, "h":24},
	"stoneLeft": {"x":72, "y":504, "w":70, "h":70},
	"stoneMid": {"x":72, "y":432, "w":70, "h":70},
	"stoneRight": {"x":72, "y":360, "w":70, "h":70},
	"stoneWall": {"x":72, "y":288, "w":70, "h":70},
	"tochLit": {"x":72, "y":216, "w":70, "h":70},
	"tochLit2": {"x":72, "y":144, "w":70, "h":70},
	"torch": {"x":72, "y":72, "w":70, "h":70},
	"window": {"x":72, "y":0, "w":70, "h":70}
}
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
var tiles_img = new Image()
tiles_img.src = "static/assets/Tiles/tiles_spritesheet.png"

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
				// console.log(data)
				allJson = JSON.parse(data)
				// console.log(allJson)
				paintPlayers(allJson.players)
				// console.log(data)
			});
			socket.on('mapUpdt',function(data){
				// console.log(JSON.parse(data))
				console.log(data)
				// jsss = JSON.parse(data)
				// console.log(jsss)
				// paintPlayers(data)
				// console.log(data)
			});
			function sendMsg() {
				data = {"msg": $('#myMess').val(), "senderId": sid}
				console.log('Sending msg: ' + data.msg )
				socket.send(data.msg);
				$('#myMess').val('');
			}
			$('#sendBtn').on('click', function(){
				sendMsg();
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
			    else if(event.keyCode == 13) { 
			        sendMsg();
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