var AboutLayer = cc.Layer.extend({
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
        var title = new cc.Sprite(cacheImage, cc.rect(0, 36, 120, 34));
        title.x = winSize.width / 2;
        title.y = winSize.height - 120;
        this.addChild(title);

        var about = new cc.LabelTTF(" If you want to learn more details,\n you can download this sample or\n buy the book from creApple.", "Arial", 14, cc.size(winSize.width * 0.8, 80), cc.TEXT_ALIGNMENT_CENTER );
        about.attr({
           	x: winSize.width / 2,
           	y: winSize.height / 2 - 60,
           	anchorX: 0.5,
           	anchorY: 0.5
        });
        this.addChild(about);
                      
        var cocos2dhtml5 = new cc.Sprite(res.s_cocos2dhtml5);
        cocos2dhtml5.x = winSize.width / 2;
        cocos2dhtml5.y = winSize.height /2 + 60;
        this.addChild(cocos2dhtml5);
            
        var b1 = new cc.LabelTTF("Visit Cocos2d-JS","Arial",15);
        var b2 = new cc.LabelTTF("Download This Sample","Arial",15);
        
        var menu1 = new cc.MenuItemLabel(b1,function(){
        	window.location.href = "http://www.cocos2d-x.org";
        });
        var menu2 = new cc.MenuItemLabel(b2,function(){
        	window.location.href = "http://www.creapple.com";
        });

        var label = new cc.LabelTTF("Go back", "Arial", 20);
        var back = new cc.MenuItemLabel(label, this.onBackCallback);

        var menu = new cc.Menu(menu1, menu2, back);
        menu.alignItemsInColumns(1, 1, 1);
        this.addChild(menu);
        menu.y -= 120;
        back.y -= 50;
        
        return true;
    },
    onBackCallback:function (pSender) {
    	var scene = new cc.Scene();
    	scene.addChild(new SysMenu());
    	cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }
});