/**
 * 场景1
 * **/ 
class GameFightOneView extends egret.Sprite {
        private stageW:number;
        /**@private*/
        private stageH:number;
        /**我的飞机生命条显示对象**/
        private myProgressBar:TestB;
        /**开始按钮*/
        private btnStart;
        /**可滚动背景*/
        private bg:FighterBgMap;
        /**我的飞机*/
        private myFighter:FighterAirplane;
        /**我的子弹*/
        private myBullets:FighterBullet[] = [];
        /**敌人的飞机*/
        private enemyFighters:FighterAirplane[] = [];
        /**触发创建敌机的间隔*/
        private enemyFightersTimer:egret.Timer = new egret.Timer(1000);
        /**敌人的子弹*/
        private enemyBullets:FighterBullet[] = [];
        /**我的成绩*/
        private myScore:number = 0;
        /**@private*/
        private _lastTime:number;

        public constructor() {
            super();
            this._lastTime = egret.getTimer();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
        /**初始化*/
        private onAddToStage(event:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.createGameScene();
        }
        private vBar:eui.ProgressBar;
        /**创建游戏场景*/
        private createGameScene():void{
            //背景
            this.bg = new FighterBgMap();//创建可滚动的背景
            this.addChild(this.bg);
            //我的飞机
            // EXML.load("resource/ui_components/MyBloodFlow.exml",this.createMyAirplaneLife,this);
            // RES.getResByUrl("https://dufangyu.com/resource/ui_components/MyBloodFlow.exml", this.createMyAirplaneLife, this);
            this.createMyAirplaneLife();
            this.myFighter = new FighterAirplane("airplane1");
            this.myFighter.y = Const.SCENT_HEIGHT-this.myFighter.height-50;
            this.addChild(this.myFighter);
            this.gameStart();
            //预创建
            this.preCreatedInstance();

            
        }
        /**预创建一些对象，减少游戏时的创建消耗*/
        private preCreatedInstance():void {
            let i:number = 0;
            let objArr:any[] = [];
            for(i=0;i<20;i++) {
                let bullet = FighterBullet.produce("bullet1_png");
                objArr.push(bullet);
            }
            for(i=0;i<20;i++) {
                let bullet = objArr.pop();
                FighterBullet.reclaim(bullet);
            }
            for(i=0;i<20;i++) {
                let bullet = FighterBullet.produce("bullet2_png");
                objArr.push(bullet);
            }
            for(i=0;i<20;i++) {
                let bullet = objArr.pop();
                FighterBullet.reclaim(bullet);
            }
            for(i=0;i<20;i++) {
                let enemyFighter:FighterAirplane = FighterAirplane.produce("airplane3");
                objArr.push(enemyFighter);
            }
            for(i=0;i<20;i++) {
                let enemyFighter = objArr.pop();
                FighterAirplane.reclaim(enemyFighter);
            }
        }
        /**创建我的飞机生命条**/
        private createMyAirplaneLife():void {
            // var exml = 
            //  `<e:ProgressBar xmlns:e="http://ns.egret.com/eui">
            //     <e:Skin>
            //         <e:Image  width="100%" height="100%" source="resource/assets/progressBarBg.png"/>
            //         <e:Image id="thumb" width="100%" height="100%" source="resource/assets/progressBar.png"/>
            //     </e:Skin>
            // </e:ProgressBar>`;

            // const progressBar = EXML.parse(exml);
            // 'resource/ui_components/MyBloodFlow.exml'
            // const clazz = RES.getResByUrl("https://dufangyu.com/resource/ui_components/MyBloodFlow.exml");
            
            // this.myProgressBar = new eui.ProgressBar();
            // this.myProgressBar.skinName = data;
            this.myProgressBar = new TestB();
            this.myProgressBar.x = 10;
            this.myProgressBar.y = 10;
            this.myProgressBar.width = 300;
            this.myProgressBar.height = 20;
            this.myProgressBar.minimum = 0;
            this.myProgressBar.maximum = 100;
            this.myProgressBar.value = 100;
            console.log(this.myProgressBar);
            this.addChild(this.myProgressBar);
        }
        /**游戏开始*/
        private gameStart():void{
            this.myScore = 0;
            this.bg.start();
            this.touchEnabled=true;
            this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
            this.myFighter.x = (Const.SCENT_WIDTH-this.myFighter.width)/2;
            this.myFighter.fire();//开火
            this.myFighter.airplaneConfig.currentBlood = 10;
            this.myFighter.addEventListener("createBullet",this.createBulletHandler,this);
            this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER,this.createEnemyFighter,this);
            this.enemyFightersTimer.start();
        }
        /**响应Touch*/
        private touchHandler(evt:egret.TouchEvent):void{
            if(evt.type==egret.TouchEvent.TOUCH_MOVE)
            {
                let tx:number = evt.localX - (this.myFighter.width / 2);
                tx = Math.max(0,tx);
                tx = Math.min(Const.SCENT_WIDTH-this.myFighter.width,tx);
                let ty:number = evt.localY - (this.myFighter.height / 2);
                ty = Math.max(0,ty);
                ty = Math.min(Const.SCENT_HEIGHT-this.myFighter.height,ty);

                this.myFighter.x = tx;
                this.myFighter.y = ty;
            }
        }
        /**创建子弹(包括我的子弹和敌机的子弹)*/
        private createBulletHandler(evt:egret.Event):void{
            let bullet:FighterBullet;
            if(evt.target==this.myFighter) {
                for(let i:number=0;i<2;i++) {
                    bullet = FighterBullet.produce("bullet1_png");
                    bullet.x = i==0?(this.myFighter.x+10):(this.myFighter.x+this.myFighter.width-22);
                    bullet.y = this.myFighter.y+30;
                    this.addChildAt(bullet,this.numChildren-1-this.enemyFighters.length);
                    this.myBullets.push(bullet);
                }
            } else {
                let theFighter:FighterAirplane = evt.target;
                bullet = FighterBullet.produce("bullet2_png");
                bullet.x = theFighter.x+28;
                bullet.y = theFighter.y+10;
                this.addChildAt(bullet,this.numChildren-1-this.enemyFighters.length);
                this.enemyBullets.push(bullet);
            }
        }
        /**创建敌机*/
        private createEnemyFighter(evt:egret.TimerEvent):void{
            let enemyFighter:FighterAirplane = FighterAirplane.produce("airplane3");
            enemyFighter.x = Math.random()*(Const.SCENT_WIDTH-enemyFighter.width);
            enemyFighter.y = -enemyFighter.height-Math.random()*300;
            enemyFighter.addEventListener("createBullet",this.createBulletHandler,this);
            enemyFighter.fire();
            this.addChildAt(enemyFighter,this.numChildren-1);
            this.enemyFighters.push(enemyFighter);
        }
        /**游戏画面更新*/
        private gameViewUpdate(evt:egret.Event):void{
            //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
            let nowTime:number = egret.getTimer();
            let fps:number = 1000/(nowTime-this._lastTime);
            this._lastTime = nowTime;
            let speedOffset:number = 60/fps;
            //我的子弹运动
            let i:number = 0;
            let bullet:FighterBullet;
            let myBulletsCount:number = this.myBullets.length;
            for(;i < myBulletsCount;i++){
                bullet = this.myBullets[i];
                if(bullet.y < -bullet.height){
                    this.removeChild(bullet);
                    FighterBullet.reclaim(bullet);
                    this.myBullets.splice(i,1);
                    i--;
                    myBulletsCount--;
                }
                bullet.y -= 12 * speedOffset;
                  
            }
            //敌人飞机运动
            let theFighter:FighterAirplane;
            let enemyFighterCount:number = this.enemyFighters.length;
              for(i = 0;i < enemyFighterCount;i++){
                theFighter = this.enemyFighters[i];
                if(theFighter.y>Const.SCENT_HEIGHT){
                    this.removeChild(theFighter);
                    FighterAirplane.reclaim(theFighter);
                    theFighter.removeEventListener("createBullet",this.createBulletHandler,this);
                    theFighter.stopFire();
                    this.enemyFighters.splice(i,1);
                    i--;
                    enemyFighterCount--;
                }
                theFighter.y += 4 * speedOffset;
                
            }
            //敌人子弹运动
            let enemyBulletsCount:number = this.enemyBullets.length;
           for(i = 0;i < enemyBulletsCount;i++){
                bullet = this.enemyBullets[i];
                 if(bullet.y>Const.SCENT_HEIGHT){
                    this.removeChild(bullet);
                    FighterBullet.reclaim(bullet);
                    this.enemyBullets.splice(i,1);
                    i--;
                    enemyBulletsCount--;//数组长度已经改变
                }
                
                bullet.y += 8 * speedOffset;
               
            }
            this.gameHitTest();
        }
        /**游戏碰撞检测*/
        private gameHitTest():void {
            let i:number,j:number;
            let bullet:FighterBullet;
            let theFighter:FighterAirplane;
            let myBulletsCount:number = this.myBullets.length;
            let enemyFighterCount:number = this.enemyFighters.length;
            let enemyBulletsCount:number = this.enemyBullets.length;
            //将需消失的子弹和飞机记录
            let delBullets:FighterBullet[] = [];
            let delFighters:FighterAirplane[] = [];
            //我的子弹可以消灭敌机
            for(i=0;i<myBulletsCount;i++) {
                bullet = this.myBullets[i];
                for(j=0;j<enemyFighterCount;j++) {
                    theFighter = this.enemyFighters[j];
                    if(Tools.hitTest(theFighter,bullet)) {
                        theFighter.airplaneConfig.currentBlood -= 2;
                        if(delBullets.indexOf(bullet)==-1)
                            delBullets.push(bullet);
                        if(theFighter.airplaneConfig.currentBlood<=0 && delFighters.indexOf(theFighter)==-1)
                            delFighters.push(theFighter);
                    }
                }
            }
            //敌人的子弹可以减我血
            for(i=0;i<enemyBulletsCount;i++) {
                bullet = this.enemyBullets[i];
                if(Tools.hitTest(this.myFighter,bullet)) {
                    this.myFighter.airplaneConfig.currentBlood -= 1;
                    console.log(this.myProgressBar.value)
                    this.myProgressBar.value = (this.myFighter.airplaneConfig.currentBlood / this.myFighter.airplaneConfig.blood) * 100;
                    if(delBullets.indexOf(bullet)==-1) {
                        delBullets.push(bullet);
                    }
                }
            }
            //敌机的撞击可以消灭我
            for(i=0;i<enemyFighterCount;i++) {
                theFighter = this.enemyFighters[i];
                if(Tools.hitTest(this.myFighter,theFighter)) {
                    this.myFighter.airplaneConfig.currentBlood -= 10;
                }
            }
            if(this.myFighter.airplaneConfig.currentBlood<=0) {
                this.gameStop();
            } else {
                while(delBullets.length>0) {
                    bullet = delBullets.pop();
                    this.removeChild(bullet);
                    if(bullet.textureName=="bullet1_png")
                        this.myBullets.splice(this.myBullets.indexOf(bullet),1);
                    else
                        this.enemyBullets.splice(this.enemyBullets.indexOf(bullet),1);
                    FighterBullet.reclaim(bullet);
                }
                this.myScore += delFighters.length;
                while(delFighters.length>0) {
                    theFighter = delFighters.pop();
                    theFighter.stopFire();
                    theFighter.removeEventListener("createBullet",this.createBulletHandler,this);
                    theFighter.destroyAirplane(this);
                    this.enemyFighters.splice(this.enemyFighters.indexOf(theFighter),1);
                    FighterAirplane.reclaim(theFighter);
                }
            }
        }
        /**游戏结束*/
        private gameStop():void{
            this.bg.pause();
            this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
            this.myFighter.stopFire();
            this.myFighter.removeEventListener("createBullet",this.createBulletHandler,this);
            this.enemyFightersTimer.removeEventListener(egret.TimerEvent.TIMER,this.createEnemyFighter,this);
            this.enemyFightersTimer.stop();
            //清理子弹
            let i:number = 0;
            let bullet:FighterBullet;
            while(this.myBullets.length>0) {
                bullet = this.myBullets.pop();
                this.removeChild(bullet);
                FighterBullet.reclaim(bullet);
            }
            while(this.enemyBullets.length>0) {
                bullet = this.enemyBullets.pop();
                this.removeChild(bullet);
                FighterBullet.reclaim(bullet);
            }
            //清理飞机
            let theFighter:FighterAirplane;
            while(this.enemyFighters.length>0) {
                theFighter = this.enemyFighters.pop();
                theFighter.stopFire();
                theFighter.removeEventListener("createBullet",this.createBulletHandler,this);
                this.removeChild(theFighter);
                FighterAirplane.reclaim(theFighter);
            }
    }
}