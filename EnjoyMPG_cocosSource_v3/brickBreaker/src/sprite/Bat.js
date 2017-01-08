var Bat = cc.Sprite.extend({
	active:true,
	batSprite:null,
	ctor:function () {

		this._super("#Bat01.png");

		// set frame
		var frame0 = cc.spriteFrameCache.getSpriteFrame("Bat01.png");
		var frame1 = cc.spriteFrameCache.getSpriteFrame("Bat02.png");

		var animFrames = [];
		animFrames.push(frame0);
		animFrames.push(frame1);

		// ship animate
		var animation = new cc.Animation(animFrames, 0.5);
		var animate = cc.animate(animation);
		this.runAction(animate.repeatForever());

		this.initBornSprite();
		this.born();
	},
	update:function (dt) {
		// Keys are only enabled on the browser
		if (!cc.sys.isNative) {
			if ((GM.KEYS[cc.KEY.a] || GM.KEYS[cc.KEY.left]) && this.x >= 0) {
				this.x -= dt * this.speed;
			}
			if ((GM.KEYS[cc.KEY.d] || GM.KEYS[cc.KEY.right]) && this.x <= winSize.width) {
				this.x += dt * this.speed;
			}
		}
	},
	initBornSprite:function () {
		this.batSprite = new cc.Sprite("#Bat02.png");
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
