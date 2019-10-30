import { SortCollection } from "./sort-collection";


export class FilterCollection extends SortCollection {

    constructor(source:any[],model:Function) {
        super(source, model);
        
    }

    private _search: any;

    get search() {
        return this._search;
    }

    set search(value: any) {
        this._search = value;
        this.searchData(value);
    }

    private searchData(value: any) {
        var filter = [];
        this.source.forEach(t => {
            if (this.wildcardSearch(t, String(value).trim(), this.activeColumns))
                filter.push(t);
        });
        this.bindingSource = filter;
        this.currentPage = 1;
        filter = this.take(this.bindingSource, Math.max(0, this.maxPerPage));
        this.mapWithModel(filter);``
    }

    private wildcardSearch(row: any, prefix: any, filterColumns: string[]): boolean {
        let isMatched = false;
        for (var i = 0, j = filterColumns.length; i < j; i++) {
            var t = filterColumns[i];
            var columnValue = String(row[t]);
            if (this.isExist(columnValue, prefix)) {
                isMatched = true;
                break;
            }
        }
        return isMatched;
    }

    private isExist(columnValue: string, prefix: any) {

        if (columnValue == null) {
            return false;
        }
        return String(columnValue).toLowerCase().includes(String(prefix).toLowerCase());
    }
}