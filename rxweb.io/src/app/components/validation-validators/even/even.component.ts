import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EvenCompleteValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/even/complete/even-complete.component';
import { EvenDynamicValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/even/dynamic/even-dynamic.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@Component({
  templateUrl: './even.component.html',
  entryComponents: [
DisqusComponent
  ]
})
export class EvenComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"even":null,"When to use":null,"Basic Even Validation":null,"BaseConfig":["conditionalExpression","message"],"Complete even Example":null,"Dynamic even Example":null};
  tab_1:string = "conditionalExpressionComponent";
   tab_2:string = "messageComponent";
   tab_3:string = "completeexample";
   tab_4:string = "dynamicexample";
   
  constructor(
    private http: HttpClient   ,private mergeDashPipe:MergeDashPipe
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/reactive-form-validators/validators/even/even.json',this.options).subscribe((response:object) => {
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
