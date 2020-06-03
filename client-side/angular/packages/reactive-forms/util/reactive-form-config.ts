export enum ClientLibrary {
    React,
    Vue,
    Angular,
    Vanilla,
    None
}
export class ReactiveFormConfig {
    static number:{[key:string]:any} = {}
    static json: { [key: string]: any } = {};
    static clientLib: ClientLibrary = ClientLibrary.None;

    static set(jObject: { [key: string]: any }): void {
        if (jObject)
            ReactiveFormConfig.json = jObject;
    }

    static get(path: string): any {
        let jObject: any = undefined;        
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
