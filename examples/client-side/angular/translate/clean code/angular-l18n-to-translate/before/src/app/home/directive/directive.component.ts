import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-directive',
    templateUrl: './directive.component.html',
    styleUrls: ['./directive.component.scss']
})
export class DirectiveComponent implements OnInit {

    @Input() today: number;
    @Input() timeAgo: string;
    @Input() value: number;

    ngOnInit() {
    }

}
