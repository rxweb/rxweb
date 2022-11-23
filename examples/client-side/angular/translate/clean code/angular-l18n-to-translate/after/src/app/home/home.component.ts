import { Component, OnInit, Inject } from '@angular/core';
import { translate } from '@rxweb/translate';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    count = 0;

    today = Date.now();
    timeAgo: number = Date.now();
    value = Math.round(Math.random() * 1000000) / 100;

    @translate() global: any;

    ngOnInit() {
        setInterval(() => {
            this.timeAgo = Date.now();
        }, 1000);
    }

}
