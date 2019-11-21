import { Pagination } from "./pagination";
import { Item } from "@rxweb/dom";
import { EVENTS } from '../const/events.const'

export class SortCollection extends Pagination {
    protected headerColumns: Item[];
    constructor(source: any[], model: Function) {
        super(source, model);
    }

    protected bindSource() {
        this.gridColumns = this.gridColumns.sort(this.customSort(t => t["columnIndex"], false))
        var columnConfig = this.gridColumns.filter(t => t.visible && t.allowSorting && t.isAscending)[0];
        if (columnConfig)
            this.sort(columnConfig.name, true);
        else {
            let source = this.take(this.bindingSource, Math.max(0, this.maxPerPage));
            this.mapWithModel(source, false);
        }
        this.eventSubscriber.subscribe(EVENTS.SORTING, this.sortColumn.bind(this));
    }

    private sortColumn(data) {
        this.headerColumns.forEach((t:any) => {
            if (data.name != t.instance.name)
                t.instance.isAscending = false;
        })
        data.isAscending = !data.isAscending;
        this.sort(data.name, data.isAscending);
    }


    sort(columnName: string, orderBy: boolean) {
        this.bindingSource = this.source.sort(this.customSort(t => t[columnName], orderBy));
        this.changeSource();
    }

    private customSort(predicate: (key: any) => any, orderByDescending: boolean) {
        return (a: any, b: any) => {
            let first = predicate(a)
            let second = predicate(b)
            first = typeof first == "string" ? first.toLowerCase() : first;
            second = typeof second == "string" ? second.toLowerCase() : second;
            if (first > second) {
                return !orderByDescending ? 1 : -1
            } else if (first < second) {
                return !orderByDescending ? -1 : 1
            } else {
                return 0
            }
        }
    }

    

    allowSorting: boolean = true;

}