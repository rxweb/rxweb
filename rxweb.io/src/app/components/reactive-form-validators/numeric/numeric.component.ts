import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NumericCompleteComponent } from '../../../../assets/examples/numeric/complete/numeric-complete.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './numeric.component.html',
  entryComponents: [
  	NumericCompleteComponent,
   DisqusComponent
  ]
})
export class NumericComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic numeric Validation":null,"NumericConfig":["acceptValue","allowDecimal","conditionalExpression","message"],"Complete numeric Example":null};
  tab_1:string = "basicadd";
   tab_2:string = "acceptValuemodel";
   tab_3:string = "allowDecimalmodel";
   tab_4:string = "conditionalExpressionmodel";
   tab_5:string = "messageModel";
   tab_6:string = "completeexample";
   
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/numeric/numeric.json',this.options).subscribe((response:object) => {
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
