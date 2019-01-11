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
 * 场景1
 * **/
var GameFightOneView = (function (_super) {
    __extends(GameFightOneView, _super);
    function GameFightOneView() {
        var _this = _super.call(this) || this;
        /**我的子弹*/
        _this.myBullets = [];
        /**敌人的飞机*/
        _this.enemyFighters = [];
        /**触发创建敌机的间隔*/
        _this.enemyFightersTimer = new egret.Timer(1000);
        /**敌人的子弹*/
        _this.enemyBullets = [];
        /**我的成绩*/
        _this.myScore = 0;
        _this._lastTime = egret.getTimer();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    /**初始化*/
    GameFightOneView.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createGameScene();
    };
    /**创建游戏场景*/
    GameFightOneView.prototype.createGameScene = function () {
        //背景
        this.bg = new FighterBgMap(); //创建可滚动的背景
        this.addChild(this.bg);
        //我的飞机
        this.myFighter = new FighterAirplane("airplane1");
        this.myFighter.y = Const.SCENT_HEIGHT - this.myFighter.height - 50;
        this.addChild(this.myFighter);
        this.gameStart();
        //预创建
        this.preCreatedInstance();
    };
    /**预创建一些对象，减少游戏时的创建消耗*/
    GameFightOneView.prototype.preCreatedInstance = function () {
        var i = 0;
        var objArr = [];
        for (i = 0; i < 20; i++) {
            var bullet = FighterBullet.produce("bullet1_png");
            objArr.push(bullet);
        }
        for (i = 0; i < 20; i++) {
            var bullet = objArr.pop();
            FighterBullet.reclaim(bullet);
        }
        for (i = 0; i < 20; i++) {
            var bullet = FighterBullet.produce("bullet2_png");
            objArr.push(bullet);
        }
        for (i = 0; i < 20; i++) {
            var bullet = objArr.pop();
            FighterBullet.reclaim(bullet);
        }
        for (i = 0; i < 20; i++) {
            var enemyFighter = FighterAirplane.produce("airplane3");
            objArr.push(enemyFighter);
        }
        for (i = 0; i < 20; i++) {
            var enemyFighter = objArr.pop();
            FighterAirplane.reclaim(enemyFighter);
        }
    };
    /**游戏开始*/
    GameFightOneView.prototype.gameStart = function () {
        this.myScore = 0;
        this.bg.start();
        this.touchEnabled = true;
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.myFighter.x = (Const.SCENT_WIDTH - this.myFighter.width) / 2;
        this.myFighter.fire(); //开火
        this.myFighter.airplaneConfig.currentBlood = 10;
        this.myFighter.addEventListener("createBullet", this.createBulletHandler, this);
        this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
        this.enemyFightersTimer.start();
    };
    /**响应Touch*/
    GameFightOneView.prototype.touchHandler = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
            var tx = evt.localX;
            tx = Math.max(0, tx);
            tx = Math.min(Const.SCENT_WIDTH - this.myFighter.width, tx);
            this.myFighter.x = tx;
        }
    };
    /**创建子弹(包括我的子弹和敌机的子弹)*/
    GameFightOneView.prototype.createBulletHandler = function (evt) {
        var bullet;
        if (evt.target == this.myFighter) {
            for (var i = 0; i < 2; i++) {
                bullet = FighterBullet.produce("bullet1_png");
                bullet.x = i == 0 ? (this.myFighter.x + 10) : (this.myFighter.x + this.myFighter.width - 22);
                bullet.y = this.myFighter.y + 30;
                this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
                this.myBullets.push(bullet);
            }
        }
        else {
            var theFighter = evt.target;
            bullet = FighterBullet.produce("bullet2_png");
            bullet.x = theFighter.x + 28;
            bullet.y = theFighter.y + 10;
            this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
            this.enemyBullets.push(bullet);
        }
    };
    /**创建敌机*/
    GameFightOneView.prototype.createEnemyFighter = function (evt) {
        var enemyFighter = FighterAirplane.produce("airplane3");
        enemyFighter.x = Math.random() * (Const.SCENT_WIDTH - enemyFighter.width);
        enemyFighter.y = -enemyFighter.height - Math.random() * 300;
        enemyFighter.addEventListener("createBullet", this.createBulletHandler, this);
        enemyFighter.fire();
        this.addChildAt(enemyFighter, this.numChildren - 1);
        this.enemyFighters.push(enemyFighter);
    };
    /**游戏画面更新*/
    GameFightOneView.prototype.gameViewUpdate = function (evt) {
        //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
        var nowTime = egret.getTimer();
        var fps = 1000 / (nowTime - this._lastTime);
        this._lastTime = nowTime;
        var speedOffset = 60 / fps;
        //我的子弹运动
        var i = 0;
        var bullet;
        var myBulletsCount = this.myBullets.length;
        for (; i < myBulletsCount; i++) {
            bullet = this.myBullets[i];
            if (bullet.y < -bullet.height) {
                this.removeChild(bullet);
                FighterBullet.reclaim(bullet);
                this.myBullets.splice(i, 1);
                i--;
                myBulletsCount--;
            }
            bullet.y -= 12 * speedOffset;
        }
        //敌人飞机运动
        var theFighter;
        var enemyFighterCount = this.enemyFighters.length;
        for (i = 0; i < enemyFighterCount; i++) {
            theFighter = this.enemyFighters[i];
            if (theFighter.y > Const.SCENT_HEIGHT) {
                this.removeChild(theFighter);
                FighterAirplane.reclaim(theFighter);
                theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
                theFighter.stopFire();
                this.enemyFighters.splice(i, 1);
                i--;
                enemyFighterCount--;
            }
            theFighter.y += 4 * speedOffset;
        }
        //敌人子弹运动
        var enemyBulletsCount = this.enemyBullets.length;
        for (i = 0; i < enemyBulletsCount; i++) {
            bullet = this.enemyBullets[i];
            if (bullet.y > Const.SCENT_HEIGHT) {
                this.removeChild(bullet);
                FighterBullet.reclaim(bullet);
                this.enemyBullets.splice(i, 1);
                i--;
                enemyBulletsCount--; //数组长度已经改变
            }
            bullet.y += 8 * speedOffset;
        }
        this.gameHitTest();
    };
    /**游戏碰撞检测*/
    GameFightOneView.prototype.gameHitTest = function () {
        var i, j;
        var bullet;
        var theFighter;
        var myBulletsCount = this.myBullets.length;
        var enemyFighterCount = this.enemyFighters.length;
        var enemyBulletsCount = this.enemyBullets.length;
        //将需消失的子弹和飞机记录
        var delBullets = [];
        var delFighters = [];
        //我的子弹可以消灭敌机
        for (i = 0; i < myBulletsCount; i++) {
            bullet = this.myBullets[i];
            for (j = 0; j < enemyFighterCount; j++) {
                theFighter = this.enemyFighters[j];
                if (Tools.hitTest(theFighter, bullet)) {
                    theFighter.airplaneConfig.currentBlood -= 2;
                    if (delBullets.indexOf(bullet) == -1)
                        delBullets.push(bullet);
                    if (theFighter.airplaneConfig.currentBlood <= 0 && delFighters.indexOf(theFighter) == -1)
                        delFighters.push(theFighter);
                }
            }
        }
        //敌人的子弹可以减我血
        for (i = 0; i < enemyBulletsCount; i++) {
            bullet = this.enemyBullets[i];
            if (Tools.hitTest(this.myFighter, bullet)) {
                this.myFighter.airplaneConfig.currentBlood -= 1;
                if (delBullets.indexOf(bullet) == -1)
                    delBullets.push(bullet);
            }
        }
        //敌机的撞击可以消灭我
        for (i = 0; i < enemyFighterCount; i++) {
            theFighter = this.enemyFighters[i];
            if (Tools.hitTest(this.myFighter, theFighter)) {
                this.myFighter.airplaneConfig.currentBlood -= 10;
            }
        }
        if (this.myFighter.airplaneConfig.currentBlood <= 0) {
            this.gameStop();
        }
        else {
            while (delBullets.length > 0) {
                bullet = delBullets.pop();
                this.removeChild(bullet);
                if (bullet.textureName == "bullet1_png")
                    this.myBullets.splice(this.myBullets.indexOf(bullet), 1);
                else
                    this.enemyBullets.splice(this.enemyBullets.indexOf(bullet), 1);
                FighterBullet.reclaim(bullet);
            }
            this.myScore += delFighters.length;
            while (delFighters.length > 0) {
                theFighter = delFighters.pop();
                theFighter.stopFire();
                theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
                theFighter.destroyAirplane(this);
                // this.removeChild(theFighter);
                this.enemyFighters.splice(this.enemyFighters.indexOf(theFighter), 1);
                FighterAirplane.reclaim(theFighter);
            }
        }
    };
    /**游戏结束*/
    GameFightOneView.prototype.gameStop = function () {
        this.bg.pause();
        this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.myFighter.stopFire();
        this.myFighter.removeEventListener("createBullet", this.createBulletHandler, this);
        this.enemyFightersTimer.removeEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
        this.enemyFightersTimer.stop();
        //清理子弹
        var i = 0;
        var bullet;
        while (this.myBullets.length > 0) {
            bullet = this.myBullets.pop();
            this.removeChild(bullet);
            FighterBullet.reclaim(bullet);
        }
        while (this.enemyBullets.length > 0) {
            bullet = this.enemyBullets.pop();
            this.removeChild(bullet);
            FighterBullet.reclaim(bullet);
        }
        //清理飞机
        var theFighter;
        while (this.enemyFighters.length > 0) {
            theFighter = this.enemyFighters.pop();
            theFighter.stopFire();
            theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
            this.removeChild(theFighter);
            FighterAirplane.reclaim(theFighter);
        }
    };
    return GameFightOneView;
}(egret.Sprite));
__reflect(GameFightOneView.prototype, "GameFightOneView");
