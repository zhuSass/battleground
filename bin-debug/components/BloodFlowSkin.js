var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BloodFlowSkin = (function (_super) {
    __extends(BloodFlowSkin, _super);
    function BloodFlowSkin() {
        var _this = _super.call(this) || this;
        _this.width = 300;
        _this.height = 20;
        _this.minimum = 0;
        _this.maximum = 100;
        return _this;
    }
    BloodFlowSkin.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BloodFlowSkin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return BloodFlowSkin;
}(eui.ProgressBar));
__reflect(BloodFlowSkin.prototype, "BloodFlowSkin", ["eui.UIComponent", "egret.DisplayObject"]);
