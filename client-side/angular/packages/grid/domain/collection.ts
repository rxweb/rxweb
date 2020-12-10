import { DomManipulation } from "@rxweb/dom";
import { ContainerConfig } from "../interface/config/container-config";
import { gridContainer } from "../core/gridContainer";
import { GridColumnConfig } from "../interface/config/grid-column-config";
import { Item } from '@rxweb/dom'
import { EventSubscriber } from "./event-subscriber";
import { EVENTS } from "../const/events.const";
import { customTemplateParser } from "../static/custom-template-parser";
import { merge, clone } from '../functions/entity.service'
import { StoreProcedureConfig } from "../interface/config/store-procedure-config";
import { ControlState } from './control-state'
import { GridConfig } from '../interface/config/grid-config'
export class Collection {
    protected childrens: { [key: string]: any } = {};
    componentId: string;
    protected controlState: ControlState;
    storeProcedure: StoreProcedureConfig;
    private model: Function;
    protected DomRows: { [key: string]: DomManipulation[] } = {};
    protected primaryKey: string;
    private _source: any[];
    private _items: any[];
    private _gridSource: Item[];
    protected gridConfig: ContainerConfig;
    gridColumns: GridColumnConfig[] = [];
    private columns: string[] = [];
    protected activeColumns: string[] = [];
    protected searchColumns: string[] = [];
    protected eventSubscriber: EventSubscriber;
    protected isTranslateModuleUsed: boolean;
    constructor(source: any[], model: Function, private configuration: GridConfig) {
        this.source = source;
        this.model = model;
        this.gridConfig = this.getInstanceProvider(this.model);
        this.gridConfig.columns.forEach(t => {
            this.columns.push(t.name);
            if (t.visible) {
                this.activeColumns.push(t.name);
                if (t.allowSearch === undefined || t.allowSearch === true)
                    this.searchColumns.push(t.name);
            }
            
            if (t.keyColumn)
                this.primaryKey = t.name;
            var gridColumn = { ...t };
            if (gridColumn.configuredTemplate)
                gridColumn.template = customTemplateParser(gridColumn.configuredTemplate, gridColumn);
            this.gridColumns.push(gridColumn);
        })
        this.bindingSource = this.overrideSourceProp(source);
        this.gridSource = [];
        this.eventSubscriber = new EventSubscriber();
    }


    set source(value: any[]) {
        this._source = value;
    }

    get source() {
        return this._source
    }

    protected set gridSource(value: any[]) {
        this._gridSource = value;
    }

    protected get gridSource() {
        return this._gridSource;
    }


    protected get length() {
        return this.storeProcedure ? this.storeProcedure.length : this.bindingSource.length;
    }

    protected bindingSource: any[];

    private sourceKeyValue: { [key: string]: any } = {};

    protected mapWithModel(source: any[], isDispatchEvent: boolean = true, isUpdateSource: boolean = false) {
        debugger;
        this.removeChildrens();
        var gridSourceLength = this._gridSource.length;
        for (var i = 0, j = source.length; i < j; i++) {
            var key = source[i][this.primaryKey];
            if (this.sourceKeyValue[key] === undefined) {
                var instance = this.getInstance(this.model);
                var item = source[i];
                for (var column in item) {
                    instance[column] = item[column];
                    source[i][column] = instance[column];
                }
                this.sourceKeyValue[item[this.primaryKey]] = instance;
            }

            if (gridSourceLength > i) {
                if (this._gridSource[i].value[this.primaryKey] != source[i][this.primaryKey]) {
                    //if (isUpdateSource)
                    //    this.overrideValueProp(source[i], this.columns);
                    //console.log(source[i]);
                    this._gridSource[i].setValue(source[i],true);
                }
            }
            else {
                var row = new Item(source[i], this.columns);
                //this.overrideValueProp(source[i], this.columns);
                this._gridSource.push(row);
                if (isDispatchEvent)
                    this.eventSubscriber.dispatch(EVENTS.ADD_ROWS, { row: row, index: i, identity: 'tbody-id' });
            }
        }
        if (gridSourceLength > source.length)
            this.removeItem(this.gridSource, source.length, gridSourceLength, "row-id");
        if (isUpdateSource)
            this.source = source;
    }


