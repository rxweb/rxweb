import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LessThanCompleteComponent } from '../../../../assets/examples/lessThan/complete/less-than-complete.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './lessThan.component.html',
  entryComponents: [
  	LessThanCompleteComponent,
   DisqusComponent
  ]
})
export class LessThanComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic LessThan Validation":null,"RelationalOperatorConfig":["fieldName","conditionalExpression","message"],"Complete lessThan Example":null};
  tab_1:string = "basicadd";
   tab_2:string = "fieldNamemodel";
   tab_3:string = "conditionalExpressionmodel";
   tab_4:string = "messageModel";
   tab_5:string = "completeexample";
   
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/lessThan/lessthan.json',this.options).subscribe((response:object) => {
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
