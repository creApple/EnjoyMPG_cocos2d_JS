STATE_PLAYING = 0;
STATE_GAMEOVER = 1;
MAX_CONTAINT_WIDTH = 40;
MAX_CONTAINT_HEIGHT = 40;

var g_sharedGameLayer;

var GameLayer = cc.Layer.extend({

	_point:null,
	_keeper:null,
	_backGlass:null,
	_backSky:null,
	_backSkyRe:null,
	_backTileMap:null,
	_backTileMapRe:null,
	_deltaXvalue:0,
	_deltaYvalue:0,
	_deltaXYvalue:0,  
	_backSkyWidth:0,
	_backTileMapWidth:0,
	_tmpScore:0,
	_isBackSkyReload:false,
	_isBackTileReload:false,
	lbLife:null,
	lbScore:null,
	lbX:null,
	lbY:null,
	lbVector:null,
	lbDegree:null,
	screenRect:null,
	_state:STATE_PLAYING,
	_explosions:null,
	_sprites:null,
	_arrowBox:null,
	_target:null,
	_mole:null,
	_moleXposition:150,
	_moleArrayIndex:0,
	_moleActiveCount:0,
	_basicScore:1000,
	_gravity:9.8,
	_time:60,

    ctor:function(){
    	this._super();
    	this.init();
    },
    init:function () {
    	// reset global values
    	GM.CONTAINER.EXPLOSIONS = [];
    	GM.CONTAINER.HAMMERS = [];
    	GM.CONTAINER.MOLES = [];
    	GM.LIFE = 4;
    	GM.MOLECOUNT = 0;
    	GM.SCORE = 0;
    	this.resetMole();
    	this._state = STATE_PLAYING;

    	winSize = cc.director.getWinSize();
    	this.screenRect = cc.rect(0, 0, winSize.width, winSize.height + 10);

    	// Timmer logo
    	var timmerLogo = new cc.Sprite("#Timmer.png");
    	timmerLogo.attr({
    		scale: 0.5,
    		x: 30,
    		y: winSize.height - 30
    	});
    	this.addChild(timmerLogo, 1, 5);

    	// Timmer count
    	this.lbTimmer = new cc.LabelBMFont(this._time, res.s_scorefont_fnt, 40);
    	this.lbTimmer.x = 70;
    	this.lbTimmer.y = winSize.height - 30;
    	this.addChild(this.lbTimmer, 1000);

    	// score logo
    	var scoreLogo = new cc.Sprite("#Mole_04.png");
    	scoreLogo.attr({
    		scale: 0.5,
    		x: g_hideMolePos.x,
    		y: g_hideMolePos.y
    	});
    	this.addChild(scoreLogo);

    	// score
    	this.lbScore = new cc.LabelBMFont(GM.SCORE, res.s_scorefont_fnt, 40);
    	this.lbScore.x = 180;
    	this.lbScore.y = winSize.height - 30;
    	this.addChild(this.lbScore, 1000);

    	// Point
    	this._point = new cc.Sprite("#PowerPoint.png"); 

    	this._point.attr({
    		opacity: 0,
    		x: GM.KEEPER.XPOSITION,
    		y: GM.KEEPER.YPOSITION
    	});
    	this.addChild(this._point);

    	// Point
    	this._arrowBox = new cc.Sprite("#ArrowBox.png"); 
    	this._arrowBox.attr({
    		opacity: 0,
    		anchorX: 0,
    		anchorY: 0,
    		x: GM.KEEPER.XPOSITION,
    		y: GM.KEEPER.YPOSITION-20
    	}); 
    	this.addChild(this._arrowBox);

    	if(GM.EASYMODE) {
    		var vectorLogo = new cc.Sprite("#VectorDegree.png");
    		vectorLogo.attr({
    			x: winSize.width - 65,
    			y: winSize.height - 65
    		}); 
    		this.addChild(vectorLogo, 1, 5);
    		this.lbX = new cc.LabelBMFont("0", res.s_scriptfont_fnt,30);
    		this.addChild(this.lbX, 1000);
    		this.lbX.setPosition(winSize.width - 30, winSize.height - 20);
    		this.lbX.color = cc.color(240,131,14);
    		this.lbY = new cc.LabelBMFont("0", res.s_scriptfont_fnt,30);
    		this.addChild(this.lbY, 1000);
    		this.lbY.attr({
    			x: winSize.width - 30,
    			y: winSize.height - 50
    		}); 
    		this.lbY.color = cc.color(240,131,14);
    		this.lbVector = new cc.LabelBMFont("0", res.s_scriptfont_fnt,30);
    		this.addChild(this.lbVector, 1000);
    		this.lbVector.attr({
    			x: winSize.width - 30,
    			y: winSize.height - 80
    		}); 
    		this.lbVector.color = cc.color(240,131,14);
    		this.lbDegree = new cc.LabelBMFont("0", res.s_scriptfont_fnt,30);
    		this.addChild(this.lbDegree, 1000);
    		this.lbDegree.attr({
    			x: winSize.width - 30,
    			y: winSize.height - 110
    		}); 
    		this.lbDegree.color = cc.color(240,131,14);
    		this._basicScore += GM.LEVEL * 200;
    		this._target = new Target(); 
    		this._target.attr({
    			opacity: 0,
    			x: GM.KEEPER.XPOSITION,
    			y: GM.KEEPER.YPOSITION
    		});
    		this.addChild(this._target,1001);
    	} else {
    		this._basicScore += GM.LEVEL * 400;
    		this._time -= 10;
    	}
    	
    	// Keeper
    	this._keeper = new Keeper();
    	this._keeper.x = GM.KEEPER.XPOSITION;
    	this._keeper.y = GM.KEEPER.YPOSITION;
    	this.addChild(this._keeper);

    	// accept touch now!
    	if ('mouse' in cc.sys.capabilities)
    		cc.eventManager.addListener({
    			event: cc.EventListener.MOUSE,
    			onMouseMove: function(event){
    				if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
    					event.getCurrentTarget().measurePower(event);
    			},
    			onMouseUp: function(event){
    				if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
    					event.getCurrentTarget().releaseHammer(event);
    			}
    		}, this);

    	if (cc.sys.capabilities.hasOwnProperty('touches')){
    		cc.eventManager.addListener({
    			prevTouchId: -1,
    			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
    			onTouchesMoved:function (touches, event) {
    				var touch = touches[0];
    				if (this.prevTouchId != touch.getId())
    					this.prevTouchId = touch.getId();
    				else event.getCurrentTarget().measurePower(touches[0]);
    			},
    			onTouchesEnded:function (touches, event) {
    			    var touch = touches[0];
    			    if (this.prevTouchId != touch.getId())
    				    this.prevTouchId = touch.getId();
    			    else event.getCurrentTarget().releaseHammer(touches[0]);
    		    }
    		}, this);
    	}
    	 
    	// schedule
    	this.scheduleUpdate();
    	this.schedule(this.checkStageClear, 1);

    	if (GM.SOUND) {
    		cc.audioEngine.playMusic(res.s_bgMusic_mp3, true);
    	}
    
    	g_sharedGameLayer = this;

    	this.initBackground();
    	
        return true;
    },

    measurePower:function( event ) {
    	if( this._state == STATE_PLAYING ) {    		
    		var delta = event.getDelta();

    		var curPos = cc.p(this._point.x, this._point.y);
    		curPos= cc.pAdd( curPos, delta );
    		curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(winSize.width, winSize.height) );
    		this._point.attr({
    			opacity: 255,
    			x: curPos.x,
    			y: curPos.y
    		}); 

    		this._deltaXvalue = GM.KEEPER.XPOSITION - Math.round(curPos.x);
    		this._deltaYvalue = GM.KEEPER.YPOSITION - Math.round(curPos.y);
    		
    		this._arrowBox.attr({
    			opacity: 150,
    			scaleX: this._deltaXvalue/50,
    			scaleY: this._deltaYvalue/50
    		}); 

    		if(GM.EASYMODE) {
    			var timeToGround =  2 * this._deltaYvalue / this._gravity;
    			var xpositionToGround = GM.KEEPER.XPOSITION + this._deltaXvalue * timeToGround ;
    			var xyVector = Math.round( Math.sqrt( Math.pow(this._deltaXvalue,2) + Math.pow(this._deltaYvalue,2) ));
    			var rad= Math.atan2(this._deltaYvalue, this._deltaXvalue);//Radian
    			var degree = Math.round( (rad*180)/Math.PI );//Degree
    			this.lbX.setString(this._deltaXvalue);
    			this.lbY.setString(this._deltaYvalue);
    			this.lbVector.setString(xyVector);
    			this.lbDegree.setString(degree);
    			this._target.attr({
    				opacity: 255,
    				x: xpositionToGround,
    				y: GM.KEEPER.YPOSITION
    			});   
    			this.checkTargetCollide();   
    		}
    	}
    },

    releaseHammer:function( event ) {
    	if( this._state == STATE_PLAYING ) {
    		var hammer = Hammer.createHammer(this._deltaXvalue,this._deltaYvalue);
    		this.addChild(hammer);

    		var move = cc.moveBy(1, cc.p(this._deltaXvalue,this._deltaYvalue));
    		var move_ease = move.clone().easing(cc.easeExponentialOut());
    		var fade_out = cc.fadeOut(1.0);
    		var seq = cc.sequence(move_ease, fade_out);

    		this._point.runAction(seq);
    		this._arrowBox.runAction(cc.fadeOut(2.0));

    		if(GM.EASYMODE) {
    			this._target.runAction(cc.fadeOut(2.0));
    		}
    	}
    },

    update:function (dt) {
        if( this._state == STATE_PLAYING ) {
           this.updateUI();
           this.checkMoleCollide();
        }
    },
    updateUI:function () {
    	if (this._tmpScore < GM.SCORE) {
    		this._tmpScore += 5;
    	}
    	this.lbScore.setString(this._tmpScore);
    },
    checkMoleCollide:function () {
    	var hammerChild, moleChild;
    	for (var i = 0; i < GM.CONTAINER.HAMMERS.length; i++) {
    		hammerChild = GM.CONTAINER.HAMMERS[i];
    		for (var j = 0; j < GM.CONTAINER.MOLES.length; j++) {
    			moleChild = GM.CONTAINER.MOLES[j];
    			if (this.collide(hammerChild, moleChild)) {
    				moleChild.destroy();
    			}
    		}
    	}
    },
    checkTargetCollide:function () {
    	var moleChild;
    	for (var i= 0;i< GM.CONTAINER.MOLES.length; i++) {
    		moleChild = GM.CONTAINER.MOLES[i];
    		if (this.collide(this._target, moleChild)) { 
    			this._target.hit();
    		}
    	}
    },
    checkStageClear:function () {
    	if (this._state == STATE_PLAYING &&
    			this._time) {
    		this._time--;
    		this.lbTimmer.setString(this._time);
    		this.generateMole();
    		if (this._tmpScore >= this._basicScore) {
    			GM.LEVEL++;   			
                cc.audioEngine.stopMusic();
                cc.audioEngine.stopAllEffects();
                var scene = new cc.Scene();
                scene.addChild(new GameLayer());
                scene.addChild(new GameControlMenu());
                cc.director.runScene(new cc.TransitionFade(1.2, scene));
    		}
    	} else {
    		this._state = STATE_GAMEOVER;
    		this.runAction(cc.Sequence.create(
    				cc.delayTime(0.2),
    				cc.callFunc(this.onGameOver, this)
    		));
    	}
    },
    generateMole:function () {
    	var arrayIndex = this.getRandom(0,7);
    	if(this._state == STATE_PLAYING &&
    			GM.MOLE_XPOSITION[arrayIndex][1]  && 
    			GM.MOLECOUNT < 4) {

    		var mole = Mole.createMole(this.getRandom(1,4),
    				arrayIndex,
    				GM.MOLE_XPOSITION[arrayIndex][0],
    				GM.KEEPER.YPOSITION-10);
    		this.addChild(mole);
    		GM.MOLE_XPOSITION[arrayIndex][1] = false;
    	} 
    },
    resetMole:function () {
    	for (var i = 0; i < GM.MOLE_XPOSITION.length; i++) {
    		GM.MOLE_XPOSITION[i][1] = true;
    	}
    },
    collide:function (a, b) {
    	var ax = a.x, ay = a.y, bx = b.x, by = b.y;
    	if (Math.abs(ax - bx) > MAX_CONTAINT_WIDTH || Math.abs(ay - by) > MAX_CONTAINT_HEIGHT)
    		return false;

    	var aRect = a.collideRect(ax, ay);
    	var bRect = b.collideRect(bx, by);
    	return cc.rectIntersectsRect(aRect, bRect);
    },
    initBackground:function () {
    	// bg 
    	this._backGlass = cc.Sprite("#glassBg.png");
    	this._backGlass.attr({
    		anchorX: 0,
    		anchorY: 0,
    		x: 0,
    		y: 0
    	});    	
    	this.addChild(this._backGlass, -5);
    	
    	//tilemap
    	this._backTileMap = cc.TMXTiledMap(res.s_backGround);
    	this.addChild(this._backTileMap, -7);
    	this._backTileMapWidth = this._backTileMap._getMapWidth() * this._backTileMap._getTileWidth();

    	this._backSky = cc.Sprite("#skyBg.png");
    	this._backSky.attr({
    		anchorX: 0,
    		anchorY: 0,
    		x: 0,
    		y: 0
    	});    	
    	this._backSkyWidth = this._backSky.width;
    	this.addChild(this._backSky, -10);

    	this._backSkyWidth -= 20;
    	this._backTileMapWidth -= 150;
    	
    	this._backSky.runAction(cc.moveBy(3, cc.p(-20, 0)));   	
    	this._backTileMap.runAction(cc.moveBy(3, cc.p(-150, 0)));   
    	
    	this.schedule(this.movingBackground, 3);
    },
    movingBackground:function(dt){
    	this._backSky.runAction(cc.moveBy(3, cc.p(-20,0))); 
    	this._backTileMap.runAction(cc.moveBy(3, cc.p(-150,0)));
    	this._backSkyWidth -= 20;
    	this._backTileMapWidth -= 150;

    	if (this._backSkyWidth <= winSize.width) {
    		if (!this._isBackSkyReload) {
    			this._backSkyRe = cc.Sprite("#skyBg.png");
    			this._backSkyRe.attr({
    				anchorX: 0,
    				anchorY: 0,
    				x: winSize.width,
    				y: 0
    			}); 
    			this.addChild(this._backSkyRe, -10);
    			this._isBackSkyReload = true;
    		}
    		this._backSkyRe.runAction(cc.moveBy(3, cc.p(-20,0)));
    	}
    	
    	if (this._backSkyWidth <= 0) {
    		this._backSkyWidth = this._backSky.width;
    		this.removeChild(this._backSky, true);
    		this._backSky = this._backSkyRe;
    		this._backSkyRe = null;
    		this._isBackSkyReload = false;
    	}
    	if (this._backTileMapWidth <= winSize.width) {
    		if (!this._isBackTileReload) {
    			this._backTileMapRe = cc.TMXTiledMap(res.s_backGround);
    			this.addChild(this._backTileMapRe, -9);
    			this._backTileMapRe.setPosition(winSize.width,0);
    			this._isBackTileReload = true;
    		}
    		this._backTileMapRe.runAction(cc.moveBy(3, cc.p(-150,0)));
    	}
    	if (this._backTileMapWidth <= 0) {
    		this._backTileMapWidth = this._backTileMapRe._getMapWidth() * this._backTileMapRe._getTileWidth();
    		this.removeChild(this._backTileMap, true);
    		this._backTileMap = this._backTileMapRe;
    		this._backTileMapRe = null;
    		this._isBackTileReload = false;
    	} 
    },
    getRandom:function( _min, _max ) {
    	var _value = _max * Math.random() + _min;
    	return parseInt(_value);
    },
    onGameOver:function () {
    	cc.audioEngine.stopMusic();
    	cc.audioEngine.stopAllEffects();
    	var scene = new cc.Scene();
    	scene.addChild(new GameOver());
    	cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }

});

GameLayer.scene = function () {
	var scene = new cc.Scene();
	var layer = new GameLayer();
	scene.addChild(layer, 1);
	return scene;
};
