var GAME = {};

GAME.KEEPER = {
		XPOSITION:80,
		YPOSITION:80
};
GAME.MOLE_XPOSITION = [[180,true],
                     [230,true],
                     [280,true],
                     [320,true],
                     [370,true],
                     [420,true],
                     [460,true]
];
//keys
GAME.KEYS = [];

//level
GAME.LEVEL = 0;

//life
GAME.LIFE = 4;

//score
GAME.SCORE = 0;

//score
GAME.MOLECOUNT = 0;

//sound
GAME.SOUND = true;

//mode
GAME.EASYMODE = true;

//container
GAME.CONTAINER = {
		EXPLOSIONS:[],
		MOLES:[],
		HAMMERS:[]
};

var g_hideSpritePos = cc.p( -10, -10);
var g_hideMolePos = cc.p( 120, 290);