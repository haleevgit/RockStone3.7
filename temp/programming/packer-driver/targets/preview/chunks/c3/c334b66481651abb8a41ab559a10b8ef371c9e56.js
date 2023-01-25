System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, InputType;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "74deaK1zCtBLoO9WV0EKQXe", "InputType", undefined);

      (function (InputType) {
        InputType[InputType["None"] = 0] = "None";
        InputType[InputType["Down"] = 1] = "Down";
        InputType[InputType["Move"] = 2] = "Move";
        InputType[InputType["Up"] = 3] = "Up";
        InputType[InputType["Cancel"] = 4] = "Cancel";
      })(InputType || (InputType = {}));

      _export("default", InputType);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c334b66481651abb8a41ab559a10b8ef371c9e56.js.map