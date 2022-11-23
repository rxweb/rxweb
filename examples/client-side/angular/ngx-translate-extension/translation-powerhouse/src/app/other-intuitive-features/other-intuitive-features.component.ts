import { Component } from '@angular/core';
import { TranslateService } from '@rxweb/ngx-translate-extension';

@Component({
    selector: 'app-other-intuitive-feature',
    templateUrl: './other-intuitive-features.component.html',
})
export class OtherIntuitiveFeatureComponent {
    constructor(public translate: TranslateService) { }
}
