export interface DynamicFormConfiguration {
    fieldConfigModels: [{
        modelName: string,
        model?: Function,
        arguments?:any[]
    }];
    isPlainTextMode?: boolean;
}