import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FactorCompleteValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/factor/complete/factor-complete.component';
import { FactorDynamicValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/factor/dynamic/factor-dynamic.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@Component({
  templateUrl: './factor.component.html',
  entryComponents: [
DisqusComponent
  ]
})
export class FactorComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"factor":null,"When to use":null,"Basic Factor Validation":null,"FactorConfig":["dividend","fieldName","conditionalExpression","message"],"Complete Factor Example":null,"Dynamic Factor Example":null};
  tab_1:string = "dividendComponent";
   tab_2:string = "fieldNameComponent";
   tab_3:string = "conditionalExpressionComponent";
   tab_4:string = "messageComponent";
   tab_5:string = "completeexample";
   tab_6:string = "dynamicexample";
   
  constructor(
    private http: HttpClient   ,private mergeDashPipe:MergeDashPipe
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/reactive-form-validators/validators/factor/factor.json',this.options).subscribe((response:object) => {
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
