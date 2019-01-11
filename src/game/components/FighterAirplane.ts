/**飞机对象**/
class FighterAirplane extends egret.Sprite{
    /**爆炸声音**/
    private explodeSound:egret.Sound;
    /**飞机位图*/
    private bmp:egret.Bitmap;
    /**飞机类型*/
    private airplaneType:string;
    /**定时射*/
    private fireTimer:egret.Timer;
    /**飞机爆炸粒子对象**/
    private particleExplode:particle.GravityParticleSystem;
    /**飞机配置参数**/ 
    public airplaneConfig:{
        /**创建子弹的时间间隔*/
        fireDelay:number,
        /**飞机生命值*/
        blood:number,
        /**当前飞机生命值*/
        currentBlood:number,
        /**可视为飞机类型名**/
        textureName:string,
        /**粒子纹理名称**/
        particleTextureName: string,
        /**粒子配置文件名称**/
        particleConfigName: string,
        /**粒子爆炸声音名字**/
        explodeSoundName: string,
    };

    /**飞机对象数据**/
    public static airplaneList:Object = {
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
    private static cacheDict:Object = {};
    /**缓存爆炸音频对象**/
    private static explodeSound:Object = {};
    /**生产飞机*/
    public static produce(airplaneType:string):FighterAirplane
    {	
        if(FighterAirplane.cacheDict[airplaneType]==null)
            FighterAirplane.cacheDict[airplaneType] = [];
        var dict:FighterAirplane[] = FighterAirplane.cacheDict[airplaneType];
        var theFighter:FighterAirplane;
        if(dict.length>0) {
            theFighter = dict.pop();
        } else {
            theFighter = new FighterAirplane(airplaneType);
        }
        return theFighter;
    }
    /**回收*/
    public static reclaim(theFighter:FighterAirplane):void
    {
        var textureName: string = theFighter.airplaneConfig.textureName;
        if(FighterAirplane.cacheDict[textureName]==null)
            FighterAirplane.cacheDict[textureName] = [];
        var dict:FighterAirplane[] = FighterAirplane.cacheDict[textureName];
        if(dict.indexOf(theFighter)==-1)
            dict.push(theFighter);
    }
    
    public constructor(airplaneType:string) {
        super();

        this.airplaneConfig = FighterAirplane.airplaneList[airplaneType];
        this.airplaneType = airplaneType;
        // 飞机显示对象
        const texture:egret.Texture = RES.getRes(this.airplaneConfig.textureName);
        this.bmp = new egret.Bitmap(texture);
        this.addChild(this.bmp);
        // 爆炸粒子显示对象
        this.createExplodeParticle();
        this.addChild(this.particleExplode);
        // 加载爆炸音频
        if (!FighterAirplane.explodeSound[airplaneType]) {
            FighterAirplane.explodeSound[airplaneType] = RES.getRes(this.airplaneConfig.explodeSoundName);
        }

        this.fireTimer = new egret.Timer(this.airplaneConfig.fireDelay);
        this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
    }
    /**开火*/
    public fire():void {
        this.fireTimer.start();
    }
    /**停火*/
    public stopFire():void {
        this.fireTimer.stop();
    }
    /**创建子弹*/
    private createBullet(evt:egret.TimerEvent):void {
        this.dispatchEventWith("createBullet");
    }
    /**创建爆炸粒子**/ 
    public createExplodeParticle() {
        let config = RES.getRes(this.airplaneConfig.particleConfigName);
        this.particleExplode = new particle.GravityParticleSystem(RES.getRes(this.airplaneConfig.particleTextureName), config);
        this.particleExplode.emitterX = this.width / 2;
        this.particleExplode.emitterY = this.height / 2;
    }
    /**
     * 销毁飞机
     * @param parentView 当前显示对象的父级
     * @param isDestroy 是否销毁当前对象,默认true
     * **/
    public destroyAirplane(parentView:egret.Sprite, isDestroy:boolean=true):void {
        let channe:egret.SoundChannel;
        if (isDestroy) {
            this.particleExplode.start();
            channe =  FighterAirplane.explodeSound[this.airplaneType].play(0, 1);
            channe.volume = 0.5;
        }

        let timer:egret.Timer=new egret.Timer(500,1);
        timer.addEventListener(egret.TimerEvent.TIMER,() => {
            if (isDestroy) {
                channe.stop();
                parentView.removeChild(this);
            }
        },this)
        timer.start();
    }
}