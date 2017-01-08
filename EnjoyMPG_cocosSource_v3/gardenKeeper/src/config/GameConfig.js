var GM = GM || {};

GM.KEEPER = {
		XPOSITION:80,
		YPOSITION:80
};
GM.MOLE_XPOSITION = [[180,true],
                     [230,true],
                     [280,true],
                     [320,true],
                     [370,true],
                     [420,true],
                     [460,true]
];
//keys
GM.KEYS = [];

//level
GM.LEVEL = 0;

//life
GM.LIFE = 4;

//score
GM.SCORE = 0;

//score
GM.MOLECOUNT = 0;

//sound
GM.SOUND = true;

//mode
GM.EASYMODE = true;

//container
GM.CONTAINER = {
		EXPLOSIONS:[],
		MOLES:[],
		HAMMERS:[]
};

var g_hideSpritePos = cc.p( -10, -10);
var g_hideMolePos = cc.p( 120, 290);