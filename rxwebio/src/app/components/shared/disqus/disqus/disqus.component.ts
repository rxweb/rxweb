import { Component, OnInit } from '@angular/core';
import * as moment from 'src/assets/scripts/moment.js'

@Component({
    selector: 'app-disqus',
    templateUrl: './disqus.component.html',
})

export class DisqusComponent implements OnInit {
    constructor(
    ) {
    }

    ngOnInit(): void {
        var dsq = document.createElement('script');
        var head = document.getElementsByTagName('head')[0];
        var body = document.getElementsByTagName('body')[0];
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = '//rxweb.disqus.com/embed.js';
        var t = setTimeout(function () {
            (head || body).appendChild(dsq);
        }, 10)
    }   
}