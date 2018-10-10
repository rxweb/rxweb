import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaxNumberCompleteComponent } from '../../../../assets/examples/maxNumber/complete/max-number-complete.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './maxNumber.component.html',
  entryComponents: [
  	MaxNumberCompleteComponent,
   DisqusComponent
  ]
})
export class MaxNumberComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic MaxNumber Validation":null,"NumberConfig":["conditionalExpression","message","value"],"Complete MaxNumber Example":null};
  tab_1:string = "basicadd";
   tab_2:string = "conditionalExpressionmodel";
   tab_3:string = "messageModel";
   tab_4:string = "valueModel";
   tab_5:string = "completeexample";
   
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/maxNumber/maxnumber.json',this.options).subscribe((response:object) => {
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
