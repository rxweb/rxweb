export interface BaseConfig{
    message?: string;
    conditionalExpression?: string | Function;
    messageKey?: string;
    messageNexus?:{[key:string]:string};
    disableExpression?: Function;
    isAddMessageKey?: boolean;
}
