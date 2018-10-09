import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FactorCompleteComponent } from '../../../../assets/examples/factor/complete/factor-complete.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './factor.component.html',
  entryComponents: [
  	FactorCompleteComponent,
   DisqusComponent
  ]
})
export class FactorComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic Factor Validation":null,"FactorConfig":["dividend","fieldName","conditionalExpression","message"],"Complete Factor Example":null};
  tab_1:string = "basicadd";
   tab_2:string = "dividendmodel";
   tab_3:string = "fieldNamemodel";
   tab_4:string = "conditionalExpressionmodel";
   tab_5:string = "messageModel";
   tab_6:string = "completeexample";
   
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/factor/factor.json',this.options).subscribe((response:object) => {
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
