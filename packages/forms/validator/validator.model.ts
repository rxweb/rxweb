export interface CustomValidation {
    nestedProperty?: string;
    changeProps?: string[];
    requiredProps?: string[];
    validationFunction?: Function;
    annotationProps: { [key: string]: AnnotationModel}
}

export interface AnnotationModel {
    required?: boolean;
    minLength?: AnnotationParamConfig;
    maxLength?: AnnotationParamConfig;
    pattern?: AnnotationParamConfig;
    compare?: AnnotationParamConfig;
    contains?: AnnotationParamConfig;
    alpha?: AnnotationParamConfig;
    numeric?: AnnotationParamConfig;
    alphaNumeric?: AnnotationParamConfig;
    email?: boolean;
    hexColor?: boolean;
    lowercase?: boolean;
    maxDate?: AnnotationParamConfig;
    maxNumber?: AnnotationParamConfig;
    minDate?: AnnotationParamConfig;
    minNumber?: AnnotationParamConfig;
    uppercase?: boolean;
    range?: AnnotationParamConfig;
}
export interface AnnotationParamConfig {
    checkValue?: any;
    patternType?: string;
    controlLabel?: string;
    minRangeValue?: number;
    maxRangeValue?: number;
    isWithWhiteSpace?: boolean;
    allowNegative?: boolean
}
