System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, director, Events, InputType, _dec, _class, _crd, ccclass, InputCatcher;

  function _reportPossibleCrUseOfEvents(extras) {
    _reporterNs.report("Events", "./Events", _context.meta, extras);
  }

  function _reportPossibleCrUseOfInputType(extras) {
    _reporterNs.report("InputType", "./InputType", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      director = _cc.director;
    }, function (_unresolved_2) {
      Events = _unresolved_2.default;
    }, function (_unresolved_3) {
      InputType = _unresolved_3.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d55cdQHxk9L3ZlpZ7dMWYnQ", "InputCatcher", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'director']);

      ({
        ccclass
      } = _decorator);

      _export("InputCatcher", InputCatcher = (_dec = ccclass('InputCatcher'), _dec(_class = class InputCatcher extends Component {
        onEnable() {
          this.handleSubscription(true);
        }

        onDisable() {
          this.handleSubscription(false);
        }

        handleSubscription(activated) {
          var func = activated ? 'on' : 'off';
          this.node[func](Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
          this.node[func](Node.EventType.MOUSE_UP, this.onMouseUp, this);
        }

        onMouseMove(event) {
          director.emit((_crd && Events === void 0 ? (_reportPossibleCrUseOfEvents({
            error: Error()
          }), Events) : Events).INPUT, (_crd && InputType === void 0 ? (_reportPossibleCrUseOfInputType({
            error: Error()
          }), InputType) : InputType).Move, event, this);
        }

        onMouseUp(event) {
          director.emit((_crd && Events === void 0 ? (_reportPossibleCrUseOfEvents({
            error: Error()
          }), Events) : Events).INPUT, (_crd && InputType === void 0 ? (_reportPossibleCrUseOfInputType({
            error: Error()
          }), InputType) : InputType).Up, event, this);
          this.node.active = false;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ecc9c16401b4ce691d8148e66bb59930c6b82fb5.js.map