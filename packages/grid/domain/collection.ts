import { ContainerConfig } from "../interface/config/container-config";
import { gridContainer } from "../core/gridContainer";
import { GridColumnConfig } from "../interface/config/grid-column-config";
import { Item } from '@rxweb/dom'
import { EventSubscriber } from "./event-subscriber";
import { EVENTS } from "../const/events.const";
import { customTemplateParser } from "../static/custom-template-parser";

export class Collection {

    componentId: string;
     

    private model: Function;

    protected primaryKey: string;
    private _source: any[];
    private _gridSource: Item[];
    private gridConfig: ContainerConfig;
    gridColumns: GridColumnConfig[] = [];
    private columns: string[] = [];
    protected activeColumns: string[] = [];
    protected eventSubscriber: EventSubscriber;
    constructor(source: any[], model: Function) {
        this.source = source;
        this.model = model;
        this.gridConfig = gridContainer.get(this.model);
        this.gridConfig.columns.forEach(t => {
            this.columns.push(t.name);
            if (t.visible)
                this.activeColumns.push(t.name);
            if (t.keyColumn)
                this.primaryKey = t.name;
            var gridColumn = { ...t };
            if (gridColumn.configuredTemplate)
                gridColumn.template = customTemplateParser(gridColumn.configuredTemplate, gridColumn);
            this.gridColumns.push(gridColumn);
        })
        this.bindingSource = source;
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
        return this.bindingSource.length;
    }

    protected bindingSource: any[];

    private sourceKeyValue: { [key: string]: any } = {};

    protected mapWithModel(source: any[],isDispatchEvent:boolean = true) {
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
                if (this._gridSource[i].value[this.primaryKey] != source[i][this.primaryKey])
                    this._gridSource[i].setValue(source[i]);
            }
            else {
                var row = new Item(source[i], this.columns);
                this._gridSource.push(row);
                if (isDispatchEvent)
                this.eventSubscriber.dispatch(EVENTS.ADD_ROWS, { row: row, index: i, identity:'tbody-id' });
            }
        }
        if (gridSourceLength > source.length)
            this.removeItem(this.gridSource, source.length, gridSourceLength,"row-id");
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

}