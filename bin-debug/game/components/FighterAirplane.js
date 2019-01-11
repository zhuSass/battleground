var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**飞机对象**/
var FighterAirplane = (function (_super) {
    __extends(FighterAirplane, _super);
    function FighterAirplane(airplaneType) {
        var _this = _super.call(this) || this;
        _this.airplaneConfig = FighterAirplane.airplaneList[airplaneType];
        _this.airplaneType = airplaneType;
        var texture = RES.getRes(_this.airplaneConfig.textureName);
        _this.bmp = new egret.Bitmap(texture);
        _this.addChild(_this.bmp);
        // 加载爆炸音频
        if (!FighterAirplane.explodeSound[airplaneType]) {
            FighterAirplane.explodeSound[airplaneType] = RES.getRes(_this.airplaneConfig.explodeSoundName);
        }
        _this.fireTimer = new egret.Timer(_this.airplaneConfig.fireDelay);
        _this.fireTimer.addEventListener(egret.TimerEvent.TIMER, _this.createBullet, _this);
        return _this;
    }
    /**生产飞机*/
    FighterAirplane.produce = function (airplaneType) {
        if (FighterAirplane.cacheDict[airplaneType] == null)
            FighterAirplane.cacheDict[airplaneType] = [];
        var dict = FighterAirplane.cacheDict[airplaneType];
        var theFighter;
        if (dict.length > 0) {
            theFighter = dict.pop();
        }
        else {
            theFighter = new FighterAirplane(airplaneType);
        }
        return theFighter;
    };
    /**回收*/
    FighterAirplane.reclaim = function (theFighter) {
        var textureName = theFighter.airplaneConfig.textureName;
        if (FighterAirplane.cacheDict[textureName] == null)
            FighterAirplane.cacheDict[textureName] = [];
        var dict = FighterAirplane.cacheDict[textureName];
        if (dict.indexOf(theFighter) == -1)
            dict.push(theFighter);
    };
    /**开火*/
    FighterAirplane.prototype.fire = function () {
        this.fireTimer.start();
    };
    /**停火*/
    FighterAirplane.prototype.stopFire = function () {
        this.fireTimer.stop();
    };
    /**创建子弹*/
    FighterAirplane.prototype.createBullet = function (evt) {
        this.dispatchEventWith("createBullet");
    };
    /**创建爆炸粒子**/
    FighterAirplane.prototype.createExplodeParticle = function () {
        var config = RES.getRes(this.airplaneConfig.particleConfigName);
        this.particleExplode = new particle.GravityParticleSystem(RES.getRes(this.airplaneConfig.particleTextureName), config);
        this.particleExplode.emitterX = this.width / 2;
        this.particleExplode.emitterY = this.height / 2;
    };
    /**
     * 销毁飞机
     * @param parentView 当前显示对象的父级
     * @param isDestroy 是否销毁当前对象,默认true
     * **/
    FighterAirplane.prototype.destroyAirplane = function (parentView, isDestroy) {
        var _this = this;
        if (isDestroy === void 0) { isDestroy = true; }
        // 
        var channe;
        if (isDestroy) {
            // 爆炸粒子
            this.createExplodeParticle();
            this.addChild(this.particleExplode);
            this.particleExplode.start();
            // 爆炸声
            channe = FighterAirplane.explodeSound[this.airplaneType].play(0, 1);
            channe.volume = 0.5;
        }
        var timer = new egret.Timer(500, 1);
        timer.addEventListener(egret.TimerEvent.TIMER, function () {
            if (isDestroy) {
                channe.stop();
                parentView.removeChild(_this);
            }
        }, this);
        timer.start();
    };
    /**飞机对象数据**/
    FighterAirplane.airplaneList = {
        airplane1: {
            blood: 10,
            currentBlood: 10,
            fireDelay: 100,
            textureName: 'airplane1_png',
            particleTextureName: 'particle_1_png',
            particleConfigName: 'particle_1_json',
            explodeSoundName: 'explode3_mp1',
        },
        airplane2: {
            blood: 10,
            currentBlood: 10,
            fireDelay: 1000,
            textureName: 'airplane2_png',
            particleTextureName: 'particle_1_png',
            particleConfigName: 'particle_1_json',
            explodeSoundName: 'explode3_mp2',
        },
        airplane3: {
            blood: 10,
            currentBlood: 10,
            fireDelay: 1000,
            textureName: 'airplane3_png',
            particleTextureName: 'particle_1_png',
            particleConfigName: 'particle_1_json',
            explodeSoundName: 'explode3_mp3',
        },
    };
    /**缓存飞机对象**/
    FighterAirplane.cacheDict = {};
    /**缓存爆炸音频对象**/
    FighterAirplane.explodeSound = {};
    return FighterAirplane;
}(egret.Sprite));
__reflect(FighterAirplane.prototype, "FighterAirplane");
