var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 系统数据
 */
var Const = (function () {
    function Const() {
    }
    /**容器宽**/
    Const.SCENT_WIDTH = 0;
    /**容器高**/
    Const.SCENT_HEIGHT = 0;
    Const.GamePoxY = 0;
    return Const;
}());
__reflect(Const.prototype, "Const");
