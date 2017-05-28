var Bat = cc.Sprite.extend({
	speed:200,
	active:true,
	batSprite:null,
	ctor:function () {

		this._super(res.s_bat1);
		// set frame
		var frame0 = cc.spriteFrameCache.getSpriteFrame(res.s_bat1);
		var frame1 = cc.spriteFrameCache.getSpriteFrame(res.s_bat2);

		var animFrames = [];
		animFrames.push(frame0);
		animFrames.push(frame1);

		// bar animate
		var animation = new cc.Animation(animFrames, 0.5);
		var animate = cc.animate(animation);
		this.runAction(animate.repeatForever());

		this.initBornSprite();
		this.born();
		this.scheduleUpdate();
	},
	update:function (dt) {
		// Keys are only enabled on the browser
        if (!cc.sys.isNative) {
			if ((GAME.KEYS[cc.KEY.a] || GAME.KEYS[cc.KEY.left]) && this.x >= 0) {
				this.x -= dt * this.speed;
			}
			if ((GAME.KEYS[cc.KEY.d] || GAME.KEYS[cc.KEY.right]) && this.x <= winSize.width) {
				this.x += dt * this.speed;
			}
		}
	},
	initBornSprite:function () {
		this.batSprite = new cc.Sprite(res.s_bat2);
		this.batSprite.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
		this.batSprite.x = this.width / 2;
		this.batSprite.y = 12;
		this.batSprite.visible = false;
		this.addChild(this.batSprite, 3000, 99999);
	},
	born:function () {
		//revive effect
		this.batSprite.scale = 8;
		this.batSprite.runAction(cc.scaleTo(0.5, 1, 1));
		this.batSprite.visible = true;
		var blinks = cc.blink(3, 9);
		var makeBeAttack = cc.callFunc(function (t) {
			t.visible = true;
			t.batSprite.visible = false;
		}.bind(this));
		this.runAction(cc.sequence(cc.delayTime(0.5), blinks, makeBeAttack));

		this.active = true;
	},
	collideRect:function (x, y) {
		var w = this.width, h = this.height;
		return cc.rect(x - w / 2, y - h / 2, w, h);
	}
});

Bat.createBat = function() {
	var b = new Bat();
	return b;  
};
