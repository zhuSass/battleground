// GameStartView 页面容器
class GameStartView extends egret.Sprite {
    private textfield: egret.TextField;
    /**按钮点击音乐**/ 
    private btnSound: egret.Sound;
    /**点击按钮声音是否加载完**/
    private isBtnSoundDone: boolean;
    constructor() {
        super();
        this.createChildren();
    }
    /**初始化*/
    protected createChildren(): void {
        this.createGameScene();
    }
    // 创建游戏场景
    createGameScene() {
        let loginDisplay = this.createBitmapByName("login_bg_jpg");
        let stageW = Const.SCENT_WIDTH;
        let stageH = Const.SCENT_HEIGHT;
        this.addChild(loginDisplay);

        var text:egret.TextField = new egret.TextField();
        text.textColor = 0xffffff;
        text.width = 540;
        text.size = 30;
        text.lineSpacing = 40;
        text.textFlow = <Array<egret.ITextElement>>[
            {text: "决战", style: {"textColor": 0x336699, "size": 120, "strokeColor": 0x6699cc, "stroke": 2}},
            {text: "紫云颠", style: {"textColor": 0xf000f0, "size": 60, "strokeColor": 0x6699cc, "stroke": 2}},
        ];
        this.addChild(text);
        text.x = (Const.SCENT_WIDTH / 2 - text.textWidth / 2);
        text.y = 170;        
        var tw = egret.Tween.get(text);
        tw.to( 
            {x:150}
            , 1000 );

        let buttonLogin = this.createBitmapByName("button_login_png");
        buttonLogin.x = stageW / 2 - buttonLogin.width / 2;
        buttonLogin.y = stageH / 2 - buttonLogin.height / 2 + 120;
        buttonLogin.touchEnabled = true;//开启触碰
        buttonLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this)
        this.addChild(buttonLogin);

        this.loadBgSound();
        this.loadBtnClickSound();
    }
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
        加载背景声音
    **/ 
    private loadBgSound(): void {
        let sound:egret.Sound = new egret.Sound();;
        //sound 加载完成监听
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadBgComplete, this);

        sound.load("resource/assets/start_bg.mp3");
    }
    private onLoadBgComplete(event:egret.Event):void {
        //获取加载到的 Sound 对象
        let sound = <egret.Sound>event.target;
        //播放音乐
        var channel:egret.SoundChannel = sound.play();
        channel.volume = 0;
    }
    /**
        加载按钮点击声音
    **/ 
    private loadBtnClickSound(): void {
        this.btnSound = new egret.Sound();
        //sound 加载完成监听
        this.btnSound.addEventListener(egret.Event.COMPLETE, this.onLoadBtnComplete, this);

        this.btnSound.load("resource/assets/Button/btn_click_1.mp3");
    }
    private onLoadBtnComplete(event:egret.Event):void {
        this.isBtnSoundDone = true; // 加载完成
        // this.onButtonClick();
    }
    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick() {
        if (this.isBtnSoundDone) {
            //播放音乐
            var channel:egret.SoundChannel = this.btnSound.play(0, 1);
            channel.volume = 0.8;
        }
        GameSceneView._gameScene.play();
        this.removeAll();
    }
    private removeAll():void{
        this.removeChildren();
    }
}