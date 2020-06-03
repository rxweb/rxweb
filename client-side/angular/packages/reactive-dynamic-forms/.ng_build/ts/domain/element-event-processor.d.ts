import { ElementAccessor } from './element-accessor';
import { DynamicNodeConfig } from '../models/interface/dynamic-node-config';
export declare class ElementEventProcessor extends ElementAccessor {
    dynamicNodeConfig: DynamicNodeConfig;
    eventListeners: any[];
    constructor(dynamicNodeConfig: DynamicNodeConfig);
    bindEvents(events: {
        [key: string]: any;
    }, isSubscribe: boolean): void;
    setClick(functionName: string): void;
    setFocus(value: boolean): void;
    setBlur(): void;
    setInput(): void;
}
