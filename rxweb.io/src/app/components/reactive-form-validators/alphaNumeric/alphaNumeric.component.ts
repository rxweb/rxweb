import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AlphaNumericCompleteComponent } from '../../../../assets/examples/alphaNumeric/complete/alpha-numeric-complete.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { ResponseType } from '@angular/http';

@Component({
  templateUrl: './alphaNumeric.component.html',
  entryComponents: [
  	AlphaNumericCompleteComponent,
   DisqusComponent
  ]
})
export class AlphaNumericComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic AlphaNumeric Validation":null,"AlphaConfig":["allowWhiteSpace","conditionalExpression","message"],"Complete AlphaNumeric Example":null};
  tab_1:string = "basicadd";
   tab_2:string = "allowWhiteSpacemodel";
   tab_3:string = "conditionalExpressionsmodel";
   tab_4:string = "messageModel";
   tab_5:string = "completeexample";
   
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/alphaNumeric/alphanumeric.json',this.options).subscribe((response:object) => {
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
