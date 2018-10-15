import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PatternCompleteComponent } from 'src/assets/examples/reactive-form-validators/decorators/pattern/complete/pattern-complete.component';
import { PatternDynamicComponent } from 'src/assets/examples/reactive-form-validators/decorators/pattern/dynamic/pattern-dynamic.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@Component({
  templateUrl: './pattern.component.html',
  entryComponents: [
DisqusComponent
  ]
})
export class PatternComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic Pattern Validation":null,"PatternConfig":["message","conditionalExpression","pattern"],"Complete pattern Example":null,"Dynamic pattern Example":null};
  tab_1:string = "basicadd";
   tab_2:string = "messageModel";
   tab_3:string = "conditionalExpressionModel";
   tab_4:string = "patternModel";
   tab_5:string = "completeExample";
   tab_6:string = "dynamicExample";
   
  constructor(
    private http: HttpClient   ,private mergeDashPipe:MergeDashPipe
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/reactive-form-validators/decorators/pattern/pattern.json',this.options).subscribe((response:object) => {
      this.codeContent = JSON.parse(response.toString());
	  let splitedArray = location.pathname.split('/');
	  if(splitedArray[2] != undefined)
		document.title = splitedArray[2] + " : " + this.mergeDashPipe.transform(splitedArray[1])
	  else
		document.title = splitedArray[1] ? this.mergeDashPipe.transform(splitedArray[1]) : "RxApp"
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
