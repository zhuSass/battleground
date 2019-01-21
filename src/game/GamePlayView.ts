/**
 * 主容器
 */
class GamePlayView extends egret.Sprite{
    private thisContainer:egret.Bitmap;
    private target;
    private optionView;
    private sp:egret.Sprite;

    constructor() {
        super();
        this.sp = new egret.Sprite();
        this.sp.touchEnabled = true;
        this.addChild(this.sp);
    }
    public showGame(index:number):void {
         this.sp.removeChildren();
         switch (index) {
             case 1:
                const game1: GameFightOneView = new GameFightOneView();
                this.sp.addChild(game1);
                this.target = game1;
                break;
            case 2:
                const game2: GameFightTwoView = new GameFightTwoView();
                this.sp.addChild(game2);
                this.target = game2;
                break;
         }
    }
}