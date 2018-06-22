import { Subject, Observable } from 'rxjs/Rx';
import '../linq'
export class ApplicationPage {
    private static moduleContentSubject: Subject<boolean> = new Subject<boolean>();

    public static moduleContentSubscriber: Observable<boolean>;

    public static addOrUpdateObject(key: string, value: any): void {
        if (!this.pageObject)
            this.pageObject = {};
        this.pageObject[key] = value;
    }

    public static addOrUpdateModuleContent(applicationModuleId: number, data: any) {
        this.localization[applicationModuleId] = data;
        var isExist = this.activeModules.contains(applicationModuleId);
        if (!isExist)
            this.activeModules.push(applicationModuleId);
        this.moduleContentSubject.next(true);
    }

    public static getActiveModule(): number {
        if (this.activeModules.length > 0)
            return <number>this.activeModules.last();
        return 0;
    }

    public static removeLast() {
        if (this.activeModules.length > 0) {
            var applicationModuleId = this.activeModules.last();
            this.activeModules.splice(this.activeModules.length - 1, 1);
            this.localization[applicationModuleId.toString()] = undefined;
        }
    }

    public static get(key: string): any {
        return this.pageObject[key];
    }

    public static localizeValue(key: string, type: string,applicationModuleId:number, args?: any[]) {
        var moduleContent = this.localization[applicationModuleId];
        if (moduleContent != undefined) {
            var labelObject = moduleContent[type];
            if (labelObject != undefined) { 
                var labelText = labelObject[key];
                if (labelText != undefined) {
                    if (args) {
                        for (var i = 0; i < args.length; i++) {
                            labelText = labelText.replace("{" + i + "}", args[i]);
                        }
                    }
                    return labelText;
                }
                else
                    return undefined;
            }
        }
    }

    public static Init() {
        if (!this.moduleContentSubscriber)
            this.moduleContentSubscriber = this.moduleContentSubject.asObservable();
    }


    private static pageObject: any;

    public static localization: any = {}

    private static activeModules: Array<number> = new Array<number>();

}

export class ActiveModule {
    private activeModules: Array<number> = new Array<number>();

    add(applicationModuleId: number) {
        this.activeModules.push(applicationModuleId);
    }

    get(): string {
        return this.activeModules.last().toString();
    }
}
