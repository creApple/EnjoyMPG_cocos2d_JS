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

		var cacheImage = cc.textureCache.addImage(res.s_menuTitle);
		var title = new cc.Sprite(cacheImage, cc.rect(0, 0, 134, 34));
		title.x = winSize.width / 2
		title.y = winSize.height - 120;
		this.addChild(title);

		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(18);
		var title1 = cc.MenuItemFont("Sound");
		title1.setEnabled(false);

		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(26);
		var item1 = new cc.MenuItemToggle(
				new cc.MenuItemFont("On"),
				new cc.MenuItemFont("Off") );
		item1.setCallback(this.onSoundControl );
		var state = GM.SOUND ? 0 : 1;
		item1.setSelectedIndex(state);

		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(18);
		var title2 = cc.MenuItemFont("Mode");
		title2.setEnabled(false);

		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(26);
		var item2 = new cc.MenuItemToggle(
				new cc.MenuItemFont("Normal"),
				new cc.MenuItemFont("Hard"));
		item2.setCallback( this.onModeControl );
		var mode = GM.HARDMODE ? 1 : 0;
		item2.setSelectedIndex(mode);

		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(26);
		var label = new cc.LabelTTF("Go back", "Arial", 20);
		var back = new cc.MenuItemLabel(label, this.onBackCallback);
		//back.scale = 0.8;

		var menu = new cc.Menu(title1, title2, item1, item2, back);
		menu.alignItemsInColumns(2, 2, 1);
		this.addChild(menu);

		back.y -= 100;

		return true;
    },
    onBackCallback:function (pSender) {
    	var scene = new cc.Scene();
    	scene.addChild(new SysMenu());
    	cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    onSoundControl:function(){
        GM.SOUND = !GM.SOUND;
        var audioEngine = cc.audioEngine;
        if(GM.SOUND){
        	audioEngine.playMusic(res.s_mainMainMusic_mp3);
        }
        else{
        	audioEngine.stopMusic();
        	audioEngine.stopAllEffects();
        }
    },
    onModeControl:function(){
        GM.HARDMODE = !GM.HARDMODE;
    }
});
