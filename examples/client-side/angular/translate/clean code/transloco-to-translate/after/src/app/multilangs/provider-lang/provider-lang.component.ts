import { Component, OnInit } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
  selector: 'provider-lang',
  templateUrl: './provider-lang.component.html',
  styleUrls: ['./provider-lang.component.css']
})
export class ProviderLangComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

    @translate({ translationName: 'global', language: 'es' }) globalSpanish: { [key: string]: any };

    @translate() global: { [key: string]: any };

}
