class FighterBullet extends egret.Bitmap {
    /**缓存子弹对象**/
    private static cacheDict:Object = {};
    /**生产*/
    public static produce(textureName:string):FighterBullet
    {
        if(FighterBullet.cacheDict[textureName]==null)
            FighterBullet.cacheDict[textureName] = [];
        var dict:FighterBullet[] = FighterBullet.cacheDict[textureName];
        var bullet:FighterBullet;
        if(dict.length>0) {
            bullet = dict.pop();
        } else {
            bullet = new FighterBullet(RES.getRes(textureName),textureName);
        }
        return bullet;
    }
    /**回收*/
    public static reclaim(bullet:FighterBullet):void
    {
        var textureName: string = bullet.textureName;
        if(FighterBullet.cacheDict[textureName]==null) {
            FighterBullet.cacheDict[textureName] = [];
        }
        
        var dict:FighterBullet[] = FighterBullet.cacheDict[textureName];
        if(dict.indexOf(bullet)==-1)
            dict.push(bullet);
    }

    public textureName:string;//可视为子弹类型名

    public constructor(texture:egret.Texture,textureName: string) {
        super(texture);
        this.textureName = textureName;
    }
}