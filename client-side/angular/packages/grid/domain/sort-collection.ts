import { Pagination } from "./pagination";
import { Item } from "@rxweb/dom";
import { EVENTS } from '../const/events.const'
import { GridConfig } from '../interface/config/grid-config'
export class SortCollection extends Pagination {
    headerColumns: Item[];
    constructor(source: any[], model: Function, gridConfiguration: GridConfig) {
        super(source, model, gridConfiguration);
    }

    protected bindSource() {
        this.gridColumns = this.gridColumns.sort(this.customSort(t => t["columnIndex"], false))
        let source = this.take(this.bindingSource, Math.max(0, this.maxPerPage));
        this.mapWithModel(source, false);
        this.eventSubscriber.remove(EVENTS.SORTING)
        this.eventSubscriber.subscribe(EVENTS.SORTING, this.sortColumn.bind(this));
        
    }

    protected sortColumn(data, isDirect: boolean = false) {
        if (data && (data.allowSorting === undefined || data.allowSorting)) {
            this.headerColumns.forEach((t: any) => {
                if (data.name != t.instance.name)
                    t.instance.isAscending = false;
            })
            if (!isDirect)
            data.isAscending = !data.isAscending;
            this.sort(data.name, !data.isAscending);
        }
    }


    sort(columnName: string, orderBy: boolean) {
        if (this.storeProcedure && this.storeProcedure.onPageSorting) {
            this.storeProcedure.onPageSorting(columnName, orderBy, this.currentPage);
        } else {
            this.bindingSource = this.bindingSource.sort(this.customSort(t => t[columnName], orderBy));
            this.changeSource();
        }
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