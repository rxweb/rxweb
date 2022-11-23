import { DynamicFormConfiguration } from "../models/interface";
import { DynamicFormBuildConfig } from '../models/interface/dynamic-form-build-config';
export declare class RxDynamicFormBuilder {
    formConfiguration: DynamicFormConfiguration;
    formGroup(fields: any[], dynamicFormConfig: DynamicFormConfiguration): DynamicFormBuildConfig;
    private completeModelConfig;
    private createFormArray;
    private getRefObject;
    private addTwoProp;
    private createDynamicFormGroup;
    private getModelInstance;
    private getDynamicModelInstance;
    private validatorBindings;
}
