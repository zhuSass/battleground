class TestB extends eui.ProgressBar {
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
        // this.skinName = "https://dufangyu.com/resource/ui_components/MyBloodFlow.exml";
        this.skinName = RES.getRes('MyBloodFlow');
        
    }
    protected createChildren() {
        super.createChildren();
        
        console.log("createChildren")
    }
    private onComplete():void{
        console.log("onComplete");
    }
}