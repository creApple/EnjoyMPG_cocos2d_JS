var Block = cc.Sprite.extend({
    scoreValue:200,
    ctor:function (blockType,xPosition,yPosition) {
        var blockName = "Block" + blockType + ".png";
        this._super("#"+blockName);
        //this._super("#Block1.png");
        this.setPosition(xPosition,yPosition);
    },
    destroy:function () {
        GM.SCORE += this.scoreValue;
        GM.BLOCKCOUNT--;
		var a =	Explosion.getOrCreateExplosion();
		a.attr({
			x: this.x,
			y: this.y
		});
        if(GM.SOUND){
        	cc.audioEngine.playEffect(res.s_explodeEffect_mp3);
        }
        this.setPosition(g_hideSpritePos);
		this.stopAllActions();
    },
    collideRect:function (x, y) {
    	var w = this.width, h = this.height;
    	return cc.rect(x - w / 2, y - h / 2, w, h);
    }
});
Block.createBlock = function(blockType,xPosition,yPosition) {
	
	var b = new Block(blockType,xPosition,yPosition);
	GM.CONTAINER.BLOCKS.push(b);
    GM.BLOCKCOUNT++;
    return b;
};