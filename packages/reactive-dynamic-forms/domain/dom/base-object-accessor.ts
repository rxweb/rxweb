import { COLON, BLANK, STRING, SQUARE} from '../../const/app.const';
import { DynamicNodeConfig } from '../../models/interface/dynamic-node-config'
import { objectPropValue } from '../../functions/object-prop-value.function'
import { FormControlConfig } from "../../services/form-control-config"

const PROPS: string = ":props.";
const GLOBAL_MATCH: string = "g";
const DOT: string = ".";

export abstract class BaseObjectAccessor {
    controlConfig: FormControlConfig;
    subscribeProps: { [key: string]: any } = {
        names: [], props: {}
    };

    constructor(public dynamicNodeConfig: DynamicNodeConfig) { this.controlConfig = this.dynamicNodeConfig.controlConfig; }

    getPropName(text: string) {
        if (text[0] == COLON || (text[0] == SQUARE)) {
            return text.replace(new RegExp(COLON, GLOBAL_MATCH), BLANK).replace(new RegExp(SQUARE, GLOBAL_MATCH), BLANK);
        }
        return text;
    }


    getValue(text: string) {
        if (typeof text == STRING && ((text[0] == COLON) || (text[0] == SQUARE))) {
            text = text.replace(new RegExp(COLON, GLOBAL_MATCH), BLANK).replace(new RegExp(SQUARE, GLOBAL_MATCH), BLANK);
            return objectPropValue(text, this.controlConfig);
        }
        return text;
    }

    setPropSubscription(propName: string, type: string, attributeName: string, valuePropName: string = '', parentPropName: string = '') {
        if (propName.startsWith(PROPS)) 
            this.defineProp(propName);

        let prop = this.getPropName(propName);

        if (!this.subscribeProps.props[prop])
            this.subscribeProps.props[prop] = {};
        if (!this.subscribeProps.props[prop][type])
            this.subscribeProps.props[prop][type] = {}; 
        if (parentPropName) {
            this.subscribeProps.props[prop][type][parentPropName] = {};
            this.subscribeProps.props[prop][type][parentPropName][attributeName] = (valuePropName) ? valuePropName : propName;
        } else
            this.subscribeProps.props[prop][type][attributeName] = (valuePropName) ? valuePropName : propName;

        if (this.subscribeProps.names.indexOf(prop) == -1)
            this.subscribeProps.names.push(prop);

    }

    isSubscribeProp(propName:string) {
        return (typeof propName == STRING && (propName[0] == COLON));
    }

    defineProp(propName: string) {
        let splitText = propName.split(DOT);
        if (splitText.length > 1) {
            let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.controlConfig.props), splitText[1]);
            if (!descriptor)
                this.controlConfig.defineProp(splitText[1]);
        }
    }
}