    private getInstanceProvider(instanceFunc: any): ContainerConfig {
        let instance: any = gridContainer.get(instanceFunc);
        let prototype: any = this.getInstance(instanceFunc, []).__proto__;
        if (prototype.__proto__) {
            let isLoop = false;
            do {
                isLoop = prototype.__proto__.constructor != Object;
                if (isLoop) {
                    let extendClassInstance: any = gridContainer.get(prototype.__proto__.constructor);
                    instance = merge(clone(instance), clone(extendClassInstance))
                    prototype = prototype.__proto__;
                }
            } while (isLoop)
        }
        return this.bindDynamicColumns(instance);
    }

    private bindDynamicColumns(instance: ContainerConfig) {
        if (instance && this.configuration && this.configuration.columns) {
            let cloneInstance = { ...instance };
            let columns = [];
            let index = 0;
            cloneInstance.columns.forEach((column, index) => {
                if (this.configuration.columns.startColumnIndex == column.columnIndex)
                    this.configuration.columns.columnConfigs.forEach(t => {
                        t.columnIndex = index;
                        columns.push(t);
                        index++;
                    });
                column.columnIndex = index;
                columns.push(column);
                index++;
            });
            cloneInstance.columns = columns;
            instance = cloneInstance;
        }
        return instance;
    }

    private getInstance(model: any, objectArguments: any[] = []) {
        let classInstance = Object.create(model.prototype)
        try {
            model.apply(classInstance, objectArguments);
        } catch (ex) {
            ///resolution of issue https://github.com/rxweb/rxweb/issues/188
            classInstance = Reflect.construct(model, objectArguments);
        }
        return classInstance;
    }

    protected skip(source: any[], skipIndex: number): any[] {
        return source.slice(skipIndex);
    }

    protected take(source: any[], total: number): any[] {
        return source.slice(0, total);
    }

    protected removeItem(source: any[], startIndex: number, endIndex: number, identity: string) {
        source.splice(startIndex, endIndex);
        this.eventSubscriber.dispatch(EVENTS.REMOVE_ROWS, { identity: identity, start: startIndex, end: endIndex });
    }

    protected removeChildrens() {
        Object.keys(this.childrens).forEach(t => {
            this.removeChildGrid(t);
        })
    }
    
    removeChildGrid(id:any) {
        if (this.childrens[id]) {
            this.childrens[id].destroy();
            if (this.childrens[id].childDom)
                this.childrens[id].childDom.destroy();
            delete this.childrens[id];
        }
    }

    getRowElement(id: number) {
        let domManipulation: DomManipulation = undefined;
        for (var i = 0; i < this._gridSource.length; i++) {
            if (this._gridSource[i].value[this.primaryKey] == id) {
                domManipulation= this.controlState.elements[`row-id-${i}`];
                break;
            }
        }
        return domManipulation.element;
    }

    private updateDom(currentObject,newObject,index) {
        for (var column in newObject) {
                if (this.DomRows.length > index) {
                    let filterValues = this.DomRows[index].filter(x => x.subscribeProps.indexOf(column) !== -1)
                    filterValues.forEach(y => {
                        y.updateElement(newObject);
                    })
                }
        }
    }

    private overrideSourceProp(source:any) {
        for (let item of source) {
            this.overrideValueProp(item, this.columns)
        }
        return source;
    }

    private overrideValueProp(instanceObject, columns:string[]) {
        if (!instanceObject.grid) {
            instanceObject.grid = true;
            columns.forEach(propName => {
                let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instanceObject), propName);
                let value = descriptor ? descriptor.get() : instanceObject[propName];
                let oldValue = value;
                Object.defineProperty(instanceObject, propName, {
                    configurable: true,
                    get: () => { return descriptor ? descriptor.get.call(instanceObject) : value },
                    set: (v) => {
                        if (oldValue !== v) {
                            value = v;
                            this._gridSource.forEach((t, i) => {
                                if (t.value[this.primaryKey] == instanceObject[this.primaryKey]) {
                                    let filterValues = this.DomRows[i].filter(x => x.subscribeProps.indexOf(propName) !== -1)
                                    filterValues.forEach(y => {
                                        y.updateElement(instanceObject);
                                    })
                                }
                            })
                            oldValue = v;
                        }
                    }
                })
            })
        }
    }
}