import { DataSearch } from '../../table/models/data-search.model'
import { ApplicationConfiguration } from "@rx/core";

export class TemplateCollection {
    source: Array<any>;
    data: Array<any>;
    filterData: Array<any>;
    tableColumns: Array<string>;
    searchCollection: Array<DataSearch>;
    pageSize: number = 4;
    skip: number = 0;
    pageIndexs: Array<number>;
    selectedIndex: number;
    startNumber: number;
    endNumber: number;
    isPrevious: boolean;
    isNext: boolean;
    footerText: any;
    pages: Array<number>;
    label: any;
    showPagging: boolean = true;
    tableConfiguration: any;
    lastSkip: number = 1;
    format: string;
    seperator: string;
    isStoreProc: boolean;
    totalCount: number;
    sortColumnName: string;
    sortOrder: boolean;
    constructor() {
        this.tableConfiguration = ApplicationConfiguration.get('control.rxTable');
        this.label = this.tableConfiguration.label;
    }

    set(data: Array<any>, pageSize: number, columns: Array<string>) {
        if (pageSize)
            this.pageSize = pageSize;
        this.source = data;
        this.filterData = data;
        this.data = data;
        this.tableColumns = columns;
        if (!(this.isStoreProc && this.pageIndexs && this.pageIndexs.length > 0))
            this.pageIndexs = [];
        this.searchCollection = new Array<DataSearch>();
    }

    get total(): number {
        return this.source.length;
    }

    get length(): number {
        return this.filterData.length;
    }

    next(): void {
        if (!this.isNext) {
            this.skip++;
            this.pagging();
            this.applyChangesToObject()
        }

    }

    previous(): void {
        if (!this.isPrevious) {
            this.skip--;
            this.pagging();
            this.applyChangesToObject()
        }
    }

    goTo(pageNumber: number) {
        this.skip = pageNumber;
        this.pagging();
        this.applyChangesToObject()
    }

    changePageSize(size: number) {
        this.skip = 0;
        this.pageSize = size;
        this.pagging();
    }


    applyChangesToObject(isFromTableCall: boolean = false) {
        
    }

    pagging(): void {
        this.showPagging = this.length > 0
        if (this.showPagging) {
            if (this.skip == 0) {
                this.startNumber = (this.skip + 1) * this.pageSize - this.pageSize + 1;
                this.endNumber = (this.skip + 1) * this.pageSize;
                this.endNumber = (this.length < this.endNumber) ? this.length : this.endNumber;
                this.selectedIndex = this.startNumber;
                this.skip = 1;
            } else {
                this.startNumber = this.skip * this.pageSize - this.pageSize + 1;
                this.endNumber = this.skip * this.pageSize;
                if (this.endNumber > this.length) {
                    this.endNumber = this.length;
                }
                this.selectedIndex = this.startNumber;
            }

            if (this.pageIndexs.filter(t => t == this.skip).length == 0) {
                this.pageIndexs = [];
                let currentIndex = 1;
                if (this.lastSkip > this.skip) {
                    currentIndex = this.lastSkip - 5;
                    if (currentIndex < 1)
                        currentIndex = 1;
                }
                else
                    currentIndex = this.skip;
                var currentLength = (this.length / this.pageSize);
                if (currentLength == 0 || currentLength == 1)
                    currentLength = 1;
                else {
                    if (Number.isInteger(currentLength))
                        currentLength = currentLength;
                    else
                        currentLength = currentLength + 1;
                }
                for (var i = 0; i < 5; i++) {
                    if (currentIndex <= currentLength) {
                        this.pageIndexs.push(currentIndex);
                    }
                    currentIndex++;
                }
            }
            this.footerText = this.label.footerText.replace("{{startNumber}}", this.startNumber.toString()).replace("{{endNumber}}", this.endNumber.toString()).replace("{{totalNumber}}", this.length.toString());
            this.isNext = this.skip >= ((this.filterData.length / this.pageSize));
            this.isPrevious = this.skip == 1;
            this.lastSkip = this.skip;
            this.data = this.filterData.slice(this.startNumber - 1, Math.max(0, this.endNumber));
        } else {
            this.data = [];
            if (this.searchCollection.length > 0)
                this.footerText = this.label.notFound;
            else
                this.footerText = this.label.dataNotFound;
        }
    }

    setFooter() {
        this.showPagging = false;
        this.footerText = this.label.dataNotAvailable;
    }

    filterAll(value: any): void {
        this.filterData = [];
        this.source.forEach(t => {
            if (this.wildcardSearch(t, value))
                this.filterData.push(t);
        });
        this.refreshTable();
    }

