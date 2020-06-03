import { localizationContainer } from "./localization-container";

export const MultiLingualData:
    {
        addOrUpdate(key: string, data: { [key: string]: any }): any,
        get(path: string): string,
        subscribe(func: Function),
        unsubscribe(key: number),
        getName(component: Function)
        contains(key: string),
        clearAll()
    } = new (class {

        private data: { [key: string]: any } = {};

        private listners: { [key: number]: Function } = {};

        private incrementCount: number = 0;

        current: { [key: string]: any } = {};

        addOrUpdate(key: string, data: { [key: string]: any }) {
            this.current = this.data[key] = data;
        }

        contains(key: string) {
            return this.data[key] !== undefined;
        }

        get(path: string): string {
            if (!this.data) return;
            var currentObject: any = this.data;
            let props = path.split(".");
            for (let prop of props) {
                currentObject = currentObject[prop]
                if (currentObject === undefined)
                    break;
            }
            return currentObject === undefined ? '' : currentObject;
        }

        getName(component: Function) {
            let decoratorConfig = localizationContainer.getModelDecorator(component, 'multilingual');
            return decoratorConfig ? decoratorConfig.config : '';
        }

        clearAll() {
            Object.keys(this.data).forEach(t => delete this.data[t]);
            this.data = {};
        }

        subscribe(func: Function) {
            this.incrementCount = this.incrementCount + 1;
            this.listners[this.incrementCount] = func;
            return this.incrementCount;
        }

        unsubscribe(key: number) {
            delete this.listners[key];
        }
    });