import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaxLengthCompleteValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/maxLength/complete/max-length-complete.component';
import { MaxLengthDynamicValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/maxLength/dynamic/max-length-dynamic.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@Component({
  templateUrl: './maxLength.component.html',
  entryComponents: [
DisqusComponent
  ]
})
export class MaxLengthComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"maxLength":null,"When to use":null,"Basic MaxLength Validation":null,"NumberConfig":["conditionalExpression","value"],"Complete maxLength Example":null,"Dynamic maxLength Example":null};
  tab_1:string = "conditionalExpressionComponent";
   tab_2:string = "messageComponent";
   tab_3:string = "messageComponent";
   tab_4:string = "completeexample";
   tab_5:string = "dynamicexample";
   
  constructor(
    private http: HttpClient   ,private mergeDashPipe:MergeDashPipe
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/reactive-form-validators/validators/maxLength/maxlength.json',this.options).subscribe((response:object) => {
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
