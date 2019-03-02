import { Component, Input, ContentChild, ContentChildren, TemplateRef, QueryList, Output, EventEmitter } from "@angular/core";

import { RxPermissionItemTemplateDirective } from './rx-permission-item-template.directive';
import { RxCellTemplateDirective } from './rx-cell-template.directive';
import { ApplicationPage } from '../core'


@Component({
    selector: 'rx-column',
    template: ''
})
export class RxColumnComponent {
    private columnTitle: string;
    private applicationModuleId: number;
    @ContentChild(RxCellTemplateDirective) content: RxCellTemplateDirective;

    @ContentChildren(RxPermissionItemTemplateDirective) permissionItems: QueryList<RxPermissionItemTemplateDirective>;

    templateRef: TemplateRef<any>;

    get template(): TemplateRef<any> {
        return this.content ? this.content.templateRef : undefined;
    }

    @Input() field: string;

    @Input() type: string;

    @Input() link: string[];

    @Input() queryParams: any

    @Input() set title(value: string) {
        this.columnTitle = value;
    }

    @Input() disabledSorting: boolean = false;

    @Input() applyAutoDataType: boolean = true;

    @Input() dateFormat: string;

    get title(): string {
        var headerText = undefined
        if (!this.columnTitle) {
            this.applicationModuleId = this.applicationModuleId ? this.applicationModuleId : ApplicationPage.getActiveModule();
            headerText = ApplicationPage.localizeValue(this.field, 'gridheader', this.applicationModuleId,this.data) //Change gridHeader to gridheader
            if (headerText)
                return headerText;
            else
                return "N/A";
        }
        return this.columnTitle;
    }

    @Input() width: string;

    @Input() actionable: boolean = false;

    @Input() sortable: boolean = undefined;

    @Input() columnClass: string;

    @Input() permissions: Array<any>;

    @Input() data: any[];

    @Input() clickable: boolean = true;

    @Input() dataType: string;

    @Input() filter: boolean = false;

    @Input() visible: boolean = true;

    @Output() click:EventEmitter<any> = new EventEmitter<any>()

    sortClass: string;

    isBindable: boolean = true;
    isFilterOpen: boolean = false;

    filterValue: any;
    isSearchText: boolean = false;
    filterValueClone: string;
    isOpenLeftFilter: boolean = false;

}
