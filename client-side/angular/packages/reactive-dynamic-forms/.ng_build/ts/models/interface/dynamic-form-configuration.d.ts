export interface ControlConfigModel {
    modelName: string;
    model?: Function;
    arguments?: any[];
}
export interface DynamicFormConfiguration {
    controlConfigModels?: ControlConfigModel[];
    isPlainTextMode?: boolean;
    additionalConfig?: any[];
}
