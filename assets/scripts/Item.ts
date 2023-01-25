import { _decorator, Component, Node, EventTouch, Vec3, director, Animation, input, Input } from 'cc';
const { ccclass, property } = _decorator;

import ItemType from './ItemType';
import InputType from './InputType';
import Events from './Events';

@ccclass('Item')
export class Item extends Component {
    @property(Node)
    private shine: Node = null;

    @property(Node)
    private InputC: Node = null;

    @property
    public type: ItemType = ItemType.Flower1;

    private _isDragging: boolean = false;
    private _stopDragging: boolean = false;

    public deltaX: number = 0;
    public deltaY: number = 0;

    onEnable() {
        this.handleSubscription(true);
    }

    onDisable() {
        this.handleSubscription(false);
    }

    private handleSubscription(activated) {
        const func = activated ? 'on' : 'off';
        this.InputC[func](Node.EventType.TOUCH_START, this.onDown, this);
        director[func](Events.INPUT, this.onInput, this);
    }

    onInput(typeInput: InputType, event: EventTouch) {
        if (!this._isDragging || this._stopDragging) return;
        switch (typeInput) {
            case InputType.Move:
                const deltaPos = new Vec3(event.getDeltaX(), event.getDeltaY(), 0);
                const newPos = this.node.position.clone().add(deltaPos);
                if (
                    newPos.x < -this.deltaX ||
                    newPos.x > this.deltaX ||
                    newPos.y < -this.deltaY ||
                    newPos.y > this.deltaY
                )
                    return;
                this.node.setPosition(newPos.x, newPos.y, 0);
                break;
            case InputType.Up:
                director.on(Events.ItemSet, this.onItemSet, this);
                director.emit(Events.ItemDropped, this.node, this.type);
                this._isDragging = false;
                break;
        }
    }

    onDown(event) {
        if (this._stopDragging) return;
        this._isDragging = true;
        director.emit(Events.ItemChosen);
        this.node.setSiblingIndex(1000);
    }

    private onItemSet(newPosition: Vec3) {
        this.node.setPosition(newPosition);
        director.off(Events.ItemSet, this.onItemSet, this);
    }

    public setType(typeItem: number) {
        this.node.children[typeItem].active = true;
    }

    public dropItem() {
        this.handleSubscription(false);
        this.node.destroy();
    }

    public transformationItem(type: ItemType) {
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

    public transferItem(newPosition: Vec3) {
        this.node.setPosition(newPosition);
    }
}
