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
var GameSceneView = (function (_super) {
    __extends(GameSceneView, _super);
    function GameSceneView() {
        var _this = _super.call(this) || this;
        GameSceneView._gameScene = _this;
        _this.initView();
        return _this;
    }
    GameSceneView.prototype.initView = function () {
        this.thisContainer = new egret.Sprite();
        this.addChild(this.thisContainer);
        this.start();
    };
    GameSceneView.prototype.start = function () {
        this.removeAll();
        var gameStart = new GameStartView();
        this.thisContainer.addChild(gameStart);
    };
    GameSceneView.prototype.play = function () {
        this.removeAll();
        var gamePlay = new GamePlayView();
        this.thisContainer.addChild(gamePlay);
        gamePlay.showGame(GameData.currentScene);
    };
    // public over():void
    // {
    //     this.removeAll();
    //     var gameOver:GameOverView = new GameOverView();
    //     this.thisContainer.addChild(gameOver);
    // }
    GameSceneView.prototype.removeAll = function () {
        this.thisContainer.removeChildren();
    };
    return GameSceneView;
}(egret.Sprite));
__reflect(GameSceneView.prototype, "GameSceneView");