    search(searchObject:any){
        this.filterData = [];
        this.source.forEach(t => {
            var matchCount =[];
            var loopCount = [];
            for(var column in searchObject){
                if(searchObject[column] != "" && searchObject[column] !=null && searchObject[column] !=undefined ){
                if (this.isExist(t[column], searchObject[column])) {
                    matchCount.push(0);
                }
                loopCount.push(0);
            }
            }
            if(matchCount.length == loopCount.length)
                this.filterData.push(t);
        });
        this.refreshTable();

    }

    wildcardSearch(row: any, prefix: any): boolean {
        let isMatched = false;
        for (var i = 0; i < this.tableColumns.length; i++) {
            var t = this.tableColumns[i];
            var columnValue = String(row[t]);
            if (this.isExist(columnValue, prefix)) {
                isMatched = true;
                break;
            }
        }
        return isMatched;
    }

    isExist(columnValue: string, prefix: any) {
        if (/^(true|false)$/i.test(prefix)) {
            return (columnValue + "").indexOf(prefix) >= 0;
        } else if (/^\s*\d+\s*$/i.test(prefix)) {
            return (columnValue + "").indexOf(prefix) >= 0;
        }
        if (columnValue == null) {
            return false;
        }
        return (columnValue.toLowerCase() + "").indexOf(prefix.toLowerCase()) >= 0;
    }

    filter(dataSearch: DataSearch | Array<DataSearch>): void {
        if (dataSearch instanceof Array) {
            this.searchCollection = dataSearch;
        } else {
            var searchObject = this.searchCollection.filter(t => t.columnName == dataSearch.columnName)[0];
            if (searchObject) {
                searchObject.condition = dataSearch.condition;
                searchObject.value = dataSearch.value;
            } else {
                dataSearch.dataType = this.source.length > 0 ? typeof this.source[0][dataSearch.columnName] : '';
                this.searchCollection.push(dataSearch);
            }
        }
        let expression = this.filterExpession();
        var match = expression.match(/^\s*\(?\s*([^)]*)\s*\)?\s*=>(.*)/);
        var fun = new Function(match[1], "return " + match[2]);
        this.filterData = this.source.filter(<any>fun)
        this.refreshTable();
    }

    refreshTable(): void {
        this.skip = 0;
        this.pageIndexs = [];
        this.pagging();
    }

    resetTemplate(): void {
        this.searchCollection = new Array<DataSearch>();
        this.filterData = [];
        this.source.forEach(t => this.filterData.push(t));
        this.refreshTable();
    }

    filterExpession() {
        let expression: string = "t => ";
        let lengthCount = this.searchCollection.length;
        var loopCount = 0;
        this.searchCollection.forEach(t => {
            if (t.dataType == "string" || typeof t.value == "string") {
                expression = expression.concat("t.", t.columnName, ".toLowerCase() ", t.condition, ' "', t.value, '".toLowerCase() ')
            } else if (t.value instanceof Date) {
                let value = <Date>t.value;
                expression = expression.concat("new Date(t.", t.columnName, ") ", t.condition, " new Date('", String(value.getMonth() + 1), '/', String(value.getDate()), '/', String(value.getFullYear()), "')")
            } else {
                expression = expression.concat("t.", t.columnName, " ", t.condition, " ", t.value)
            }

            loopCount++;
            if (loopCount != lengthCount)
                expression = expression.concat(" && ");
        });
        return expression;
    }

    sort(columnName: string, sortOrder: boolean): boolean {
        this.sortColumnName = columnName;
        this.sortOrder = sortOrder;
        this.filterData.sort((item1: any, item2: any) => {
            let a = item1[columnName];
            let b = item2[columnName];
            if (sortOrder)
                return this.comparator(a, b);
            else
                return this.comparator(b, a);
        });

        this.pagging();
        this.applyChangesToObject();
        return sortOrder;
    }



    private comparator(firstValue: any, secondValue: any): number {
        if (!firstValue) {
            if (secondValue)
                firstValue = typeof secondValue === "number" ? 0 : typeof secondValue === "boolean" ? false : "";
            else {
                firstValue = ''; secondValue = '';
            }
        }
        if (!secondValue)
            secondValue = typeof firstValue === "number" ? 0 : typeof firstValue === "boolean" ? false : "";
        if ((isNaN(parseFloat(firstValue)) || !isFinite(firstValue)) || (isNaN(parseFloat(secondValue)) || !isFinite(secondValue))) {
            if (typeof firstValue === "boolean" && typeof secondValue === "boolean") {
                if (firstValue === secondValue) return -1;
                if (firstValue !== secondValue) return 1;
            } else {
                if (firstValue.toLowerCase() < secondValue.toLowerCase()) return -1;
                if (firstValue.toLowerCase() > secondValue.toLowerCase()) return 1;
            }
        }
        else {
            if (parseFloat(firstValue) < parseFloat(secondValue)) return -1;
            if (parseFloat(firstValue) > parseFloat(secondValue)) return 1;
        }
        return 0;
    }

}
