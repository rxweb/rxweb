import { QueryList, Output, EventEmitter, Input } from "@angular/core";
import { RxColumnComponent } from './rx-column.component';
import { DataSearch } from './models';
import { ApplicationConfiguration } from "../core";
import { RxHttp } from '../http';

export abstract class DataCollection {
  private accessor;
  source: Array<any>;
  data: Array<any>;
  filterData: Array<any>;
  tableColumns: Array<string>;
  searchCollection: Array<DataSearch>;
  @Input() pageSize: number;
  
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
  searchObject: { [key: string]: any } = {};
  pageChanging: EventEmitter<any> = new EventEmitter<any>()
  isNextPage: boolean = false;
  isLastPage: boolean = true;
  @Input() dateFormat: string;
  @Output() searching: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: RxHttp, private hostUri: string) {
    this.tableConfiguration = ApplicationConfiguration.get('control.rxTable')
    var date = ApplicationConfiguration.get('internationalization.date');
    this.format = date.format;
    this.seperator = date.seperator;
    this.label = this.tableConfiguration.label;
    if (!this.pageSize)
      this.pageSize = this.tableConfiguration.pageSize;
    this.pageIndexs = [];
    this.pages = [];
  }
  setEvents(pageChanging: EventEmitter<any>) {
    this.pageChanging = pageChanging;
  }

  clearPageIndex() {
    
    this.pageIndexs = [];
    this.skip = 0;
    this.lastSkip = 1;
  }

  set(data: Array<any>, pageSize: number, columns: Array<string>, isStoreProc: boolean, totalCount: number) {
    if (pageSize)
      this.pageSize = pageSize;
    this.source = data;
    this.filterData = data;
    this.data = data;
    this.tableColumns = columns;
    if (!(this.isStoreProc && this.pageIndexs && this.pageIndexs.length > 0))
      this.pageIndexs = [];
    this.searchCollection = new Array<DataSearch>();
    this.isStoreProc = isStoreProc;
    this.totalCount = totalCount;
    if (this.source.length == 0)
        this.setFooter();
    if (this.dateFormat)
        this.format = this.dateFormat;
  }

  get total(): number {
    if (this.isStoreProc)
      return this.totalCount
      return this.source == undefined ? 0 : this.source.length;
  }

  get length(): number {
    if (this.isStoreProc)
      return this.totalCount
    return this.filterData.length;
  }

  next(): void {
    if (!this.isNext) {
      this.isNextPage = true;
      this.skip++;
      this.goTo(this.skip);
      //this.pagging();
      //this.applyChangesToObject()
    }

  }

  previous(): void {
    if (!this.isPrevious) {
      this.skip--;
      this.pagging();
      this.applyChangesToObject()
      this.isLastPage = true;
    }
  }

  first() {
    if (this.isNextPage) {
      this.goTo(0);
      this.isNextPage = false;
      this.isLastPage = true;
    }
  }

  last() {
    if (this.isLastPage) {
      this.isLastPage = false;
      this.isNextPage = true;
      let roundValue = Math.round(this.length / this.pageSize);
      if ((roundValue * this.pageSize) >= this.length)
        this.goTo(roundValue);
      else
        this.goTo(roundValue + 1);
    }

  }

  goTo(pageNumber: number) {
    if (pageNumber > 1)
      this.isNextPage = true;
    else
      this.isNextPage = false;
    if ((Math.round(this.length / this.pageSize) + 1) == pageNumber)
      this.isLastPage = false;
    else
      this.isLastPage = true;

    this.skip = pageNumber;
    this.pagging();
    this.applyChangesToObject()
  }

  


  columnFilter() {
    if (this.isStoreProc) {
      this.searching.emit({ pageNumber: this.skip, pageSize: this.pageSize, sortColumnName: this.sortColumnName, sortOrder: this.sortOrder, searchObject: this.searchObject })
    }

  }

  applyChangesToObject(isFromTableCall: boolean = false) {
    if (this.isStoreProc) {
      if (!isFromTableCall)
        this.pageChanging.emit({ pageNumber: this.skip, pageSize: this.pageSize, sortColumnName: this.sortColumnName, sortOrder: this.sortOrder })
    }
    else{
      this.data = this.filterData.slice(this.startNumber - 1, Math.max(0, this.endNumber));
      if (this.data.length == 0 && this.skip > 1) {
        let previousNumber = this.skip - 1;
        this.goTo(previousNumber);
      }
    }
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
        var roundNumber = parseInt(String(this.skip / 5));
        var actualRoundNumber = this.skip / 5;
        var startIndex = 0;
        var endIndex = 0;
        if (roundNumber == 0 || this.skip == 5)
          currentIndex = 1
        else
          currentIndex =  roundNumber * 5 + 1;
        var currentLength = (this.length / this.pageSize);
        if (currentLength == 0 || currentLength == 1)
          currentLength = 1;
        else {
          if (Number.isInteger(currentLength))
            currentLength = currentLength;
          else
            currentLength = ((currentLength * this.pageSize) >= this.length) ? Math.round(currentLength) : currentLength + 1;
        }
        
        for (var i = 0; i < 5; i++) {
          if (currentIndex <= currentLength) {
            this.pageIndexs.push(currentIndex);
          }
          currentIndex++;
        }
      }
      this.footerText = this.label.footerText.replace("{{startNumber}}", this.startNumber.toString()).replace("{{endNumber}}", this.endNumber.toString()).replace("{{totalNumber}}", this.length.toString());
      if (this.isStoreProc) {
        this.isNext = this.skip >= ((this.length / this.pageSize));// !((this.selectedIndex * this.pageSize) < this.total);
      }
      else
        this.isNext = this.skip >= ((this.filterData.length / this.pageSize));
      this.isPrevious = this.skip == 1;

      this.lastSkip = this.skip;
    } else {
      this.data = [];
      if (this.searchCollection.length > 0)
        this.footerText = this.label.notFound;
      else
        this.footerText = this.label.dataNotAvailable;
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

    if (columnValue == null) {
      return false;
    }
    return String(columnValue).toLowerCase().includes(String(prefix).toLowerCase());
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

  resetTable(): void {
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

  sort(columnName: string, sortOrder: boolean, isFromTable: boolean): boolean {
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
    if (!isFromTable)
      this.applyChangesToObject();
    return sortOrder;
  }



  export(columns: QueryList<RxColumnComponent>, fileName: string): void {
    var data, filename, link;
    var csv = this.csvProcessor(columns);
    if (csv == null) return;

    filename = fileName;
    this.http.post<any>('/api/csvexport', { data: csv }).subscribe(t => {
      window.location.href = this.hostUri.concat(`api/csvexport/${t.key}/?fileName=${filename}`);
    })
  }

  csvProcessor(columns: QueryList<RxColumnComponent>): string {
    var result, ctr, columnDelimiter, lineDelimiter, data;
    columnDelimiter = ',';
    lineDelimiter = '\n';

    let keys: Array<any> = new Array<any>();

    result = '';
    columns.forEach(function (column) {
      if (!column.actionable && column.isBindable) {
        keys.push(column.title);
      }
    })
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    this.filterData.forEach((item) => {
      ctr = 0;

      columns.forEach((column) => {
        if (!column.actionable && column.isBindable) {
          if (ctr > 0) result += columnDelimiter;
          if (column.dataType == "date" && item[column.field])
            result += this.makeDateString(new Date(item[column.field]))
          else
            result += item[column.field];
          ctr++;
        }
      });
      result += lineDelimiter;
    });

    return result;
  }


  makeDateString(value: Date): string {
    let dateString: string = '';
    for (let character of this.format) {
      switch (character) {
        case 'm':
          dateString += dateString.length == 0 ? (value.getMonth() + 1).toString() : this.seperator + (value.getMonth() + 1)
          break;
        case 'd':
          dateString += dateString.length == 0 ? (value.getDate()).toString() : this.seperator + (value.getDate())
          break;
        case 'y':
          dateString += dateString.length == 0 ? (value.getFullYear()).toString() : this.seperator + (value.getFullYear())
          break;
      }
    }
    return dateString;
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
