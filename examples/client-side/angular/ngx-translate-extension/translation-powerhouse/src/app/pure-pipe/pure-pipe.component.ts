import { Component} from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
    selector: 'app-pure-pipe',
    templateUrl: './pure-pipe.component.html',
})
export class PurePipeComponent {
    @translate() global: { [key: string]: any };

    name:string = "Munad"
}
