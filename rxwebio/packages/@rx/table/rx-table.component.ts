import {
  Inject,
  Component,
  ContentChildren,
  ContentChild,
  QueryList,
  Input,
  AfterContentInit, SimpleChanges,
  OnChanges, Output, EventEmitter
} from "@angular/core";

import { DataCollection } from './data-collection.abstract';
import { RxColumnComponent } from './rx-column.component';
import { RxTableDetailTemplateDirective } from './rx-table-detail-template.directive';
import { PermissionService } from '../security/permission.service';
import { user } from '../security/user';
import { ApplicationConfiguration } from "../core";
import { GridCode } from './grid-code.static.class';
import { DataSearch } from './models';
import { RxHttp } from '../http';
import { RxFooterComponent } from "./rx-footer.component";
import { OverlayPositionHost } from "../core/view/overlay_view_host";
import { RandomNumber } from '../core/random-number';


export const API_HOST_URI: string = 'API_URL';

@Component({
  selector: "rx-table",
  templateUrl: "./rx-table.component.html",
  exportAs: 'grid'
})
export class RxTableComponent extends DataCollection implements AfterContentInit, OnChanges {
  @ContentChildren(RxColumnComponent) columns: QueryList<RxColumnComponent>;

  @ContentChildren(RxFooterComponent) footer: QueryList<RxFooterComponent>;

  @ContentChild(RxTableDetailTemplateDirective) detailTemplate: RxTableDetailTemplateDirective;

  @Input() dataSource: any;

  @Input() defaultFilter: any;

  @Input() masterClass: any;

  @Input() controlClass: any;

  @Input() rowClass: string;

  @Input() isStoreProc: boolean;

  @Input() addRow: boolean;

  @Input() totalCount: number;

  @Input() width: number = 0;

  @Input() sortable: boolean = true;

  @Input() set isFilter(value: boolean) {
    if (value)
      super.clearPageIndex();
  }
  @Input() set customPageSize(value: number) {
    if (value)
      this.pageSize = value;
  }
  @Input() sortableConfig: { [key: string]: any }

  @Input() showTip: boolean = false;

  @Output() pageChanging: EventEmitter<any> = new EventEmitter<any>()

  @Output() onRowClick: EventEmitter<any> = new EventEmitter<any>();

  

  totalCountValue: number = 0;

  tableConfiguration: any;

  addItem: any = {};

  pastSortableColumnComponent: RxColumnComponent;

  detailIndex: number = -1;

  openDetail: string;
  closeDetail: string;
  tableClass: string;
  isTypeCheck: boolean = false;
  firstTimeBind: boolean = false;
  isAddRow: boolean = false;
  currentFooter: RxFooterComponent;
  pageSizes: number[];
  private overlayPositionHost: OverlayPositionHost
  widthStyle: { [key: string]: any } = { width: '100%', 'max-width': '100%' };
  tableId: number;
  textTruncateSize: number;
  constructor(private permissionService: PermissionService, http: RxHttp) {
    super(http);
    this.tableConfiguration = ApplicationConfiguration.get('control.rxTable');
    this.openDetail = this.tableConfiguration.masterClass.openDetail;
    this.closeDetail = this.tableConfiguration.masterClass.closeDetail;
    this.tableClass = this.tableConfiguration.controlClass.table;
    super.setEvents(this.pageChanging)
    this.overlayPositionHost = new OverlayPositionHost();
    if (this.tableConfiguration.pageSizes)
      this.pageSizes = this.tableConfiguration.pageSizes;
    if (this.tableConfiguration.textTruncateSize)
      this.textTruncateSize = this.tableConfiguration.textTruncateSize;
    //this.tableClass = "mdl-data-table product-table m-t-30 dataTable no-footer table table-striped";
    this.tableId = RandomNumber.next();
  }

