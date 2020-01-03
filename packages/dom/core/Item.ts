import { PropChangeListner } from '../interface/prop-change-listner'
export class Item {

    private propListners: PropChangeListner[] = new Array<PropChangeListner>();
    private _instance: { [key: string]: any };

    set instance(value: { [key: string]: any }) {
        this._instance = value;
        this.setValue(value);
    }

    get instance() {
        return this._instance;
    }

    value: { [key: string]: any } = {};

    constructor(modelInstance: { [key: string]: any }, columns) {
        this.instance = modelInstance;
        this.override(columns);
    }

    setValue(value: { [key: string]: any }) {
        for (var column in value)
            this.value[column] = value[column];
    }

    private override(columns: string[]) {
        columns.forEach(columnName => {
            this.overrideInstanceProp(this.instance, columnName);
            this.overrideValueProp(this.value, columnName);
        })
    }

    subscribe(propNames: string[], listner: Function) {
        propNames.forEach(propName => {
            var propListner = this.propListners.filter(t => t.name == propName)[0];
            if (propListner)
                propListner.listners.push(listner);
            else
                this.propListners.push({ name: propName, listners: [listner] });
        });
    }

    private overrideInstanceProp(instanceObject, propName: string) {
        let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instanceObject), propName);
        let value = descriptor ? descriptor.get() : instanceObject[propName];
        let oldValue = value;
        Object.defineProperty(instanceObject, propName, {
            get: () => { return descriptor ? descriptor.get.call(instanceObject) : value },
            set: (v) => {
                if (oldValue != v) {
                    value = v;
                    if (descriptor && descriptor.set)
                        descriptor.set.call(instanceObject, v);
                    this.value[propName] = instanceObject[propName];
                    oldValue = v;
                }
            }
        })
    }

    private overrideValueProp(instanceObject, propName: string) {
        let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instanceObject), propName);
        let value = descriptor ? descriptor.get() : instanceObject[propName];
        let oldValue = value;
        Object.defineProperty(instanceObject, propName, {
            get: () => { return descriptor ? descriptor.get.call(instanceObject) : value },
            set: (v) => {
                if (oldValue !== v) {
                    value = v;
                    var propListner = this.propListners.filter(t => t.name == propName)[0];
                    if (propListner)
                        propListner.listners.forEach(t => {
                            t.call(instanceObject, instanceObject);
                        });
                    oldValue = v;
                }
            }
        })
    }
}