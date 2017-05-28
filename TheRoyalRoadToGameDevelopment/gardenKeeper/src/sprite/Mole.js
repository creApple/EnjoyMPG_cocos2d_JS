var Mole = cc.Sprite.extend({
    scoreValue:200,
    arrayIndex:0,
    active:true,
    ctor:function (moleType,arrayIndex,xPosition,yPosition) {
        var moleName = "Mole_0" + moleType + ".png";
        this._super("#"+moleName);
        this.setPosition(xPosition,yPosition);
        this.arrayIndex = arrayIndex;

        if (this.active) {
           this.schedule(this.jumpMole, this.getRandom(3,7));
        }
    },
    jumpMole:function () {
        var actionUp = cc.jumpBy(1, cc.p(0, 0), 10, 2);
        var delay = cc.delayTime(0.25);
        this.runAction(
    		   cc.sequence(actionUp, delay));
    },
    destroy:function () {
        GAME.SCORE += this.scoreValue;
        GAME.MOLECOUNT--;
        GAME.MOLE_XPOSITION[this.arrayIndex][1] = true;

        if(GAME.SOUND){
        	cc.audioEngine.playEffect(res.s_explodeEffect_mp3);
        }

        var moleSprite = new cc.Sprite("#Mole_04.png");
		moleSprite.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
		moleSprite.setScale(3);
		moleSprite.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
		this.addChild(moleSprite, 3000, 99999);
		moleSprite.runAction(cc.sequence(cc.scaleTo(0.5, 0.5, 0.5),
                                         cc.delayTime(0.5),
                                         cc.sequence(cc.scaleTo(0, 0, 0))
                                         ));
		this.setPosition(g_hideMolePos);
        this.setOpacity(0);
		this.stopAllActions();
    },
    getRandom:function( _min, _max ) {
	    var _value = _max * Math.random() + _min;
        return parseInt(_value);
    },
    collideRect:function (x, y) {
    	var w = this.width, h = this.height;
    	return cc.rect(x - w / 2, y - h / 2, w, h);
    }
});
Mole.createMole = function(moleType,arrayIndex,xPosition,yPosition) {	
	var m = new Mole(moleType,arrayIndex,xPosition,yPosition);
	GAME.CONTAINER.MOLES.push(m);
    GAME.MOLECOUNT++;
    return m;
};