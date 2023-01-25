System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, SpriteFrame, Sprite, director, Vec2, instantiate, Prefab, Events, Item, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, FieldWatcher;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfEvents(extras) {
    _reporterNs.report("Events", "./Events", _context.meta, extras);
  }

  function _reportPossibleCrUseOfItem(extras) {
    _reporterNs.report("Item", "./Item", _context.meta, extras);
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
      SpriteFrame = _cc.SpriteFrame;
      Sprite = _cc.Sprite;
      director = _cc.director;
      Vec2 = _cc.Vec2;
      instantiate = _cc.instantiate;
      Prefab = _cc.Prefab;
    }, function (_unresolved_2) {
      Events = _unresolved_2.default;
    }, function (_unresolved_3) {
      Item = _unresolved_3.Item;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bbd0a3a4HhBT6uQk0Ek0fKE", "FieldWatcher", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'SpriteFrame', 'Sprite', 'director', 'Vec3', 'Vec2', 'instantiate', 'Prefab', 'Enum']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("FieldWatcher", FieldWatcher = (_dec = ccclass('FieldWatcher'), _dec2 = property(SpriteFrame), _dec3 = property(Node), _dec4 = property(Prefab), _dec5 = property([]), _dec(_class = (_class2 = class FieldWatcher extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "lengthField", _descriptor, this);

          _initializerDefineProperty(this, "heightField", _descriptor2, this);

          _initializerDefineProperty(this, "spriteCell", _descriptor3, this);

          _initializerDefineProperty(this, "inputCatcher", _descriptor4, this);

          _initializerDefineProperty(this, "itemPrefab", _descriptor5, this);

          _initializerDefineProperty(this, "initialItems", _descriptor6, this);

          this._sideSquare = 0;
          this._fieldArray = [];
        }

        onLoad() {
          this.makeCells();
          this.makeItems();
          this.inputCatcher.active = false;
        }

        onEnable() {
          this.handleSubscription(true);
        }

        onDisable() {
          this.handleSubscription(false);
        }

        handleSubscription(activated) {
          const func = activated ? 'on' : 'off';
          director[func]((_crd && Events === void 0 ? (_reportPossibleCrUseOfEvents({
            error: Error()
          }), Events) : Events).ItemChosen, this.onItemChosen, this);
          director[func]((_crd && Events === void 0 ? (_reportPossibleCrUseOfEvents({
            error: Error()
          }), Events) : Events).ItemDropped, this.onItemDropped, this);
        }

        onItemDropped(item) {
          let newNumbers = this.defineCell(item.getPosition());
          const newItemPosition = this.node.getChildByName(`h${newNumbers.y}l${newNumbers.x}`).position;
          director.emit((_crd && Events === void 0 ? (_reportPossibleCrUseOfEvents({
            error: Error()
          }), Events) : Events).ItemSet, newItemPosition);
          this.fusionItems(item, newNumbers);
        }

        defineNumbers(item) {
          for (let i = 0; i < this.heightField; i++) {
            const needingIndex = this._fieldArray[i].indexOf(item);

            if (needingIndex !== -1) return new Vec2(needingIndex, i);
          }
        }

        onItemChosen() {
          this.inputCatcher.active = true;
        }

        defineCellPosition(itemNumbers) {
          return this.node.getChildByName(`h${itemNumbers.y}l${itemNumbers.x}`).position;
        }

        defineCell(itemPosition) {
          const numberColumn = Math.floor(itemPosition.x / this._sideSquare + this.lengthField / 2 - 1) + 1;
          const numberStroke = Math.floor(itemPosition.y / this._sideSquare + this.heightField / 2 - 1) + 1;
          return new Vec2(numberColumn, numberStroke);
        }

        makeItems() {
          const numeralItems = this.initialItems.length;

          for (let i = 0; i < numeralItems; i++) {
            const newItem = instantiate(this.itemPrefab);
            const itemScript = newItem.getComponent(_crd && Item === void 0 ? (_reportPossibleCrUseOfItem({
              error: Error()
            }), Item) : Item);
            itemScript.type = this.initialItems[i];
            itemScript.setType(itemScript.type);
            const numbers = this.chooseNumbers();
            const zeroCell = this.node.getChildByName('h0l0').position;
            itemScript.deltaX = -zeroCell.x;
            itemScript.deltaY = -zeroCell.y;
            newItem.setParent(this.node);
            const newPositionNode = this.node.getChildByName(`h${numbers.y}l${numbers.x}`);
            newItem.setPosition(newPositionNode.position);
            this._fieldArray[numbers.y][numbers.x] = newItem;
          }
        }

        makeCells() {
          this._sideSquare = this.spriteCell.height;

          if (this.lengthField && this.heightField && this.spriteCell) {
            for (let i = 0; i < this.heightField; i++) {
              this._fieldArray[i] = [];

              for (let j = 0; j < this.lengthField; j++) {
                this._fieldArray[i][j] = null;
                const newCell = new Node(`h${i}l${j}`);
                const spriteCell = newCell.addComponent(Sprite);
                spriteCell.spriteFrame = this.spriteCell;
                newCell.setParent(this.node);
                newCell.position.set((j - this.lengthField / 2 + 0.5) * this._sideSquare, (i - this.heightField / 2 + 0.5) * this._sideSquare);
              }
            }
          }
        }

        fusionItems(movedItem, numbers) {
          const previousItem = this._fieldArray[numbers.y][numbers.x];
          if (previousItem === movedItem) return;
          let newItem = movedItem;
          const oldNumbers = this.defineNumbers(movedItem);

          if (previousItem) {
            const previousItemScript = previousItem.getComponent(_crd && Item === void 0 ? (_reportPossibleCrUseOfItem({
              error: Error()
            }), Item) : Item);
            const movedItemScript = movedItem == null ? void 0 : movedItem.getComponent(_crd && Item === void 0 ? (_reportPossibleCrUseOfItem({
              error: Error()
            }), Item) : Item);

            if (previousItemScript.type === movedItemScript.type) {
              previousItemScript.dropItem();
              movedItemScript.transformationItem(previousItemScript.type + 1);
            } else {
              const numbersCopy = numbers;
              numbers = this.findFreeCell(numbers, movedItem);
              previousItemScript.transferItem(this.defineCellPosition(numbers));
              this._fieldArray[numbersCopy.y][numbersCopy.x] = newItem;
              newItem = previousItem;
            }
          }

          this._fieldArray[oldNumbers.y][oldNumbers.x] = null;
          this._fieldArray[numbers.y][numbers.x] = newItem;
        }

        chooseNumbers() {
          let numbers = new Vec2(0, 0);

          while (this._fieldArray[numbers.y][numbers.x] !== null) {
            numbers = new Vec2(Math.floor(Math.random() * this.lengthField), Math.floor(Math.random() * this.heightField));
          }

          return numbers;
        }

        findFreeCell(numbers, item) {
          let newNumbers = new Vec2(this.lengthField * this.heightField, 0);
          let distance = this.heightField * this.lengthField;

          for (let i = 0; i < this.heightField; i++) {
            for (let j = 0; j < this.lengthField; j++) {
              if (!this._fieldArray[i][j] || this._fieldArray[i][j] === item) {
                const currentDistance = Math.sqrt(Math.pow(numbers.y - i, 2) + Math.pow(numbers.x - j, 2));

                if (currentDistance < distance) {
                  distance = currentDistance;
                  newNumbers = new Vec2(j, i);
                }
              }
            }
          }

          return newNumbers;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lengthField", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 3;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "heightField", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spriteCell", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "inputCatcher", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "itemPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "initialItems", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=da17c95a31a41928a5a476a6c5afe45af61375f1.js.map