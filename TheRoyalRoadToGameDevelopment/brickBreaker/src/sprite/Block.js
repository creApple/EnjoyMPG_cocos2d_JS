var Block = cc.Sprite.extend({
    scoreValue:200,
    ctor:function (blockType,xPosition,yPosition) {
        var blockName = "Block" + blockType + ".png";
        this._super("#"+blockName);
        this.setPosition(xPosition,yPosition);
    },
    destroy:function () {
        GAME.SCORE += this.scoreValue;
        GAME.BLOCKCOUNT--;
		var a =	Explosion.getOrCreateExplosion();
		a.attr({
			x: this.x,
			y: this.y
		});
        if(GAME.SOUND){
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
	GAME.CONTAINER.BLOCKS.push(b);
    GAME.BLOCKCOUNT++;
    return b;
};