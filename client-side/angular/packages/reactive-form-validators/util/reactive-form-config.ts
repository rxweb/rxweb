
export class ReactiveFormConfig {
    static i18n: { language?: string, validationMessage?: () => any } = {};
    static number:{[key:string]:any} = {}
    static json: { [key: string]: any } = {};
    static autoInstancePush: boolean = false;
    static set(jObject: { [key: string]: any }): void {
        if (jObject)
            ReactiveFormConfig.json = jObject;
    }

    static get(path: string) : any {
        let jObject: { [key: string]: any };        
        if (ReactiveFormConfig.json) {
            let splitPath = path.split('.');
            for (let columnName of splitPath) {
                jObject = (!jObject) ? ReactiveFormConfig.json[columnName] : jObject[columnName];
                if (!jObject)
                    break;
            }
        }
        return jObject;
    }
}
