export class DataSearch {
    constructor(search?: DataSearch) {
        if (search) {
            this.columnName = search.columnName;
            this.condition = search.condition;
            this.value = search.value;
            this.dataType = search.dataType;
        }
    }

    columnName: string;
    condition: string;
    value: any;
    dataType?: string;
}