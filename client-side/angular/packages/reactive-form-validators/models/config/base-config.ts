export interface BaseConfig{
    message?: string;
    conditionalExpression?: string | Function;
    messageKey?: string;
    disableExpression?: Function;
    isAddMessageKey?: boolean;
}
