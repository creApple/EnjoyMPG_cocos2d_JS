var GAME = {};

//keys
GAME.KEYS = [];

//level
GAME.LEVEL = 0;

//score
GAME.SCORE = 0;

//life
GAME.LIFE = 4;

//BLOCK COUNT
GAME.BLOCKCOUNT = 0;

//sound
GAME.SOUND = true;

//mode
GAME.HARDMODE = false;

//life up sorce
GAME.MAP_STAGE1 = [0,0,0,0,0,0,0,0,0,0,
                                         0,1,1,1,1,1,1,1,1,0,
                                         0,2,0,0,2,2,0,0,2,0,
                                         0,2,2,2,2,2,2,2,2,0,
                                         0,2,2,2,2,2,2,2,2,0,
                                         0,3,0,0,3,3,0,0,3,0,
                                         0,3,3,3,3,3,3,3,3,0,
                                         0,3,3,3,3,3,3,3,3,0,
                                         0,4,0,0,4,4,0,0,4,0,
                                         0,4,4,4,4,4,4,4,4,0];

GAME.MAP_STAGE2 = [0,0,0,0,0,0,0,0,0,0,
                                         0,1,1,0,1,1,0,1,1,0,
                                         0,0,0,0,0,0,0,0,0,0,
                                         0,2,2,0,2,2,0,2,2,0,
                                         0,2,2,0,2,2,0,2,2,0,
                                         0,0,0,0,0,0,0,0,0,0,
                                         0,3,3,0,3,3,0,3,3,0,
                                         0,3,3,0,3,3,0,3,3,0,
                                         0,0,0,0,0,0,0,0,0,0,
                                         0,4,4,0,4,4,0,4,4,0];

//container
GAME.CONTAINER = {
	EXPLOSIONS:[],
    BLOCKS:[],
    BALLS:[]
};

var g_hideSpritePos = cc.p( -10, -10);