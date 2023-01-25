System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, director, Animation, ItemType, InputType, Events, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, Item;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfItemType(extras) {
    _reporterNs.report("ItemType", "./ItemType", _context.meta, extras);
  }

  function _reportPossibleCrUseOfInputType(extras) {
    _reporterNs.report("InputType", "./InputType", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEvents(extras) {
    _reporterNs.report("Events", "./Events", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
      director = _cc.director;
      Animation = _cc.Animation;
    }, function (_unresolved_2) {
      ItemType = _unresolved_2.default;
    }, function (_unresolved_3) {
      InputType = _unresolved_3.default;
    }, function (_unresolved_4) {
      Events = _unresolved_4.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f2135aoczNOuY27AmEZZ+tb", "Item", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'EventTouch', 'Vec3', 'director', 'Animation']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Item", Item = (_dec = ccclass('Item'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = class Item extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "shine", _descriptor, this);

          _initializerDefineProperty(this, "InputC", _descriptor2, this);

          _initializerDefineProperty(this, "type", _descriptor3, this);

          this._isDragging = false;
          this._stopDragging = false;
          this.deltaX = 0;
          this.deltaY = 0;
        }

        onEnable() {
          this.handleSubscription(true);
        }

        onDisable() {
          this.handleSubscription(false);
        }

        handleSubscription(activated) {
          var func = activated ? 'on' : 'off';
          this.InputC[func](Node.EventType.TOUCH_START, this.onDown, this);
          director[func]((_crd && Events === void 0 ? (_reportPossibleCrUseOfEvents({
            error: Error()
          }), Events) : Events).INPUT, this.onInput, this);
        }

        onInput(typeInput, event) {
          if (!this._isDragging || this._stopDragging) return;

          switch (typeInput) {
            case (_crd && InputType === void 0 ? (_reportPossibleCrUseOfInputType({
              error: Error()
            }), InputType) : InputType).Move:
              var deltaPos = new Vec3(event.getDeltaX(), event.getDeltaY(), 0);
              var newPos = this.node.position.clone().add(deltaPos);
              if (newPos.x < -this.deltaX || newPos.x > this.deltaX || newPos.y < -this.deltaY || newPos.y > this.deltaY) return;
              this.node.setPosition(newPos.x, newPos.y, 0);
              break;

            case (_crd && InputType === void 0 ? (_reportPossibleCrUseOfInputType({
              error: Error()
            }), InputType) : InputType).Up:
              director.on((_crd && Events === void 0 ? (_reportPossibleCrUseOfEvents({
                error: Error()
              }), Events) : Events).ItemSet, this.onItemSet, this);
              director.emit((_crd && Events === void 0 ? (_reportPossibleCrUseOfEvents({
                error: Error()
              }), Events) : Events).ItemDropped, this.node, this.type);
              this._isDragging = false;
              break;
          }
        }

        onDown(event) {
          console.log(event.getUILocation(), this.node // event.touch.getLocation().x,
          // event.touch.getLocationInView().x,
          // this.node.parent.worldPosition.x
          );
          if (this._stopDragging) return;
          this._isDragging = true;
          director.emit((_crd && Events === void 0 ? (_reportPossibleCrUseOfEvents({
            error: Error()
          }), Events) : Events).ItemChosen);
          this.node.setSiblingIndex(1000);
        }

        onItemSet(newPosition) {
          this.node.setPosition(newPosition);
          director.off((_crd && Events === void 0 ? (_reportPossibleCrUseOfEvents({
            error: Error()
          }), Events) : Events).ItemSet, this.onItemSet, this);
        }

        setType(typeItem) {
          this.node.children[typeItem].active = true;
        }

        dropItem() {
          this.handleSubscription(false);
          this.node.destroy();
        }

        transformationItem(type) {
          this._stopDragging = true;
          this.node.children[this.type].active = false;
          this.shine.active = true;
          this.shine.getComponent(Animation).play();
          this.scheduleOnce(() => {
            this.shine.active = false;
            this.node.children[type].active = true;
            this.type = type;
            this._stopDragging = false;
          }, 1);
        }

        transferItem(newPosition) {
          this.node.setPosition(newPosition);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "shine", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "InputC", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "type", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && ItemType === void 0 ? (_reportPossibleCrUseOfItemType({
            error: Error()
          }), ItemType) : ItemType).Flower1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5403fc8a6483a87ecf78d230c25f9a5b43ff814a.js.map