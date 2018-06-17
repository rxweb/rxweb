export class ReactiveFormConfig{
    static json: { [key: string]: any } = {};
    static set(jObject: { [key: string]: any }): void {
        if (jObject)
            ReactiveFormConfig.json = jObject;
    }
}
