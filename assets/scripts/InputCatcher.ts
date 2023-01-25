import { _decorator, Component, Node, director } from 'cc';
const { ccclass } = _decorator;

import Events from './Events';
import InputType from './InputType';

@ccclass('InputCatcher')
export class InputCatcher extends Component {
    onEnable() {
        this.handleSubscription(true);
    }

    onDisable() {
        this.handleSubscription(false);
    }

    private handleSubscription(activated) {
        const func = activated ? 'on' : 'off';

        this.node[func](Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.node[func](Node.EventType.MOUSE_UP, this.onMouseUp, this);
    }

    private onMouseMove(event) {
        director.emit(Events.INPUT, InputType.Move, event, this);
    }

    private onMouseUp(event) {
        director.emit(Events.INPUT, InputType.Up, event, this);
        this.node.active = false;
    }
}
