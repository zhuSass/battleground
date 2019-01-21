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
/**
 * 主容器
 */
var GamePlayView = (function (_super) {
    __extends(GamePlayView, _super);
    function GamePlayView() {
        var _this = _super.call(this) || this;
        _this.sp = new egret.Sprite();
        _this.sp.touchEnabled = true;
        _this.addChild(_this.sp);
        return _this;
    }
    GamePlayView.prototype.showGame = function (index) {
        this.sp.removeChildren();
        switch (index) {
            case 1:
                var game1 = new GameFightOneView();
                this.sp.addChild(game1);
                this.target = game1;
                break;
            case 2:
                var game2 = new GameFightTwoView();
                this.sp.addChild(game2);
                this.target = game2;
                break;
        }
    };
    return GamePlayView;
}(egret.Sprite));
__reflect(GamePlayView.prototype, "GamePlayView");
