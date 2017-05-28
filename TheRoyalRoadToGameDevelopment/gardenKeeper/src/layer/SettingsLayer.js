var SettingsLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		this.init();
	},
	init:function () {
		var sp = new cc.Sprite(res.s_loading);
		sp.anchorX = 0;
		sp.anchorY = 0;
		this.addChild(sp, 0, 1);
		
		var logo = new cc.Sprite(res.s_woodBoard);
        logo.setPosition(winSize.width/2,winSize.height-140);
//		logo.x = winSize.width / 2;
//		logo.y = winSize.height /2 + 10;
		this.addChild(logo, 1);
		
		var cacheImage = cc.textureCache.addImage(res.s_menuTitle);
		var title = new cc.Sprite(cacheImage, cc.rect(0, 0, 134, 34));
		title.x = winSize.width / 2
		title.y = winSize.height - 100;
		this.addChild(title, 10);

		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(18);
		var title1 = new cc.MenuItemFont("Sound");
		//title1.setEnabled(false);

		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(26);
		var item1 = new cc.MenuItemToggle(
				new cc.MenuItemFont("On"),
				new cc.MenuItemFont("Off") );
		item1.setCallback(this.onSoundControl );
		var state = GAME.SOUND ? 0 : 1;
		item1.setSelectedIndex(state);

		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(18);
		var title2 = new cc.MenuItemFont("Mode");
		//title2.setEnabled(false);

		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(26);
		var item2 = new cc.MenuItemToggle(
				new cc.MenuItemFont("Easy"),
				new cc.MenuItemFont("Hard"));
		item2.setCallback( this.onModeControl );
		var mode = GAME.EASYMODE ? 0 : 1;
		item2.setSelectedIndex(mode);

		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(26);
		var label = new cc.LabelTTF("Go back", "Arial", 20);
		var back = new cc.MenuItemLabel(label, this.onBackCallback);


		var menu = new cc.Menu(title1, title2, item1, item2, back);
		menu.alignItemsInColumns(2, 2, 1);
		this.addChild(menu, 10);

		return true;
    },
    onBackCallback:function (pSender) {
    	var scene = new cc.Scene();
    	scene.addChild(new SystemMenu());
    	cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    onSoundControl:function(){
        GAME.SOUND = !GAME.SOUND;
        var audioEngine = cc.audioEngine;
        if(GAME.SOUND){
        	audioEngine.playMusic(res.s_mainMainMusic_mp3);
        }
        else{
        	audioEngine.stopMusic();
        	audioEngine.stopAllEffects();
        }
    },
    onModeControl:function(){
    	GAME.EASYMODE = !GAME.EASYMODE;
    }
});
