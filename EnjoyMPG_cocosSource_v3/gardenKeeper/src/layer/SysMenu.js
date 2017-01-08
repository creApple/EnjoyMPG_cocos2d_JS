var SysMenu = cc.Layer.extend({
    _ball:null,

    ctor:function () {
    	this._super();
    	this.init();
    },
    init:function () {
    	cc.spriteFrameCache.addSpriteFrames(res.s_sprites_plist);
    	winSize = cc.director.getWinSize();
    	var sp = new cc.Sprite(res.s_loading);
    	sp.anchorX = 0;
    	sp.anchorY = 0;
    	this.addChild(sp, 0, 1);

    	var logo = new cc.Sprite(res.s_logo)
    	logo.attr({
    		anchorX: 0.5,
    		anchorY: 0,
    		x: winSize.width / 2,
    		y: 30
    	});
    	this.addChild(logo, 10, 1);

    	var newGameNormal = new cc.Sprite(res.s_menu, cc.rect(0, 0, 126, 33));
    	var newGameSelected = new cc.Sprite(res.s_menu, cc.rect(0, 33, 126, 33));
    	var newGameDisabled = new cc.Sprite(res.s_menu, cc.rect(0, 33 * 2, 126, 33));

    	var gameSettingsNormal = new cc.Sprite(res.s_menu, cc.rect(126, 0, 126, 33));
    	var gameSettingsSelected = new cc.Sprite(res.s_menu, cc.rect(126, 33, 126, 33));
    	var gameSettingsDisabled = new cc.Sprite(res.s_menu, cc.rect(126, 33 * 2, 126, 33));

    	var aboutNormal = new cc.Sprite(res.s_menu, cc.rect(252, 0, 126, 33));
    	var aboutSelected = new cc.Sprite(res.s_menu, cc.rect(252, 33, 126, 33));
    	var aboutDisabled = new cc.Sprite(res.s_menu, cc.rect(252, 33 * 2, 126, 33));
    	
    	var flare = new cc.Sprite(res.s_flare);
    	this.addChild(flare, 15, 10);
    	flare.visible = false;
    	var newGame = new cc.MenuItemSprite(newGameNormal, newGameSelected, newGameDisabled, function () {
    		this.onButtonEffect();
    		//this.onNewGame();
    		flareEffect(flare, this, this.onNewGame);
    	}.bind(this));
    	var gameSettings = new cc.MenuItemSprite(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);
    	var about = new cc.MenuItemSprite(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);

    	var menu = new cc.Menu(newGame, gameSettings, about);
    	menu.alignItemsVerticallyWithPadding(10);
    	this.addChild(menu, 10, 2);
    	menu.x = winSize.width / 2;
    	menu.y = winSize.height / 2 + 30;
    	this.schedule(this.update, 0.1);

    	this._ball = cc.Sprite("#Mole_00.png");
    	this.addChild(this._ball, 0, 4);
    	this._ball.x = Math.random() * winSize.width;
    	this._ball.y = 0;
    	this._ball.runAction(cc.moveBy(2, cc.p(Math.random() * winSize.width, this._ball.y + winSize.height + 100)));

    	if (GM.SOUND) {
    		cc.audioEngine.setMusicVolume(0.7);
    		cc.audioEngine.playMusic(res.s_mainMainMusic_mp3, true);
    	}

        return true;
    },
    onNewGame:function (pSender) {
    	GM.LEVEL = 0;
    	GM.SCORE = 0;
        //load resources
        cc.Loader.preload(g_maingame, function () {
            cc.audioEngine.stopMusic();
            cc.audioEngine.stopAllEffects();
            var scene = new cc.Scene();
            scene.addChild(new GameLayer());
            scene.addChild(new GameControlMenu());
            cc.director.runScene(new cc.TransitionFade(1.2, scene));
        }, this);
    },
    onSettings:function (pSender) {
        this.onButtonEffect();
        var scene = new cc.Scene();
        scene.addChild(new SettingsLayer());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    onAbout:function (pSender) {       
        this.onButtonEffect();
        var scene = new cc.Scene();
        scene.addChild(new AboutLayer());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    update:function () {
        if (this._ball.y > winSize.height) {
        	this._ball.x = Math.random() * winSize.width;
        	this._ball.y = 10;
        	this._ball.runAction(cc.moveBy(
        			parseInt(5 * Math.random(), 10),
        			cc.p(Math.random() * winSize.width, this._ball.y + winSize.height)
        	));
        }
    },
    onButtonEffect:function(){
        if (GM.SOUND) {
            var s = cc.audioEngine.playEffect(res.s_buttonEffect_mp3);
        }
    }
});

SysMenu.scene = function () {
	var scene = new cc.Scene();
	var layer = new SysMenu();
	scene.addChild(layer);
	return scene;
};

