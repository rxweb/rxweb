import { Component} from '@angular/core';
import { TranslateService } from '@rxweb/ngx-translate-extension';

@Component({
    selector: 'app-pipe',
    templateUrl: './pipe.component.html',
})
export class PipeComponent {
    name: string = "John";
    constructor(public translate: TranslateService) { }
}
