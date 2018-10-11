import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GreaterThanCompleteComponent } from '../../../../assets/examples/reactive-form-validators/decorators/greaterThan/complete/greater-than-complete.component';
import { GreaterThanDynamicComponent } from '../../../../assets/examples/reactive-form-validators/decorators/greaterThan/dynamic/greater-than-dynamic.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { TitleCasePipe } from "@angular/common";

@Component({
  templateUrl: './greaterThan.component.html',
  entryComponents: [
  	GreaterThanCompleteComponent,
   	GreaterThanDynamicComponent,
   DisqusComponent
  ]
})
export class GreaterThanComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic GreaterThan Validation":null,"RelationalOperatorConfig":["fieldName","conditionalExpression","message"],"Complete greaterThan Example":null,"Dynamic greaterThan Example":null};
  tab_1:string = "basicadd";
   tab_2:string = "fieldNamemodel";
   tab_3:string = "conditionalExpressionmodel";
   tab_4:string = "messageModel";
   tab_5:string = "completeexample";
   tab_6:string = "dynamicexample";
   
  constructor(
    private http: HttpClient   ,private titlecasePipe:TitleCasePipe
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/reactive-form-validators/decorators/greaterThan/greaterthan.json',this.options).subscribe((response:object) => {
      this.codeContent = JSON.parse(response.toString());
	  let splitedArray = location.pathname.split('/');
	  if(splitedArray[2] != undefined)
		document.title = this.titlecasePipe.transform(splitedArray[2]) + " : " + this.titlecasePipe.transform(splitedArray[1])
	  else
		document.title = splitedArray[1] ? this.titlecasePipe.transform(splitedArray[1]) : "RxApp"
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