  selectable: boolean = true;
  code: string;
  ngAfterContentInit(): void {
    super.setFooter();
    GridCode.code++;
    this.code = 'grid-' + GridCode.code;
    var actionColumns = this.columns.filter((t) => { return t.permissions != null && t.permissions.length > 0 });
    let permissionItems: any[] = [];
    if (actionColumns.length > 0)
      actionColumns.forEach((t) => {
        var count = 0;
        t.permissions.forEach((x) => {
          if (this.permissionService.isAccess(x)) {
            count++;
          }
        });
        if (t.permissions.length == count)
          t.isBindable = false;
      });
    actionColumns = this.columns.filter((t) => { return t.isBindable });
    this.columns.reset(actionColumns);
    if (this.addRow)
      this.columns.forEach(t => this.addItem[t.field] = '');

    if (!this.firstTimeBind && this.dataSource) {
      this.bindData(this.dataSource);
    }
    if (this.footer.length > 0)
      this.currentFooter = this.footer.first;
    this.applyWidth();
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes["dataSource"]) {
      let source: any[] = changes['dataSource'].currentValue;
      this.bindData(source, true);
      this.applyWidth();
    }
  }

  changeColumnSortOrder(jObject: any) {
  }


  getColSpanCount() {
    return this.columns.length - 1;
  }
  getLink(item: any, link: string[]) {
    var linkUri = [];
    link.forEach(t => {
      if (t.indexOf(":") != -1 && item[t.replace(":", "")]) 
        linkUri.push(item[t.replace(":", "")])
      else
        linkUri.push(t)
    })
    return linkUri;
  }

  rowClick(column: RxColumnComponent, dataRow: any) {
    if (column.clickable && !column.actionable && (dataRow[column.field] != undefined && dataRow[column.field] != "")) {
      this.onRowClick.emit(dataRow);
    }
    if ((dataRow[column.field] != undefined && dataRow[column.field] != ""))
      column.click.emit(dataRow);
  }

  getQueryParams(item: any, queryParams: any) {
    var jObject = {};
    for (var col in queryParams) {
      jObject[col] = queryParams[col.replace(":", "")];
    }
    return jObject
  }
  exportToCsv(fileName: string) {
    super.export(this.columns, fileName.concat(".csv"));
  }

  showAddRow() {
    this.isAddRow = !this.isAddRow;
  }
  changePageSize(size: number) {
    super.clearPageIndex()
    this.isPageChanged = true;
    this.pageSize = size;
    super.goTo(this.skip);
  }
  applySortColumn(column: RxColumnComponent, sortOrder: boolean) {
    this.columns.forEach(t => {
      t.sortable = undefined;
      t.sortClass = undefined;
    })
    let sortColumnName = column.field;
    column.sortClass = sortOrder ? this.tableConfiguration.masterClass.asc : this.tableConfiguration.masterClass.desc;
    this.sortColumnName = sortColumnName;
    this.sortOrder = sortOrder;
    this.pastSortableColumnComponent = column;
    column.sortable = sortOrder;

    return sortColumnName;
  }

  applyWidth() {
    if (this.columns) {
      this.width = 0;
      this.columns.forEach(t => {
        if (t.visible)
          if (t.width)
            this.width += parseInt(t.width);
      });
      if (this.width > 0) {
        this.widthStyle = {
          width: `${this.width}px`, 'max-width': `${this.width}px`
        }
      }
    }
  }

  bindData(source: any[], isChanges: boolean = false) {
    let tableColumns = new Array<string>();
    let sortColumnName: string;
    if (this.columns) {
      if (source) {
        this.width = 0;
        let sortOrder = true;
        if (source.length > 0)
          this.columns.forEach(t => {
            if (t.sortable && !this.sortableConfig) {
              sortColumnName = this.applySortColumn(t,true)
            } else if (this.sortableConfig && t.field == this.sortableConfig.sortColumnName) {
              sortColumnName = this.applySortColumn(t, this.sortableConfig.sortOrder);
              sortOrder = this.sortableConfig.sortOrder;
              isChanges = false;
            }
            if (!t.actionable) {
              let fieldValue = source[0][t.field];
              if (!fieldValue) {
                let findObject = source.filter(x => x[t.field] != null)[0];
                if (findObject)
                  fieldValue = findObject[t.field];
                else
                  fieldValue = '';
              }
              if (t.dataType == undefined) {
                if (typeof fieldValue != "boolean" && typeof fieldValue != "number" && (fieldValue.split("/").length == 3 || fieldValue.split("-").length == 3) && new Date(fieldValue).toString() !== "Invalid Date") {
                  t.dataType = "date";
                }
                else
                  t.dataType = typeof fieldValue;
              }
              tableColumns.push(t.field);
            }
          });
        
        //super.set(source, this.pageSize, tableColumns);
        if (this.totalCountValue != 0 && this.totalCountValue != this.totalCount)
          super.clearPageIndex();
        this.totalCountValue = this.totalCount;
        super.set(source, this.pageSize, tableColumns, this.isStoreProc, this.totalCount);
        if (sortColumnName && !this.isStoreProc && !isChanges)
          super.sort(sortColumnName, sortOrder, true);
        else
          super.pagging();
        super.applyChangesToObject(true);
        this.firstTimeBind = true;
      }
    }

  }
  clearAllFilter() {
    this.columns.forEach(t => {
      if (!t.actionable)
        this.clearFilterValue(t);
    })
  }

  closeFilter() {
    var openFilterColumn = this.columns.filter(t => t.isFilterOpen)[0];
    if (openFilterColumn)
      this.cancelFilter(openFilterColumn);

  }

  clearFilterValue(column: RxColumnComponent) {
    column.filterValue = undefined;
    this.searchObject[column.field] = column.filterValue;
    column.isSearchText = false;
    column.filterValueClone = column.filterValue;
  }
  showFilter(column: RxColumnComponent, event: any) {
    var targetElement = event.target;
    var divElement = <HTMLDivElement>document.getElementById(String(this.tableId));
    var width = divElement.clientWidth;
    var result = this.overlayPositionHost.getClientRectangle(targetElement)
    if ((width - result.left) < 300)
      column.isOpenLeftFilter = true;
    if (column.isFilterOpen)
      column.isFilterOpen = false
    else {
      this.columns.forEach(t => t.isFilterOpen = false);
      column.isFilterOpen = !column.isFilterOpen;
    }

  }
  cancelFilter(column: RxColumnComponent) {
    column.isFilterOpen = !column.isFilterOpen;
    if (!column.isSearchText)
      column.filterValue = undefined;
    if (column.isSearchText && column.filterValue != column.filterValueClone)
      column.filterValue = column.filterValueClone;
  }

  filterColumn(column: RxColumnComponent) {
    if (column.filterValue) {
      if (column.dataType == "date") {
        let date = new Date(column.filterValue);
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1;
        let year = date.getUTCFullYear();
        this.searchObject[column.field] = day + "/" + month + "/" + year;
      }
      else {
        this.searchObject[column.field] = column.filterValue;
      }
      column.isSearchText = true;
      column.filterValueClone = column.filterValue;
    }
    else {
      delete this.searchObject[column.field];
      column.isSearchText = false;
    }
    this.columns.forEach(t => { if (!this.searchObject[t.field]) this.searchObject[t.field] = '' })
    if(this.isStoreProc)
      super.columnFilter();
    else{
      if(column.filterValue && column.filterValue != ""){
        super.columnFilter(column.field,column.filterValue);
      }
      else{
        this.filterData = this.source;
      }
      super.refreshTable();
      this.applyChangesToObject();
    }
    column.isFilterOpen = !column.isFilterOpen;
  }

  resetSearch() {
    this.searchObject = {};
    this.columns.forEach(t => {
      t.filterValue = undefined;
    })
  }
  search(jObject: any) {
    if (jObject instanceof Array) {
      super.filter(jObject);
      super.applyChangesToObject();
    } else {
      for (var col in jObject) {
        var dataSearch = new DataSearch({ columnName: col, condition: "==", value: jObject[col] });
        super.filter(dataSearch);
        super.applyChangesToObject();
      }
    }


  }

  reset() {
    super.resetTable();
  }

  searchAll(value: any) {
    super.filterAll(value);
    super.applyChangesToObject();
  }

  setTableConfiguration() {
    if (this.masterClass)
      this.tableConfiguration.masterClass = this.masterClass;
    if (this.controlClass)
      this.tableConfiguration.controlClass = this.controlClass;
  }

  private sortColumn(column: RxColumnComponent) {
    if (!column.actionable && !column.disabledSorting) {

      if (this.pastSortableColumnComponent == undefined)
        this.pastSortableColumnComponent = column;
      else if (this.pastSortableColumnComponent.field != column.field)
        this.pastSortableColumnComponent.sortable = undefined;
      this.pastSortableColumnComponent = column;
      if (!this.isStoreProc) {
        if (column.sortable) {
          column.sortable = super.sort(column.field, false, false), column.sortClass = this.tableConfiguration.masterClass.desc;
        }
        else if (column.sortable == undefined || column.sortable == false) {
          column.sortable = super.sort(column.field, true, false), column.sortClass = this.tableConfiguration.masterClass.asc;
        }
      } else {
        if (column.sortable) {
          column.sortClass = this.tableConfiguration.masterClass.desc;
        }
        else if (column.sortable == undefined || column.sortable == false) {
          column.sortClass = this.tableConfiguration.masterClass.asc;
        }
        this.sortColumnName = column.field;
        this.sortOrder = column.sortable = !column.sortable;
        super.applyChangesToObject();
      }
    }
  }

  getColumnClass(row: any, column: RxColumnComponent) {
    if (column.columnClass) {
      return this.getClass(row, column.columnClass);
    }
    return '';
  }

  getRowClass(row: any) {
    if (this.rowClass) {
      return this.getClass(row, this.rowClass);
    }
    return '';
  }

  getClass(row, expression) {
    var fun = new Function('row', "return " + expression);
    if (expression.trim().split(" ").length > 1) {
      fun = new Function('row', "return " + expression);
    } else {
      fun = new Function('row', "return " + "'" + expression + "'");
    }
    return fun(row);
  }

  showDetail(index: number) {
    if (this.detailIndex == -1)
      this.detailIndex = index;
    else if (this.detailIndex != index)
      this.detailIndex = index;
    else
      this.detailIndex = -1;
  }
}
