import { Component } from '@angular/core';
import { TranslateService, translateComponent } from '@rxweb/ngx-translate-extension';

@translateComponent({ translationName: 'child-data' })
@Component({
    selector: 'app-structural-directive',
    templateUrl: './structural-directive.component.html',
})
export class StructuralDirectiveComponent {
    constructor(public translate: TranslateService) { }

}
