import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-on-push',
    templateUrl: './on-push.component.html',
    styleUrls: ['./on-push.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
