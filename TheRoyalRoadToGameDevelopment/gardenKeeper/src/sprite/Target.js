var Target = cc.Sprite.extend({
    ctor:function () {
    	this._super("#Target.png");
    },
	hit:function() {
		this.runAction(cc.sequence(cc.scaleTo(0.5, 0.5, 0.5), cc.scaleTo(0.1, 1, 1)));
	},
	collideRect:function (x, y) {
		var w = this.width, h = this.height;
		return cc.rect(x - w / 2, y - h / 2, w, h);
	}
});
