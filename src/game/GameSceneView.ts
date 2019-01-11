class GameSceneView extends egret.Sprite
{
    public static _gameScene:GameSceneView;
    private thisContainer:egret.Sprite;
    constructor()
    {
        super();
        GameSceneView._gameScene = this;
        this.initView();
    }
    private initView():void
    {
        this.thisContainer = new egret.Sprite();
        this.addChild(this.thisContainer);

        this.start();
    }
    public start():void
    {
        this.removeAll();
        var gameStart:GameStartView = new GameStartView();
        this.thisContainer.addChild(gameStart);
    }
    public play():void
    {
        this.removeAll();
        var gamePlay:GamePlayView = new GamePlayView();
        this.thisContainer.addChild(gamePlay);
        gamePlay.showGame(GameData.currentScene);
    }
    // public over():void
    // {
    //     this.removeAll();
    //     var gameOver:GameOverView = new GameOverView();
    //     this.thisContainer.addChild(gameOver);
    // }
    private removeAll():void
    {
        this.thisContainer.removeChildren();
    }
}