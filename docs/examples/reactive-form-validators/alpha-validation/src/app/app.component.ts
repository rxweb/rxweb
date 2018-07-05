import { Component,OnInit } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';

    ngOnInit() {
    ReactiveFormConfig.set({
      "internationalization": {
          "dateFormat": "dmy",
          "seperator": "/"
      },
      "validationMessage": {
          "alpha": "Only alphabelts are allowed.",
      }
  });
  }
}
