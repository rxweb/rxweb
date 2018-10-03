import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaxDateCompleteComponent } from '../../../../assets/examples/maxDate/complete/max-date-complete.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { ResponseType } from '@angular/http';

@Component({
  templateUrl: './maxDate.component.html',
  entryComponents: [
  	MaxDateCompleteComponent,
   DisqusComponent
  ]
})
export class MaxDateComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic MaxDate Validation":null,"DateConfig":["conditionalExpression","message","value"],"Complete MaxDate Example":null};
  tab_1:string = "basicadd";
   tab_2:string = "conditionalExpressionsmodel";
   tab_3:string = "messageModel";
   tab_4:string = "valueModel";
   tab_5:string = "completeexample";
   
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/maxDate/maxdate.json',this.options).subscribe((response:object) => {
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
