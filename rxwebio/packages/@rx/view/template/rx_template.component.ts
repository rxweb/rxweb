import { Component, AfterContentInit, OnChanges, SimpleChanges, TemplateRef, Input, ContentChild } from "@angular/core";
import { TemplateCollection } from "./template_collection";
import { RxCellTemplateDirective } from '../../table/rx-cell-template.directive'

@Component({
    selector: "rx-template",
    templateUrl: "./rx-template.component.html",
    exportAs: 'rxtemplate'
})
export class RxTemplateComponent extends TemplateCollection implements AfterContentInit, OnChanges {

    @Input() dataSource: any;

    @Input() isHideRowClass: boolean;

    @Input() pageSize: number;

    @Input() defaultFilter: any;

    @Input() masterClass: any;

    templateConfiguration: any;

    columns: Array<string>;

    @ContentChild(RxCellTemplateDirective) content: RxCellTemplateDirective;

    get template(): TemplateRef<any> {
        return this.content ? this.content.templateRef : undefined;
    }

    constructor() {
        super()
        //this.templateConfiguration = ApplicationConfiguration.get('control.rxTemplate');
    }

    ngAfterContentInit(): void {
        if (this.dataSource)
            this.bindData(this.dataSource);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["dataSource"] && changes['dataSource'].currentValue) {
            let source: any[] = changes['dataSource'].currentValue;
            this.bindData(source);
        }
    }

    bindData(source:any) {
        this.columns = (source.length > 0) ? Object.keys(source[0]) : [];
        super.set(source, this.pageSize, this.columns);
        super.pagging();
        super.refreshTable()
    }

}
