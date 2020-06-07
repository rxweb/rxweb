import { Component, OnInit, Inject, Input } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
    selector: 'app-pipe',
    templateUrl: './pipe.component.html',
    styleUrls: ['./pipe.component.scss']
})
export class PipeComponent {

    @Input() today: number;
    @Input() timeAgo: string;
    @Input() value: number;

    name: string = "@rxweb/translate";

    @translate() global: any;
}
