import { Component, Input } from '@angular/core';
import { translate } from '@rxweb/translate';


@Component({
    selector: 'app-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss']
})
export class ApiComponent {

    @Input() today: number;
    @Input() timeAgo: string;
    @Input() value: number;


    name:string = "@rxweb/translate"

    constructor() { }

    @translate() global: any;

}
