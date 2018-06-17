export interface CompareConfig{
    fieldName: string;
    compareFieldLabelName: string;
    message?: string;
    conditionalExpressions?: string | Function;
}
