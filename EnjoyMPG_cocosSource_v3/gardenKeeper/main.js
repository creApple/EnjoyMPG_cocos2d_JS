cc.game.onStart = function(){
	cc.view.adjustViewPort(true);
	cc.view.setDesignResolutionSize(480,320, cc.ResolutionPolicy.EXACT_FIT);
	cc.view.resizeWithBrowserSize(true);
    //load resources
	cc.LoaderScene.preload(g_mainmenu, function () {
		cc.director.runScene(new SysMenu.scene());
    }, this);
};
cc.game.run();

var AnchorPointCenter = new cc.Point(0.5, 0.5);
var AnchorPointBottomLeft = new cc.Point(0, 0);
var AnchorPointBottomRight = new cc.Point(1, 0);
var AnchorPointTopRight = new cc.Point(1, 1);
var AnchorPointTopLeft = new cc.Point(0, 1);
var AnchorPointTop = new cc.Point(0.5, 1);
