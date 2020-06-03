import { DynamicNodeConfig } from "../models/interface/dynamic-node-config";
import { BaseObjectAccessor } from './base-object-accessor';
export declare abstract class ElementAccessor extends BaseObjectAccessor {
    element: any;
    constructor(dynamicNodeConfig: DynamicNodeConfig);
    createNodeElement(parentElement: any, name: string): void;
    removeChildren(element: any): void;
    setControlConfigValue(targetElement: any): void;
    resetElementValue(value: any): void;
    private checkedCheckbox;
    private checkedRadio;
    private setCheckboxValue;
}
