import { _decorator, Component, Node, SpriteFrame, Sprite, director, Vec3, Vec2, instantiate, Prefab, Enum } from 'cc';
const { ccclass, property } = _decorator;

import ItemType from './ItemType';
import Events from './Events';
import { Item } from './Item';

@ccclass('FieldWatcher')
export class FieldWatcher extends Component {
    @property
    private lengthField: number = 3;
    @property
    private heightField: number = 2;
    @property(SpriteFrame)
    private spriteCell: SpriteFrame = null;

    @property(Node)
    private inputCatcher: Node = null;

    @property(Prefab)
    private itemPrefab: Prefab = null;

    //    @property([])
    private initialItems;

    private _sideSquare: number = 0;

    private _fieldArray: Array<Array<Node>> = [];

    onLoad() {
        this.initialItems = [1, 1, 2];
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

    private handleSubscription(activated) {
        const func = activated ? 'on' : 'off';
        director[func](Events.ItemChosen, this.onItemChosen, this);
        director[func](Events.ItemDropped, this.onItemDropped, this);
    }

    onItemDropped(item: Node) {
        let newNumbers = this.defineCell(item.getPosition());
        const newItemPosition = this.node.getChildByName(`h${newNumbers.y}l${newNumbers.x}`).position;
        director.emit(Events.ItemSet, newItemPosition);
        this.fusionItems(item, newNumbers);
    }

    private defineNumbers(item: Node): Vec2 {
        for (let i = 0; i < this.heightField; i++) {
            const needingIndex = this._fieldArray[i].indexOf(item);
            if (needingIndex !== -1) return new Vec2(needingIndex, i);
        }
    }

    onItemChosen() {
        this.inputCatcher.active = true;
    }

    private defineCellPosition(itemNumbers: Vec2): Vec3 {
        return this.node.getChildByName(`h${itemNumbers.y}l${itemNumbers.x}`).position;
    }

    private defineCell(itemPosition: Vec3): Vec2 {
        const numberColumn = Math.floor(itemPosition.x / this._sideSquare + this.lengthField / 2 - 1) + 1;
        const numberStroke = Math.floor(itemPosition.y / this._sideSquare + this.heightField / 2 - 1) + 1;
        return new Vec2(numberColumn, numberStroke);
    }

    private makeItems() {
        const numeralItems = this.initialItems.length;
        for (let i = 0; i < numeralItems; i++) {
            const newItem = instantiate(this.itemPrefab);
            const itemScript = newItem.getComponent(Item);
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

    private makeCells() {
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
                    newCell.position.set(
                        (j - this.lengthField / 2 + 0.5) * this._sideSquare,
                        (i - this.heightField / 2 + 0.5) * this._sideSquare
                    );
                }
            }
        }
    }

    private fusionItems(movedItem: Node, numbers: Vec2): void {
        const previousItem = this._fieldArray[numbers.y][numbers.x];
        if (previousItem === movedItem) return;
        let newItem = movedItem;
        const oldNumbers = this.defineNumbers(movedItem);
        if (previousItem) {
            const previousItemScript = previousItem.getComponent(Item);
            const movedItemScript = movedItem?.getComponent(Item);
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

    private chooseNumbers(): Vec2 {
        let numbers = new Vec2(0, 0);
        while (this._fieldArray[numbers.y][numbers.x] !== null) {
            numbers = new Vec2(
                Math.floor(Math.random() * this.lengthField),
                Math.floor(Math.random() * this.heightField)
            );
        }
        return numbers;
    }

    private findFreeCell(numbers: Vec2, item: Node): Vec2 {
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
}
