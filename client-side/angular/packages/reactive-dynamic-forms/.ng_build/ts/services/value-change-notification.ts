import { isNotMatched } from "../util/is-not-matched";

export class ValueChangeNotification {
    private attributeChangeSubscriptions: Array<any> = new Array<any>();

    onPropValueChanged(controlId: number, subscription: { [key: string]: any }, func: Function) {
        this.attributeChangeSubscriptions.push({ controlId: controlId, names: subscription.names, props: subscription.props, func: func });
    }


    notifyValueChanged(name, value, oldValue, isProps: boolean = false) {
        if ((!isProps && this.isNotEqual(oldValue, value)) && this.onPropValueChanged) {
            let subscriptions = this.attributeChangeSubscriptions.filter(t => t.names.indexOf(name) != -1);
            subscriptions.forEach(subscribe => {
                if (subscribe.props && subscribe.props[name])
                    subscribe.func(subscribe.props[name])
            });
        }
    }

    private isNotEqual(leftValue: any, rightValue: any) {
        if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
            let isNotEqual = leftValue.length != rightValue.length;
            if (!isNotEqual)
                for (var i = 0; i < leftValue.length; i++) {
                    isNotEqual = isNotMatched(leftValue[i], rightValue[i]);
                    if (isNotEqual)
                        break;
                }
            return isNotEqual;
        }
        return leftValue != rightValue;
    }

    destroy(controlId: number) {
        for (var i = 0; i < this.attributeChangeSubscriptions.length; i++) {
            if (this.attributeChangeSubscriptions[i].controlId == controlId) {
                this.attributeChangeSubscriptions.splice(i, 1);
                break;
            }
        }
    }
}