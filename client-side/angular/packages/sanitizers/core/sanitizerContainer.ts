import { expressionParser } from "../functions/expression-parser.function";

export const sanitizerContainer:
    {
        register(target: any, propName: string, sanitizerName: string, config: any);
        getActive();
        clear();

    } = new (class {

        private activeModel: { [key: string]: any } = {};
        private currentConstructor: any;

        register(target: any, propName: string, sanitizerName: string, config: any): void {
            if (!this.currentConstructor)
                this.currentConstructor = target;
            if (this.currentConstructor != target) {
                this.activeModel = {};
                this.currentConstructor = target;
            }
            if (!this.activeModel[propName])
                this.activeModel[propName] = {};
            this.activeModel[propName][sanitizerName] = config;
        }

        getActive() {
            let notificationColumns = this.getNotificationColumns()
            return { activeModel: this.activeModel, target: this.currentConstructor, columns: notificationColumns }
        }

        getNotificationColumns() {
            let columns = {};
            let additionalDefineProp = [];
            Object.keys(this.activeModel).forEach(propName => {
                Object.keys(this.activeModel[propName]).forEach(sanitizerName => {
                    if (this.activeModel[propName][sanitizerName].expression) {
                        let expressionColumns = expressionParser(this.activeModel[propName][sanitizerName].expression)
                        expressionColumns.forEach(x => {
                            if (!columns[x])
                                columns[x] = [];
                            if (columns[x].indexOf(propName) == -1)
                                columns[x].push(propName);
                            if (!this.activeModel[x])
                                additionalDefineProp.push(x);
                        })
                    }
                })
            })
            additionalDefineProp.forEach(t => {
                this.activeModel[t] = {};
            })
            return columns;
        }

        clear() {
            this.activeModel = {};
            this.currentConstructor = undefined;
        }

    })();
