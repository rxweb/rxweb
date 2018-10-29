import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { JsonCompleteValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/json/complete/json-complete.component';
import { JsonDynamicValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/json/dynamic/json-dynamic.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@Component({
  templateUrl: './json.component.html',
  entryComponents: [
DisqusComponent
  ]
})
export class JsonComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"json":null,"When to use":null,"Basic Json Validation":null,"DefaultConfig":["conditionalExpression","message"],"Complete Json Example":null,"Dynamic Json Example":null};
  tab_1:string = "conditionalExpressionComponent";
   tab_2:string = "messageComponent";
   tab_3:string = "completeexample";
   tab_4:string = "dynamicexample";
   
  constructor(
    private http: HttpClient   ,private mergeDashPipe:MergeDashPipe
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/reactive-form-validators/validators/json/json.json',this.options).subscribe((response:object) => {
      this.codeContent = JSON.parse(response.toString());
	  let splitedArray = location.pathname.split('/');
	  if(splitedArray[2] != undefined)
		document.title = splitedArray[2] + " : " + this.mergeDashPipe.transform(splitedArray[1])
	  else
		document.title = splitedArray[1] ? this.mergeDashPipe.transform(splitedArray[1]) : "rxweb:reactive form validators"
	  this.showComponent = true;
    })
  }
  scrollTo(section) {  
    var node = document.querySelector(section);
    node.scrollIntoView(true);
    var scrolledY = window.scrollY;
    if(scrolledY){
      window.scroll(0, scrolledY - 62);
    }
	return false;
  }
}
