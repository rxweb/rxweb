import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LessThanEqualToCompleteComponent } from 'src/assets/examples/reactive-form-validators/decorators/lessThanEqualTo/complete/less-than-equal-to-complete.component';
import { LessThanEqualToDynamicComponent } from 'src/assets/examples/reactive-form-validators/decorators/lessThanEqualTo/dynamic/less-than-equal-to-dynamic.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@Component({
  templateUrl: './lessThanEqualTo.component.html',
  entryComponents: [
DisqusComponent
  ]
})
export class LessThanEqualToComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"lessThanEqualTo":null,"When to use":null,"Basic LessThanEqualTo Validation":null,"RelationalOperatorConfig":["fieldName","conditionalExpression","message"],"Complete lessThanEqualTo Example":null,"Dynamic lessThanEqualTo Example":null};
  tab_1:string = "basicadd";
   tab_2:string = "fieldNamemodel";
   tab_3:string = "conditionalExpressionmodel";
   tab_4:string = "messageModel";
   tab_5:string = "completeexample";
   tab_6:string = "dynamicexample";
   
  constructor(
    private http: HttpClient   ,private mergeDashPipe:MergeDashPipe
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/reactive-form-validators/decorators/lessThanEqualTo/lessthanequalto.json',this.options).subscribe((response:object) => {
      this.codeContent = JSON.parse(response.toString());
	  let splitedArray = location.pathname.split('/');
	  if(splitedArray[2] != undefined)
		document.title = splitedArray[2] + " : " + this.mergeDashPipe.transform(splitedArray[1])
	  else
		document.title = splitedArray[1] ? this.mergeDashPipe.transform(splitedArray[1]) : "rxweb:reactive form validators"
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
