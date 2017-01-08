var Ball = cc.Sprite.extend({
	xVelocity:100,
	yVelocity:100,
	iVelocity:20,
	fastRatio:1.5,
	isNormalBall:true,
	
	ctor:function (isNormal) {
		this.isNormalBall = isNormal; 
		var ballPic = this.isNormalBall ? "Ball.png" : "fastBall.png";		
		this._super("#"+ballPic);

		var xLevelVelocity = this.xVelocity+ this.iVelocity*GM.LEVEL;
		var yLevelVelocity = this.yVelocity+ this.iVelocity*GM.LEVEL;
		this.xVelocity = this.isNormalBall ? xLevelVelocity : xLevelVelocity * this.fastRatio;
		this.yVelocity = this.isNormalBall ? yLevelVelocity : yLevelVelocity * this.fastRatio;
		
		this.scheduleUpdate();
	},
	update:function (dt) {
		var x = this.x, y = this.y;
		this.x += this.xVelocity * dt;
		this.y += this.yVelocity * dt;
		this.edgeCollide();
	},
	edgeCollide:function () {
		var x = this.x, y = this.y;
		var ballWidth = this.width;
		var ballHeight = this.height;
		if (x < ballWidth/2 || x > (g_sharedGameLayer.screenRect.width - ballWidth/2)) {					  
			this.xVelocity *= -1;
		}
		if (y < 0) {					  
			this.yVelocity *= -1;
			GM.LIFE--;
			g_sharedGameLayer._bat.active = false;
			var batX = g_sharedGameLayer._bat.x;
			var batY = g_sharedGameLayer._bat.y;
			this.x = batX;
			this.y = batY + 30;
		}
		if (y > (g_sharedGameLayer.screenRect.height - ballHeight/2)) {					  
			this.yVelocity *= -1;
		}
	},
	ballCollide:function ()  {
		this.yVelocity *= -1;
	},
	collideRect:function (x, y) {
		var w = this.width, h = this.height;
		return cc.rect(x - w / 2, y - h / 2, w, h);
	}
});

Ball.createBall = function(isNormal) {	
	var b = new Ball(isNormal);
	GM.CONTAINER.BALLS.push(b);
	return b;
};