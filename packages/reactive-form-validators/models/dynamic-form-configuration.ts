export class DynamicFormConfiguration {
    fieldConfigModels: [{
        modelName: string,
        model: Function,
        arguments:any[]
    }];
    sectionConfigs: {
        [key: string]: {

        }
    }
    
}