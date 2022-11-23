import { Component, OnInit } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Strongly Typed Reactive Form';
    
    ngOnInit() {
        ReactiveFormConfig.set({
            "validationMessage": {
                "required":"This field is required.",
                "date": "Please enter a valid date."
            }, "internationalization": { "dateFormat": "ymd", "seperator": "-" }
        });
    }
}
