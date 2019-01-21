class GameFightTwoView extends egret.Sprite { 
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    onAddToStage() {
        console.log('GameFightTwoView')
        // this.addChild(new TestC());
    }
}