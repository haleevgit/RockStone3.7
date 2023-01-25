System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, ItemType;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "00d62EDjh9E3q3UdJ3D0yF6", "ItemType", undefined);

      (function (ItemType) {
        ItemType[ItemType["None"] = 0] = "None";
        ItemType[ItemType["Flower1"] = 1] = "Flower1";
        ItemType[ItemType["Flower2"] = 2] = "Flower2";
        ItemType[ItemType["BonusBox"] = 3] = "BonusBox";
      })(ItemType || (ItemType = {}));

      _export("default", ItemType);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=10a968a197aaa571118fdd574940161d96751ece.js.map