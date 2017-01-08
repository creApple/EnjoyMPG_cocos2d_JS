STATE_PLAYING = 0;
STATE_GAMEOVER = 1;
MAX_CONTAINT_WIDTH = 64;
MAX_CONTAINT_HEIGHT = 16;

var g_sharedGameLayer;

var GameLayer = cc.Layer.extend({

    _ball:null,
    _fastBall:null,
    _bat:null,
    _tileMapHeight:240,
    _tileMapWidth:20,
    _batYPosition:50,
    _mapWidth:10,
    _mapHeight:10,
    _tileWidth:32,
    _tileHeight:16,

    _backSky:null,
    _backSkyHeight:0,
    _movingSkyHeight:56,
    _backSkyRe:null,
    _tmpScore:0,
    _isBackSkyReload:false,
    lbLife:null,
    lbScore:null,
    screenRect:null,
    _state:STATE_PLAYING,
    _explosions:null,

    ctor:function(){
    	this._super();
    	this.init();
    },
    init:function () {
    	// reset global values
    	GM.CONTAINER.EXPLOSIONS = [];
    	GM.CONTAINER.BALLS = [];
    	GM.CONTAINER.BLOCKS = [];
    	GM.LIFE = 4;
    	GM.BLOCKCOUNT = 0;
    	this._state = STATE_PLAYING;
    	this._tmpScore = GM.SCORE;

    	winSize = cc.director.getWinSize();
    	this.screenRect = cc.rect(0, 0, winSize.width, winSize.height + 10);
    	
    	// score
    	this.lbScore = new cc.LabelTTF("Score: " + GM.SCORE, "Arial", 20);
    	this.lbScore.x = winSize.width - 70;
    	this.lbScore.y = winSize.height - 30;
    	this.addChild(this.lbScore, 1000);

    	// Life logo
    	var life = new cc.Sprite("#Heart.png");
    	life.attr({
    		scale: 1.2,
    		x: 30,
    		y: winSize.height - 30
    	});
    	this.addChild(life, 1, 5);

    	// Life count
    	this.lbLife = new cc.LabelTTF("0", "Arial", 20);
    	this.lbLife.x = 60;
    	this.lbLife.y = winSize.height - 30;
    	this.addChild(this.lbLife, 1000);

    	// ball                
    	this._ball = Ball.createBall(true);
    	this._ball.x = 150;
    	this._ball.y = this._batYPosition + 30;
    	this.addChild(this._ball);

    	if (GM.HARDMODE) {
    		this._fastBall = Ball.createBall(false);
    		this._fastBall.x = 200;
    		this._fastBall.y = this._batYPosition + 30;
    		this.addChild(this._fastBall);
    	}
  	
    	// bat
    	this._bat = new Bat();
    	//this._bat = new cc.Sprite("#Bat01.png");
    	this._bat.x = 150;
    	this._bat.y = this._batYPosition;
    	this.addChild(this._bat, 3000);
    	 
    	//var block = new Block(1,100,120);
    	//var block = Block.createBlock(1, 130,130);
    	//this.addChild(block);
    	var n = 0;
    	for (var i = 0; i < this._mapHeight; i++) {
    		for (var j = 0; j < this._mapWidth; j++) {
    			if (GM.LEVEL%2) {
    				var tileNumber = GM.MAP_STAGE1[n];                   
    			} else {
    				var tileNumber = GM.MAP_STAGE2[n];                      
    			}
    			n++;
    			if(tileNumber) {
    				xPosition = (j * this._tileWidth) + this._tileMapWidth;
    				yPosition = ((this._mapHeight - i) * this._tileHeight) + this._tileMapHeight;
    				var block = Block.createBlock(tileNumber,xPosition,yPosition);
    				this.addChild(block);
    			}
    		}
    	}
   	
    	// explosion batch node
    	cc.spriteFrameCache.addSpriteFrames(res.s_explosion_plist);
    	var explosionTexture = cc.textureCache.addImage(res.s_explosion);
    	this._explosions = new cc.SpriteBatchNode(explosionTexture);
    	this._explosions.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
    	this.addChild(this._explosions);
    	Explosion.sharedExplosion();

    	// accept touch now!
    	if (cc.sys.capabilities.hasOwnProperty('keyboard'))
    		cc.eventManager.addListener({
    			event: cc.EventListener.KEYBOARD,
    			onKeyPressed:function (key, event) {
    				GM.KEYS[key] = true;
    			},
    			onKeyReleased:function (key, event) {
    				GM.KEYS[key] = false;
    			}
    		}, this);

    	if ('mouse' in cc.sys.capabilities)
    		cc.eventManager.addListener({
    			event: cc.EventListener.MOUSE,
    			onMouseMove: function(event){
    				if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
    					event.getCurrentTarget().processEvent(event);
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
    				else event.getCurrentTarget().processEvent(touches[0]);
    			}
    		}, this);
    	}
   	 
    	// schedule
    	this.scheduleUpdate();

    	if (GM.SOUND) {
    		cc.audioEngine.playMusic(res.s_bgMusic_mp3, true);
    	}
    
    	g_sharedGameLayer = this;
    	
    	//pre set
    	Explosion.preSet();

    	this.initBackground();
   	
        return true;
    },

    processEvent:function( event ) {
        if( this._state == STATE_PLAYING ) {
            var delta = event.getDelta();
  
            var curPos = cc.p(this._bat.x, this._bat.y);
            curPos= cc.pAdd( curPos, delta );
            curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(winSize.width, winSize.height) );
            this._bat.x = curPos.x;
            this._bat.y = this._batYPosition;
            curPos = null;
        }
    },

    update:function (dt) {
        if( this._state == STATE_PLAYING ) {
           this.checkIsReborn();
           this.checkStageClear();
           this.updateUI();
           this.checkBatCollide();
           this.checkBlockCollide();
        }
    },
    checkBatCollide:function () {
        var ballChild;
        // check collide
        for (var i = 0; i < GM.CONTAINER.BALLS.length; i++) {
            ballChild = GM.CONTAINER.BALLS[i];
            if ( this.collide(ballChild, this._bat)) {
                    ballChild.ballCollide();
            }
		}
    },
    checkBlockCollide:function () {
        var ballChild;
        var blockChild;
        for (var i = 0; i < GM.CONTAINER.BALLS.length; i++) {
            ballChild = GM.CONTAINER.BALLS[i];
            for (var j = 0; j < GM.CONTAINER.BLOCKS.length; j++) {
                blockChild = GM.CONTAINER.BLOCKS[j];
                if ( this.collide(ballChild, blockChild)) {
                   ballChild.ballCollide();
                   blockChild.destroy();
                }
            }
		}
    },
    checkIsReborn:function () {
        if (GM.LIFE > 0 && !this._bat.active) {
			this._bat.born();
        }
        else if (GM.LIFE <= 0 && !this._bat.active) {
            this._state = STATE_GAMEOVER;
            this.runAction(cc.Sequence.create(
            	cc.delayTime(0.2),
            	cc.callFunc(this.onGameOver, this)
            ));
        }
    },
    checkStageClear:function () {
        if (GM.BLOCKCOUNT == 0) {
            GM.LEVEL++;   			
            cc.audioEngine.stopMusic();
            cc.audioEngine.stopAllEffects();
            var scene = new cc.Scene();
            scene.addChild(new GameLayer());
            scene.addChild(new GameControlMenu());
            cc.director.runScene(new cc.TransitionFade(1.2, scene));
        }
    },
    updateUI:function () {
        if (this._tmpScore < GM.SCORE) {
            this._tmpScore += 5;
        }
        this.lbLife.setString(GM.LIFE + '');
        this.lbScore.setString("Score: " + this._tmpScore);
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
    	this._backSky = cc.Sprite("#gameBg.png");
    	this._backSky.attr({
    		anchorX: 0,
    		anchorY: 0,
    		x: 0,
    		y: 0
    	});    	
    	this._backSkyHeight = this._backSky.height;
    	this.addChild(this._backSky, -10);

    	this._backSkyHeight -= this._movingSkyHeight;
    	this._backSky.runAction(cc.MoveBy(3, cc.p(0, -this._movingSkyHeight)));   	

    	this.schedule(this.movingBackground, 3);
    },
    movingBackground:function(dt){
    	this._backSky.runAction(cc.MoveBy(3, cc.p(0, -this._movingSkyHeight))); 
    	this._backSkyHeight -= this._movingSkyHeight;

    	if (this._backSkyHeight <= winSize.height) {
    		if (!this._isBackSkyReload) {
    			this._backSkyRe = cc.Sprite("#gameBg.png");
    			this._backSkyRe.attr({
    				anchorX: 0,
    				anchorY: 0,
    				x: 0,
    				y: winSize.height
    			}); 
    			this.addChild(this._backSkyRe, -10);
    			this._isBackSkyReload = true;
    		}
    		this._backSkyRe.runAction(cc.MoveBy(3, cc.p(0, -this._movingSkyHeight)));
    	}
    	if (this._backSkyHeight <= 0) {
    		this._backSkyHeight = this._backSky.height;
    		this.removeChild(this._backSky, true);
    		this._backSky = this._backSkyRe;
    		this._backSkyRe = null;
    		this._isBackSkyReload = false;
    	}
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

GameLayer.prototype.addExplosions = function (explosion) {
	this._explosions.addChild(explosion);
};
