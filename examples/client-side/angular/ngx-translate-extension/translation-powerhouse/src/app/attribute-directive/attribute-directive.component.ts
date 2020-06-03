import { Component} from '@angular/core';
import { TranslateService } from '@rxweb/ngx-translate-extension';

@Component({
    selector: 'app-attribute-directive',
    templateUrl: './attribute-directive.component.html',
})
export class AttributeDirectiveComponent {
    name: string = "John";
    constructor(public translate: TranslateService) { }
}
