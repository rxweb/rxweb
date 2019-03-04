export class ReactiveFormConfig {
    static number:{[key:string]:any} = {}
    static json: { [key: string]: any } = {};
    static set(jObject: { [key: string]: any }): void {
        if (jObject)
            ReactiveFormConfig.json = jObject;
    }
}
