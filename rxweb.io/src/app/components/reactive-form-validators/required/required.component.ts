import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RequiredCompleteComponent } from '../../../../assets/examples/required/complete/required-complete.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './required.component.html',
  entryComponents: [
  	RequiredCompleteComponent,
   DisqusComponent
  ]
})
export class RequiredComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic Required Validation":null,"RequiredConfig":["conditionalExpressions","message"],"Complete required Example":null};
  tab_1:string = "basicadd";
   tab_2:string = "conditionalExpressionsModel";
   tab_3:string = "messageModel";
   tab_4:string = "completeExample";
   
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/required/required.json',this.options).subscribe((response:object) => {
      this.codeContent = JSON.parse(response.toString());
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
