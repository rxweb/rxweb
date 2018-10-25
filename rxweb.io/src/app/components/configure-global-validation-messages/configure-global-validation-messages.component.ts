import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DisqusComponent } from "src/app/components/shared/disqus/disqus.component";


@Component({
  selector: 'app-configure-global-validation-messages',
  templateUrl: './configure-global-validation-messages.component.html',
  entryComponents: [
DisqusComponent
  ]
})
export class ConfigureGlobalValidationMessagesComponent implements OnInit {
  showComponent:boolean = false;
  moduleContent:string;
  constructor(
    private router: Router, private http: HttpClient
  ) {
  }


  ngOnInit(): void {
    this.moduleContent = `import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: './app.component.css'
})
export class AppComponent implements OnInit {
  
	constructor() {  }
  
	ngOnInit(): void {
		ReactiveFormConfig.set({ 
                  "validationMessage": {
                      "required": "this field is required.",
                      //.... set key name of validator name and assign the message of that particular key.
                  }
              });
        }
}`
    this.showComponent = true;
  }
}
