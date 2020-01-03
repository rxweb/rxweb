export declare interface Type<T> extends Function {
    new(...args: any[]): T;
}
export interface RouterModuleConfig{
    authorization?: Type<any>,
    authentication?: Type<any>,
    middlewares?: Array<Type<any>>,
    urlEncryption?:boolean
}