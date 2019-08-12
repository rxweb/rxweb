
export interface DecoratorConfiguration {
    annotationType: string;
    propertyName: string;
    propertyIndex: number;
    target?: any;
    propertyConstructor?: any;
    config?: any;
    isAsync: boolean;
}

export interface InstanceContainer {
    instance: any;
    propertyAnnotations: DecoratorConfiguration[];
    properties?: PropertyInfo[]
    conditionalValidationProps?: { [key: string]: string[] }
    conditionalObjectProps?: { [key: string]: any }
    nonValidationDecorators?: {
        disabled: ControlInfo;
        error: ControlInfo;
        elementClass:ControlInfo
    },
    sanitizers?: { [key: string]: DataSanitizer[] }
}

export interface PropertyInfo {
    name: string;
    propertyType: string;
    entity?: any;
    dataPropertyName?: string;
    defaultValue?: any;
    ignore?: (x: any) => boolean;
    isPrimaryKey?: boolean;
    entityProvider?: Function;
    arrayConfig: {
        allowMaxIndex: number;
        messageKey?: string;
    }
}

export interface ControlInfo {
    conditionalExpressions?: { [key: string]: Function },
    changeDetection?: { [key: string]: string[] },
    controlProp:{[key:string]:{[key:string]:boolean}}
}

export interface DataSanitizer{
    name:string;
    config:any;
}

