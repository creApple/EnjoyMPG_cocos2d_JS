cc.game.onStart = function(){
	cc.view.adjustViewPort(true);
	cc.view.setDesignResolutionSize(320,560, cc.ResolutionPolicy.EXACT_FIT);
	cc.view.resizeWithBrowserSize(true);
    //load resources
	cc.LoaderScene.preload(g_mainmenu, function () {
		cc.director.runScene(new SysMenu.scene());
    }, this);
};
cc.game.run();
