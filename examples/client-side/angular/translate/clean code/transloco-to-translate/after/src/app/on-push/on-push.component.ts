import { ChangeDetectionStrategy, Component } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
    selector: 'app-on-push',
    templateUrl: './on-push.component.html',
    styleUrls: ['./on-push.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushComponent {
    value = '🦄';
    key = 'home';

    translateList = ['b', 'c'];

    @translate() global: { [key: string]: any };

    changeKey() {
        this.key = this.key === 'home' ? 'fromList' : 'home';
    }

    changeParam() {
        this.value = this.value === '🦄' ? '🦄🦄🦄' : '🦄';
    }
}
