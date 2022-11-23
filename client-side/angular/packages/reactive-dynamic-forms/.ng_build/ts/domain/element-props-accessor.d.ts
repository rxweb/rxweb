import { ElementEventProcessor } from './element-event-processor';
import { DynamicNodeConfig } from '../models/interface/dynamic-node-config';
export declare abstract class ElementPropsAccessor extends ElementEventProcessor {
    private oldAdditionalClasses;
    private oldClasses;
    constructor(dynamicNodeConfig: DynamicNodeConfig);
    bindAttribute(attr: {
        [key: string]: any;
    }, isSubscribe: boolean): void;
    bindProp(prop: {
        [key: string]: any;
    }, isSubscribe: boolean): void;
    setClass(classes: any[], type: string): void;
    setStyleProp(propName: string, value: any): void;
    setProperty(propertyName: string, value: any): void;
    addOrRemoveClasses(classes: any[], isAdd?: boolean): void;
    addOrRemoveStyle(styleName: string, value: any): void;
    addOrRemoveAttribute(attributeName: string, value: any): void;
    private getClassNames;
}
