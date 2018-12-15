import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Http } from "@angular/http";


@Component({
  templateUrl: './getting-started.component.html',
})
export class GettingStartedComponent implements OnInit {
  showComponent:boolean = false;
  rightSidebarLinks:any=[{"id":"getting-started","title":"Getting Started","subLink":null},{"id":"quick-start","title":"Quick Start","subLink":[{"title":"Installation","id":"installation"},{"title":"Import Modules","id":"import-modules"},{"title":"Global Validation Messages","id":"global-validation-messages"},{"title":"Examples","id":"examples"}]},{"id":"goal","title":"Goal","subLink":null},{"id":"discussion","title":"Discussion","subLink":null}];
  importModuleContent:string;
  options: any = { responseType: 'text' };
  codeContent:any;
  globalValidationMessageContent:string;
  mainTab:string = "reactive-form-based-validation"
  reactiveFormBasedValidation:string = "Example";
  templateFormBasedValidation:string = "Example";
  modelBasedFormValidation:string  ="Example";
  constructor(private http: Http
  ) {
  }

  ngOnInit(): void {
       this.http.get('assets/json/generator/getting-started/getting-started.json').subscribe(response => {
           this.codeContent = response.json();
           this.showComponent = true;
       });
  }
   scrollTo(section) {
        location.hash = section;
        return false;
    }
}
