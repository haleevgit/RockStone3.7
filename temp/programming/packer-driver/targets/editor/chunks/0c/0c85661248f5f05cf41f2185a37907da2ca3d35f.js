System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, Events;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "910660i/8dMq6XP6HEejuWS", "Events", undefined);

      (function (Events) {
        Events["ItemChosen"] = "item_chosen";
        Events["ItemDropped"] = "item_dropped";
        Events["ItemSet"] = "item_set";
        Events["INPUT"] = "input";
      })(Events || (Events = {}));

      _export("default", Events);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0c85661248f5f05cf41f2185a37907da2ca3d35f.js.map