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
// GameStartView 页面容器
var GameStartView = (function (_super) {
    __extends(GameStartView, _super);
    function GameStartView() {
        var _this = _super.call(this) || this;
        _this.createChildren();
        return _this;
    }
    /**初始化*/
    GameStartView.prototype.createChildren = function () {
        this.createGameScene();
    };
    // 创建游戏场景
    GameStartView.prototype.createGameScene = function () {
        var loginDisplay = this.createBitmapByName("login_bg_jpg");
        var stageW = Const.SCENT_WIDTH;
        var stageH = Const.SCENT_HEIGHT;
        this.addChild(loginDisplay);
        var text = new egret.TextField();
        text.textColor = 0xffffff;
        text.width = 540;
        text.size = 30;
        text.lineSpacing = 40;
        text.textFlow = [
            { text: "决战", style: { "textColor": 0x336699, "size": 120, "strokeColor": 0x6699cc, "stroke": 2 } },
            { text: "紫云颠", style: { "textColor": 0xf000f0, "size": 60, "strokeColor": 0x6699cc, "stroke": 2 } },
        ];
        this.addChild(text);
        text.x = (Const.SCENT_WIDTH / 2 - text.textWidth / 2);
        text.y = 170;
        var tw = egret.Tween.get(text);
        tw.to({ x: 150 }, 1000);
        var buttonLogin = this.createBitmapByName("button_login_png");
        buttonLogin.x = stageW / 2 - buttonLogin.width / 2;
        buttonLogin.y = stageH / 2 - buttonLogin.height / 2 + 120;
        buttonLogin.touchEnabled = true; //开启触碰
        buttonLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.addChild(buttonLogin);
        this.loadBgSound();
        this.loadBtnClickSound();
    };
    GameStartView.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
        加载背景声音
    **/
    GameStartView.prototype.loadBgSound = function () {
        //sound 加载完成监听
        var sound = RES.getRes("start_bg_mp3");
        var channel = sound.play();
        channel.volume = 0;
    };
    GameStartView.prototype.onLoadBgComplete = function (event) {
        //获取加载到的 Sound 对象
        var sound = event.target;
        //播放音乐
        var channel = sound.play();
        channel.volume = 0;
    };
    /**
        加载按钮点击声音
    **/
    GameStartView.prototype.loadBtnClickSound = function () {
        this.btnSound = RES.getRes("btn_click_1_mp3");
    };
    /**
     * 点击按钮
     * Click the button
     */
    GameStartView.prototype.onButtonClick = function () {
        //播放音乐
        var channel = this.btnSound.play(0, 1);
        channel.volume = 0.8;
        GameSceneView._gameScene.play();
        this.removeAll();
    };
    GameStartView.prototype.removeAll = function () {
        this.removeChildren();
    };
    return GameStartView;
}(egret.Sprite));
__reflect(GameStartView.prototype, "GameStartView");
