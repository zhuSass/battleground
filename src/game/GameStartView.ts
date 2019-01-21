// GameStartView 页面容器
class GameStartView extends egret.Sprite {
    private textfield: egret.TextField;
    /**按钮点击音乐**/ 
    private btnSound: egret.Sound;
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
        text.lineSpacing = 40;
        text.textFlow = <Array<egret.ITextElement>>[
            {text: "决战", style: {"textColor": 0x336699, "size": 120, "strokeColor": 0x6699cc, "stroke": 2}},
            {text: "紫云颠", style: {"textColor": 0xf000f0, "size": 60, "strokeColor": 0x6699cc, "stroke": 2}},
        ];
        this.addChild(text);
        text.x = (Const.SCENT_WIDTH / 2 - text.textWidth / 2);
        text.y = (Const.SCENT_HEIGHT / 2 - text.textHeight / 2) - (text.textHeight * 2);        
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
        //sound 加载完成监听
        let sound:egret.Sound = RES.getRes("start_bg_mp3");
        var channel:egret.SoundChannel = sound.play();
        channel.volume = 0;
    }
    private onLoadBgComplete(event:egret.Event):void {
        //获取加载到的 Sound 对象
        let sound = <egret.Sound>event.target;
        //播放音乐
        var channel:egret.SoundChannel = sound.play();
        channel.volume = 0.5;
    }
    /**
        加载按钮点击声音
    **/ 
    private loadBtnClickSound(): void {
        this.btnSound = RES.getRes("btn_click_1_mp3");
    }
    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick() {
        //播放音乐
        const channel:egret.SoundChannel = this.btnSound.play(0, 1);
        channel.volume = 0.8;
        GameSceneView._gameScene.play();
        this.removeAll();
    }
    private removeAll():void{
        this.removeChildren();
    }
}