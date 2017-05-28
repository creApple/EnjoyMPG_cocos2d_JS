var GameOver = cc.Layer.extend({

	ctor:function(){
		this._super();
		this.init();
	},
    init:function () {
    	var sp = new cc.Sprite(res.s_loading);
    	sp.anchorX = 0;
    	sp.anchorY = 0;
    	this.addChild(sp, 0, 1);

    	var logo = new cc.Sprite(res.s_gameOver);
    	logo.attr({
    		anchorX: 0.5,
    		anchorY: 0,
    		x: winSize.width / 2,
    		y: winSize.height / 2 + 60
    	});
    	this.addChild(logo,10,1);
    	
    	var lbScore = new cc.LabelTTF("Your Score:"+GAME.SCORE,"Arial",24);
    	lbScore.x = winSize.width / 2;
    	lbScore.y = winSize.height / 2 + 40;
    	lbScore.color = cc.color(250,179,0);
    	this.addChild(lbScore,10);

    	var playAgainNormal = new cc.Sprite(res.s_menu, cc.rect(378, 0, 126, 33));
    	var playAgainSelected = new cc.Sprite(res.s_menu, cc.rect(378, 33, 126, 33));
    	var playAgainDisabled = new cc.Sprite(res.s_menu, cc.rect(378, 33 * 2, 126, 33));

    	var flare = new cc.Sprite(res.flare_jpg);
    	this.addChild(flare);
    	flare.visible = false;
    	var playAgain = new cc.MenuItemSprite(playAgainNormal, playAgainSelected, playAgainDisabled, function(){
    		flareEffect(flare, this, this.onPlayAgain);
    	}.bind(this) );
    	var menu = new cc.Menu(playAgain);
     	this.addChild(menu, 1, 2);
    	menu.x = winSize.width / 2;
    	menu.y = winSize.height / 2;

    	var b1 = new cc.LabelTTF("Visit Cocos2d-JS","Arial",14);
    	var b2 = new cc.LabelTTF("Download This Sample","Arial",14);
    	var menu1 = new cc.MenuItemLabel(b1,function(){
    		window.location.href = "http://www.cocos2d-x.org";
    	});
    	var menu2 = new cc.MenuItemLabel(b2,function(){
    		window.location.href = "http://www.creapple.com";
    	});
    	
    	var cocos2dMenu = new cc.Menu(menu1,menu2);
    	cocos2dMenu.alignItemsVerticallyWithPadding(10);
    	cocos2dMenu.x = winSize.width / 2;
    	cocos2dMenu.y = winSize.height / 2 - 70;
    	this.addChild(cocos2dMenu);

    	if(GAME.SOUND){
    		cc.audioEngine.playMusic(res.s_mainMainMusic_mp3);
    	}

        return true;
    },
    onPlayAgain:function (pSender) {
        GAME.LEVEL = 0;
        GAME.SCORE = 0;
      
        cc.audioEngine.stopMusic();
        cc.audioEngine.stopAllEffects();
        var scene = new cc.Scene();
        scene.addChild(new GameLayer());
        scene.addChild(new GameControlMenu());
        cc.director.runScene(new cc.TransitionFade(1.2,scene));
    }
});

GameOver.scene = function () {
	var scene = new cc.Scene();
	var layer = new GameOver();
	scene.addChild(layer);
	return scene;
};
