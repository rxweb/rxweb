export class DesignClass{
    constructor(designClass?: DesignClass) {
        if (designClass)
            for (var column in designClass)
                this[column] = designClass[column];
    }

    _header: any[] = [];
    _headerRow: any[] = [];
    _headerCell: any[] = [];
    _ascending: any[] = [];
    _descending: any[] = [];
    _body: any[] = [];
    _row: any[] = [];
    _cell: any[] = [];
    _table: any[] = [];

    get tableClass() {
        return this._table;
    }
    set tableClass(value: any[]) {
        this._table = value;
    }

    get headerClass() {
        return this._header;
    }
    set headerClass(value: any[]) {
        this._header = value;
    }


    get headerRowClass() {
        return this._headerRow;
    }
    set headerRowClass(value: any[]) {
        this._headerRow = value;
    }

    get headerCellClass() {
        return this._headerCell;
    }
    set headerCellClass(value: any[]) {
        this._headerCell = value;
    }

    get ascendingClass() {
        return this._ascending;
    }
    set ascendingClass(value: any[]) {
        this._ascending = value;
    }

    get descendingClass() {
        return this._descending;
    }
    set descendingClass(value:any[]) {
        this._descending = value;
    }

    get bodyClass() {
        return this._body;
    }
    set bodyClass(value: any[]) {
        this._body = value;
    }

    get rowClass() {
        return this._row;
    }
    set rowClass(value: any[]) {
        this._row = value;
    }

    get cellClass() {
        return this._cell;
    }
    set cellClass(value: any[]) {
        this._cell = value;
    }

}