import { DynamicNodeConfig } from '../models/interface/dynamic-node-config';
import { FormControlConfig } from "../services/form-control-config";
export declare abstract class BaseObjectAccessor {
    dynamicNodeConfig: DynamicNodeConfig;
    controlConfig: FormControlConfig;
    subscribeProps: {
        [key: string]: any;
    };
    constructor(dynamicNodeConfig: DynamicNodeConfig);
    getPropName(text: string): string;
    getValue(text: string): any;
    setPropSubscription(propName: string, type: string, attributeName: string, valuePropName?: string, parentPropName?: string): void;
    isSubscribeProp(propName: string): boolean;
    defineProp(propName: string): void;
}
