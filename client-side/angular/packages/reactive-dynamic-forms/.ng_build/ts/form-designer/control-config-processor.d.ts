import { FormControlConfig } from "../services/form-control-config";
import { DynamicFormBuildConfig } from "../models/interface/dynamic-form-build-config";
import { DomManipulation } from '../domain/dom-manipulation';
export declare class ControlConfigProcessor {
    protected element: Node;
    private renderer;
    isBuild: boolean;
    _viewMode: any;
    dynamicFormBuildConfig: DynamicFormBuildConfig;
    viewMode: string;
    readonly currentViewMode: any;
    getView(name: string): any;
    readonly viewClassPath: any;
    uiBindings: any[];
    constructor(element: Node, renderer: any);
    build(): void;
    designForm(controlConfigName: any, element: any, viewRoot: any, viewChild: any, classPath: any, childrenControlConfig?: FormControlConfig): void;
    createElement(elementName: string, collections: any[], parentElement: any, controlConfig: FormControlConfig, elementClassPath: any): DomManipulation;
    createChildrens(collections: any, domManipulation: any, controlConfig: any, elementClassPath: any, isSubscribe?: boolean): void;
    private createChildNodes;
    private runForCollection;
    private getAdditionalClasses;
    private getCollection;
    private getControlName;
    private getControlConfig;
    private getName;
    private prependControl;
    private isCreateElement;
}
