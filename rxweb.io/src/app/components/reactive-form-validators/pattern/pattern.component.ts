import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PatternCompleteComponent } from '../../../../assets/examples/pattern/complete/pattern-complete.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './pattern.component.html',
  entryComponents: [
  	PatternCompleteComponent,
   DisqusComponent
  ]
})
export class PatternComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic Pattern Validation":null,"PatternConfig":["message","conditionalExpressions","pattern"],"Complete pattern Example":null};
  tab_1:string = "basicadd";
   tab_2:string = "messageModel";
   tab_3:string = "conditionalExpressionsModel";
   tab_4:string = "patternModel";
   tab_5:string = "completeExample";
   
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/pattern/pattern.json',this.options).subscribe((response:object) => {
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
