import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
  selector: 'app-dynamic-translation',
  templateUrl: './dynamic-translation.component.html',
  styleUrls: ['./dynamic-translation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTranslationComponent implements OnInit {
    constructor() { }
    @translate() global: { [key: string]: any };
  ngOnInit() {}

    updateTitle() {
      this.global.addOrUpdateKey('home', 'New title');
  }

  addNewKey() {
      this.global.addOrUpdateKey('newKey', 'New key');
  }

    addTranslationObj() {

    const newTranslation = {
        title: 'New translation title'
    };
        this.global.addOrUpdateKey('newTranslation',newTranslation);
  }
}
