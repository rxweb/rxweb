export interface AnnotationConfiguration {
    annotationType: string;
    propertyName: string;
    propertyIndex: number;
    checkValue?: any;
    message?: string;
    target?: any;
    controlLabel?: string;
    minRangeValue?: number;
    maxRangeValue?: number;
    propertyConstructor?: any;
    patternType?: string;
    isWithWhiteSpace?: boolean;
    allowNegative?:boolean
}

export interface InstanceContainer {
    instance: any;
    propertyAnnotations: AnnotationConfiguration[];
    tableName: string,
    propertyName:string,
}



