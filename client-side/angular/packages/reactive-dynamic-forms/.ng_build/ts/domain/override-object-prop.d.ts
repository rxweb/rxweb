import { ElementPropsAccessor } from './element-props-accessor';
import { DynamicNodeConfig } from "../models/interface/dynamic-node-config";
export declare abstract class OverrideObjectProp extends ElementPropsAccessor {
    constructor(dynamicNodeConfig: DynamicNodeConfig);
    overrideValueProp(): void;
    private overrideFormControlProp;
}
