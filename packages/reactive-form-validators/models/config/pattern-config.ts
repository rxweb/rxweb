export interface PatternConfig{
    pattern: { [key: string]:  RegExp }
    message?: string;
    conditionalExpression?: string | Function;
}
