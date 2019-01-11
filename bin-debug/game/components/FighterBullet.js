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
var FighterBullet = (function (_super) {
    __extends(FighterBullet, _super);
    function FighterBullet(texture, textureName) {
        var _this = _super.call(this, texture) || this;
        _this.textureName = textureName;
        return _this;
    }
    /**生产*/
    FighterBullet.produce = function (textureName) {
        if (FighterBullet.cacheDict[textureName] == null)
            FighterBullet.cacheDict[textureName] = [];
        var dict = FighterBullet.cacheDict[textureName];
        var bullet;
        if (dict.length > 0) {
            bullet = dict.pop();
        }
        else {
            bullet = new FighterBullet(RES.getRes(textureName), textureName);
        }
        return bullet;
    };
    /**回收*/
    FighterBullet.reclaim = function (bullet) {
        var textureName = bullet.textureName;
        if (FighterBullet.cacheDict[textureName] == null) {
            FighterBullet.cacheDict[textureName] = [];
        }
        var dict = FighterBullet.cacheDict[textureName];
        if (dict.indexOf(bullet) == -1)
            dict.push(bullet);
    };
    /**缓存子弹对象**/
    FighterBullet.cacheDict = {};
    return FighterBullet;
}(egret.Bitmap));
__reflect(FighterBullet.prototype, "FighterBullet");
