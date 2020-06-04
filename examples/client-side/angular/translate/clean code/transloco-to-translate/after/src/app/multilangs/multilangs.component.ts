import { Component, OnInit } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
  selector: 'app-multilangs',
  templateUrl: './multilangs.component.html',
  styleUrls: ['./multilangs.component.css']
})
export class MultilangsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    @translate() global: { [key: string]: any };

    @translate({ translationName: 'lazy-page', language: 'es' }) lazyPage: { [key: string]: any };

    @translate({ translationName: 'global', language: 'es' }) globalSpanish: { [key: string]: any };

    @translate({ translationName: 'lazy-page', language: 'es' }) lazyPageSpanish: { [key: string]: any };

}
