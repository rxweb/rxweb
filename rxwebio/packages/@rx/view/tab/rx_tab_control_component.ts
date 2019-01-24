  import {Component, ViewChild, TemplateRef, Input, Output, EventEmitter } from "@angular/core";


@Component({
    selector: 'rx-tab',
    template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class RxTabComponent {
    userValue: any;
    @ViewChild(TemplateRef) content: TemplateRef<any>;

    @Input() active: boolean
    @Input() set activeIndex(value: boolean) {
        console.log(value);
    }
    @Input() static: boolean;

    @Input() component: any;

    @Input() title: string;

    @Input() disabled: boolean

    @Input() data: any;

    @Output() click = new EventEmitter();

    tabSelect(tabIndex: number) {
        this.click.emit(tabIndex);
    }
}