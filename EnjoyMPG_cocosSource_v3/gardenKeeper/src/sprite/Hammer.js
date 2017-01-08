var Hammer = cc.Sprite.extend({
    _xVelocity:0,
    _yVelocity:0,
    _animationInterval:1 / 60,
    _gravity:9.8,
    _time:0,
    ctor:function (xVelocity, yVelocity) {
        this._xVelocity = xVelocity;
        this._yVelocity = yVelocity;
        this._super("#Hammer_01.png");
        var rotate = cc.rotateBy(1.0, 360);
        var repeat = rotate.repeatForever();
		this.runAction(repeat);

        this.scheduleUpdate();
    },
    destroy:function () {
		this.setPosition(g_hideSpritePos);
		this.stopAllActions();
    },
    update:function (dt) {
        this._time = this._time + this._animationInterval;
        var xp = GM.KEEPER.XPOSITION +  this._xVelocity * this._time;
        var yp = GM.KEEPER.YPOSITION +  this._yVelocity * this._time - 0.5*this._gravity*Math.pow(this._time,2)

        yp > (GM.KEEPER.YPOSITION - 10)? this.setPosition(xp, yp) : this.destroy();
    },
    collideRect:function (x, y) {
    	var w = this.width, h = this.height;
    	return cc.rect(x - w / 2, y - h / 2, w, h);
    }
});

Hammer.createHammer = function(xVelocity, yVelocity) {	
	var hammer = new Hammer(xVelocity, yVelocity);
	GM.CONTAINER.HAMMERS.push(hammer);
    return hammer;
};
