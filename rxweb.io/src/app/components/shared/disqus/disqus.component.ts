import { Component,OnInit } from '@angular/core';

@Component({
    selector: 'app-disqus',
    templateUrl: './disqus.component.html',
})

export class DisqusComponent implements OnInit {
    ngOnInit(): void {
		let documentObj = document, scriptSection = documentObj.createElement('script'), newDateObj : any = new Date();
		scriptSection.src = 'https://rxweb.disqus.com/embed.js';
		scriptSection.setAttribute('data-timestamp',newDateObj);
		(documentObj.head || documentObj.body).appendChild(scriptSection);
    }
}