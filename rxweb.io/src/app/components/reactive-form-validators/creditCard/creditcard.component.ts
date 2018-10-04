import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CreditCardCompleteComponent } from '../../../../assets/examples/creditCard/complete/credit-card-complete.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './creditCard.component.html',
  entryComponents: [
  	CreditCardCompleteComponent,
   DisqusComponent
  ]
})
export class CreditCardComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic CreditCard Validation":null,"CreditCardConfig":["creditCardTypes","conditionalExpressions","message"],"Complete CreditCard Example":null};
  tab_1:string = "basicadd";
   tab_2:string = "creditCardTypesmodel";
   tab_3:string = "conditionalExpressionsmodel";
   tab_4:string = "messageModel";
   tab_5:string = "completeexample";
   
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/creditCard/creditcard.json',this.options).subscribe((response:object) => {
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
