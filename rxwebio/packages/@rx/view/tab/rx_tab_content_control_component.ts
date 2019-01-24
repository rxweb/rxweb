import {Component,Input } from "@angular/core";

@Component({
    selector: 'rx-tab-content',
    template: '<ng-template></ng-template>'
})
export class RxTabContentComponent {
    @Input() class:string;
}