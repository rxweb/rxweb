import { OverrideObjectProp } from "./override-object-prop";
import { DynamicNodeConfig } from "../models/interface/dynamic-node-config";
export declare class DomManipulation extends OverrideObjectProp {
    subscribers: string[];
    elementIndex: number;
    commentNode: any;
    nodeName: string;
    domConfig: {
        [key: string]: any;
    };
    element: any;
    eventListeners: any[];
    controlId: number;
    private actionListeners;
    private elementClasses;
    constructor(parentNode: any, elementName: string, dynamicNodeConfig: DynamicNodeConfig);
    parseObject(jObject: {
        [key: string]: any;
    }, isSubscribe: boolean): void;
    private subscribeValueChange;
    process(jObject: {
        [key: string]: any;
    }, isSubscribe: boolean): void;
    overrideProp(): void;
    bindAdditionalClasses(): void;
    destroy(): void;
}
