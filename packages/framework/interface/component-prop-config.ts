export interface ComponentPropConfig{
    instance: Function;
    properties: PropertyInfo[];
}

export interface PropertyInfo {
    name: string;
    propertyAnnotations: PropertyAnnotation[]
}

export interface PropertyAnnotation {
    config: any;
    type: string;
}

export interface DecoratorConfig {
    propName: string;
    type:string;
    config: any;
}