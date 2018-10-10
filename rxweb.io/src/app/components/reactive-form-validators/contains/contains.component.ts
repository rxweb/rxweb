import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ContainsCompleteComponent } from '../../../../assets/examples/contains/complete/contains-complete.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './contains.component.html',
  entryComponents: [
  	ContainsCompleteComponent,
   DisqusComponent
  ]
})
export class ContainsComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic Contains Validation":null,"ContainsConfig":["value","conditionalExpression","message"],"Complete Contains Example":null};
  tab_1:string = "basicadd";
   tab_2:string = "valuemodel";
   tab_3:string = "conditionalExpressionmodel";
   tab_4:string = "messageModel";
   tab_5:string = "completeexample";
   
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/contains/contains.json',this.options).subscribe((response:object) => {
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
