import { Component, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html'
})
export class AppComponent {

    loading: boolean = true;
    start: number = 0;

}
