import { Component } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
  selector: 'access-denied',
  templateUrl: './access-denied.component.html'
})
export class AccessDeniedComponent {
    @translate({ translationName: "error" }) error: { [key: string]: any };
}
