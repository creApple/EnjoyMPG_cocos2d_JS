var res = {

	//image
	s_loading : 'res/loading.png',
	s_menu : 'res/menu.png',
	s_logo : 'res/logo.png',
    s_woodBoard : 'res/woodBoard.png',
	s_cocos2dhtml5 : 'res/cocos2d-html5.png',
	s_gameOver : 'res/gameOver.png',
	s_menuTitle : 'res/menuTitle.png',
	s_flare : 'res/flare.jpg',
	s_explosion : 'res/explosion.png',
	s_scriptfont : 'res/scriptfont.png',
	s_scriptfont_fnt : 'res/scriptfont.fnt',
	s_scorefont : 'res/scorefont.png',
	s_scorefont_fnt : 'res/scorefont.fnt',
	s_sprites : 'res/sprites.png',

	//music
	s_bgMusic_mp3 : 'res/Music/bgMusic.mp3',
	s_mainMainMusic_mp3 : 'res/Music/mainMainMusic.mp3',
	s_buttonEffect_mp3 : 'res/Music/buttonEffet.mp3',
	s_explodeEffect_mp3 : 'res/Music/explodeEffect.mp3',

	s_bgMusic_ogg : 'res/Music/bgMusic.ogg',
	s_mainMainMusic_ogg : 'res/Music/mainMainMusic.ogg',
	s_buttonEffect_ogg : 'res/Music/buttonEffet.ogg',
	s_explodeEffect_ogg : 'res/Music/explodeEffect.ogg',

	//tmx
	s_backGround : 'res/backGround.tmx',

	//plist
	s_explosion_plist : 'res/explosion.plist',
	s_sprites_plist : 'res/sprites.plist'
};

var g_mainmenu = [
	res.s_loading,
	res.s_flare,
	res.s_menu,
	res.s_sprites,
	res.s_logo,
	res.s_mainMainMusic_mp3,
	res.s_mainMainMusic_ogg,
	res.s_menuTitle,
	res.s_sprites_plist
];

var g_maingame = [
    //image
    res.s_cocos2dhtml5,
    res.s_gameOver,
    res.s_scriptfont,
    res.s_scorefont,
    res.s_sprites,
    res.s_woodBoard,

    //tmx
    res.s_backGround,
    
    //plist
    res.s_sprites_plist,

    //music
    res.s_bgMusic_mp3,
    res.s_buttonEffect_mp3,
    res.s_explodeEffect_mp3,
    res.s_bgMusic_ogg,
    res.s_buttonEffect_ogg,
    res.s_explodeEffect_ogg,
    
    // FNT
    res.s_scriptfont_fnt,
    res.s_scorefont_fnt
];
