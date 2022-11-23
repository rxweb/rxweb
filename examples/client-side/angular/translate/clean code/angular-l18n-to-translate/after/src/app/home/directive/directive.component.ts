import { Component, OnInit, Input } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
    selector: 'app-directive',
    templateUrl: './directive.component.html',
    styleUrls: ['./directive.component.scss']
})
export class DirectiveComponent {

    @Input() today: number;
    @Input() timeAgo: string;
    @Input() value: number;

    name: string = "@rxweb/translate";

    @translate() global: any;
}
